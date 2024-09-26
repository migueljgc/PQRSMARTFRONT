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
            const response = await axios.get('https://pqrsmart.onrender.com/api/dependence/get')
            setData(response.data);
            
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
           
            const selectedDependencia = data.find(type => type.idDependence === parseInt(formData.dependence));
            const categoryResponse = await axios.post('https://pqrsmart.onrender.com/api/category/save', {
                nameCategory: formData.category,
                dependence: { idDependence: selectedDependencia ? selectedDependencia.idDependence : null },
                state: {id: 1}
            });
           
            
            handleReset();
            setError('Categoria registrada correctamente')
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
        <div className='CrearCategoria'>
            <canvas id="gradient-canvas" style={{ width: '100vw', height: '100vh', position: 'absolute', zIndex: -1 }}></canvas>
            <div className="menus">
                <MenuAdmin />
            </div>
            <div className="cuerpos">
            <div className="headers">
                    <h1 className="title">CREAR CATEGORIA</h1>
                    <div className="user-menu">
                        <UserinfoAmin/>

                    </div>
                </div>
                <div className="form">
                    <form className="solicitud-form" onSubmit={handleSubmit}>
                        <div className="input-box">
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
                        <div className="input-box">
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

export default CrearCategoria;
