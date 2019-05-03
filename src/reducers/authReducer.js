import {AUTH_SET_USER, HTTP_ERROR} from '../actions';
import {bindAxiosJWT} from "../helpers/auth";

const user = localStorage.getItem('user');
const token = localStorage.getItem('jwt_token');

bindAxiosJWT(token);

const initialState = {
    isAuthenticated: !!user,
    user: user ? JSON.parse(user) : null
};

export default function (state = initialState, action) {
    switch (action.type) {
        case AUTH_SET_USER:
            return Object.assign({}, state, {
                isAuthenticated: !!action.payload,
                user: action.payload
            });

        case HTTP_ERROR:
            const status = action.payload.response.status;
            const isAuthenticated = status === 401 ? false : state.isAuthenticated;

            return Object.assign({}, state, {
                isAuthenticated: isAuthenticated,
                user: isAuthenticated ? state.user : null
            });

        default:
            return state;
    }
}
