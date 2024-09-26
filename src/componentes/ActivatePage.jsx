import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import Popup from '../componentes/Popup'


export const ActivatePage = () => {
    const { token } = useParams();
    const navigate = useNavigate();
    const [showPopup, setShowPopup] = useState(false);
    const [error, setError] = useState('');

    useEffect(() => {
        const verifyEmail = async () => {
            try {
                const response = await axios.get('https://pqrsmart.onrender.com/api/auth/verify-email', {
                    params: { token }
                });
                if (response.status === 200) {
                    setError('Correo electrónico verificado correctamente.')
                    
                    setShowPopup(true); // Mostrar popup
                    if(showPopup===false){
                        navigate('/');
                    }
                    return;
                } else {
                    setError(`Error al verificar correo electrónico: ${response.data}`)
                    setShowPopup(true); // Mostrar popup
                    return;
                }
            } catch (error) {
                console.error('Error verifying email:', error);
                setError('Error al verificar correo electrónico.')
                setShowPopup(true); // Mostrar popup
                return;
            }
        };

        verifyEmail();
    }, [token]);
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
    const closePopup = () => {
        setShowPopup(false);
    };
    return (
        <div>
            <canvas id="gradient-canvas" style={{ width: '100vw', height: '100vh', position: 'absolute', zIndex: -1 }}></canvas>
            <div className="activate">
                <p style={{ color: 'white' }}>Verificando correo electrónico...</p>
            </div>
            {showPopup && <Popup message={error} onClose={closePopup} />}
        </div>
    );
};
