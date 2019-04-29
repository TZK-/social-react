import {combineReducers} from 'redux';
import errorReducer from "./errorReducer";
import authReducer from "./authReducer";
import postReducer from "./postReducer";
import toastReducer from "./toastReducer";

export default combineReducers({
    errors: errorReducer,
    auth: authReducer,
    post: postReducer,
    toasts: toastReducer
});
