import React, { useEffect, useState } from 'react';
import '../Admin/Dashboard.css'
import { MenuAdmin } from '../../componentes/Menu';
import { UserinfoAmin } from '../../componentes/Userinfo';
import axios from 'axios';


const Dashboard = () => {
    const [pqrsData, setPqrsData] = useState([]);
    const [totalPQRS, setTotalPQRS] = useState(0);
    const [totalPQRSPorDependencia, setTotalPQRSPorDependencia] = useState({});
    const [totalPQRSmes, setTotalPQRSmes] = useState({});
    const [totalPQRSDepMes, setTotalPQRSDepMes] = useState({});
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
        // Obtener datos de la API
        const fetchData = async () => {
            try {
                const response = await axios.get('https://pqrsmartback-production.up.railway.app/api/request/get');
                const data = response.data;
                setPqrsData(data);
                console.log(pqrsData)

                // Calcular los totales
                calcularTotales(data);
            } catch (error) {
                console.error('Error fetching PQRS data:', error);
            }
        };

        fetchData();
    }, []);

    const calcularTotales = (data) => {
        // Total de PQRS
        setTotalPQRS(data.length);
        console.log(totalPQRSPorDependencia)
        // Total de PQRS por dependencia
        const dependenciaCount = data.reduce((acc, pqrs) => {
            const dependencia = pqrs.dependence?.nameDependence || 'Sin Dependencia';
            acc[dependencia] = (acc[dependencia] || 0) + 1;
            return acc;
        }, {});        
        setTotalPQRSPorDependencia(dependenciaCount);

        // Total de PQRS por mes
        const pqrsPorMes = data.reduce((acc, pqrs) => {
            const mes = new Date(pqrs.date).toLocaleString('default', { month: 'long', year: 'numeric' });
            acc[mes] = (acc[mes] || 0) + 1;
            return acc;
        }, {});
        
        setTotalPQRSmes(pqrsPorMes);

        // Total de PQRS por dependencia al mes
        const pqrsPorDepMes = data.reduce((acc, pqrs) => {
            const mes = new Date(pqrs.date).toLocaleString('default', { month: 'long', year: 'numeric' });
            const dependencia = pqrs.dependence?.nameDependence || 'Sin Dependencia';
            const key = `${dependencia} - ${mes}`;
            acc[key] = (acc[key] || 0) + 1;
            return acc;
        }, {});
        
        setTotalPQRSDepMes(pqrsPorDepMes);
    };
    return (
        <div className='Dashboard'>
            <canvas id="gradient-canvas" style={{ width: '100vw', height: '100vh', position: 'absolute', zIndex: -1 }}></canvas>
            <div className="menus">
                <MenuAdmin />
            </div>
            <div className="user-menu">
                <UserinfoAmin />
            </div>
            <div className="cuerpos">

                <div className="dashform">

                    <h1 className="titledash">DASHBOARD</h1>
                    <div className="total">
                        <div className="formdash">
                            <div className="totalprs">
                                <h1 className="">Total PQRS</h1>
                                {totalPQRS && <div className='pqrstotal'><p>{totalPQRS}</p> </div>}
                            </div>
                            {Object.keys(totalPQRSPorDependencia).length > 0 && (
                            <div className="totalpqrsdepe">
                                <h1>Total PQRS por Dependencia:</h1>
                                {Object.entries(totalPQRSPorDependencia).map(([dependencia, count]) => (
                                    <div className='pqrstotalPorDependencia' key={dependencia}>
                                        <p>{dependencia}: {count}</p>
                                    </div>
                                ))}
                            </div>
                        )}
                            {Object.keys(totalPQRSmes).length > 0 && (
                            <div className="totalpqrsmes">
                                <h1>PQRS Por Mes:</h1>
                                {Object.entries(totalPQRSmes).map(([mes, count]) => (
                                    <div className='pqrstotalpqrsmes' key={mes}>
                                        <p>{mes}: {count}</p>
                                    </div>
                                ))}
                            </div>
                        )}

                        {Object.keys(totalPQRSDepMes).length > 0 && (
                            <div className="totalpqrsdepemes">
                                <h1>PQRS Por Dependencia al Mes:</h1>
                                {Object.entries(totalPQRSDepMes).map(([key, count]) => (
                                    <div className='pqrstotalpqrsdepemes' key={key}>
                                        <p>{key}: {count}</p>
                                    </div>
                                ))}
                            </div>
                        )}
                        </div>
                    </div>
                </div>
            </div>

        </div>
    );
}

export default Dashboard;
