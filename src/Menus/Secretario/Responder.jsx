import React, { useEffect, useState } from 'react';
import '../Secretario/Responder.css'
import axios from 'axios';
import Popup from '../../componentes/Popup'
import { useNavigate } from 'react-router-dom';

const Responder = ({ selectedRow, setEstado }) => {
    const [showPopup, setShowPopup] = useState(false);
    const [error, setError] = useState('');
    const [form, setForm] = useState(selectedRow);
    const token = localStorage.getItem('token')
    const [formData, setFormData] = useState({
        answer: '',
        requestState: { idRequestState: 2 }
    });

    const handleReset = () => {
        setFormData({
            answer: '',
        });
    };
    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    useEffect(() => {
        console.log(form.idRequest)
        console.log(form)
        document.title = "Responder PQRS"

    }, []);


    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.put(
                `https://pqrsmartback-production.up.railway.app/api/request/update/${form.idRequest}`,
                {
                    answer: formData.answer,
                    requestState: formData.requestState,
                },
                {
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${token}`,
                    },
                }
            );
            console.log('Response:', response.data);
            handleReset(); // limpiar el formulario

            setError('Envio Exitoso')
            setShowPopup(true); // Mostrar popup
            // Después de un breve retraso, recargar la página
            setTimeout(() => {
                window.location.reload(); // Recargar la página por completo
            }, 2000); // Ajusta el tiempo de retraso según lo que necesites

            return;
        } catch (error) {
            console.error('Error al actualizar el estado: ', error);
        }

    };


    const closePopup = () => {
        setShowPopup(false);
        setEstado(false)
    };
    return (
        <div className="modalResponder">
            <div className="modal-content-Responder">
                <form className="solicitud-form-Responder" onSubmit={handleSubmit}>
                    <div className="input-box-Responder">
                        <span className="close" onClick={() => setEstado(false)}>&times;</span>
                        <label className="titleResponder">Respueta:</label><br />
                        <textarea
                            name="answer"
                            id="answer"
                            rows="4"
                            cols="50"
                            value={formData.answer || ''}
                            onChange={handleChange}
                            required
                        ></textarea>
                    </div>

                    <div className="enviar">
                        <button type="submit">Enviar</button>

                    </div>

                </form>
            </div>
            {showPopup && <Popup message={error} onClose={closePopup} />}
        </div>
    );
}

export default Responder;
