import React, { useEffect, useState } from 'react';
import { MenuAdmin } from '../../componentes/Menu';
import '../Admin/GestionDependencia.css'
import axios from 'axios';
import { UserinfoAmin } from '../../componentes/Userinfo';
import Popup from '../../componentes/Popup'

const GestionDependencia = () => {
    const [data, setData] = useState([]);
    const [showPopup, setShowPopup] = useState(false);
    const [error, setError] = useState('');
    const [filterText, setFilterText] = useState(''); // Estado para el texto de búsqueda
    const [currentPage, setCurrentPage] = useState(0);
    const usuariosPorPagina = 6; // Cambia esto para ajustar cuántos usuarios mostrar por página



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
        document.title = "Gestion de Dependencias"
        fetchData();
    }, []);

    const handleCancel = async (idDependence) => {
        try {
            await axios.put(`https://pqrsmartback-production-307d.up.railway.app/api/dependence/cancel/${idDependence}`);
            // Actualizar la tabla después de cancelar la solicitud
            fetchData();
            setError('Dependencia Desactivada.');
            setShowPopup(true); // Mostrar popup
            return;
        } catch (error) {
            console.error('Error al eliminar la dependencia: ', error);
            setError('Error al guardar información.');
            setShowPopup(true); // Mostrar popup
            return;
        }
    };
    const handleActivate = async (idDependence) => {
        try {
            await axios.put(`https://pqrsmartback-production-307d.up.railway.app/api/dependence/activate/${idDependence}`);
            // Actualizar la tabla después de cancelar la solicitud
            fetchData();
            setError('Dependencia Activada.');
            setShowPopup(true); // Mostrar popup
            return;
        } catch (error) {
            console.error('Error al eliminar la dependencia: ', error);
            setError('Error al guardar información.');
            setShowPopup(true); // Mostrar popup
            return;
        }
    }; 
    const filtered = data.filter(item =>
            String(item.nameDependence).toLowerCase().includes(filterText.toLowerCase()) ||
            String(item.state.description).toLowerCase().includes(filterText.toLowerCase())

        );
        const paginacion = filtered.slice(currentPage * usuariosPorPagina, (currentPage + 1) * usuariosPorPagina);

        const totalPaginas = Math.ceil(filtered.length / usuariosPorPagina);
    

   
    const closePopup = () => {
        setShowPopup(false);
    };
    return (
        <div className='GestionDependencia'>
            <canvas id="gradient-canvas" style={{ width: '100vw', height: '100vh', position: 'absolute', zIndex: -1 }}></canvas>
            <div className="menus">
                <MenuAdmin />
            </div>
            <div className="user-menu">
                <UserinfoAmin />
            </div>
            <div className="cuerpos">
            <div className="tabla-usuario">
                    <h2>Lista de Categoria</h2>

                    <div className="buscador-usuario">
                        <input
                            type="text"
                            placeholder="Buscar en la tabla..."
                            value={filterText}
                            onChange={(e) => setFilterText(e.target.value)}
                            className="buscador"
                        />
                        <img src="src/images/search.svg" alt="Buscar" className="icono-busqueda" />
                    </div>

                    <table className="tabla-minimalista-usuario">
                        <thead>
                            <tr>
                                <th onClick={() => ordenarPor('dependencia')}>Dependencia</th>
                                <th onClick={() => ordenarPor('estado.description')}>Estado</th>
                                <th onClick={() => ordenarPor('accion')}>Accion</th>
                            </tr>
                        </thead>
                        <tbody>
                            {paginacion.length > 0 ? (
                                paginacion.map((dependence, index) => (
                                    <tr key={index}>
                                        <td>{dependence.nameDependence}</td>
                                        <td>
                                            <span className={`estado ${dependence.state?.description?.toLowerCase()}`}>
                                                {dependence.state?.description === 'ACTIVADO' ? '✔️' : '❌'}
                                            </span>
                                            {dependence.state?.description}
                                        </td>
                                        <td>
                                            <span className='activar' onClick={() => handleActivate(dependence.idDependence)}>
                                                {'✔️'}
                                            </span>
                                            <span onClick={() => handleCancel(dependence.idDependence)}>
                                                {'❌'}
                                            </span>
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan="6" style={{ textAlign: 'center' }}>No hay datos disponibles</td>
                                </tr>
                            )}
                        </tbody>
                    </table>

                    <div className="paginacion">
                        <button onClick={() => setCurrentPage(prev => Math.max(prev - 1, 0))} disabled={currentPage === 0}>
                            Anterior
                        </button>
                        <span>{currentPage + 1} de {totalPaginas}</span>
                        <button onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPaginas - 1))} disabled={currentPage >= totalPaginas - 1}>
                            Siguiente
                        </button>
                    </div>
                </div>
                
            </div>
            {showPopup && <Popup message={error} onClose={closePopup} />}
        </div>
    );
}

export default GestionDependencia;
