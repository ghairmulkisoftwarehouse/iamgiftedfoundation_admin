// config/api.js
import axios from "axios";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { logout } from "../redux/actions/authActions";
import { getUser, removeUser } from "../utils/authLocalStorage";





// // adil server   http://192.168.18.188:4750
///  live  server http://54.162.89.235:4750'


export const baseURL = 'https://iamgfserver.devoptixtech.com';  
const Axios = axios.create({
   baseURL: `${baseURL}/api`,
  timeout: 10000,


});



// Add Authorization Header
Axios.interceptors.request.use(
    (config) => {
        if (!navigator.onLine) {
            return Promise.reject(new Error('No internet connection.'));
        }
        const user = getUser();
        if (user) {
            const token = user?.token;
            if (token) {
                config.headers['Authorization'] = `Bearer ${token}`;
            }
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);


export const useApi = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [isLoggingOut, setIsLoggingOut] = useState(false);  

    useEffect(() => {
        const interceptor = Axios.interceptors.response.use(
            (response) => response,
            (error) => {
                // Logout on unauthorized error
                if (error.response && error.response.status === 401 && !isLoggingOut) {
                    setIsLoggingOut(true);  // Set flag to true when logout starts

                    // Dispatch logout action
                    dispatch(logout(navigate, false)); 
                    removeUser();

                    // You can also add logic to prevent further requests during logout
                }
                return Promise.reject(error);
            }
        );

        return () => {
            // Clean up interceptor on unmount
            Axios.interceptors.response.eject(interceptor);
        };
    }, [dispatch, navigate, isLoggingOut]);

    return Axios;
};



export default Axios;












// config/api.js
// import axios from 'axios';

// export const baseURL = 'http://54.162.89.235:4750';  



// const Axios = axios.create({
//    baseURL: `${baseURL}/api`,
//   timeout: 10000,
//   withCredentials: true, // CRITICAL: This allows cookies to be sent/received
// });

// // Request interceptor
// Axios.interceptors.request.use(
//   (config) => {
//     // For cookie-based auth, token is automatically included by browser
//     // But we can still check if it exists
//     const token = getToken();
    
//     // You might want to add custom headers if needed
//     if (token && !config.headers['Authorization']) {
//       config.headers['Authorization'] = `Bearer ${token}`;
//     }
    
//     return config;
//   },
//   (error) => {
//     return Promise.reject(error);
//   }
// );

// // Response interceptor
// Axios.interceptors.response.use(
//   (response) => {
//     // Check if response has Set-Cookie header (token is set here)
//     if (response.headers['set-cookie']) {
//       // Token is automatically stored by browser
//       console.log('Cookie set by backend');
//     }
//     return response;
//   },
//   (error) => {
//     if (error.response?.status === 401) {
//       // Token expired or invalid
//       removeToken();
//       // Optional: Redirect to login
//       if (window.location.pathname !== '/auth/login') {
//         window.location.href = '/auth/login';
//       }
//     }
//     return Promise.reject(error);
//   }
// );

// export default Axios;