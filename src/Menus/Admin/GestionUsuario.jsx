import React, { useEffect, useState } from 'react';
import '../Admin/GestionUsuario.css';
import { MenuAdmin } from '../../componentes/Menu';
import DataTable from 'react-data-table-component';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { UserinfoAmin } from '../../componentes/Userinfo';
import { FaSearch } from "react-icons/fa";
import { MdOutlineCancel } from "react-icons/md";
import Popup from '../../componentes/Popup';

const GestionUsuario = () => {
    const [data, setData] = useState([]);
    const navigate = useNavigate();
    const [showPopup, setShowPopup] = useState(false);
    const [error, setError] = useState('');
    const token = localStorage.getItem('token');
    const [filterText, setFilterText] = useState('');
    const [filteredData, setFilteredData] = useState([]);

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

    const handleCrear = () => {
        navigate('/CrearUsuario');
    };

    const handleCancel = async (id) => {
        try {
            await axios.patch(`https://pqrsmartback-production.up.railway.app/api/Usuario/cancel/${id}`);
            fetchData();
            setError('Usuario Bloqueado.');
            setShowPopup(true);
        } catch (error) {
            console.error('Error al desactivar el usuario: ', error);
            setError('Error al guardar información.');
            setShowPopup(true);
        }
    };

    useEffect(() => {
        document.title = "Gestionar Usuarios";
        fetchData();
    }, []);

    useEffect(() => {
        const filtered = data.filter(item =>
            String(item.user).toLowerCase().includes(filterText.toLowerCase()) ||
            String(item.name).toLowerCase().includes(filterText.toLowerCase()) ||
            String(item.lastName).toLowerCase().includes(filterText.toLowerCase()) ||
            String(item.identificationNumber).toLowerCase().includes(filterText.toLowerCase()) ||
            String(item.role).toLowerCase().includes(filterText.toLowerCase()) ||
            String(item.stateUser.state).toLowerCase().includes(filterText.toLowerCase())
        );
        setFilteredData(filtered);
    }, [filterText, data]);

    const columns = [
        { name: 'Usuario', selector: row => row.user },
        { name: 'Nombre', selector: row => row.name },
        { name: 'Apellido', selector: row => row.lastName },
        { name: 'Identificacion', selector: row => row.identificationNumber },
        { name: 'Rol', selector: row => row.role },
        { name: 'Estado', selector: row => row.stateUser.state },
        {
            name: 'Acciones',
            cell: row => (
                <div className='acciones'>
                    <div className="icono-editar">
                        <FaSearch />
                    </div>
                    <div className="icono-eliminar" onClick={() => handleCancel(row.id)}>
                        <MdOutlineCancel />
                    </div>
                </div>
            )
        },
    ];

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
                <div className="formgestionUser">
                    <form className="gestionUser-form">
                        <h1 className="titlegestionUser">Usuarios Creados</h1>
                        <div className="busqueda">
                            <input
                                type="text"
                                placeholder='Buscar'
                                value={filterText}
                                onChange={(e) => setFilterText(e.target.value)}
                            />
                        </div>
                        <DataTable
                            className='dataTable-container'
                            columns={columns}
                            data={filteredData}
                            responsive
                            pagination
                            paginationPerPage={6}
                        />
                    </form>
                </div>
            </div>
            {showPopup && <Popup message={error} onClose={closePopup} />}
        </div>
    );
};

export default GestionUsuario;
