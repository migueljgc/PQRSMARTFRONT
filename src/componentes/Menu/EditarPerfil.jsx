import React, { useEffect, useState } from 'react';
import { UserinfoUser } from '../Userinfo';
import { Menu } from '../Menu';
import Popup from '../Popup'
import axios from 'axios';
import './EditarPerfil.css'
import CambiarCorreo from '../../Menus/TablasCuadroVerModi/CambiarCorreo';

export const EditarPerfil = () => {
    const [show, setShow] = useState(false);
    const [showPopup, setShowPopup] = useState(false);
    const [selectedUser, setSelectedUser] = useState(null); // Estado para el usuario seleccionado
    const [error, setError] = useState('');
    const [user, setUser] = useState({
        id: '',
        user: '',
        name: '',
        lastName: '',
        email: '',
        identificationType: { idIdentificationType: '', nameIdentificationType: '' },
        identificationNumber: '',
        personType: { idPersonType: '', namePersonType: '' },
        dependence: { idDependence: '', nameDependence: '' }
    });

const fetchUserAndOptions = async () => {
            try {
                const token = localStorage.getItem('tokenPQRSMART');
                const headers = { 'Authorization': `Bearer ${token}` };

                // Fetch user data
                const userResponse = await axios.get('/api/auth/editar', { headers });
                setUser(userResponse.data);
                console.log(user)

            } catch (error) {
                console.error('Error fetching user data or options', error);
            }
        };
    useEffect(() => {
        

        fetchUserAndOptions();
    }, []);

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

    const handleChange = (e) => {
        const { name, value } = e.target;
        setUser(prevState => ({
            ...prevState,
            [name]: value
        }));
    };
    const handleSaveUser = async (updatedUser) => {
        // Aquí puedes hacer la lógica para guardar el usuario
        
        const update=updatedUser;
        console.log('Usuario guardado:', update);
        try {
            await axios.put(`http://localhost:8080/api/Usuario/Update-correo`,update);
            fetchUserAndOptions();
            setShowPopup(false)
            console.log('Usuario guardado:', updatedUser);
            setError('Usuario guardado, tome en cuenta que para seguir en la plataforma debe confirmar su correo.');
            setShow(true);
            fetchUserAndOptions(); // Actualiza la tabla con los datos modificados
        } catch (error) {
            console.error('Error al guardar el usuario: ', error);
            setError('Error al guardar el usuario');
            setShow(true);
        }
        
        
    };


    const handleEditUser = (user) => {
        setSelectedUser(user); // Establece el usuario seleccionado
        console.log(user)
        setShowPopup(true);    // Abre el popup
    };
    const closePopup = () => {
        setShow(false);
    };
    return (
        <div className='EditarPerfil'>

            <canvas id="gradient-canvas" style={{ width: '100vw', height: '100vh', position: 'absolute', zIndex: -1 }}></canvas>
            <div className="menus-editar">
                <Menu />
            </div>
            <div className="cuerpo-editar">
                <div className="form-editar">
                    <form className="solicitud-form-editar" >
                        <h1 className="title-editar">PERFIL</h1>
                        <div className="input-box-editar">
                            <label>Usuario:</label>
                            <input type="text" name="user" value={user.user} onChange={handleChange} disabled />
                        </div>
                        <div className="input-box-editar">
                            <label>Nombre:</label>
                            <input type="text" disabled name="name" value={user.name} onChange={handleChange} />
                        </div>
                        <div className="input-box-editar">
                            <label>Apellido:</label>
                            <input type="text" disabled name="lastName" value={user.lastName} onChange={handleChange} />
                        </div>
                        <div className="input-box-editar">
                            <label>Correo:</label>
                            <div className="input-box-editar-A">
                                <input type="email" disabled name="email" value={user.email} onChange={handleChange} />
                                <a onClick={() => handleEditUser(user)}>Editar</a>
                            </div>
                            
                        </div>
                        <div className="input-box-editar">
                            <label>Tipo de Persona:</label>
                            <input type="text" disabled name="personType" value={user.personType?.namePersonType} onChange={handleChange} />
                        </div>
                        <div className="input-box-editar">
                            <label>Tipo de Identificacion:</label>
                            <input type="text" disabled name="identificationType" value={user.identificationType?.nameIdentificationType} onChange={handleChange} />
                        </div>
                        <div className="input-box-editar">
                            <label>Numero de Identificacion:</label>
                            <input type="text" disabled name="identificationNumber" value={user.identificationNumber} onChange={handleChange} />
                        </div>

                    </form>
                </div>
            </div>
            {showPopup && (
                <CambiarCorreo
                    isOpen={showPopup}
                    onClose={() => setShowPopup(false)}
                    usuario={selectedUser}
                    onSave={handleSaveUser}
                />
            )}
            {show && <Popup message={error} onClose={closePopup} />}

        </div>
    );
}


