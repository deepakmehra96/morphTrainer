import initialState from '../initialState'
import { SET_USER_DETAIL, OPEN_TOAST, SET_GOAL_LIST, GOAL_VISIBLE, DASHBOARD_DATA, SET_DASHBOARD_DATA, SET_MOMENT_DATE } from '../../actions/ActionTypes';

export default (state = initialState, action) => {
    switch (action.type) {
        case SET_USER_DETAIL:
            return { ...state, user: action.payload.user };
        case OPEN_TOAST:
            return { ...state, toast_msg: action.payload.toast_msg };
        case SET_GOAL_LIST:
            return { ...state, goalList: action.payload };
        case GOAL_VISIBLE:
            return { ...state, goalVisible: action.payload };
        case DASHBOARD_DATA:
            return { ...state, dashboardData: action.payload };
        case SET_DASHBOARD_DATA:
            return { ...state, setDashboardData: action.payload };
        case SET_MOMENT_DATE:
            return { ...state, date: action.payload };
        default:
            return state;
    }
}