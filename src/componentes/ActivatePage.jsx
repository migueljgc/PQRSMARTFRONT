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
                const response = await axios.get(https://pqrsmart.onrender.com/api/auth/verify-email', {
                    params: { token }
                });
                if (response.status === 200) {
                    setError('Correo electrónico verificado correctamente.')
                    setShowPopup(true); // Mostrar popup
                    navigate('/');
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
const closePopup = () => {
    setShowPopup(false);
};
    return (
        <div>
            Verificando correo electrónico...
            {showPopup && <Popup message={error} onClose={closePopup} />}
        </div>
    );
};
