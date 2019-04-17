import {POST_CREATED} from '../actions';

// TODO Find posts with API for the given user (include friend posts)
const initialState = {
    posts: []
};

export default function (state = initialState, action) {
    switch (action.type) {
        case POST_CREATED:
            const {posts} = state;

            return Object.assign({}, state, {
                posts: posts.unshift(action.payload)
            });
        default:
            return state;
    }
}
