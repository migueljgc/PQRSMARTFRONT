import React, { useEffect, useState } from 'react';
import '../componentes/Menu.css'
import { useNavigate } from 'react-router-dom';
import { FaPenClip } from "react-icons/fa6";
import { FaMagnifyingGlass } from "react-icons/fa6";
import { ImExit, ImProfile } from "react-icons/im";
import { RxDashboard } from "react-icons/rx";
import { RiContactsBook2Line } from "react-icons/ri";
import { IoHomeOutline } from "react-icons/io5";
import Logo from "./Logo.jsx";
import { CgProfile } from 'react-icons/cg';
import { LuMenu } from 'react-icons/lu';


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
              <ImProfile />
              <a href="/EditarPerfil" className="nav__link">Perfil</a>
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
              <ImProfile />
              <a href="/EditarPerfil" className="nav__link">Perfil</a>
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


export const Menu = () => {
  const [sidebarWidth, setSidebarWidth] = useState('4rem');
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.setItem('loggetPQRSMART', 'false');
    localStorage.setItem('tokenPQRSMART', '');
    localStorage.setItem('userPQRSMART', JSON.stringify(''));
    navigate('/Login');
  };

  const toggleSidebar = () => {
    setSidebarWidth(sidebarWidth === '4rem' ? '300px' : '4rem');
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

    return () => {
      listElements.forEach((listElement) => {
        listElement.removeEventListener('click', () => { });
      });
    };
  }, []);

  return (
    <div className='menus'>
      <header>
        <div className="left">
          <div className="Menu-container" onClick={toggleSidebar}>
            <div className="Menus">
              <LuMenu />
            </div>
          </div>
        </div>
      </header>
      <div className="sideBar" style={{ width: sidebarWidth }}>
        <nav className="nav">

          <ul className="list">
          {sidebarWidth === '300px' && ( // Mostrar el logo solo si el ancho es 300px
              <li className="logo">
                <Logo />
              </li>
            )}


            <li className="list__item">
              <img src="assets/dashboard.svg" className="list__img" onClick={() => navigate('/HomePage')}/>
              <a href="/HomePage" className="nav__link">Inicio</a>

            </li>

            <li className="list__item">
              <img src="assets/perfil.svg" className="list__img" onClick={() => navigate('/perfil-user')}/>
              <a href="/perfil-user" className="nav__link">Perfil</a>

            </li>

            <li className="list__item">
              <img src="assets/pencil.svg" className="list__img" onClick={() => navigate('/Crear')}/>
              <a href="/Crear" className="nav__link">Crear PQRS</a>
            </li>


            <li className="list__item">
              <img src="assets/lupa.svg" className="list__img" onClick={() => navigate('/Consultar')}/>
              <a href="/Consultar" className="nav__link">Consultar PQRS</a>

            </li>

            <li className="list__item">
              <img src="assets/salir.svg" className="list__img" onClick={handleLogout}/>
              <a href="/Login" className="nav__link" onClick={handleLogout}>Salir</a>
            </li>

          </ul>
        </nav>
      </div>
    </div>
  );
};


