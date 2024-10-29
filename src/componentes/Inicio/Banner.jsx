// Banner.jsx
import React from 'react';
import './Banner.css';

function Banner() {
    return (
        <section className="banner" id='crear-solicitud'>
            <h1 className="banner-title">Bienvenido al Sistema PQRS</h1>
            <p className="banner-description">Comunicación eficaz para mejorar nuestros servicios.</p>
            <button className="primary-btn">Crear Solicitud</button>
        </section>
    );
}

export default Banner;
