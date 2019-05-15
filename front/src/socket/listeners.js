import socket from "../socket";
import {addFriend, addNotification, removeFriend, userConnected, userDisconnected} from "../actions/friend";
import store from '../store';
import {addFeed} from "../actions/post";
import {addMessage} from "../actions/chat";

socket.on('user_connected', userId => {
    store.dispatch(userConnected(userId));
});

socket.on('friend_post', post => {
    store.dispatch(addFeed(post));
});

socket.on('friend_request', request => {
    store.dispatch(addNotification(request));
});

socket.on('friend_accepted', request => {
    store.dispatch(addFriend(request));
});

socket.on('friend_denied', request => {
    store.dispatch(removeFriend(request));
});

socket.on('message_posted', message => {
    store.dispatch(addMessage(message));
});

socket.on('disconnect', userId => {
    store.dispatch(userDisconnected(userId));
});