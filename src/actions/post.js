import {HTTP_ERROR, POST_CREATED, POSTS_FETCHED} from './index';
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
                type: HTTP_ERROR,
                payload: e
            });
        });
};

export const fetchPosts = user => dispatch => {
    Api.get(`users/${user.id}/posts`).then(response => {
        dispatch({
            type: POSTS_FETCHED,
            payload: response.data
        });
    }).catch(e => {
        dispatch({
            type: HTTP_ERROR,
            payload: e
        });
    });
};
