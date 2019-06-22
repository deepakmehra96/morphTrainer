import axios from 'axios'
import { API_URL } from './constant';
import { OPEN_TOAST } from './ActionTypes';
import {AsyncStorage} from 'react-native'


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
                return resolve(res)
            })
            .catch((error) => {
                return reject(error.message)
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


