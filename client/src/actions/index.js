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