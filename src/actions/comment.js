import {HTTP_ERROR, POST_COMMENTED} from './index';

import Api from '../Api';

export const createComment = (post, content) => dispatch => {
    Api.post(`posts/${post._id}/comment`, {}, {content})
        .then(response => {
            console.log(response);
            dispatch({
                type: POST_COMMENTED,
                payload: response.data
            });
        })
        .catch(e => {
            console.log(e, "pk ?")
            dispatch({
                type: HTTP_ERROR,
                payload: e
            });
        });
};
