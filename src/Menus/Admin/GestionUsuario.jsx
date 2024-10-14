import React, { useEffect, useState } from 'react';
import '../Admin/GestionUsuario.css';
import { MenuAdmin } from '../../componentes/Menu';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { UserinfoAmin } from '../../componentes/Userinfo';
import Popup from '../../componentes/Popup';

const GestionUsuario = () => {
    const [data, setData] = useState([]);
    const [showPopup, setShowPopup] = useState(false);
    const [error, setError] = useState('');
    const token = localStorage.getItem('token');
    const [filterText, setFilterText] = useState('');
    const [currentPage, setCurrentPage] = useState(0);
    const usuariosPorPagina = 6; // Cambia esto para ajustar cuántos usuarios mostrar por página

    useEffect(() => {
        const script = document.createElement('script');
        script.src = '/Gradient.js'; // Ruta directa al archivo en public
        script.async = true;
        document.body.appendChild(script);

        script.onload = () => {
            const gradient = new Gradient();
            gradient.initGradient('#gradient-canvas');
        };

        return () => {
            document.body.removeChild(script);
        };
    }, []);

    const fetchData = async () => {
        try {
            const response = await axios.get('https://pqrsmartback-production.up.railway.app/api/Usuario/get', {
                'Authorization': `Bearer ${token}`
            });
            setData(response.data);
        } catch (error) {
            console.error('Error en la data: ', error);
        }
    };

    const handleCancel = async (id) => {
        try {
            await axios.patch(`https://pqrsmartback-production-307d.up.railway.app/api/Usuario/cancel/${id}`);
            fetchData();
            setError('Usuario Bloqueado.');
            setShowPopup(true);
        } catch (error) {
            console.error('Error al desactivar el usuario: ', error);
            setError('Error al guardar información.');
            setShowPopup(true);
        }
    };
    const handleActivate = async (id) => {
        try {
            const response = await axios.patch(`https://pqrsmartback-production-307d.up.railway.app/api/Usuario/activate/${id}`,{}, {
                headers: {
                    'Authorization': `Bearer ${token}` // Verificar que se envíe correctamente el token
                }
            });
            console.log('Usuario activado', response.data);
            fetchData();
            setError('Usuario Activado.');
            setShowPopup(true);
        } catch (error) {
            console.error('Error al Activar el usuario: ', error);
            setError('Error al guardar información.');
            setShowPopup(true);
            
        }
    };

    useEffect(() => {
        document.title = "Gestionar Usuarios";
        fetchData();
    }, []);

    const filtered = data.filter(item =>
        String(item.user).toLowerCase().includes(filterText.toLowerCase()) ||
        String(item.name).toLowerCase().includes(filterText.toLowerCase()) ||
        String(item.lastName).toLowerCase().includes(filterText.toLowerCase()) ||
        String(item.identificationNumber).toLowerCase().includes(filterText.toLowerCase()) ||
        String(item.role).toLowerCase().includes(filterText.toLowerCase()) ||
        String(item.stateUser.state).toLowerCase().includes(filterText.toLowerCase())
    );

    const paginacion = filtered.slice(currentPage * usuariosPorPagina, (currentPage + 1) * usuariosPorPagina);

    const totalPaginas = Math.ceil(filtered.length / usuariosPorPagina);

    const closePopup = () => {
        setShowPopup(false);
    };

    return (
        <div className='GestionUsuario'>
            <canvas id="gradient-canvas" style={{ width: '100vw', height: '100vh', position: 'absolute', zIndex: -1 }}></canvas>
            <div className="menus">
                <MenuAdmin />
            </div>
            <div className="user-menu">
                <UserinfoAmin />
            </div>
            <div className="cuerpos">
                <div className="tabla-usuario">
                    <h2>Lista de Usuarios</h2>

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
                                <th onClick={() => ordenarPor('usuario')}>Usuario</th>
                                <th onClick={() => ordenarPor('nombre')}>Nombre</th>
                                <th onClick={() => ordenarPor('apellido')}>Apellido</th>
                                <th onClick={() => ordenarPor('identificacion')}>Identificación</th>
                                <th onClick={() => ordenarPor('rol')}>Rol</th>
                                <th onClick={() => ordenarPor('estado.state')}>Estado</th>
                                <th onClick={() => ordenarPor('accion')}>Accion</th>
                            </tr>
                        </thead>
                        <tbody>
                            {paginacion.length > 0 ? (
                                paginacion.map((user, index) => (
                                    <tr key={index}>
                                        <td>{user.user}</td>
                                        <td>{user.name}</td>
                                        <td>{user.lastName}</td>
                                        <td>{user.identificationNumber}</td>
                                        <td>{user.role}</td>
                                        <td>
                                            <span className={`estado ${user.stateUser?.state?.toLowerCase()}`}>
                                                {user.stateUser?.state === 'ACTIVO' ? '✔️' : '❌'}
                                            </span>
                                            {user.stateUser?.state}
                                        </td>
                                        <td>
                                            <span className='activar' onClick={() => handleActivate(user.id)}>
                                                {'✔️'}
                                            </span>
                                            <span onClick={() => handleCancel(user.id)}>
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
};

export default GestionUsuario;
