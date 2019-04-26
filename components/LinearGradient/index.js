import React from 'react'
import { StyleSheet, Text, View, Image, Dimensions, TouchableOpacity } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';

class GradientBtn extends React.Component {
    constructor() {
        super()
    }
    render() {
        return (
            <LinearGradient colors={['#f7b944', '#f49a3e', '#ef6937']} style={[styles.linearGradient, this.props.style]}>
                <Text style={[styles.buttonText , this.props.btnStyle]}>
                    {this.props.text}
                </Text>
            </LinearGradient>
        )
    }
}
export default GradientBtn

const styles = StyleSheet.create({
    linearGradient: {
        width:'100%',
        borderRadius: 20,
        justifyContent:'center'
      },
      buttonText: {
        fontSize: 11,
        textAlign: 'center',
        color: '#ffffff',
        backgroundColor: 'transparent',
      },
});
