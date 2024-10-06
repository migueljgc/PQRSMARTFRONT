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
    const navigate = useNavigate();
    const [filterText, setFilterText] = useState(''); // Estado para el texto de búsqueda
    const [filteredData, setFilteredData] = useState([]); // Estado para los datos filtrados

    const fetchData = async () => {
        try {
            const response = await axios.get('https://pqrsmartback-production.up.railway.app/api/category/get')
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
    const handleCrear = () => {
        navigate('/CrearCategoria')
    }
    const handleCancel = async (idCategory) => {
        try {
            await axios.patch(`https://pqrsmartback-production.up.railway.app/api/category/cancel/${idCategory}`);
            // Actualizar la tabla después de cancelar la solicitud
            fetchData();
            setError('Categoria Desactivada.');
            setShowPopup(true); // Mostrar popup
            return;
        } catch (error) {
            console.error('Error al eliminar la dependencia: ', error);
            setError('Error al guardar información.');
            setShowPopup(true); // Mostrar popup
            return;
        }
    };
    useEffect(() => {
        const filtered = data.filter(item =>
            String(item.nameCategory).toLowerCase().includes(filterText.toLowerCase()) ||
            String(item.dependence.nameDependence).toLowerCase().includes(filterText.toLowerCase()) ||
            String(item.state.description).toLowerCase().includes(filterText.toLowerCase())

        );
        setFilteredData(filtered);
    }, [filterText, data]); // Se ejecuta cuando cambia filterText o data

    const columns = [
        {
            name: 'Categoria',
            selector: row => row.nameCategory
        },
        {
            name: 'Dependencia',
            selector: row => row.dependence.nameDependence
        },
        {
            name: 'Estado Categoria',
            selector: row => row.state.description || row.state
        },
        {
            name: 'Editar',
            cell: row => (
                <div className='accion'>
                    <div className="versoli">
                        <FaSearch />
                    </div>
                    <div className="eliminarsoli" onClick={() => handleCancel(row.idCategory)}>
                        <MdOutlineCancel />
                    </div>
                </div>
            )
        }

    ]

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

                <div className="formgestionCate">
                    <form className="gestionCate-form">
                        <h1 className="titlegestionCate">GESTION DE CATEGORIAS</h1>
                        <div className="busqueda">
                            <input type="text" placeholder='Buscar' value={filterText}
                                onChange={(e) => setFilterText(e.target.value)} // Actualiza el estado del texto de búsqueda
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
}

export default GestionCategoria;
