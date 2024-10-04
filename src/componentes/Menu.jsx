
import React, { useEffect } from 'react';
import '../componentes/Menu.css'
import { useNavigate } from 'react-router-dom';
import { FaPenClip } from "react-icons/fa6";
import { FaMagnifyingGlass } from "react-icons/fa6";
import { ImExit } from "react-icons/im";
import { RxDashboard } from "react-icons/rx";
import { RiContactsBook2Line } from "react-icons/ri";
import { IoHomeOutline } from "react-icons/io5";
import Logo from "./Logo.jsx";


export const Menu = () => {
  const handleLogout = () => {
    localStorage.setItem('loggetPQRSMART', 'false');
    localStorage.setItem('tokenPQRSMART', '');
    localStorage.setItem('userPQRSMART', JSON.stringify(''));
  };
  useEffect(() => {
    const listElements = document.querySelectorAll('.list__button--click');

    listElements.forEach((listElement) => {
      listElement.addEventListener('click', () => {
        listElement.classList.toggle('arrow');

        let height = 0;
        const menu = listElement.nextElementSibling;
        if (menu.clientHeight === 0) {
          height = menu.scrollHeight;
        }

        menu.style.height = `${height}px`;
      });
    });

    // Cleanup function to remove event listeners when the component unmounts
    return () => {
      listElements.forEach((listElement) => {
        listElement.removeEventListener('click', () => { });
      });
    };
  }, []);
  return (
    <div>
      <nav className="nav">

        <ul className="list">
          <Logo />

          <li className="list__item">
            <div className="list__button">
              <img src="assets/dashboard.svg" className="list__img" />
              <a href="/HomePage" className="nav__link">Inicio</a>
            </div>
          </li>

          <li className="list__item">
            <div className="list__button">
              <FaPenClip />
              <a href="/Crear" className="nav__link">Crear PQRS</a>
            </div>
          </li>


          <li className="list__item">
            <div className="list__button">
              <FaMagnifyingGlass />
              <a href="/Consultar" className="nav__link">Consultar PQRS</a>
            </div>
          </li>

          <li className="list__item">
            <div className="list__button">
              <ImExit className='icon' />
              <a href="/Login" className="nav__link" onClick={handleLogout}>Salir</a>
            </div>
          </li>

        </ul>
      </nav>
    </div>
  );
}


export const MenuAdmin = () => {
  const navigate = useNavigate();
  const handleLogout = () => {
    localStorage.setItem('loggetPQRSMART', 'false');
    localStorage.setItem('tokenPQRSMART', '');
    localStorage.setItem('userPQRSMART', JSON.stringify(''));
    navigate('/Login');
  };
  useEffect(() => {
    const listElements = document.querySelectorAll('.list__button--click');

    listElements.forEach((listElement) => {
      listElement.addEventListener('click', () => {
        listElement.classList.toggle('arrow');

        let height = 0;
        const menu = listElement.nextElementSibling;
        if (menu.clientHeight === 0) {
          height = menu.scrollHeight;
        }

        menu.style.height = `${height}px`;
      });
    });

    // Cleanup function to remove event listeners when the component unmounts
    return () => {
      listElements.forEach((listElement) => {
        listElement.removeEventListener('click', () => { });
      });
    };
  }, []);
  return (
    <div>
      <nav className="nav">
        <ul className="list">
          <Logo />
          <li className="list__item">
            <div className="list__button">
              <img src="assets/dashboard.svg" className="list__img" />
              <a href="/HomePagesAdmin" className="nav__link">Inicio</a>
            </div>
          </li>
          <li className="list__item">
            <div className="list__button">
              <img src="assets/stats.svg" className="list__img" />
              <a href="/Dashboard" className="nav__link">Estadisticas</a>
            </div>
          </li>

          <li className="list__item list__item--click">
            <div className="list__button list__button--click">
              <RiContactsBook2Line />
              <a href="#" className="nav__link">Gestion Usuario</a>
              <img src="assets/arrow.svg" className="list__arrow" />
            </div>

            <ul className="list__show">
              <li className="list__inside">
                <a href="/VerUsuario" className="nav__link nav__link--inside">Ver Usuario</a>
              </li>

              <li className="list__inside">
                <a href="/CrearUsuario" className="nav__link nav__link--inside">Crear Usuario</a>
              </li>
            </ul>

          </li>

          <li className="list__item list__item--click">
            <div className="list__button list__button--click">
              <RxDashboard />
              <a href="#" className="nav__link">Gestion Categorias</a>
              <img src="assets/arrow.svg" className="list__arrow" />
            </div>

            <ul className="list__show">
              <li className="list__inside">
                <a href="/VerCategoria" className="nav__link nav__link--inside">Ver Categorias</a>
              </li>

              <li className="list__inside">
                <a href="/CrearCategoria" className="nav__link nav__link--inside">Crear Categorias</a>
              </li>
            </ul>

          </li>

          <li className="list__item list__item--click">
            <div className="list__button list__button--click">
              <IoHomeOutline />
              <a href="#" className="nav__link">Gestion Dependencias</a>
              <img src="assets/arrow.svg" className="list__arrow" />
            </div>

            <ul className="list__show">
              <li className="list__inside">
                <a href="/VerDependencia" className="nav__link nav__link--inside">Ver Dependencias</a>
              </li>

              <li className="list__inside">
                <a href="/CrearDependencias" className="nav__link nav__link--inside">Crear Dependencias</a>
              </li>
            </ul>

          </li>
          <li className="list__item">
            <div className="list__button">
              <ImExit className='icon' />
              <a href="/Login" className="nav__link" onClick={handleLogout}>Salir</a>
            </div>
          </li>



        </ul>
      </nav>
    </div>
  );
}


export const MenuSecre = () => {
  const navigate = useNavigate();
  const handleLogout = () => {
    localStorage.setItem('loggetPQRSMART', 'false');
    localStorage.setItem('tokenPQRSMART', '');
    localStorage.setItem('userPQRSMART', JSON.stringify(''));
    navigate('/Login');
  };
  useEffect(() => {
    const listElements = document.querySelectorAll('.list__button--click');

    listElements.forEach((listElement) => {
      listElement.addEventListener('click', () => {
        listElement.classList.toggle('arrow');

        let height = 0;
        const menu = listElement.nextElementSibling;
        if (menu.clientHeight === 0) {
          height = menu.scrollHeight;
        }

        menu.style.height = `${height}px`;
      });
    });

    // Cleanup function to remove event listeners when the component unmounts
    return () => {
      listElements.forEach((listElement) => {
        listElement.removeEventListener('click', () => { });
      });
    };
  }, []);
  return (
    <div>
      <nav className="nav">
        <ul className="list">
          <Logo />
          <li className="list__item">
            <div className="list__button">
              <img src="assets/dashboard.svg" className="list__img" />
              <a href="/HomePage" className="nav__link">Inicio</a>
            </div>
          </li>

          <li className="list__item">
            <div className="list__button">
              <FaPenClip />
              <a href="/GestionarPQRS" className="nav__link">Gestionar PQRS</a>
            </div>
          </li>

          <li className="list__item">
            <div className="list__button">
              <ImExit className='icon' />
              <a href="/Login" className="nav__link" onClick={handleLogout}>Salir</a>
            </div>
          </li>

        </ul>
      </nav>
    </div>
  );
}






