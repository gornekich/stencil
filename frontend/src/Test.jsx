import React from 'react';
import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { Provider } from 'react-redux';

import reducer from 'Reducers/CombineReducers';
import Header from 'Components/Header';
import ImageLoader from 'Components/ImageLoader';
import Back from 'Components/BackendTest';

const store = createStore(reducer, applyMiddleware(thunk));

const Test = () => (
  <Provider store={store}>
    {/*<Header title={'Stencil by nikigor!'} />*/}
    <Back />
  </Provider>
);

export default Test;
