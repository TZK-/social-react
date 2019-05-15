import {CHAT_CLOSED, CHAT_MESSAGE_POSTED, CHAT_MESSAGES_FETCHED, CHAT_OPENED} from '../actions';

const initialState = {
    isOpen: false,
    friend: null,
    messages: [],
    notifications: []
};

export default function (state = initialState, action) {
    switch (action.type) {
        case CHAT_OPENED:
            return {
                ...state,
                friend: action.payload,
                isOpen: true,
                notifications: state.notifications.filter(m => m.author._id !== action.payload._id)
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
            if (state.isOpen) {
                return {
                    ...state,
                    messages: [...state.messages, action.payload],
                    content: ''
                };
            }

            if (!state.notifications.find(m => m._id === action.payload.author._id)) {
                return {
                    ...state,
                    notifications: [...state.notifications, action.payload]
                };
            }

            return state;

        default:
            return state;
    }
}
