import {
    FRIEND_ACCEPTED, FRIEND_ADD, FRIEND_CONNECTED, FRIEND_DISCONNECTED, FRIEND_FETCHED, FRIEND_REMOVE,
    HTTP_ERROR
} from './index';

import Api from '../Api';

export const sendRequest = friend => dispatch => {
    Api.post(`friends/${friend._id}`)
        .then(response => {
            dispatch({
                type: FRIEND_ADD,
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

export const acceptRequest = request => dispatch => {
    Api.post(`friends/${request.friend._id}/accept`)
        .then(() => {
            dispatch({
                type: FRIEND_ACCEPTED,
                payload: request
            })
        })
        .catch(e => {
            dispatch({
                type: HTTP_ERROR,
                payload: e
            });
        })
};

export const denyRequest = user => dispatch => {
    Api.post(`friends/${user._id}/deny`)
        .then(() => {
            dispatch({
                type: FRIEND_REMOVE,
                payload: user
            })
        })
        .catch(e => {
            dispatch({
                type: HTTP_ERROR,
                payload: e
            });
        })
};

export const fetchFriends = () => dispatch => {
    Api.get('user/friends').then(response => {
        dispatch({
            type: FRIEND_FETCHED,
            payload: response.data
        })
    }).catch(e => {
        dispatch({
            type: HTTP_ERROR,
            payload: e
        });
    });
};

export const userConnected = userId => dispatch => {
    dispatch({
        type: FRIEND_CONNECTED,
        payload: userId
    });
};

export const userDisconnected = userId => dispatch => {
    dispatch({
        type: FRIEND_DISCONNECTED,
        payload: userId
    });
};
