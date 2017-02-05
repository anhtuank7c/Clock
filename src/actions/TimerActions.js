import { Actions } from 'react-native-router-flux';
import ActionTypes from '../constant/ActionTypes';

export default class TimerActions {
    static choosingRingTone = (item) => (dispatch) => {
        // I implement thunkMiddleware, so we can easy do async here
        dispatch({
            type: ActionTypes.CHOOSING_RING_TONE,
            payload: item
        });
    }

    static changeRingTone = (ringTone) => (dispatch) => {
        dispatch({
            type: ActionTypes.CHANGE_RING_TONE,
            payload: ringTone
        });
        Actions.timer();
    }

    static backToTimer = (ringTone) => (dispatch) => {
        dispatch({
            type: ActionTypes.CHANGE_RING_TONE,
            payload: ringTone
        });
        Actions.timer();
    }
}
