import React from 'react';
import ReactDOM from 'react-dom';
import {Provider} from 'react-redux';
import {createStore} from 'redux';
import {Router, Route, browserHistory} from 'react-router';
import * as serviceWorker from './serviceWorker';
import {firebaseApp} from './firebase';
import {logUser} from './actions';
import reducer from './reducers';
import App from './components/App';
import Signup from './components/Signup';
import Login from './components/Login';
const store = createStore(reducer);
firebaseApp.auth().onAuthStateChanged(user => {
    if(user) {
        console.log('user has signed in or up', user);
        const {email} = user;
        store.dispatch(logUser(email));
        browserHistory.push('/app');
    } else {
        console.log('user has signed out or still needs to sign in.');
        browserHistory.replace('/signin');
    }
})

ReactDOM.render(
    <Provider store={store}>
        <Router path='/' history={browserHistory}>
            <Route path="/app" component={App}/>
            <Route path="/signin" component={Login}/>
            <Route path="/signup" component={Signup}/>
        </Router>
    </Provider>
    , document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
