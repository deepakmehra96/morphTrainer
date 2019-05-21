import initialState from '../initialState'
import { SET_USER_DETAIL, OPEN_TOAST, SET_GOAL_LIST, GOAL_VISIBLE, DASHBOARD_DATA, SET_DASHBOARD_DATA, SET_MOMENT_DATE, SET_CUSTOMER_LIST, SET_USER, SET_NOTIFICATION, SET_WORKING_HOURS, SET_SLOTS, SET_DATA_SOURCE, SET_RIGHT_DATA_SOURCE, SET_DURATION_TYPE, SET_DURATION, SET_TICKET_DATA, SET_TICKET_CONVERSATION, SET_MESSAGE } from '../../actions/ActionTypes';

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
        case SET_CUSTOMER_LIST:
            return { ...state, customerList: action.payload };
        case SET_USER:
            return { ...state, userDetail: action.payload };
        case SET_NOTIFICATION:
            return { ...state, notification: action.payload };
        case SET_WORKING_HOURS:
            return { ...state, workingHours: action.payload };
        case SET_SLOTS:
            return { ...state, slots: action.payload };
        case SET_DATA_SOURCE:
            return { ...state, dataSource: action.payload };    
        case SET_RIGHT_DATA_SOURCE:
            return { ...state, rightDataSource: action.payload };  
        case SET_DURATION_TYPE:
            return { ...state, duration_type: action.payload }; 
        case SET_DURATION:
            return { ...state, duration: action.payload };
        case SET_TICKET_DATA:
            return { ...state, ticketData: action.payload };
        case SET_TICKET_CONVERSATION:
            return { ...state, ticketConversation: action.payload };
        case SET_MESSAGE:
            return { ...state, message: action.payload };

        default:
            return state;
    }
}