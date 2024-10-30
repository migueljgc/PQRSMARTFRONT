import React, { useEffect, useState } from 'react';
import '../User/Consultar.css'
import { Menu } from '../../componentes/Menu';
import axios from 'axios';
import { UserinfoUser } from '../../componentes/Userinfo'
import Popup from '../../componentes/Popup';
import VerPqrs from '../TablasCuadroVerModi/VerPqrs';
import { HeaderUser } from '../../componentes/Inicio/Header';

const Consultar = () => {
    const [data, setData] = useState([]);
    const [filterText, setFilterText] = useState(''); // Estado para el texto de búsqueda
    const [currentPage, setCurrentPage] = useState(0);
    const usuariosPorPagina = 12;
    const [showPopup, setShowPopup] = useState(false);
    const [show, setShow] = useState(false);
    const [pqrs, setPqrs] = useState(false);
    const [error, setError] = useState('');



    const fetchData = async () => {
        try {
            const response = await axios.get('/api/request/get')
            setData(response.data);
            const usuario = localStorage.getItem('users');
            console.log(usuario)
            if (usuario) {
                const filteredData = response.data.filter(item => item.user && item.user.user === usuario); // Filtrar los datos por el usuario
                filteredData.forEach(item => {
                    item.date = new Date(item.date).toDateString();

                });
                setData(filteredData);
                console.log("filteredData  ", filteredData)
            } else {
                setData([]);
            }
            console.log(response.data);
            console.log("esta es la data ", data);
        } catch (error) {
            console.error('Error en la data: ', error);
        }

    };
    useEffect(() => {
        document.title = "Consultar PQRS"
        fetchData();
    }, []);

    const handleCancel = async (idRequest) => {
        try {
            await axios.put(`/api/request/cancel/${idRequest}`);
            // Actualizar la tabla después de cancelar la solicitud
            fetchData();
        } catch (error) {
            console.error('Error al cancelar la solicitud: ', error);
        }
    };

    // Filtrar datos cuando cambie el texto de búsqueda
    const filtered = data.filter(item =>
        String(item.radicado).toLowerCase().includes(filterText.toLowerCase())
    );
    const paginacion = filtered.slice(currentPage * usuariosPorPagina, (currentPage + 1) * usuariosPorPagina);

    const totalPaginas = Math.ceil(filtered.length / usuariosPorPagina);

    const closePopup = () => {
        setShowPopup(false);
    };
    
    const handleView = (pqrs) => {
        setPqrs(pqrs); // Establece el usuario seleccionado
        console.log(pqrs)
        setShow(true);    // Abre el popup
    };
    return (
        <div className='consultarPqrs'>

            <HeaderUser />
            
            <div className="cuerpo">
                <div className="tabla-usuario">
                    <h1 className="titleConsultar">CONSULTAR SOLICITUD</h1>
                    <div className="busqueda">
                        <label>Introduce Tu Numero De Radicado</label>
                        <input type="text"
                            value={filterText}
                            onChange={(e) => setFilterText(e.target.value)} // Actualiza el estado del texto de búsqueda
                        />
                        <img src="src/images/search.svg" alt="Buscar" className="icono-busqueda" />
                    </div>
                    <label className='nota' >Nota: Con La X Puede Cancelar Su Solicitud</label>
                    <table className="tabla-minimalista-usuario">
                        <thead>
                            <tr>
                                <th>Tipo de Solicitud</th>
                                <th>Fecha</th>
                                <th>Descripcion</th>
                                <th>Evidencia</th>
                                <th>Estado</th>
                                <th>Respuesta</th>
                                <th>Evidencia Respuesta</th>
                                <th>Accion</th>
                            </tr>
                        </thead>
                        <tbody>
                            {paginacion.length > 0 ? (
                                paginacion.map((pqrs, index) => (
                                    <tr key={index} >
                                        <td>{pqrs.requestType.nameRequestType}</td>
                                        <td>{pqrs.date}</td>
                                        <td>
                                            <div style={{ whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis', maxWidth: '150px' }}>
                                                {pqrs.description.length > 50 ? `${pqrs.description.slice(0, 50)}...` : pqrs.description}
                                            </div>
                                        </td>
                                        <td>
                                            <span>
                                                {pqrs.archivo ? (
                                                    <a href={`http://localhost:8080/api/request/download/${encodeURIComponent(pqrs.archivo.split('\\').pop())}`} download target="_blank" rel="noopener noreferrer">
                                                        <button className="btn-descargar">Descargar</button>
                                                    </a>
                                                ) : (
                                                    <div>
                                                        <span>No disponible</span>
                                                    </div>
                                                )
                                                }
                                            </span>

                                        </td>
                                        <td>
                                            <span className={`estado ${pqrs.requestState?.nameRequestState?.toLowerCase()}`}>
                                                {pqrs.requestState?.nameRequestState === 'Finalizado' ? '✔️' : pqrs.requestState?.nameRequestState === 'Pendiente' ? '🔎' : '❌'}

                                            </span>
                                            {pqrs.requestState?.nameRequestState}
                                        </td>
                                        <td>
                                            {/*<div style={{ whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis', maxWidth: '150px' }}>
                                                {pqrs.answer && pqrs.answer.length > 50
                                                    ? `${pqrs.answer.slice(0, 50)}...`
                                                    : pqrs.answer || ''}  {/* Si row.answer es null o undefined, mostramos 'No disponible' */}
                                            {/*</div>*/}
                                            <span>
                                                {pqrs.archivoAnswer ? (
                                                    <a href={`http://localhost:8080/api/request/download/${encodeURIComponent(pqrs.archivoAnswer.split('\\').pop())}`} download target="_blank" rel="noopener noreferrer">
                                                        <button className='btn-descargar'>Descargar</button>
                                                    </a>
                                                ) : (
                                                    <div>
                                                        <span>No disponible</span>
                                                        <span>No disponible</span>
                                                    </div>
                                                )
                                                }
                                            </span>
                                        </td>
                                        <td>
                                            <span>
                                                {pqrs.evidenceAnswer ? (
                                                    <a href={`http://localhost:8080/api/request/download/${encodeURIComponent(pqrs.evidenceAnswer.split('\\').pop())}`} download target="_blank" rel="noopener noreferrer">
                                                        <button className='btn-descargar'>Descargar</button>
                                                    </a>
                                                ) : (
                                                    <div>
                                                        <span>No disponible</span>
                                                    </div>
                                                )
                                                }
                                            </span>

                                        </td>

                                        <td>
                                        <span className='activar' onClick={() => handleView(pqrs)}>
                                                {'🔎'}
                                            </span>
                                            <span className='activar' onClick={() => handleCancel(user.idRequest)}>
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
            {show && (
                <VerPqrs
                    isOpen={show}
                    onClose={() => setShow(false)}
                    pqrs={pqrs}
                />
            )}
            {showPopup && <Popup message={error} onClose={closePopup} />}
        </div>
    );
}

export default Consultar;
