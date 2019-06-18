import axios from 'axios'
import { API_URL, API_CHAT_URL } from './constant';
import { SET_USER_DETAIL, OPEN_TOAST, SET_GOAL_LIST, GOAL_VISIBLE, DASHBOARD_DATA, SET_DASHBOARD_DATA, SET_MOMENT_DATE, SET_CUSTOMER_LIST, SET_USER, SET_WORKING_HOURS, SET_NOTIFICATION, SET_SLOTS, SET_DATA_SOURCE, SET_RIGHT_DATA_SOURCE, SET_DURATION_TYPE, SET_DURATION, SET_TICKET_DATA, SET_TICKET_CONVERSATION, SET_APPOINTMENT_LIST, SET_CONVERSATION_DETAILS, SET_MESSAGE, SET_GRAPH_TYPE, SET_CALORIES_GRAPH_TYPE } from './ActionTypes';
import {AsyncStorage} from 'react-native'

export const coachLogin = (data) => {
    console.log(data,"data")
    return dispatch => {
        return new Promise(
            (resolve, reject) => 
            axios.post(`${API_URL}/coachLogin/`,data)
            .then(async res => {
                if(res.data.token){
                    await AsyncStorage.setItem('token', res.data.token)
                    await AsyncStorage.setItem('user', JSON.stringify(res.data.user))
                    dispatch(setUserDetail(res.data.user))
                }
                console.log(res,"resaction")
                return resolve(res)
            })
            .catch((error) => {
                console.log(error,"errorerror")
                return reject(error.response)
            })
        )
    }
}

export const forgotPassword = (data) => {
    return dispatch => {
        return new Promise(
            (resolve, reject) => 
            axios.post(`${API_URL}/forgetPassword/`,data)
            .then(res => {
                return resolve(res)
            })
            .catch((error) => {
                return reject(error.response)
            })
        )
    }
}

export const setUserDetail = data => {
    return {
        type: SET_USER_DETAIL,
        payload: {
            user: data
        }
    }
}

export const setUser = data => {
    return {
        type: SET_USER,
        payload: {
            userDetail: data
        }
    }
}

export const userDetail = (id) => {
    return async dispatch => {
        let token = await AsyncStorage.getItem('token')
        var headers = {
            'Authorization': 'Bearer'+(' ')+token
        }
        return new Promise(
            (resolve, reject) => 
            axios.get(`${API_URL}/user/${id}`,{headers: headers})
            .then(res => {
                return resolve(res)
            })
            .catch((error) => {
                return reject(error.message)
            })
        )
    }
}

export const changeStatus = (data) => {
    return async dispatch  => {
        let token = await AsyncStorage.getItem('token')
        var headers = {
            'Authorization': 'Bearer'+(' ')+token
        }
        return new Promise(
            (resolve, reject) => 
            axios.post(`${API_URL}/goal/changeStatus/`,data,{headers: headers})
            .then(res => {
                return resolve(res)
            })
            .catch((error) => {
                return reject(error.response)
            })
        )
    }
}

export const deleteGoal = (data) => {
    return async dispatch  => {
        let token = await AsyncStorage.getItem('token')
        var headers = {
            'Authorization': 'Bearer'+(' ')+token
        }
        return new Promise(
            (resolve, reject) => 
            axios.post(`${API_URL}/deleteGoal/`,data,{headers: headers})
            .then(res => {
                return resolve(res)
            })
            .catch((error) => {
                return reject(error.response)
            })
        )
    }
}

export const editProfile = (data) => {
    return async dispatch  => {
        let token = await AsyncStorage.getItem('token')
        var headers = {
            'Authorization': 'Bearer'+(' ')+token
        }
        return new Promise(
            (resolve, reject) => 
            axios.post(`${API_URL}/editCoachProfile/`,data,{headers: headers})
            .then(async res => {
                if(res.data.message === 'profile updated successfully'){
                    console.log(res,"editres123")
                    // dispatch(setUserDetail(res.data.user))
                }
                console.log(res,"actres")
                return resolve(res)
            })
            .catch((error) => {
                console.log({...error},"errorres")
                return reject(error.response)
            })
        )
    }
}

