// src/axiosConfig.js
import axios from 'axios';

// Configurar la URL base si es necesario
axios.defaults.baseURL = 'https://pqrsmartback-production-73f4.up.railway.app'; // Ajusta esto según tu configuración

// Interceptor de solicitudes para agregar el token JWT
axios.interceptors.request.use(
    config => {
        const token = localStorage.getItem('tokenPQRSMART');
        if (token) {
            config.headers['Authorization'] = 'Bearer ' + token;
        }
        return config;
    },
    error => {
        return Promise.reject(error);
    }
);

export default axios;