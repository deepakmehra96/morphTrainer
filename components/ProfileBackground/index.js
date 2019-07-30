import React from 'react';
import { StyleSheet, Dimensions, ImageBackground, View, Image, Text, SafeAreaView } from 'react-native';
import { whiteColor, fontXL, fontXXL, fontLarge } from '../constant';
var { height, width } = Dimensions.get('window')

const ProfileBackground = props => {
    return (
        <ImageBackground source={require('../../assets/profileBackGround.png')} style={styles.fullScreen}>
            <SafeAreaView style={[styles.centerImage, props.centerImage]}>
                <View style={styles.backImageOut}>
                    <Image resizeMode="contain" style={styles.imageMain} source={require('../../assets/LogoMain.png')} />
                    <View style={styles.textPosition}>
                        <Text style={styles.textHeading}>{props.textHeading}</Text>
                    </View>
                    <View>
                        <Text style={styles.textDes}>{props.textBooking}</Text>
                    </View>
                </View>
                <View>
                    <Text style={styles.textHeading}>{props.profileText}</Text>
                </View>
                {
                    props.content ?
                        <View style={[styles.contentOut, props.containerStyles]}>
                            {props.content}
                        </View> : null
                }
            </SafeAreaView>
            {
                props.imageMain ?
                    <View style={styles.imageBorder}>
                        <Image style={styles.imageMain} source={props.imageMain} />
                    </View>
                    :
                    null
            }
        </ImageBackground>
    )
}
export default ProfileBackground

const styles = StyleSheet.create({
    fullScreen: {
        width: width,
        zIndex: -1,
        height: height / 2,
        alignItems: 'center',
        overflow: 'hidden',
        position: 'absolute'
    },
    backImageOut: {
        height: 120,
        width: width,
        // position: 'absolute',
        // top:15,
        marginTop: 10,
        justifyContent: 'center',
        alignItems: 'center'
    },
    imageMain: {
        height: '100%',
        width: '100%'
    },
    contentOut: {
        borderTopWidth: 1,
        borderColor: '#9A73D8',
        justifyContent: 'center',
        height: width <= 320 ? 65 : 60,
        width: width,
        position: 'absolute',
        bottom: 0
    },
    textHeading: {
        color: whiteColor,
        fontSize: fontXXL,
        letterSpacing: 3,
        marginTop: width <= 320 ? 20 : 40,
    },
    textDes: {
        color: whiteColor,
        fontSize: fontLarge,
        letterSpacing: 3,
        // marginTop: 110,/
        fontWeight: '700'
    },
    imageBorder: {
        height: 110,
        width: 110,
        borderRadius: 110 / 2,
        overflow: 'hidden',
        borderWidth: 2,
        borderColor: whiteColor,
        position: 'absolute',
        top: 70
    },
    textPosition: {
        position: 'absolute',
        alignItems: 'center'
    },
    centerImage: {
        height: '100%',
        // justifyContent: 'center',
        alignItems: 'center',
        // position: 'relative'
    }
})