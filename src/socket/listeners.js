import socket from "../socket";
import {userConnected, userDisconnected} from "../actions/friend";
import store from '../store';
import {addFeed} from "../actions/post";

socket.on('user_connected', userId => {
    store.dispatch(userConnected(userId));
});

socket.on('friend_post', post => {
    store.dispatch(addFeed(post));
});

socket.on('disconnect', userId => {
    store.dispatch(userDisconnected(userId));
});