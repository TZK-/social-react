import {TOAST_CREATE, TOAST_REMOVE} from '../actions';

const initialState = [];

export default function (state = initialState, action) {
    switch (action.type) {
        case TOAST_CREATE:
            return [...state, action.payload];

        case TOAST_REMOVE:
            return state.filter(toast => toast.id !== action.payload);

        default:
            return state;
    }
}
