import {CHAT_CLOSED, CHAT_MESSAGE_POSTED, CHAT_MESSAGES_FETCHED, CHAT_OPENED, HTTP_ERROR} from './index';
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

export const addMessage = message => dispatch => {
    dispatch({
        type: CHAT_MESSAGE_POSTED,
        payload: message
    })
};

export const postMessage = (recipient, content) => dispatch => {
    Api.post('messages/' + recipient._id, {}, {content})
        .then(response => {
            dispatch({
                type: CHAT_MESSAGE_POSTED,
                payload: response.data
            })
        })
        .catch(e => {
            dispatch({
                type: HTTP_ERROR,
                payload: e
            })
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