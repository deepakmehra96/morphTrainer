import axios from 'axios'
import { API_URL } from '../../components/constant';
import { OPEN_TOAST, SAVE_USER_DATA } from './ActionTypes';
import {AsyncStorage} from 'react-native'

export const openToast = data => {
    return {
        type: OPEN_TOAST,
        payload:data
    }
}
export const SaveUserData = data => {
    return {
        type: SAVE_USER_DATA,
        payload: data
    }
}

export const LoginApi = (data) => {
    return async dispatch => {
        // let token = await AsyncStorage.getItem('token')
        // var headers = {
        //     'Authorization': 'Bearer'+(' ')+token
        // }
        dispatch(SaveUserData(data))
        // return new Promise(
        //     (resolve, reject) => 
        //     axios.post(`${API_URL}/login/`, data)
        //     .then(res => {
        //         return resolve(res)
        //     })
        //     .catch((error) => {
        //         return reject(error.response)
        //     })
        // )
    }
}

export const SignUpApi = (data) => {
    return async dispatch => {
        // let token = await AsyncStorage.getItem('token')
        // var headers = {
        //     'Authorization': 'Bearer'+(' ')+token
        // }
        console.log(data,"SignUp data")
        // return new Promise(
        //     (resolve, reject) => 
        //     axios.post(`${API_URL}/login/`, data)
        //     .then(res => {
        //         return resolve(res)
        //     })
        //     .catch((error) => {
        //         return reject(error.response)
        //     })
        // )
    }
}

export const ActivationCodeApi = (data) => {
    return async dispatch => {
        // let token = await AsyncStorage.getItem('token')
        // var headers = {
        //     'Authorization': 'Bearer'+(' ')+token
        // }
        console.log(data,"Otp data")
        // return new Promise(
        //     (resolve, reject) => 
        //     axios.post(`${API_URL}/login/`, data)
        //     .then(res => {
        //         return resolve(res)
        //     })
        //     .catch((error) => {
        //         return reject(error.response)
        //     })
        // )
    }
}


// get API example

export const dummyGet = () => {
    return async dispatch => {
        let token = await AsyncStorage.getItem('token')
        var headers = {
            'Authorization': 'Bearer'+(' ')+token
        }
        return new Promise(
            (resolve, reject) => 
            axios.get(`${API_URL}/api/api`,{headers: headers})
            .then(async res => {
                return resolve(res)
            })
            .catch((error) => {
                return reject(error.message)
            })
        )
    }
}


// post API example

export const dummyPost = (data) => {
    return async dispatch => {
        let token = await AsyncStorage.getItem('token')
        var headers = {
            'Authorization': 'Bearer'+(' ')+token
        }
        return new Promise(
            (resolve, reject) => 
            axios.post(`${API_URL}/api/api/`, data, {headers: headers})
            .then(res => {
                return resolve(res)
            })
            .catch((error) => {
                return reject(error.response)
            })
        )
    }
}
