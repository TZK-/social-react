import {POST_CREATED, POSTS_FEED_FETCHED, POSTS_FETCHED} from '../actions';

const initialState = {
    posts: [],
    feed: []
};

export default function (state = initialState, action) {
    switch (action.type) {
        case POST_CREATED:
            const {posts, feed} = state;

            return {
                ...state,
                posts: [action.payload, ...posts],
                feed: [...action.payload, ...feed]
            };

        case POSTS_FETCHED:
            return {
                ...state,
                posts: action.payload
            };

        case POSTS_FEED_FETCHED:
            return {
                ...state,
                feed: action.payload
            };

        default:
            return state;
    }
}