export const termsandconditions = () => {
    return dispatch => {
        return new Promise(
            (resolve, reject) => 
            axios.get(`${API_URL}/termsandconditions`)
            .then(res => {
                return resolve(res)
            })
            .catch((error) => {
                return reject(error.message)
            })
        )
    }
}
export const privacypolicy = () => {
    return dispatch => {
        return new Promise(
            (resolve, reject) => 
            axios.get(`${API_URL}/privacypolicy`)
            .then(res => {
                return resolve(res)
            })
            .catch((error) => {
                return reject(error.message)
            })
        )
    }
}

export const changePassword = (data) => {
    return async dispatch  => {
        let token = await AsyncStorage.getItem('token')
        var headers = {
            'Authorization': 'Bearer'+(' ')+token
        }
        return new Promise(
            (resolve, reject) => 
            axios.post(`${API_URL}/changePassword/`,data,{headers: headers})
            .then(res => {
                console.log(res,"actres")
                return resolve(res)
            })
            .catch((error) => {
                console.log({...error},"errorres")
                return reject(error.response)
            })
        )
    }
}

export const changeAvailability = (data) => {
    return async dispatch  => {
        let token = await AsyncStorage.getItem('token')
        var headers = {
            'Authorization': 'Bearer'+(' ')+token
        }
        return new Promise(
            (resolve, reject) => 
            axios.post(`${API_URL}/coach/changeAvailability/`,data,{headers: headers})
            .then(res => {
                console.log(res,"actres")
                return resolve(res)
            })
            .catch((error) => {
                console.log({...error},"errorres")
                return reject(error.response)
            })
        )
    }
}

export const questionList = () => {
    return dispatch => {
        return new Promise(
            (resolve, reject) => 
            axios.get(`${API_URL}/questions`)
            .then(res => {
                console.log(res,"apire")
                return resolve(res)
            })
            .catch((error) => {
                console.log({...error})
                return reject(error.message)
            })
        )
    }
}

export const getUserAnswers = (id) => {
    return async dispatch => {
        let token = await AsyncStorage.getItem('token')
        console.log(token,id)
        var headers = {
            'Authorization': 'Bearer'+(' ')+ token
        }
        return new Promise(
            (resolve, reject) => 
            axios.get(`${API_URL}/getUserAnswers/${id}`,{headers: headers})
            .then(async res => {
                return resolve(res)
            })
            .catch((error) => {
                return reject(error.message)
            })
        )
    }
}

export const getCustomerList = (id) => {
    return async dispatch => {
        let token = await AsyncStorage.getItem('token')
        var headers = {
            'Authorization': 'Bearer'+(' ')+token
        }
        return new Promise(
            (resolve, reject) => 
            axios.get(`${API_URL}/coach/customerList/${id}`,{headers: headers})
            .then(async res => {
                console.log(res,"121212")
                if(res.data.message === 'Customers List'){
                    dispatch(setCustomerList(res.data.data))
                }
                return resolve(res)
            })
            .catch((error) => {
                return reject(error.message)
            })
        )
    }
}

export const getUserDetails = (id) => {
    return async dispatch => {
        let token = await AsyncStorage.getItem('token')
        var headers = {
            'Authorization': 'Bearer'+(' ')+token
        }
        return new Promise(
            (resolve, reject) => 
            axios.get(`${API_URL}/getUserDetails/${id}`,{headers: headers})
            .then(async res => {
                console.log(res,"121212")
                if(res.data.message === 'User detail'){
                    console.log('hi pra')
                    await AsyncStorage.setItem('user', JSON.stringify(res.data.user))
                    dispatch(setUserDetail(res.data.user))
                }
                return resolve(res)
            })
            .catch((error) => {
                return reject(error.response)
            })
        )
    }
}

export const weightGraph = (data) => {
    return async dispatch => {
        let token = await AsyncStorage.getItem('token')
        console.log(token, "token")
        var headers = {
            'Authorization': 'Bearer' + (' ') + token
        }
        return new Promise(
            (resolve, reject) =>
                axios.post(`${API_URL}/weightGraph/`, data, { headers: headers })
                .then(res => {
                    return resolve(res)
                })
                .catch((error) => {
                    return reject(error.response)
                })
        )
    }
}

