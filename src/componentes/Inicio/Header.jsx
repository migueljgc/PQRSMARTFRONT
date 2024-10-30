// Header.jsx
import React, { useEffect, useState } from 'react';
import './Header.css';
import { useNavigate } from 'react-router-dom';
import Modal from './Modal.jsx';
import { LuMenu } from 'react-icons/lu';
import { UserinfoUser } from '../Userinfo.jsx';

export function Header() {
    const [isModalOpen, setIsModalOpen] = useState(false);

    const handleOpenModal = () => setIsModalOpen(true);
    const handleCloseModal = () => setIsModalOpen(false);
    const navigate = useNavigate();

    return (
        <header className="header">
            <div className="logo">
                <img src="/images/PQRSmart-Logo.png" alt="PQRSmart Logo" />
            </div>
            <nav className="nav">
                <a href="#inicio" className="nav-link">Inicio</a>
                <a href="#que-es" className="nav-link">¿Que es?</a>
                <a href="#como-funciona" className="nav-link">Cómo Funciona</a>
                <a href="#crear-solicitud" className="nav-link" onClick={handleOpenModal}>Crear Solicitud</a>
                <a href="#contacto" className="nav-link">Contacto</a>
                <button className="header-login-btn" onClick={() => { navigate('/Login') }}>Iniciar Sesión</button>
            </nav>
            <Modal isOpen={isModalOpen} onClose={handleCloseModal} />
        </header>
    );
}
export function HeaderUser() {
    const [sidebarWidth, setSidebarWidth] = useState('4rem');
    const navigate = useNavigate();
    const handleLogout = () => {
        localStorage.setItem('loggetPQRSMART', 'false');
        localStorage.setItem('tokenPQRSMART', '');
        localStorage.setItem('userPQRSMART', JSON.stringify(''));
        navigate('/');
    };

    const toggleSidebar = () => {
        setSidebarWidth(sidebarWidth === '4rem' ? '300px' : '4rem');
    };
  
    return (
        <div className="HeaderUser">
            <header className='headerUser'>
                <div className="left">
                    <div className="Menu-container" onClick={toggleSidebar}>
                        <div className="Menus">
                            <LuMenu />

                        </div>
                    </div>
                    <div className="logo">
                        <img src="/images/PQRSmart-Logo.png" alt="PQRSmart Logo" />
                    </div>

                </div>
                <div className="right">
                    <UserinfoUser />
                </div>
            </header>
            <div className="sideBar" style={{ width: sidebarWidth }}>
                <nav>
                    <ul className="list">

                        <li className="list__item">
                            <img src="assets/dashboard.svg" className="list__img" onClick={() => navigate('/HomePage')} />
                            <a href="/HomePage" className="nav__link">Inicio</a>

                        </li>


                        <li className="list__item">
                            <img src="assets/pencil.svg" className="list__img" onClick={() => navigate('/Crear')} />
                            <a href="/Crear" className="nav__link">Crear PQRS</a>
                        </li>


                        <li className="list__item">
                            <img src="assets/lupa.svg" className="list__img" onClick={() => navigate('/Consultar')} />
                            <a href="/Consultar" className="nav__link">Consultar PQRS</a>

                        </li>

                        <li className="list__item">
                            <img src="assets/salir.svg" className="list__img" onClick={handleLogout} />
                            <a href="/" className="nav__link" onClick={handleLogout}>Salir</a>
                        </li>

                    </ul>

                </nav>
            </div>
        </div>
    )
}


