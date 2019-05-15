import {POST_COMMENTED, POST_CREATED, POSTS_FEED_ADDED, POSTS_FEED_FETCHED, POSTS_FETCHED} from '../actions';

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
                feed: [action.payload, ...feed]
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

        case POSTS_FEED_ADDED:
            return {
                ...state,
                feed: [action.payload, ...state.feed]
            };

        case POST_COMMENTED: {
            const feed = state.feed.find(post => post._id === action.payload.post);

            let newFeed = state.feed;
            if (feed) {
                newFeed = [
                    {
                        ...feed,
                        comments: [...feed.comments, action.payload]
                    },
                    ...state.feed.filter(post => post._id !== action.payload.post)
                ];
            }

            const post = state.posts.find(post => post._id === action.payload.post);
            let newPosts = state.posts;
            if(post) {
                newPosts = [
                    {
                        ...post,
                        comments: [...post.comments, action.payload]
                    },
                    ...state.posts.filter(post => post._id !== action.payload.post)
                ];
            }

            return {
                ...state,
                posts: newPosts,
                feed: newFeed
            };
        }

        default:
            return state;
    }
}
