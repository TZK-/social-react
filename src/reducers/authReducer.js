import {AUTH_SET_USER, GET_ERRORS} from '../actions';

const initialState = {
    isAuthenticated: false,
    user: null
};

export default function (state = initialState, action) {
    switch (action.type) {
        case AUTH_SET_USER:
            return Object.assign({}, state, {
                isAuthenticated: true,
                user: action.payload.user
            });

        default:
            return state;
    }
}
