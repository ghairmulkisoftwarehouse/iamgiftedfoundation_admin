// utils/cookies.js
import Cookies from 'universal-cookie';

const cookies = new Cookies();



export const getToken = () => {
  return cookies.get('token'); 
};

export const hasToken = () => {
  return !!getToken();
};


export const removeToken = () => {
  cookies.remove('token', { path: '/' });
};


export const setToken = (token) => {
  cookies.set('token', token, {
    path: '/',
       secure: import.meta.env.MODE === 'production', 
    sameSite: 'strict',
  });
};