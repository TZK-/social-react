import {FRIEND_ADD, FRIEND_ACCEPTED, FRIEND_FETCHED, FRIEND_REMOVE} from '../actions';

const initialState = {
    accepted: [],
    pending: []
};

export default function (state = initialState, action) {
    switch (action.type) {
        case FRIEND_FETCHED:
            return action.payload;

        case FRIEND_ADD:
            return Object.assign({}, state, {
                pending: [...state.pending, action.payload]
            });

        case FRIEND_REMOVE:
            return Object.assign({}, state, {
                pending: state.pending.filter(r => r.friend._id !== action.payload._id),
                accepted: state.accepted.filter(r => r.friend._id !== action.payload._id)
            });

        case FRIEND_ACCEPTED:
            return Object.assign({}, state, {
                pending: state.pending.filter(r => r._id !== action.payload._id),
                accepted: [...state.accepted, action.payload.accepted]
            });
        default:
            return state;
    }
}
