import {GET_ERRORS, POST_CREATED, POSTS_FETCHED} from './index';
import Api from '../Api';

export const createPost = (post) => dispatch => {
    Api.post('posts', {}, post)
        .then(response => {
            dispatch({
                type: POST_CREATED,
                payload: response.data
            });
        })
        .catch(e => {
            dispatch({
                type: GET_ERRORS,
                payload: {message: e.message, code: e.status}
            });
        });
};

export const fetchPosts = user => dispatch => {
    Api.get(`users/${user.id}/posts`).then(response => {
        dispatch({
            type: POSTS_FETCHED,
            payload: response.data
        });
    });
};