export const createTicket = (data) => {
    return async dispatch => {
        let token = await AsyncStorage.getItem('token')
        var headers = {
            'Authorization': 'Bearer'+(' ')+token
        }
        return new Promise(
            (resolve, reject) => 
            axios.post(`${API_URL}/createTicket/`, data, {headers: headers})
            .then(res => {
                return resolve(res)
            })
            .catch((error) => {
                return reject(error.response)
            })
        )
    }
}



export const ticketList = (id) => {
    return async dispatch => {
        let token = await AsyncStorage.getItem('token')
        var headers = {
            'Authorization': 'Bearer'+(' ')+token
        }
        return new Promise(
            (resolve, reject) => 
            axios.get(`${API_URL}/ticketList/${id}`, {headers: headers})
            .then(res => {
                console.log(res,"acres")
                if(res.data.message === 'ticket List'){
                    dispatch(setTicketData(res.data.data))
                }
                return resolve(res)
            })
            .catch((error) => {
                return reject(error.response)
            })
        )
    }
}

export const ticketReasonList = () => {
    return async dispatch => {
        let token = await AsyncStorage.getItem('token')
        var headers = {
            'Authorization': 'Bearer'+(' ')+token
        }
        return new Promise(
            (resolve, reject) => 
            axios.get(`${API_URL}/ticketReasonList/`, {headers: headers})
            .then(res => {
                return resolve(res)
            })
            .catch((error) => {
                return reject(error.response)
            })
        )
    }
}

export const ticketConversation = (id) => {
    return async dispatch => {
        let token = await AsyncStorage.getItem('token')
        var headers = {
            'Authorization': 'Bearer'+(' ')+token
        }
        return new Promise(
            (resolve, reject) => 
            axios.get(`${API_URL}/ticketConversation/${id}`,{headers: headers})
            .then(res => {
                if(res.data.message === 'ticket List'){
                    dispatch(setTicketConversation(res.data.data.conversation))
                }
                return resolve(res)
            })
            .catch((error) => {
                return reject(error.message)
            })
        )
    }
}

export const changeTicketStatus = (data) => {
    return async dispatch => {
        let token = await AsyncStorage.getItem('token')
        var headers = {
            'Authorization': 'Bearer'+(' ')+token
        }
        return new Promise(
            (resolve, reject) => 
            axios.post(`${API_URL}/changeTicketStatus/`, data, {headers: headers})
            .then(res => {
                return resolve(res)
            })
            .catch((error) => {
                return reject(error.response)
            })
        )
    }
}

export const sendTicketMessage = (data) => {
    return async dispatch => {
        let token = await AsyncStorage.getItem('token')
        var headers = {
            'Authorization': 'Bearer'+(' ')+token
        }
        return new Promise(
            (resolve, reject) => 
            axios.post(`${API_URL}/sendTicketMessage/`, data, {headers: headers})
            .then(res => {
                return resolve(res)
            })
            .catch((error) => {
                return reject(error.response)
            })
        )
    }
}


export const editImage = (data) => {
    console.log(data,"data")
    return async dispatch => {
        let token = await AsyncStorage.getItem('token')
        var headers = {
            'Authorization': 'Bearer'+(' ')+token
        }
        let fileName = data.image.filename.split('.')
        let lastElemnet = fileName.slice(-1)
        let formData = new FormData()
        formData.append('avatar', {
            name: lastElemnet[0],
            uri: data.image.uri,
            type: data.type, // or photo.type
        });
        console.log(formData,"formData")
        
        return new Promise(
            (resolve, reject) => 
            axios.post(`${API_URL}/editImage/`, formData, {headers: headers})
            .then(async res => {
                console.log(res,"editImageres")
                if(res.data.message === 'Image updated successfully'){
                    await AsyncStorage.setItem('user', JSON.stringify(res.data.user))
                    dispatch(setUserDetail(res.data.user))
                }
                return resolve(res)
            })
            .catch((error) => {
                return reject(error.response)
            })
        )
    }
}

