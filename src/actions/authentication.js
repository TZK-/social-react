import {AUTH_SET_USER, GET_ERRORS} from './index';
import Api from '../Api';
import {setAuthToken} from "../helpers/auth";

export const registerUser = (user, history) => dispatch => {
    Api.post('users', {}, user)
        .then(() => history.push('/login'))
        .catch(e => dispatch({
            type: GET_ERRORS,
            payload: e.response.data
        }));
};

export const loginUser = (credentials, history) => dispatch => {
    Api.post('auth', {}, credentials)
        .then(response => {
            const {user, token} = response.data;

            setAuthToken(user, token);
            dispatch({
                type: AUTH_SET_USER,
                payload: response.data.user,
            });
            history.push('/');
        })
        .catch(e => dispatch({
            type: GET_ERRORS,
            payload: e.message
        }));
};

export const logoutUser = (history) => dispatch => {
    setAuthToken(null, null);

    dispatch({
        type: AUTH_SET_USER,
        payload: null,
    });

    history.push('/login');
};
