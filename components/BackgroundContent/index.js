import React from 'react';
import { View, TouchableOpacity, StyleSheet, Dimensions, ImageBackground, Keyboard, ScrollView, KeyboardAvoidingView, Platform } from 'react-native';
import { whiteColor, fontXXL } from '../constant';
var { height, width } = Dimensions.get('window')

const BackgroundContent = props => {
    return (
        <TouchableOpacity activeOpacity={1} onPress={() => Keyboard.dismiss()}>
            <ImageBackground source={require('../../assets/RectangleMain.png')} style={styles.fullScreen} >
            </ImageBackground>
        </TouchableOpacity>
    )
}
export default BackgroundContent

const styles = StyleSheet.create({
    fullScreen: {
        position: 'absolute',
        width: width,
        zIndex: -1,
        height: height,
        // paddingTop: 50
    },
})