import React from 'react';
import { StyleSheet, Text, Dimensions } from 'react-native';
import { Button } from 'react-native-paper';
import { whiteColor } from '../constant';
var { height, width } = Dimensions.get('window')

const ButtonMain = props => {
    return (
        <Button {...props} style={[ props.isColored ?  styles.buttonColored : styles.buttonTransparent , props.buttonStyle]}>
            <Text
                style={styles.textColor}>
                {props.label}
            </Text>
        </Button>   
    )
}

export default ButtonMain;

const styles = StyleSheet.create({
    textColor:{ 
        color: whiteColor, 
        letterSpacing:3
    },
    buttonTransparent:{
        backgroundColor:"transparent",
        borderColor:whiteColor,
        borderWidth:1,
        borderRadius:20,
        width:width-80,
        height:40,
        justifyContent:'center'
    },
    buttonColored:{
        backgroundColor:"#520CC3",
        borderRadius:20,
        width:width-80
    }
});
