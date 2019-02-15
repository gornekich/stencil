import React from 'react';
import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { Provider } from 'react-redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import { Switch, Route } from 'react-router-dom';
import reducer from 'Reducers/CombineReducers';
import Upload from 'Components/Upload';

const store = createStore(reducer, composeWithDevTools(applyMiddleware(thunk)));

const Test = () => (
  <Provider store={store}>
      <Upload />
  </Provider>
);

export default Test;
