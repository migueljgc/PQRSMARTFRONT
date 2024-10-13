import React, { useState } from 'react';
import './TablaUsuarios.css';

const TablaUsuarios = () => {
    const usuariosIniciales = [
        { usuario: 'jdoe', nombre: 'John', apellido: 'Doe', identificacion: '123456', rol: 'Admin', estado: 'Activo' },
        { usuario: 'mross', nombre: 'Marta', apellido: 'Ross', identificacion: '654321', rol: 'Usuario', estado: 'Inactivo' },
        { usuario: 'bsmith', nombre: 'Bob', apellido: 'Smith', identificacion: '987654', rol: 'Admin', estado: 'Activo' },
        { usuario: 'kwhite', nombre: 'Karen', apellido: 'White', identificacion: '987123', rol: 'Usuario', estado: 'Inactivo' },
        // Puedes agregar más usuarios para probar la paginación
    ];

    const [searchTerm, setSearchTerm] = useState('');
    const [currentPage, setCurrentPage] = useState(0);
    const usuariosPorPagina = 2; // Cambia esto para ajustar cuántos usuarios mostrar por página

    const usuariosFiltrados = usuariosIniciales.filter(usuario =>
        Object.values(usuario).some(val =>
            val.toString().toLowerCase().includes(searchTerm.toLowerCase())
        )
    );

    const paginacion = usuariosFiltrados.slice(currentPage * usuariosPorPagina, (currentPage + 1) * usuariosPorPagina);

    const totalPaginas = Math.ceil(usuariosFiltrados.length / usuariosPorPagina);

    return (
        <div className="tabla-container">
            <h2>Lista de Usuarios</h2>

            <div className="buscador-container">
                <input
                    type="text"
                    placeholder="Buscar en la tabla..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="buscador"
                />
                <img src="src/images/search.svg" alt="Buscar" className="icono-busqueda" />
            </div>

            <table className="tabla-minimalista">
                <thead>
                <tr>
                    <th onClick={() => ordenarPor('usuario')}>Usuario</th>
                    <th onClick={() => ordenarPor('nombre')}>Nombre</th>
                    <th onClick={() => ordenarPor('apellido')}>Apellido</th>
                    <th onClick={() => ordenarPor('identificacion')}>Identificación</th>
                    <th onClick={() => ordenarPor('rol')}>Rol</th>
                    <th onClick={() => ordenarPor('estado')}>Estado</th>
                </tr>
                </thead>
                <tbody>
                {paginacion.length > 0 ? (
                    paginacion.map((usuario, index) => (
                        <tr key={index}>
                            <td>{usuario.usuario}</td>
                            <td>{usuario.nombre}</td>
                            <td>{usuario.apellido}</td>
                            <td>{usuario.identificacion}</td>
                            <td>{usuario.rol}</td>
                            <td>
                                    <span className={`estado ${usuario.estado.toLowerCase()}`}>
                                        {usuario.estado === 'Activo' ? '✔️' : '❌'}
                                    </span>
                                {usuario.estado}
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
    );
};

const ordenarPor = (campo) => {
    // Lógica de ordenamiento (puedes implementarlo según tus necesidades)
};

export default TablaUsuarios;
