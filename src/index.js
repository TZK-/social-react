import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import 'bootstrap/dist/css/bootstrap.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import 'moment/locale/fr';
import 'moment-timezone';

import {library} from '@fortawesome/fontawesome-svg-core'
import {
    faBell,
    faCheck,
    faTimes,
    faPlus,
    faSearch,
    faUserFriends
} from '@fortawesome/free-solid-svg-icons';

import {Provider} from "react-redux";
import store from "./store";

library.add(faUserFriends);
library.add(faBell);
library.add(faSearch);
library.add(faPlus);
library.add(faCheck);
library.add(faTimes);

ReactDOM.render(<Provider store={store}><App/></Provider>, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
