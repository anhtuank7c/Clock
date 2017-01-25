import { createStore, applyMiddleware } from 'redux';
import thunkMiddleware from 'redux-thunk';
import createLoggerMiddleware from 'redux-logger';

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
