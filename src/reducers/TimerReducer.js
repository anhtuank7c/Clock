import ActionTypes from '../constant/ActionTypes';
import data from './timerData.json';

const INITIAL = {
    hourList: data.hourList,
    minuteList: data.minuteList,
    ringToneList: data.ringToneList,
    ringTone: data.ringTone,
    tmpRingTone: data.ringTone,
    playSound: undefined
};

export default (state = INITIAL, action) => {
    switch (action.type) {
        case ActionTypes.CHANGE_RING_TONE:
            return { ...state, ringTone: action.payload, tmpRingTone: action.payload };
        case ActionTypes.CHOOSING_RING_TONE:
            return { ...state, tmpRingTone: action.payload };
        case ActionTypes.PLAY_SOUND:
            return { ...state, playSound: action.payload };
        default:
            return state;
    }
};
