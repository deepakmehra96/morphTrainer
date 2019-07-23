import initialState from '../initialState'
import { OPEN_TOAST, SAVE_USER_DATA } from '../../actions/ActionTypes';

export default (state = initialState, action) => {
    switch (action.type) {
        case OPEN_TOAST:
            return { ...state, toast_msg: action.payload };
        case SAVE_USER_DATA:
            return { ...state , userData : action.payload }
        default:
            return state;
    }
}