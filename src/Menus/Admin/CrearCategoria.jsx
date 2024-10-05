import React, { useEffect, useState } from 'react';
import '../Admin/CrearCategoria.css'
import axios from 'axios';
import { MenuAdmin } from '../../componentes/Menu';
import { UserinfoAmin } from '../../componentes/Userinfo';
import Popup from '../../componentes/Popup'

const CrearCategoria = () => {
    const [data, setData] = useState([]);
    const [showPopup, setShowPopup] = useState(false);
    const [error, setError] = useState('');
    const [formData, setFormData] = useState({
        category: '',
        dependence: '',
    });

    const fetchDependence = async () => {
        try {
            const response = await axios.get('https://pqrsmartback-production.up.railway.app/api/dependence/get')
            setData(response.data);
            console.log(response.data)
        } catch (error) {
            console.error('Error en la data: ', error);
        }

    };
    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

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
        document.title = "Crear Categoria"
        fetchDependence();
    }, []);

    const handleReset = () => {
        setFormData({
            category: '',
            dependence: '',
        });
    }
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            console.log('Datos del formulario a enviar:', formData);
            const selectedDependencia = data.find(type => type.idDependence === parseInt(formData.dependence));
            const categoryResponse = await axios.post('https://pqrsmartback-production.up.railway.app/api/category/save', {
                nameCategory: formData.category,
                dependence: { idDependence: selectedDependencia ? selectedDependencia.idDependence : null },
                state: { id: 1 }
            });
            console.log('Respuesta al guardar Categoria:', categoryResponse.data);
            console.log('Categoria registrada correctamente');
            alert('Categoria registrada correctamente')
            handleReset();


        }
        catch (error) {
            const status = error.response && error.response.status;
            // Manejo de errores
            if (status === 409) {
                setError("Error la categoria ya se encuentra registrada.");
            } 
            else{
                setError("Error en el servidor. Intente nuevamente más tarde.");
            }
            setShowPopup(true); // Mostrar popup
            return;
        }

    }
    const closePopup = () => {
        setShowPopup(false);
    };

    return (
        <div className='CrearCategoria'>
            <canvas id="gradient-canvas" style={{ width: '100vw', height: '100vh', position: 'absolute', zIndex: -1 }}></canvas>
            <div className="menus">
                <MenuAdmin />
            </div><div className="user-menu">
                <UserinfoAmin />

            </div>
            <div className="cuerpos-crearcat">
                <div className="form-crearcat">
                    <form onSubmit={handleSubmit}>
                        <h1 className="title-crearcat">CREAR CATEGORIA</h1>
                        <div className="input-box-crearcat">
                            <label className='category' htmlFor="category">Nombre De Categoria:</label><br />
                            <input
                                className='category'
                                type="category"
                                id="category"
                                name="category"
                                value={formData.category}
                                onChange={handleChange} required
                            />
                        </div>
                        <div className="input-box-crearcat">
                            <label htmlFor="dependence">Dependencia:</label><br />
                            <select
                                type="text"
                                id="dependence"
                                name="dependence"
                                value={formData.dependence}
                                onChange={handleChange} required
                            >
                                <option key="" value="">Seleccione el tipo</option>
                                {data.map((type) => (
                                    <option key={type.idDependence} value={type.idDependence}>
                                        {type.nameDependence}
                                    </option>
                                ))}
                            </select>
                        </div>
                        <div className="btnCrearCate" >
                            <button type='submit'>Registrar</button>
                        </div>
                    </form>
                </div>
            </div>
            {showPopup && <Popup message={error} onClose={closePopup} />}
        </div>
    );
}

export default CrearCategoria;
