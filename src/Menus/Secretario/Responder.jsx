import React, { useEffect, useState } from 'react';
import '../Secretario/Responder.css'
import axios from 'axios';
import Popup from '../../componentes/Popup'
import { useNavigate } from 'react-router-dom';

const Responder = ({ pqrs, onRechazar, onSave, onClose, isOpen }) => {
    
    const [formData, setFormData] = useState({
        answer: pqrs.answer
    });
    const handleSave = () => {
        const updatedPqrs = {
            ...pqrs,
            answer: formData.answer,
            requestState: { idRequestState: 2 },
            idRequest: pqrs.idRequest,
        };
        onSave(updatedPqrs);
    };

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    useEffect(() => {
        document.title = "Responder PQRS"

    }, []);

    if (!isOpen) return null;

    return (
        <div className="modalResponder">
            <div className="modal-content-Responder">
                <label className="titleResponder">Respueta:</label>
                <div className="input-box-Responder">
                    <textarea
                        name="answer"
                        id="answer"
                        rows="4"
                        cols="50"
                        value={formData.answer || ''}
                        onChange={handleChange}

                    ></textarea>


                    <div className="enviar">
                        <button onClick={handleSave}>Enviar</button>
                        <button onClick={()=> onRechazar(pqrs.idRequest)}>Rechazar</button>
                        <button onClick={onClose}>Cancelar</button>
                    </div>

                </div>
            </div>
            
        </div>
    );
}

export default Responder;
