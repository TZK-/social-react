import {AUTH_SET_USER, EDIT_USER, HTTP_ERROR} from './index';
import Api from '../Api';
import {setAuthToken} from "../helpers/auth";

export const registerUser = (user, history) => dispatch => {
    Api.post('users', {}, user)
        .then(() => history.push('/login'))
        .catch(e => {
            dispatch({
                type: HTTP_ERROR,
                payload: e
            });
        });
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
        .catch(e => {
            dispatch({
                type: HTTP_ERROR,
                payload: e
            });
        });
};

export const logoutUser = (history) => dispatch => {
    setAuthToken(null, null);

    dispatch({
        type: AUTH_SET_USER,
        payload: null,
    });

    history.push('/login');
};

export const editUser = user => dispatch => {
   dispatch({
       type: EDIT_USER,
       payload: user
   })
};
