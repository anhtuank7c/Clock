import { createStore, applyMiddleware } from 'redux';
import createLoggerMiddleware from 'redux-logger';
import thunkMiddleware from 'redux-thunk';

import reducers from './../reducers';

const middlewares = [thunkMiddleware];
if (__DEV__) {
    middlewares.push(createLoggerMiddleware({}));
}
const store = createStore(
    reducers,
    {},
    applyMiddleware(...middlewares)
);

export default store;
