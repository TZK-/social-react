import {POST_CREATED, POSTS_FETCHED} from '../actions';

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
        case POSTS_FETCHED:
            return Object.assign({}, state, {
                posts: action.payload
            });
        default:
            return state;
    }
}
