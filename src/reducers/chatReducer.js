import {CHAT_OPENED, CHAT_CLOSED, CHAT_MESSAGES_FETCHED} from '../actions';

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

        case CHAT_MESSAGES_FETCHED:
            return {
                ...state,
                messages: action.payload
            };

        default:
            return state;
    }
}
