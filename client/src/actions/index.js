import streams from '../api/streams';
import history from '../history';
import * as actionType from './action.types';

export const signIn = (userId) => {
    return {
        type: actionType.SIGN_IN,
        payload: {
            userId
        }
    };
};

export const signOut = () => {
    return {
        type: actionType.SIGN_OUT
    };
};

export const createStream = (formValues) => {
    return async (dispatch, getState) => {
        const { userId } = getState().auth;
        const res = await streams.post('/streams', { ...formValues, userId });
        dispatch({
            type: actionType.CREATE_STREAM,
            payload: res.data
        })
        history.push('/');
    };
};

export const fetchStreams = () => {
    return async (dispatch) => {
        const res = await streams.get('/streams');
        dispatch({
            type: actionType.FETCH_STREAMS,
            payload: res.data
        })
    };
};

export const fetchStream = (id) => {
    return async (dispatch) => {
        const res = await streams.get(`/streams/${id}`);
        dispatch({
            type: actionType.FETCH_STREAM,
            payload: res.data
        })
    };
};

export const editStream = (id, formValues) => {
    return async (dispatch) => {
        const res = await streams.patch(`/streams/${id}`, formValues);
        dispatch({
            type: actionType.EDIT_STREAM,
            payload: res.data
        })
        history.push('/');
    };
};

export const deleteStream = (id) => {
    return async (dispatch) => {
        await streams.delete(`/streams/${id}`);
        dispatch({
            type: actionType.DELETE_STREAM,
            payload: id
        })
        history.push('/');
    };
};