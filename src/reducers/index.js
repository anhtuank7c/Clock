import { combineReducers } from 'redux';

import TimerReducer from './TimerReducer';
import RouterReducer from './RouterReducer';

export default combineReducers({
    RouterReducer,
    timer: TimerReducer
});
