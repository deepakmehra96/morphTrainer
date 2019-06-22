import initialState from '../initialState'
import { OPEN_TOAST } from '../../actions/ActionTypes';

export default (state = initialState, action) => {
    switch (action.type) {
        case OPEN_TOAST:
            return { ...state, toast_msg: action.payload.toast_msg };
        default:
            return state;
    }
}