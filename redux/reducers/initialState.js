import moment from 'moment';
const userData ={}

const initialState = {
    userData,
    toast_msg: '',
    goalList: [],
    goalVisible: false,
    dashboardData: {},
    setDashboardData: false,
    date: moment().format('YYYY-MM-DD'),
    customerList: [],
    userDetail: {},
    notification: false,
    workingHours: [],
    slots: {},
    dataSource: [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31,32,33,34,35,36,37,38,39,40,41,42,43,44,45,46,47,48,49,50,51,52,53,54,55,56,57,58,59,60],
    rightDataSource: ["min","hour"],
    duration_type: 'min',
    duration: 1,
    ticketData: [],
    ticketConversation: [],
    converstionDetails:{},
    message:'',
    graphType: 'week',
    caloriesGraphType: 'week'
}

export default initialState;