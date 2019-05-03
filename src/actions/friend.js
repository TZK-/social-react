import {FRIEND_ADD, HTTP_ERROR, FRIEND_REMOVE, FRIEND_FETCHED} from './index';
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

export const denyRequest = friend => dispatch => {
    Api.post(`friends/${friend._id}/deny`)
        .then(() => {
            dispatch({
                type: FRIEND_REMOVE,
                payload: friend
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
    })
};
