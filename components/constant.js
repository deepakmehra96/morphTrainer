import { Platform } from 'react-native';

export const fontSmall = 10
export const fontMedium = 12
export const fontLarge = 14
export const fontXL = 16
export const fontXXL = 18
export const fontX3L = 20

export const errorColor = '#fc3f3f'
export const whiteColor = '#fff'


export const buttonBottom = Platform.OS  == 'ios' ? 20 : 30

export const buttonView = Platform.OS  == 'ios' ? 40 : 50

export const PlatformIos = () =>{
    return Platform.OS === 'ios'
}






