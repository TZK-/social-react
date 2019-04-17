import axios from 'axios';

export function setAuthToken(user, token) {
    bindAxiosJWT(token);
    if (token) {
        localStorage.setItem('jwt_token', token);
        localStorage.setItem('user', JSON.stringify(user));
    } else {
        localStorage.removeItem('jwt_token');
        localStorage.removeItem('user');
    }
}

export function bindAxiosJWT(token) {
    if (token) {
        axios.defaults.headers.common = {'Authorization': `Bearer ${token}`};
    } else {
        delete axios.defaults.headers.common['Authorization'];
    }
}
