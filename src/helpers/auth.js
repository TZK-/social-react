import axios from 'axios';

export function setAuthToken(user, token) {
    if (token) {
        localStorage.setItem('jwt_token', token);
        localStorage.setItem('user', JSON.stringify(user));
        axios.defaults.headers.common = {'Authorization': `Bearer ${token}`};
    } else {
        localStorage.removeItem('jwt_token');
        localStorage.removeItem('user');
        delete axios.defaults.headers.common['Authorization'];
    }
}