export const getSettings = () => {
    return async dispatch => {
        let token = await AsyncStorage.getItem('token')
        var headers = {
            'Authorization': 'Bearer'+(' ')+token
        }
        return new Promise(
            (resolve, reject) => 
            axios.get(`${API_URL}/coach/settings`,{headers: headers})
            .then(async res => {
                console.log(res,"121212")
                if(res.data.message === 'Coach working hours'){
                    dispatch(setWorkinghours(res.data.data.WorkingHours))
                    dispatch(setNotification(res.data.data.notification))
                    dispatch(setSlots(res.data.data.slots))
                }
                return resolve(res)
            })
            .catch((error) => {
                return reject(error.message)
            })
        )
    }
}

export const getGoalList = () => {
    return dispatch => {
        return new Promise(
            (resolve, reject) => 
            axios.get(`${API_URL}/goallist`)
            .then(res => {
                if(res.data.data){
                    dispatch(setGoalList(res.data.data))
                }
                return resolve(res)
            })
            .catch((error) => {
                return reject(error.message)
            })
        )
    }
}

export const getDashboardData = (data) => {
    return async dispatch => {
        let token = await AsyncStorage.getItem('token')
        console.log(token,"token")
        var headers = {
            'Authorization': 'Bearer'+(' ')+token
        }
        return new Promise(
            (resolve, reject) => 
            axios.post(`${API_URL}/getDashboardData/`, data, {headers: headers})
            .then(res => {
                if(res.data.message === 'User dashboard details'){
                    dispatch(setDashboardData(res.data))
                }
                return resolve(res)
            })
            .catch((error) => {
                return reject(error.response)
            })
        )
    }
}

export const addUserGoal = (data) => {
    return async dispatch => {
        let token = await AsyncStorage.getItem('token')
        var headers = {
            'Authorization': 'Bearer'+(' ')+token
        }
        return new Promise(
            (resolve, reject) => 
            axios.post(`${API_URL}/addusergoals/`, data, {headers: headers})
            .then(res => {
                return resolve(res)
            })
            .catch((error) => {
                return reject(error.response)
            })
        )
    }
}

export const changeNotification = (data) => {
    return async dispatch => {
        let token = await AsyncStorage.getItem('token')
        var headers = {
            'Authorization': 'Bearer'+(' ')+token
        }
        return new Promise(
            (resolve, reject) => 
            axios.post(`${API_URL}/coach/changeNotification/`, data, {headers: headers})
            .then(res => {
                return resolve(res)
            })
            .catch((error) => {
                return reject(error.response)
            })
        )
    }
}

export const selectSlot = (data) => {
    return async dispatch => {
        let token = await AsyncStorage.getItem('token')
        var headers = {
            'Authorization': 'Bearer'+(' ')+token
        }
        return new Promise(
            (resolve, reject) => 
            axios.post(`${API_URL}/coach/selectSlot/`, data, {headers: headers})
            .then(res => {
                return resolve(res)
            })
            .catch((error) => {
                return reject(error.response)
            })
        )
    }
}

export const changeWorkingHours = (data) => {
    return async dispatch => {
        let token = await AsyncStorage.getItem('token')
        var headers = {
            'Authorization': 'Bearer'+(' ')+token
        }
        return new Promise(
            (resolve, reject) => 
            axios.post(`${API_URL}/coach/changeWorkingHours/`, data, {headers: headers})
            .then(res => {
                return resolve(res)
            })
            .catch((error) => {
                return reject(error.response)
            })
        )
    }
}

export const openToast = data => {
    return {
        type: OPEN_TOAST,
        payload: {
            toast_msg: data
        }
    }
}

export const setGoalList = data => {
    return {
        type: SET_GOAL_LIST,
        payload: data
    }
}

export const setGoalVisible = bool => {
    return {
        type: GOAL_VISIBLE,
        payload: bool
    }
}

export const setDashboardData = data => {
    return {
        type: DASHBOARD_DATA,
        payload: data
    }
}

