import { combineReducers } from 'redux';

import { colors } from './Colors';
import { app } from './App';

const reducer = combineReducers({
  colors,
  app
});

export default reducer;