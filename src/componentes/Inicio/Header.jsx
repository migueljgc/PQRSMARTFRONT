// Header.jsx
import React from 'react';
import './Header.css';
import { useNavigate } from 'react-router-dom';

function Header() {
    const Navigate=useNavigate();
    return (
        <header className="header">
            <div className="logo">PQRS</div>
            <nav className="navs">
                <a href="#inicio" className="navs-link">Inicio</a>
                <a href="#como-funciona" className="navs-link">Cómo Funciona</a>
                <a href="#crear-solicitud" className="navs-link">Crear Solicitud</a>
                <a href="#contacto" className="navs-link">Contacto</a>
                <button className="header-login-btn" onClick={()=>{Navigate('/Login')}}>Iniciar Sesión</button>
            </nav>
        </header>
    );
}

export default Header;
