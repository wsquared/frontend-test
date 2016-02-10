/// <reference path="../../typings/main.d.ts" />

import { createStore, applyMiddleware, combineReducers } from 'redux';
import counter from '../reducers/counterReducer';
import total from '../reducers/totalReducer';

const thunk = require('redux-thunk');
const rootReducer = combineReducers({
  counter, total
});

const finalCreateStore = applyMiddleware(thunk)(createStore);

export default () => {
  return finalCreateStore(rootReducer);
}
