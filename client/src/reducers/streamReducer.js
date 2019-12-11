import _ from 'lodash';
import * as actionType from '../actions/action.types';

export default (state = {}, action) => {
    switch(action.type) {
        case actionType.FETCH_STREAMS:
            return {...state, ..._.mapKeys(action.payload, 'id')};
        case actionType.FETCH_STREAM:
        case actionType.CREATE_STREAM:
        case actionType.EDIT_STREAM:
            return { ...state, [action.payload.id]: action.payload };
        case actionType.DELETE_STREAM:
            return _.omit(state, action.payload);
        default:
            return state;
    }
}