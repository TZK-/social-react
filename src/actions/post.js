import {GET_ERRORS, POST_CREATED} from './index';
import Api from '../Api';

export const createPost = (post, user) => dispatch => {
    Api.post('posts', {}, user)
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
