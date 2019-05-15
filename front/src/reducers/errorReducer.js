import {ERRORS_CLEAR, HTTP_ERROR} from '../actions';

const initialState = [];

export default function (state = initialState, action) {
    switch (action.type) {
        case HTTP_ERROR:
            if (!action.payload.response) return [];

            const status = action.payload.response.status;
            if (status === 401) {
                return [];
            }

            return [
                action.payload.response.data.error
            ];

        case ERRORS_CLEAR:
            return initialState;

        default:
            return state;
    }
}
