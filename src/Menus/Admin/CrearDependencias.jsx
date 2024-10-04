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
            const response = await axios.get('https://pqrsmartback-production.up.railway.app/api/dependence/get')
            setData(response.data);
            console.log(response.data)
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
            console.log('Datos del formulario a enviar:', formData);
            const dependenceResponse = await axios.post('https://pqrsmartback-production.up.railway.app/api/dependence/save', {
                nameDependence: formData.dependence,
                state: { id: 1 }

            });
            handleReset();
            fetchData();
            setError('Dependencia registrada correctamente.');
            setShowPopup(true); // Mostrar popup
            return;

        }
        catch (error) {
            console.error('Error al guardar información:', error);
            setError('Error al guardar información.');
            setShowPopup(true); // Mostrar popup
            return;
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
            <div className="user-menu">
                <UserinfoAmin />

            </div>
            <div className="cuerpos-creardepe">

                <div className="form-creardepe">
                    <h1 className="title-creardepe">CREAR DEPENDENCIA</h1>

                    <div className="input-box-creardepe">
                        <label htmlFor="dependence">Dependencia:</label><br />
                        <input
                            type="text"
                            id="dependence"
                            name="dependence"
                            value={formData.dependence}
                            onChange={handleChange} required
                        />
                    </div>
                    <div className="btnCreardepe">
                        <button  onClick={handleSubmit}>Registrar</button>
                    </div>

                </div>
            </div>
            {showPopup && <Popup message={error} onClose={closePopup} />}
        </div>
    );
}

export default CrearDependencias;
