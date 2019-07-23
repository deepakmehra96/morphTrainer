import React from 'react';
import { StyleSheet, View, Image, Text, TouchableOpacity } from 'react-native';
import { fontXL, whiteColor, fontLarge, fontMedium, fontSmall } from '../constant';

const ListItem = props => {
    return (
        <View style={[styles.listMain, props.listStyle]}>
            <View style={[styles.iconOut, props.iconLeftStyle]}>
                <Image style={styles.imageMain} source={props.iconLeft} />
            </View>
            <View style={styles.textOutMain}>
                <Text style={styles.textMain}>{props.heading}</Text>
                {props.bottomText ?
                    <Text  style={styles.textBottom}>
                        {props.bottomText}
                    </Text> : null}
            </View>
            <View style={[styles.backArrow, props.iconRightStyle]}>
                <Image style={styles.imageMain} source={props.iconRight} />
            </View>
        </View>
    )
}
export default ListItem;

const styles = StyleSheet.create({
    listMain: {
        borderBottomWidth: 1,
        borderColor: '#E5E5E5',
        height: 70,
        alignItems: 'center',
        flexDirection: 'row',
        paddingLeft: 90
    },
    iconOut: {
        height: 28,
        width: 20,
        position: "absolute",
        left: 25,
    },
    imageMain: {
        height: '100%',
        width: '100%'
    },
    textOutMain: {
        justifyContent: 'center',
    },
    textMain: {
        color: '#A1A1A1',
        fontSize: fontXL,
        letterSpacing: 2,
        fontWeight: '600'
    },
    textBottom:{
        color: '#A1A1A1',
        fontSize: fontSmall,
        letterSpacing: 2,
        fontWeight: '600',
        marginTop:5
    },
    backArrow: {
        height: 18,
        width: 10,
        position: 'absolute',
        right: 30,
    }
})