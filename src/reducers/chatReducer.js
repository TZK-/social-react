import {CHAT_OPENED, CHAT_CLOSED} from '../actions';

const initialState = {
    isOpen: false,
    friend: null,
    messages: []
};

export default function (state = initialState, action) {
    switch (action.type) {
        case CHAT_OPENED:
            return {
                ...state,
                friend: action.payload,
                isOpen: true
            };

        case CHAT_CLOSED:
            return {
                ...state,
                friend: null,
                isOpen: false,
                messages: []
            };

        default:
            return state;
    }
}
