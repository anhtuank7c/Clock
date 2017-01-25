import ActionTypes from '../constant/ActionTypes';

export const choosingRingTone = ({ item }) => (dispatch) => {
    dispatch({
        type: ActionTypes.CHOOSING_RING_TONE,
        payload: item
    });
    // can do async stuff ie: download sound
    // then continue dispatching ;)
    dispatch({
        type: ActionTypes.PLAY_SOUND,
        payload: item
    });
};

export const changeRingTone = ({ ringTone }) => (dispatch) => {
    dispatch({
        type: ActionTypes.CHANGE_RING_TONE,
        payload: ringTone
    });
    dispatch({
        type: ActionTypes.PLAY_SOUND,
        payload: undefined
    });
};
