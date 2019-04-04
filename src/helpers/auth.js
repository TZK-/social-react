import axios from 'axios';

export function setAuthToken(token) {
    if (token) {
        localStorage.setItem('jwt_token', token);
        axios.defaults.headers.common = {'Authorization': `Bearer ${token}`};
    } else {
        localStorage.removeItem('jwt_token');
        delete axios.defaults.headers.common['Authorization'];
    }
}
