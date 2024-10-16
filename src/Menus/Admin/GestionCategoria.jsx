import React, { useEffect, useState } from 'react';
import '../Admin/GestionCategoria.css'
import axios from 'axios';
import { MenuAdmin } from '../../componentes/Menu';
import DataTable from 'react-data-table-component';
import { useNavigate } from 'react-router-dom';
import { UserinfoAmin } from '../../componentes/Userinfo';
import { FaSearch } from "react-icons/fa";
import { MdOutlineCancel } from "react-icons/md";
import Popup from '../../componentes/Popup'


const GestionCategoria = () => {
    const [data, setData] = useState([]);
    const [showPopup, setShowPopup] = useState(false);
    const [error, setError] = useState('');
    const [filterText, setFilterText] = useState(''); // Estado para el texto de búsqueda
    const [currentPage, setCurrentPage] = useState(0);
    const usuariosPorPagina = 12; // Cambia esto para ajustar cuántos usuarios mostrar por página


    const fetchData = async () => {
        try {
            const response = await axios.get('/api/category/get')
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
        document.title = "Gestion de Categorias"
        fetchData();
    }, []);
    const handleCancel = async (idCategory) => {
        try {
            await axios.patch(`/api/category/cancel/${idCategory}`);
            // Actualizar la tabla después de cancelar la solicitud
            fetchData();
            setError('Categoria Desactivada.');
            setShowPopup(true); // Mostrar popup
            return;
        } catch (error) {
            console.error('Error al eliminar la categoria: ', error);
            setError('Error al guardar información.');
            setShowPopup(true); // Mostrar popup
            return;
        }
    };
    const handleActivate = async (idCategory) => {
        try {
            await axios.patch(`https://pqrsmartback-production-307d.up.railway.app/api/category/activate/${idCategory}`);
            // Actualizar la tabla después de cancelar la solicitud
            fetchData();
            setError('Categoria Activada.');
            setShowPopup(true); // Mostrar popup
            return;
        } catch (error) {
            console.error('Error al eliminar la categoria: ', error);
            setError('Error al guardar información.');
            setShowPopup(true); // Mostrar popup
            return;
        }
    };
    const filtered = data.filter(item =>
        String(item.nameCategory).toLowerCase().includes(filterText.toLowerCase()) ||
        String(item.dependence.nameDependence).toLowerCase().includes(filterText.toLowerCase()) ||
        String(item.state.description).toLowerCase().includes(filterText.toLowerCase())

    );

    const paginacion = filtered.slice(currentPage * usuariosPorPagina, (currentPage + 1) * usuariosPorPagina);

    const totalPaginas = Math.ceil(filtered.length / usuariosPorPagina);

    const closePopup = () => {
        setShowPopup(false);
    };

    return (
        <div className='GestionCategoria'>
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
                                <th onClick={() => ordenarPor('categoria')}>Categoria</th>
                                <th onClick={() => ordenarPor('dependencia')}>Dependencia</th>
                                <th onClick={() => ordenarPor('estado.description')}>Estado</th>
                                <th onClick={() => ordenarPor('accion')}>Accion</th>
                            </tr>
                        </thead>
                        <tbody>
                            {paginacion.length > 0 ? (
                                paginacion.map((category, index) => (
                                    <tr key={index}>
                                        <td>{category.nameCategory}</td>
                                        <td>{category.dependence.nameDependence}</td>
                                        <td>
                                            <span className={`estado ${category.state?.description?.toLowerCase()}`}>
                                                {category.state?.description === 'ACTIVADO' ? '✔️' : '❌'}
                                            </span>
                                            {category.state?.description}
                                        </td>
                                        <td>
                                            <span className='activar' onClick={() => handleActivate(category.idCategory)}>
                                                {'✔️'}
                                            </span>
                                            <span onClick={() => handleCancel(category.idCategory)}>
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

export default GestionCategoria;
