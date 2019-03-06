import initialState from '../initialState'
import { SET_USER_DETAIL } from '../../actions/ActionTypes';

export default (state = initialState, action) => {
    switch (action.type) {
        case SET_USER_DETAIL:
            return { ...state, user: action.payload.user };
        default:
            return state;
    }
}