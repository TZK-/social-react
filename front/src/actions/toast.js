import {TOAST_CREATE, TOAST_REMOVE} from "./index";

let id = 0;

export const createToast = (title, message, color = 'success') => dispatch => {
    dispatch({
        type: TOAST_CREATE,
        payload: {
            title,
            message,
            color,
            id: id++
        }
    });
};

export const removeToast = toast => dispatch => {
    dispatch({
        type: TOAST_REMOVE,
        payload: toast.id
    });
};
