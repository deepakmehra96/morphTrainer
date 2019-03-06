import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity,Image } from 'react-native';

class GradientButton extends React.Component {
    constructor() {
        super()
    }
    render() {
        return (
            <View style={styles.btnOut}>
                <TouchableOpacity style={[styles.btnMain , this.props.styles]} onPress={this.props.onClickBtn}>
                    <Image style={styles.imageMain} source={this.props.source} />
                </TouchableOpacity>
            </View>
        )
    }
}
export default GradientButton;

const styles = StyleSheet.create({
    imageMain:{
        width: '100%',
        height:'100%'
    },
    btnOut: {
        width: '100%',
        alignItems: 'center',
        justifyContent: 'center',
    },
    btnMain: {
        width: '100%',
        height: 50,
    },
});
