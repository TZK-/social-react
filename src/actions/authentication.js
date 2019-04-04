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

export const loginUser = (credentials) => dispatch => {
    Api.post('auth', {}, credentials)
        .then(response => {
            setAuthToken(response.data.token);

            dispatch({
                type: AUTH_SET_USER,
                payload: response.data.user,
            });
        })
        .catch(e => dispatch({
            type: GET_ERRORS,
            payload: e.response.data
        }));
};
