import {combineReducers} from 'redux';
import errorReducer from "./errorReducer";
import authReducer from "./authReducer";
import postReducer from "./postReducer";
import toastReducer from "./toastReducer";
import friendReducer from "./friendReducer";
import chatReducer from "./chatReducer";
import {reducer as toastrReducer} from 'react-redux-toastr'

export default combineReducers({
    errors: errorReducer,
    auth: authReducer,
    post: postReducer,
    toasts: toastReducer,
    friends: friendReducer,
    chat: chatReducer,
    toastr: toastrReducer
});
