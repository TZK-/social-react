import {HTTP_ERROR} from '../actions';

const initialState = {};

export default function (state = initialState, action) {
    switch (action.type) {
        case HTTP_ERROR:
            return Object.assign({}, state, {
                errors: action.payload,
            });
        default:
            return state;
    }
}
