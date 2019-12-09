import * as actionTypes from '../actions/action.types';

const INTIAL_STATE = {
    isSignedIn: null,
    userId: null
}

export default (state = INTIAL_STATE, action) => {
    switch(action.type) {
        case actionTypes.SIGN_IN:
            return { ...state, isSignedIn: true, userId: action.payload.userId };
        case actionTypes.SIGN_OUT:
            return { ...state, isSignedIn: false, userId: null };
        default:
            return state;
    }
}