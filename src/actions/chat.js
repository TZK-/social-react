import {CHAT_OPENED, CHAT_CLOSED} from './index';

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
