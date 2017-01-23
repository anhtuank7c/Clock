import ActionTypes from '../constant/ActionTypes';

export const choosingRingTone = ({ item }) => {
    return (dispatch) => {
        dispatch({
            type: ActionTypes.CHOOSING_RING_TONE,
            payload: item
        });
        dispatch({
            type: ActionTypes.PLAY_SOUND,
            payload: item
        });
    };
};

export const changeRingTone = ({ ringTone }) => {
    return (dispatch) => {
        dispatch({
            type: ActionTypes.CHANGE_RING_TONE,
            payload: ringTone
        });
        dispatch({
            type: ActionTypes.PLAY_SOUND,
            payload: undefined
        });
    };
};
