import {ERRORS_CLEAR} from './index';

export const clearErrors = () => dispatch => {
    dispatch({
        type: ERRORS_CLEAR,
        payload: null
    });
};
