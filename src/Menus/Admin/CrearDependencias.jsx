import React, { useEffect, useState } from 'react';
import '../Admin/CrearDependencias.css'
import axios from 'axios';
import { MenuAdmin } from '../../componentes/Menu';
import { UserinfoAmin } from '../../componentes/Userinfo';
import Popup from '../../componentes/Popup'

const CrearDependencias = () => {
    const [data, setData] = useState([]);
    const [showPopup, setShowPopup] = useState(false);
    const [error, setError] = useState('');
    const [formData, setFormData] = useState({
        dependence: '',
    });

    const fetchData = async () => {
        try {
            const response = await axios.get('https://pqrsmart.onrender.com/api/dependence/get')
            setData(response.data);
        } catch (error) {
            console.error('Error en la data: ', error);
        }

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
        document.title = "Tipos de Dependencia"
        fetchData();
    }, []);
    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const handleReset = () => {
        setFormData({
            dependence: '',
        });
    }
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            
            const dependenceResponse = await axios.post('https://pqrsmart.onrender.com/api/dependence/save', {
                nameDependence: formData.dependence,
                state: {id: 1}

            });
            
            
            handleReset();
            fetchData();
            setError('dependencia registrada correctamente' )
            setShowPopup(true); // Mostrar popup
            return;

        }
        catch (error) {
            console.error('Error al guardar información:', error);
        }

    }
     const closePopup = () => {
        setShowPopup(false);
    };

    return (
        <div className='CrearDependencias'>
            <canvas id="gradient-canvas" style={{ width: '100vw', height: '100vh', position: 'absolute', zIndex: -1 }}></canvas>
            <div className="menus">
                <MenuAdmin />
            </div>
            <div className="cuerpos">
            <div className="headers">
                    <h1 className="title">CREAR DEPENDENCIA</h1>
                    <div className="user-menu">
                        <UserinfoAmin/>

                    </div>
                </div>
                <div className="form">
                    <form className="solicitud-form" onSubmit={handleSubmit}>
                        <div className="input-box1">
                            <label htmlFor="dependence">Dependencia:</label><br />
                            <input
                                type="text"
                                id="dependence"
                                name="dependence"
                                value={formData.dependence}
                                onChange={handleChange} required
                            />
                        </div>
                        <div>
                            <button className="btnCrearCat" type="submit">Registrar</button>
                        </div>
                    </form>
                </div>
            </div>
            {showPopup && <Popup message={error} onClose={closePopup} />}
        </div>
    );
}

export default CrearDependencias;
