import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import Popup from '../componentes/Popup'


export const ActivatePage = () => {
    const { token } = useParams();
    const navigate = useNavigate();
    const [showPopup, setShowPopup] = useState(false);
    const [error, setError] = useState('');
    const [isLogged, setIsLogged] = useState('');
    const checkLoginStatus = () => {
        const logged = localStorage.getItem('loggetPQRSMART') === 'true';
        setIsLogged(logged);
        
        if (logged) {
            const userData = JSON.parse(localStorage.getItem('userPQRSMART'));
            if (userData) {
                const { role } = userData;
                if (role === 'ADMIN') {
                    navigate('/HomePagesAdmin');
                } else if (role === 'USER') {
                    navigate('/HomePage');
                } else if (role === 'SECRE') {
                    navigate('/HomePagesSecre');
                }
            }
        }

    };
    useEffect(() => {
        checkLoginStatus();
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
    if (isLogged) {
        return null; // o un spinner si quieres mostrar algo mientras se redirige
    }
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
