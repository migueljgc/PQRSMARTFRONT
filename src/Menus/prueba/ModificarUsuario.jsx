import React, { useEffect, useState } from 'react';
import axios from 'axios'; // Asegúrate de que axios esté instalado
import './ModificarUsuario.css';

const ModificarUsuario = ({ isOpen, onClose, usuario, onSave, token }) => {
    const [nombre, setNombre] = useState(usuario?.name || '');
    const [apellido, setApellido] = useState(usuario?.lastName || '');
    const [correo, setCorreo] = useState(usuario?.email || '');
    const [password, setPassword] = useState('');
    const [rol, setRol] = useState(usuario?.role || '');
    const [estado, setEstado] = useState(usuario?.stateUser?.state || 'Activo');
    const [dependencia, setDependencia] = useState(usuario?.dependencia || '');
    const [dependencias, setDependencias] = useState([]);

    const handleSave = () => {
        const updatedUser = {
            ...usuario,
            name: nombre,
            lastName: apellido,
            email: correo,
            password: password || usuario.password,
            role: rol,
            stateUser: { state: estado },
            dependencia: dependencia
        };
        onSave(updatedUser);
    };

    // Obtener las dependencias desde el endpoint
    useEffect(() => {
        const fetchDependencias = async () => {
            try {
                const response = await axios.get('https://pqrsmartback-production.up.railway.app/api/dependence/get', {
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                });
                console.log(response.data); // Verifica la estructura de datos
                setDependencias(response.data); // Ajusta según la estructura de datos que devuelva el endpoint
            } catch (error) {
                console.error('Error al obtener dependencias:', error);
            }
        };

        if (rol === 'SECRE') {
            fetchDependencias();
        }
    }, [rol, token]); // Ejecutar cada vez que el rol o el token cambie

    // Filtrar las dependencias activas
    const dependenciasActivas = dependencias.filter(dep => dep.state.description === 'ACTIVADO');

    if (!isOpen) return null;

    return (
        <div className="modal-overlay">
            <div className="modal-content">
                <h3>Modificar Usuario</h3>
                <div className="modal-form">
                    <label>Nombre</label>
                    <input
                        type="text"
                        value={nombre}
                        onChange={(e) => setNombre(e.target.value)}
                    />

                    <label>Apellido</label>
                    <input
                        type="text"
                        value={apellido}
                        onChange={(e) => setApellido(e.target.value)}
                    />

                    <label>Correo Electrónico</label>
                    <input
                        type="email"
                        value={correo}
                        onChange={(e) => setCorreo(e.target.value)}
                    />

                    <label>Contraseña</label>
                    <input
                        type="password"
                        placeholder="Dejar en blanco para no cambiar"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />

                    <label>Rol</label>
                    <select value={rol} onChange={(e) => setRol(e.target.value)}>
                        <option value="Admin">Admin</option>
                        <option value="User">User</option>
                        <option value="SECRE">SECRE</option>
                    </select>

                    <label>Estado</label>
                    <select value={estado} onChange={(e) => setEstado(e.target.value)}>
                        <option value="Activo">Activo</option>
                        <option value="Inactivo">Inactivo</option>
                    </select>

                    {rol === 'SECRE' && (
                        <>
                            <label>Dependencia</label>
                            <select value={dependencia} onChange={(e) => setDependencia(e.target.value)}>
                                <option value="">Selecciona una dependencia</option>
                                {dependenciasActivas.map(dep => (
                                    <option key={dep.idDependence} value={dep.nameDependence}>
                                        {dep.nameDependence}
                                    </option>
                                ))}
                            </select>
                        </>
                    )}

                    <div className="modal-buttons">
                        <button onClick={handleSave}>Guardar</button>
                        <button onClick={onClose}>Cancelar</button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ModificarUsuario;