export const setDashData = bool => {
    return {
        type: SET_DASHBOARD_DATA,
        payload: bool
    }
}

export const setMomentDate = data => {
    return {
        type: SET_MOMENT_DATE,
        payload: data
    }
}

export const setCustomerList = data => {
    return {
        type: SET_CUSTOMER_LIST,
        payload: data
    }
}

export const setNotification = bool => {
    return {
        type: SET_NOTIFICATION,
        payload: bool
    }
}

export const setWorkinghours = data => {
    return {
        type: SET_WORKING_HOURS,
        payload: data
    }
}

export const setSlots = data => {
    return {
        type: SET_SLOTS,
        payload: data
    }
}

export const setDataSource = data => {
    return {
        type: SET_DATA_SOURCE,
        payload: data
    }
}

export const setRightDataSource = data => {
    return {
        type: SET_RIGHT_DATA_SOURCE,
        payload: data
    }
}

export const setDurationType = data => {
    return {
        type: SET_DURATION_TYPE,
        payload: data
    }
}

export const setDuration = data => {
    return {
        type: SET_DURATION,
        payload: data
    }
}

export const setTicketData = data => {
    return {
        type: SET_TICKET_DATA,
        payload: data
    }
}

export const setTicketConversation = data => {
    return {
        type: SET_TICKET_CONVERSATION,
        payload: data
    }
}

export const setGraphType = data => {
    return {
        type: SET_GRAPH_TYPE,
        payload: data
    }
}

export const setApoointmentList = data => {
    return {
        type: SET_APPOINTMENT_LIST,
        payload: data
    }
}


export const getAppointmentList = (date) => {
    return  async dispatch => {
        let token = await AsyncStorage.getItem('token')
        var headers = {
            'Authorization': 'Bearer'+(' ')+token
        }
        return new Promise(
            (resolve, reject) => 
            axios.get(`${API_URL}/coachAppointments/${date}`,{headers: headers})
            .then(res => {
                if(res.data.data){
                    dispatch(setApoointmentList(res.data.data))
                }
                return resolve(res)
            })
            .catch((error) => {
                return reject(error.message)
            })
        )
    }
}

export const deleteAppointment = (data) => {
    return async dispatch => {
        let token = await AsyncStorage.getItem('token')
        var headers = {
            'Authorization': 'Bearer'+(' ')+token
        }
        return new Promise(
            (resolve, reject) => 
            axios.post(`${API_URL}/deleteAppointment/`,data, {headers: headers})
            .then(res => {
                return resolve(res)
           })
            .catch((error) => {
                return reject(error.response)
            })
        )
    }
}

export const setConverstation = (data) => {
    console.log(data,"data")
    return async dispatch => {
        return new Promise(
            (resolve, reject) => 
            axios.post(`${API_CHAT_URL}/new/`,data)
            .then(res => {
                console.log(res,"apires")
                return resolve(res)
           })
            .catch((error) => {
                console.log(error,"errres")
                return reject(error)
            })
        )
    }
}

// export const setConverstation = (conversation) => axios.post(`${API_CHAT_URL}/new`, conversation)

export const getConverstationById = (conversationId, userId) => axios.get(`${API_CHAT_URL}/conversations/${conversationId}/user/${userId}`)


export const setMessage = data => {
    return {
        type: SET_MESSAGE,
        payload: data
    }
}

export const setConversationDetails = data => {
    return {
        type: SET_CONVERSATION_DETAILS,
        payload: data
    }
}


export const setCaloriesGraphType = data => {
    return {
        type: SET_CALORIES_GRAPH_TYPE,
        payload: data
    }
}


export const caloriesGraph = (data) => {
    return async dispatch => {
        let token = await AsyncStorage.getItem('token')
        console.log(token, "token")
        var headers = {
            'Authorization': 'Bearer' + (' ') + token
        }
        return new Promise(
            (resolve, reject) =>
                axios.post(`${API_URL}/caloriesGraph/`, data, { headers: headers })
                .then(res => {
                    return resolve(res)
                })
                .catch((error) => {
                    return reject(error.response)
                })
        )
    }
}


