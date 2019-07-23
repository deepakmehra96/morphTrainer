import React from 'react';
import { StyleSheet, View, Image } from 'react-native';
import { MKTextField } from 'react-native-material-kit';
import { fontXL, whiteColor, fontLarge } from '../constant';

const TextBox = props => {
    return (
        <View>
            <MKTextField
                tintColor={whiteColor}
                highlightColor={whiteColor}
                textInputStyle={styles.textInput}
                style={styles.textField}
                floatingLabelEnabled={true}
                allowFontScaling={true}
                floatingLabelBottomMargin={32}
                floatingLabelFont={styles.label}
                placeholderTextColor={whiteColor}
                {...props}
            />
            <View style={[styles.iconStyle, props.iconStylesProps]}>
                <Image style={styles.imageMain} source={props.rightIcon} />
            </View>
        </View>
    )
}
export default TextBox;

const styles = StyleSheet.create({
    textField: {
        width: '100%',
    },
    label:{ 
        paddingLeft: 12, 
        fontSize: fontXL, 
        color: whiteColor,
    },
    textInput: {
        paddingLeft: 12,
        fontSize: fontLarge,
        color: whiteColor,
        paddingBottom: 10,
        paddingRight:50,

    },
    iconStyle:{
        height:16,
        width:13,
        position:'absolute',
        right:10,
        top:22
    },
    imageMain:{
        height:'100%',
        width:'100%'
    }

});
