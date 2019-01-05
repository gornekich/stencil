import React from 'react';
import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { Provider } from 'react-redux';
import { composeWithDevTools } from 'redux-devtools-extension';

import reducer from 'Reducers/CombineReducers';
import Header from 'Components/Header';
import ImageLoader from 'Components/ImageLoader';
import Button from 'Components/Button';
import Layout from 'Components/Upload/Layout';

const store = createStore(reducer, composeWithDevTools(applyMiddleware(thunk)));

const Test = () => (
  <Provider store={store}>
    <Layout />
  </Provider>
);

export default Test;
