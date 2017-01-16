import ActionTypes from '../constant/ActionTypes';

export const choosingRingTone = ({ item }) => {
    return {
        type: ActionTypes.CHOOSING_RING_TONE,
        payload: item
    };
};

export const changeRingTone = ({ ringTone }) => {
    return {
        type: ActionTypes.CHANGE_RING_TONE,
        payload: ringTone
    };
};
