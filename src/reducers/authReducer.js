import {AUTH_SET_USER, HTTP_ERROR, EDIT_USER} from '../actions';
import {bindAxiosJWT, setAuthToken} from "../helpers/auth";

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
            return {
                ...state,
                isAuthenticated: !!action.payload,
                user: action.payload
            };

        case HTTP_ERROR: {
            if (!action.payload.response) return state;

            const status = action.payload.response.status;
            const isAuthenticated = status === 401 ? false : state.isAuthenticated;

            return {
                ...state,
                isAuthenticated: isAuthenticated,
                user: isAuthenticated ? state.user : null
            };
        }

        case EDIT_USER:
            setAuthToken(action.payload, token);

            return {
                ...state,
                user: action.payload
            };

        default:
            return state;
    }
}
