import React, { useEffect, useState } from 'react';
import '../Secretario/GestionarPQRS.css'
import { MenuSecre } from '../../componentes/Menu';
import { UserinfoSecre } from '../../componentes/Userinfo';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import DataTable from 'react-data-table-component';
import Popup from '../../componentes/Popup'

const GestionarPQRS = () => {
    const [data, setData] = useState([]);
    const [selectedRow, setSelectedRow] = useState(null); // Cambiado para que sea null en lugar de un array
    const navigate = useNavigate();
    const [filterText, setFilterText] = useState(''); // Estado para el texto de búsqueda
    const [filteredData, setFilteredData] = useState([]); // Estado para los datos filtrados
    const [showPopup, setShowPopup] = useState(false);
    const [error, setError] = useState('');

    const fetchData = async () => {
        try {
            const response = await axios.get('https://pqrsmartback-production.up.railway.app/api/request/get');
            console.log(response)

            const token = localStorage.getItem('token');
            const response1 = await axios.get('https://pqrsmartback-production.up.railway.app/api/auth/editar', {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });
            const usuario = response1.data.dependence.idDependence
            console.log(usuario)
            if (usuario) {
                const filteredData = response.data.filter(item => item.dependence && item.dependence.idDependence === usuario); // Filtrar los datos por el usuario
                filteredData.forEach(item => {
                    item.date = new Date(item.date).toDateString();

                });
                setData(filteredData);
            } else {
                setData([]);
            }
        } catch (error) {
            console.error('Error en la data: ', error);
        }
    };



    useEffect(() => {
        document.title = "Gestion PQRS"
        fetchData();
    }, []);

    const handleRow = (row) => {
        setSelectedRow(row);
    };

    const handleResponderClick = async (e) => {
        e.preventDefault();
        console.log(selectedRow)
        if (selectedRow) {

            // Actualizar la solicitud de PQRS seleccionada
            const response = await axios.get('https://pqrsmartback-production.up.railway.app/api/request/get', selectedRow)

            navigate('/Responder', { state: { data: selectedRow } });
            setSelectedRow(null)

        } else {
            setError('Por favor seleccione una fila')
            setShowPopup(true); // Mostrar popup
            return;
        }
    };


    const conditionalRowStyles = [
        {
            when: row => row === selectedRow,
            style: {
                backgroundColor: '#5A93D9 !important',
                color: 'black !important',
                '&:hover': {
                    cursor: 'pointer'
                }
            }
            
        }
    ];
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

    // Filtrar datos cuando cambie el texto de búsqueda
    useEffect(() => {
        const filtered = data.filter(item =>
            String(item.category.nameCategory).toLowerCase().includes(filterText.toLowerCase()) ||
            String(item.description).toLowerCase().includes(filterText.toLowerCase()) ||
            String(item.date).toLowerCase().includes(filterText.toLowerCase()) ||
            String(item.requestType.nameRequestType).toLowerCase().includes(filterText.toLowerCase()) ||  // Convertir a string
            String(item.mediumAnswer).toLowerCase().includes(filterText.toLowerCase()) ||
            String(item.requestState.nameRequestState).toLowerCase().includes(filterText.toLowerCase())
        );
        setFilteredData(filtered);
    }, [filterText, data]); // Se ejecuta cuando cambia filterText o data


    // Definir las columnas de la tabla
    const columns = [
        {
            name: 'Categoria',
            selector: row => row.category.nameCategory
        },
        {
            name: 'Descripcion',
            selector: row => row.description
        },
        {
            name: 'Fecha',
            selector: row => row.date,
            sortable: true
        },
        {
            name: 'Tipo de Solicitud',
            selector: row => row.requestType.nameRequestType
        },
        {
            name: 'Medio de Respuesta',
            selector: row => row.mediumAnswer

        },
        {
            name: 'Estado',
            selector: row => row.requestState.nameRequestState
        },
        {
            name: 'Respuesta',
            selector: row => row.answer
        },


    ];

    const closePopup = () => {
        setShowPopup(false);
    };

    return (
        <div className='GestionarPQRS'>
            <canvas id="gradient-canvas" style={{ width: '100vw', height: '100vh', position: 'absolute', zIndex: -1 }}></canvas>
            <div className="menus">
                <MenuSecre />
            </div>
            <div className="user-menu">
                <UserinfoSecre />
            </div>
            <div className="cuerposgestionarpqrs">

                <div className="formgestionarpqrs">
                    <form className="solicitud-gestionarpqrs" onSubmit={handleResponderClick}>
                        <h1 className="titlegestionarpqrs">GESTIONAR PQRS</h1>
                        <div className="busqueda">
                            <input type="text" placeholder='Buscar'
                                value={filterText}
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
                            onRowClicked={handleRow}
                            conditionalRowStyles={conditionalRowStyles}
                        />

                        <div className="Btngestionarpqrs" >
                            <button disabled={selectedRow==null} >Responder</button>
                        </div>
                    </form>
                </div>
            </div>
            {showPopup && <Popup message={error} onClose={closePopup} />}
        </div>
    );
}

export default GestionarPQRS;
