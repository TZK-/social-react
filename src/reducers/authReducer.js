import {AUTH_SET_USER} from '../actions';

const user = localStorage.getItem('user');

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

        default:
            return state;
    }
}
