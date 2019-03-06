import axios from 'axios'
import { API_URL } from './constant';
import { SET_USER_DETAIL } from './ActionTypes';
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

export const editProfile = (data) => {
    return async dispatch  => {
        let token = await AsyncStorage.getItem('token')
        var headers = {
            'Authorization': 'Bearer'+(' ')+token
        }
        return new Promise(
            (resolve, reject) => 
            axios.post(`${API_URL}/editCoachProfile/`,data,{headers: headers})
            .then(res => {
                if(res.data.message === 'profile updated successfully'){
                    dispatch(setUserDetail(res.data.user))
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