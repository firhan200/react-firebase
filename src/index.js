import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import firebase from 'firebase';
import store from './redux/store';
import { Provider } from 'react-redux';

/* Plugin */
import 'font-awesome/css/font-awesome.min.css';
import 'jquery';
import 'popper.js';
import 'bootstrap/dist/js/bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

/* Firebase */
var config = {
    apiKey: "AIzaSyBFFEz8tdmlNMfAqVHuKqv55V6JOUZ6zX4",
    authDomain: "privateproject-11df5.firebaseapp.com",
    databaseURL: "https://privateproject-11df5.firebaseio.com",
    projectId: "privateproject-11df5",
    storageBucket: "privateproject-11df5.appspot.com",
    messagingSenderId: "852198704904"
  };
firebase.initializeApp(config);
/* Firebase */

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>
  , document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
