/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import firebase from 'firebase';
import ReduxThunk from 'redux-thunk';
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import reducers from './reducers';
//import LoginForm from './components/LoginForm'; I'll leave it for test purposes
import Router from './Router';

class App extends Component {
  componentWillMount() {
    const config = {
    apiKey: 'AIzaSyAIebEl4jkDnpOjXkM2uhSK6avjZtlxGM4',
    authDomain: 'manager-c7113.firebaseapp.com',
    databaseURL: 'https://manager-c7113.firebaseio.com',
    projectId: 'manager-c7113',
    storageBucket: 'manager-c7113.appspot.com',
    messagingSenderId: '92974696968'
  };
    firebase.initializeApp(config);
  }


  render() {
    const store = createStore(reducers, {}, applyMiddleware(ReduxThunk));

    return (
      <Provider store={store}>
        <Router />
      </Provider>
    );
  }
}


export default App;
