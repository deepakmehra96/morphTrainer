import moment from 'moment';
const userData ={}

const initialState = {
    userData,
    toast_msg: '',
    goalList: [],
    goalVisible: false,
    dashboardData: {},
    setDashboardData: false,
    date: moment().format('YYYY-MM-DD')
}

export default initialState;