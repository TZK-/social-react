import {CHAT_OPENED, CHAT_CLOSED, HTTP_ERROR, CHAT_MESSAGES_FETCHED} from './index';
import Api from '../Api';

export const open = user => dispatch => {
    dispatch({
        type: CHAT_OPENED,
        payload: user
    });
};

export const close = user => dispatch => {
    dispatch({
        type: CHAT_CLOSED,
        payload: user
    });
};

export const fetch = friend => dispatch => {
    Api.get(`messages/${friend._id}`)
        .then(response => {
            dispatch({
                type: CHAT_MESSAGES_FETCHED,
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