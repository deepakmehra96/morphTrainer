import React from 'react';
import { StyleSheet, Text, Platform, TouchableOpacity,Image } from 'react-native';

class DownButton extends React.Component {
    constructor() {
        super()
    }
    handleBtn(){
        if (Platform.OS === 'ios') {
            return styles.BtnOut
        } else {
            return styles.BtnOutAndroid
        }
    }
    render() {
        return (
            <TouchableOpacity onPress={this.props.onClickBtn} style={this.handleBtn()}>
                <Text style={styles.textMain}>{this.props.textMain}</Text>
                <Image style={styles.imageMain} source={require('../../assets/images/bottom-btn.png')} />
            </TouchableOpacity>

            // <View style={styles.btnOut}>
            //     <TouchableOpacity style={[styles.btnMain , this.props.styles]} onPress={this.props.onClickBtn}>
            //         <Image style={styles.imageMain} source={this.props.source} />
            //     </TouchableOpacity>
            // </View>
        )
    }
}
export default DownButton;

const styles = StyleSheet.create({
    imageMain:{
        width: '100%',
        height:'100%'
    },
    BtnOut: {
        width: '100%',
        height:50,
        alignItems: 'center',
        justifyContent: 'center',
    },
    BtnOutAndroid:{
        width: '100%',
        height:50,
        alignItems: 'center',
        justifyContent: 'center',
    },
    textMain:{
        fontSize:13,
        position:'absolute',
        zIndex:99,
        color:'#fff'
    }
});
