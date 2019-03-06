import React from 'react';
import { StyleSheet, Text, Image, TouchableOpacity } from 'react-native';

class FacebookBtn extends React.Component {
    constructor() {
        super()
    }

    render() {
        return (
            <TouchableOpacity style={styles.fbBTn}>
                <Image style={styles.imageMain} source={this.props.source} />
            </TouchableOpacity>
        )
    }
}
export default FacebookBtn;

const styles = StyleSheet.create({
    fbBTn: {
        width: '100%',
        height: 50,
    },
    imageMain:{
        width: '100%',
        height:'100%'
    },
});
