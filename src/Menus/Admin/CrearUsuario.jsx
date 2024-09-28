import React, { useEffect, useState } from 'react';
import '../Admin/CrearUsuario.css'
import axios from 'axios';
import { MenuAdmin } from '../../componentes/Menu';
import { UserinfoAmin } from '../../componentes/Userinfo';
import Popup from '../../componentes/Popup'

const CrearUsuario = () => {
    const [passwordError, setPasswordError] = useState('');
    const [dependenceTypes, setDependence] = useState([]);
    const [confirmPasswordError, setConfirmPasswordError] = useState('');
    const [identificationTypes, setIdentificationTypes] = useState([]);
    const [showPopup, setShowPopup] = useState(false);
    const [error, setError] = useState('');
    const [personTypes, setPersonTypes] = useState([]);
    const [formData, setFormData] = useState({
        nombre: '',
        apellido: '',
        correo: '',
        numero: '',
        usuario: '',
        contraseña: '',
        confirmarContraseña: '',
        tipoIdentificacion: '',
        identificacion: '',
        tipoPersona: '',
        dependencia: '',
        rol: '',
    });

    useEffect(() => {
        const script = document.createElement('script');
        script.src = '/Gradient.js'; // Ruta directa al archivo en public
        script.async = true;
        document.body.appendChild(script);

        script.onload = () => {
            // Inicializar el gradiente una vez que el script haya cargado
            const gradient = new Gradient();
            gradient.initGradient('#gradient-canvas');
        };

        return () => {
            document.body.removeChild(script);
        };
    }, []); // Solo se ejecuta una vez al montar el componente

    useEffect(() => {
        document.title = "Creacion de Usuario"

        const fetchIdentificationTypes = async () => {
            try {
                const response = await axios.get('https://pqrsmart.onrender.com/api/identification_type/get');

                setIdentificationTypes(response.data);
            } catch (error) {
                console.error('Error al obtener tipos de identificación de la base de datos', error);
            }
        };

        const fetchPersonTypes = async () => {
            try {
                const response = await axios.get('https://pqrsmart.onrender.com/api/person_type/get');

                setPersonTypes(response.data);
            } catch (error) {
                console.error('Error al obtener tipos de persona de la base de datos', error);
            }
        };
        const fetchDependence = async () => {
            try {
                const response = await axios.get('https://pqrsmart.onrender.com/api/dependence/get')

                setDependence(response.data);
            } catch (error) {
                console.error('Error al obtener el dependencias:', error);
            }
        };


        fetchDependence();
        fetchIdentificationTypes();
        fetchPersonTypes();
    }, []);

    const validatePassword = (password) => {
        const minLength = password.length >= 8;
        const hasUpperCase = /[A-Z]/.test(password);
        const hasLowerrCase = /[a-z]/.test(password);
        const hasNumber = /\d/.test(password);
        const hasSpecialChar = /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>/?]/.test(password);

        return minLength && hasUpperCase && hasNumber && hasSpecialChar && hasLowerrCase;
    };

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const handleReset = () => {
        setFormData({
            nombre: '',
            apellido: '',
            correo: '',
            numero: '',
            usuario: '',
            contraseña: '',
            confirmarContraseña: '',
            tipoIdentificacion: '',
            identificacion: '',
            tipoPersona: '',
            dependencia: '',
            rol: '',
        });
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        setConfirmPasswordError('')
        setPasswordError('')
        const isValidPassword = validatePassword(formData.contraseña);
        if (!isValidPassword) {
            setPasswordError('La contraseña debe tener mínimo 8 caracteres, al menos un número, un signo y una letra mayúscula.');
            return;
        } else {
            setPasswordError('Contraseña valida');
        }

        if (formData.contraseña !== formData.confirmarContraseña) {
            setConfirmPasswordError('Las contraseñas no coinciden');
            return;
        } else {
            setConfirmPasswordError('Contraseña valida');
        }


        try {


            const selectedDepenceType = dependenceTypes.find(type => type.idDependence === parseInt(formData.dependencia));
            const selectedIdentificationType = identificationTypes.find(type => type.idIdentificationType === parseInt(formData.tipoIdentificacion));
            const selectedPersonType = personTypes.find(type => type.idPersonType === parseInt(formData.tipoPersona));
            if (formData.contraseña === formData.confirmarContraseña) {
                const userResponse = await axios.post('https://pqrsmart.onrender.com/api/auth/register', {
                    personType: { idPersonType: selectedPersonType.idPersonType },
                    name: formData.nombre,
                    lastName: formData.apellido,
                    email: formData.correo,
                    identificationType: { idIdentificationType: selectedIdentificationType.idIdentificationType }, // Enviar el objeto completo
                    identificationNumber: parseInt(formData.identificacion),
                    user: formData.usuario,
                    password: formData.contraseña,
                    dependence: { idDependence: selectedDepenceType.idDependence },
                    number: parseInt(formData.numero),
                    role: formData.rol,
                });
                setConfirmPasswordError('')
                setPasswordError('')
                handleReset();
                setError('Se ha enviado un mensaje de verificacion a su correo, si no le aparece verifique la carpeta de spam.')
                setShowPopup(true); // Mostrar popup
                return;

            }


        } catch (error) {
            const status = error.response.data;
            // Manejo de errores
            if (status === 'El correo electrónico ya está en uso.') {
                setError('El correo electrónico ya está en uso.');
            } else if (status === 'El usuario ya existe.') {
                setError("El usuario ya existe.");
            } else if (status === 'El número de identificación ya está registrado.') {
                setError("El número de identificación ya está registrado.");
            } else if (status === 'El número ya está registrado.') {
                setError("El número ya está registrado.");
            }
            else {
                setError("Error en el servidor. Intente nuevamente más tarde.");
            }
            setShowPopup(true); // Mostrar popup
            return;
        }

    };
    const closePopup = () => {
        setShowPopup(false);
    };
    return (
        <div className='CrearUsuario'>
            <canvas id="gradient-canvas" style={{ width: '100vw', height: '100vh', position: 'absolute', zIndex: -1 }}></canvas>
            <div className="menus">
                <MenuAdmin />
            </div>
            <div className="cuerpos">
                <div className="headers">
                    <h1 className="title">CREAR USUARIO</h1>
                    <div className="user-menu">
                        <UserinfoAmin />

                    </div>
                </div>

                <div className="form">
                    <form className="crearusu" onSubmit={handleSubmit}>
                        <div className="input-label">
                            <label >Tipo De Persona</label>
                            <select
                                id="tipoPersona"
                                name="tipoPersona"
                                value={formData.tipoPersona}
                                onChange={handleChange} required
                            >
                                <option key="" value="">Seleccione el tipo</option>
                                {personTypes.map((type) => (
                                    <option key={type.idPersonType} value={type.idPersonType}>
                                        {type.namePersonType}
                                    </option>
                                ))}
                            </select>
                        </div>
                        <div className="input-label">
                            <label >Tipo De Identificacion</label>
                            <select
                                id="tipoIdentificacion"
                                name="tipoIdentificacion"
                                value={formData.tipoIdentificacion}
                                onChange={handleChange} required
                            >
                                <option key="" value="">Seleccione Tipo de Identificación</option>
                                {identificationTypes.map((type) => (
                                    <option key={type.idIdentificationType} value={type.idIdentificationType}>
                                        {type.nameIdentificationType}
                                    </option>
                                ))}
                            </select>
                        </div>
                        <div className="input-label">
                            <label >Numero De Identificacion</label>
                            <input
                                type="text"
                                id="identificacion"
                                name="identificacion"
                                value={formData.identificacion}
                                onChange={handleChange} required />
                        </div>
                        <div className="input-label">
                            <label >Nombres Completos</label>
                            <input
                                type="text"
                                id="nombre"
                                name="nombre"
                                value={formData.nombre}
                                onChange={handleChange} required />
                        </div>
                        <div className="input-label">
                            <label >Apellidos Completos</label>
                            <input
                                type="text"
                                id="apellido"
                                name="apellido"
                                value={formData.apellido}
                                onChange={handleChange} required />
                        </div>
                        <div className="input-label">
                            <label >Correo Electronico</label>
                            <input
                                type="email"
                                id="correo"
                                name="correo"
                                value={formData.correo}
                                onChange={handleChange} required />
                        </div>
                        <div className="input-label">
                            <label >Telefono</label>
                            <input
                                type="text"
                                id="numero"
                                name="numero"
                                value={formData.numero}
                                onChange={handleChange} required />
                        </div>
                        <div className="input-label">
                            <label >Usuario</label>
                            <input
                                type="text"
                                id="usuario"
                                name="usuario"
                                value={formData.usuario}
                                onChange={handleChange} required />
                        </div>
                        <div className="input-label">
                            <label >Contraseña</label>
                            <input
                                type="password"
                                id="contraseña"
                                name="contraseña"
                                value={formData.contraseña}
                                onChange={handleChange} required
                            />
                            {passwordError && <div className='errore'> {passwordError}</div>}
                        </div>
                        <div className="input-label">
                            <label >Confirmar Contraseña</label>
                            <input
                                type="password"
                                id="confirmarContraseña"
                                name="confirmarContraseña"
                                value={formData.confirmarContraseña}
                                onChange={handleChange} required
                            />
                            {confirmPasswordError && <div className='errore'> {confirmPasswordError}</div>}
                        </div>
                        <div className="input-label">
                            <label >Roles:</label><br />
                            <select
                                id="rol"
                                name="rol"
                                value={formData.rol}
                                onChange={handleChange} required
                            >
                                <option key="" value="">Seleccione el tipo</option>
                                <option value="USER">USER</option>
                                <option value="ADMIN">ADMIN</option>
                                <option value="SECRE">SECRE</option>
                            </select>
                        </div>
                        <div className="input-label">
                            <label>Dependencia:</label><br />
                            <select
                                id="dependencia"
                                name="dependencia"
                                value={formData.dependencia}
                                onChange={handleChange} required
                            >
                                <option key="" value="">Seleccione el tipo</option>
                                {dependenceTypes.map((type) => (
                                    <option key={type.idDependence} value={type.idDependence}>
                                        {type.nameDependence}
                                    </option>
                                ))}
                            </select>
                        </div>
                        <div className="Buton">
                            <button type="submit">Registrate</button>
                        </div>
                    </form>
                </div>
            </div>
            {showPopup && <Popup message={error} onClose={closePopup} />}
        </div>
    );
}

export default CrearUsuario;
