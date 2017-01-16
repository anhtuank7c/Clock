import ActionTypes from '../constant/ActionTypes';
import data from './list.json';

const INITIAL = {
    hourList: data.hourList,
    minuteList: data.minuteList,
    ringToneList: data.ringToneList,
    ringTone: data.ringTone,
    tmpRingTone: data.ringTone,
};

export default (state = INITIAL, action) => {
    switch (action.type) {
        case ActionTypes.CHANGE_RING_TONE:
            return { ...state, ringTone: action.payload, tmpRingTone: action.payload };
        case ActionTypes.CHOOSING_RING_TONE:
            return { ...state, tmpRingTone: action.payload };
        default:
            return state;
    }
};
