import {HTTP_ERROR, POST_CREATED, POSTS_FEED_FETCHED, POSTS_FETCHED, POSTS_FEED_ADDED} from './index';

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

export const fetchFeed = user => dispatch => {
    Api.get(`users/${user.id}/feed`).then(response => {
        dispatch({
            type: POSTS_FEED_FETCHED,
            payload: response.data
        });
    }).catch(e => {
        dispatch({
            type: HTTP_ERROR,
            payload: e
        });
    });
};

export const addFeed = post => dispatch => {
    dispatch({
        type: POSTS_FEED_ADDED,
        payload: post
    });
};
