import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { AppRouter } from '../router/AppRouter.jsx';
import { BrowserRouter as Router } from 'react-router-dom';
import '../router/AxiosConfig'
import '../src/main.css'
import TablaUsuarios from "./Menus/prueba/TablaUsuarios.jsx";

createRoot(document.getElementById('root')).render(
    <StrictMode>
            <Router>
                <TablaUsuarios />
            </Router>
    </StrictMode>,
)