import {
    FRIEND_ACCEPTED, FRIEND_ADD, FRIEND_CONNECTED, FRIEND_DISCONNECTED, FRIEND_FETCHED,
    FRIEND_REMOVE
} from '../actions';

const initialState = {
    accepted: [],
    pending: []
};

export default function (state = initialState, action) {
    switch (action.type) {
        case FRIEND_FETCHED:
            return action.payload;

        case FRIEND_ADD:
            return {
                ...state,
                pending: [...state.pending, action.payload]
            };

        case FRIEND_REMOVE:
            return {
                ...state,
                pending: state.pending.filter(({friend}) => friend._id !== action.payload._id),
                accepted: state.accepted.filter(({friend}) => friend._id !== action.payload._id)
            };

        case FRIEND_ACCEPTED:
            return {
                ...state,
                pending: state.pending.filter(r => r._id !== action.payload._id),
                accepted: [...state.accepted, action.payload]
            };

        case FRIEND_CONNECTED: {
            const connectedUser = state.accepted.find(r => r.friend._id === action.payload);

            if (!connectedUser) {
                return state;
            }

            return {
                ...state,
                accepted: [
                    ...state.accepted.filter(r => r.friend._id !== action.payload),
                    {
                        ...connectedUser,
                        friend: {
                            ...connectedUser.friend,
                            connected: true
                        }
                    }
                ]
            };
        }

        case FRIEND_DISCONNECTED: {
            const connectedUser = state.accepted
                .filter(r => r.friend.connected)
                .find(r => r.friend._id === action.payload);

            if (!connectedUser) {
                return state;
            }

            return {
                ...state,
                accepted: [
                    ...state.accepted.filter(r => r.friend._id !== action.payload),
                    {
                        ...connectedUser,
                        friend: {
                            ...connectedUser.friend,
                            connected: false
                        }
                    }
                ]
            };
        }

        default:
            return state;
    }
}
