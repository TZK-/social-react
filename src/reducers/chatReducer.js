import {CHAT_CLOSED, CHAT_CONTENT_SET, CHAT_MESSAGE_POSTED, CHAT_MESSAGES_FETCHED, CHAT_OPENED} from '../actions';

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

        case CHAT_MESSAGE_POSTED:
            return {
                ...state,
                messages: [...state.messages, action.payload],
                content: ''
            };

        default:
            return state;
    }
}
