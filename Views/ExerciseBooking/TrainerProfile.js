import React from 'react';
import { View, Text, Dimensions, StyleSheet, ScrollView, SafeAreaView, TouchableOpacity } from 'react-native';
import { connect } from 'react-redux'
import ProfileBackground from '../../components/ProfileBackground';
import Header from '../../components/Header';
import { whiteColor, fontXL, fontLarge, fontSmall, fontMedium, fontXXL, buttonBottom, buttonView } from '../../components/constant';
import Icon from 'react-native-vector-icons/dist/FontAwesome'
import ButtonMain from '../../components/ButtonMain';
var { height, width } = Dimensions.get('window')

class TrainerProfile extends React.Component {
    static navigationOptions = {
        header: null
    }
    constructor() {
        super()
        this.state = {
        };
    }


    textContent() {
        return (
            <View style={styles.headingContent}>
                <View style={styles.flexCenter}>
                    <Text style={styles.textStyle}>4.8</Text>
                    <Text style={styles.textDetails}>Rating</Text>
                </View>
                <View style={styles.flexCenter}>
                    <Text style={styles.textStyle}>121</Text>
                    <Text style={styles.textDetails}>Bookings</Text>
                </View>
                <View style={styles.flexCenter}>
                    <Text style={styles.textStyle}>82</Text>
                    <Text style={styles.textDetails}>Reviews</Text>
                </View>
            </View>
        )
    }
    handleBtnPress(){
        this.props.navigation.navigate('ConfirmPage')
    }
    render() {
        return (
            <View style={styles.fullScreen}>
                <View style={styles.flexMain}>
                    <Header source={require('../../assets/back-white-arrow.png')} navigation={this.props.navigation} />
                    <ProfileBackground content={this.textContent()} imageMain={require('../../assets/dp.png')} />
                </View>
                <View style={styles.flexMain}>
                    <View style={styles.mainContainer}>
                        <ScrollView>
                            <Text style={styles.textHeading}>BIO</Text>
                            <Text style={styles.text}>test</Text>
                        </ScrollView>
                    </View>
                </View>
                <View style={styles.btnOut}>
                    <ButtonMain onPress={() => this.handleBtnPress()} buttonStyle={styles.buttonStyle} isColored={true} label="Book" />
                </View>
            </View>
        )
    }
}
export default connect(state => state)(TrainerProfile)

const styles = StyleSheet.create({
    flexMain:{
        flex: 1
    },
    fullScreen: {
        height: height,
    },
    headingContent: {
        height: 70,
        justifyContent: 'space-between',
        alignItems:'center',
        flexDirection:'row',
        paddingLeft:40,
        paddingRight:30,
    },
    flexCenter:{
        alignItems:'center',
        justifyContent:'center'
    },
    textStyle: {
        color: whiteColor,
        fontSize: fontXXL,
        letterSpacing: 3,
        fontWeight: '700',
    },
    textDetails:{
        fontSize: fontSmall,
        color:'#FFC379'
    },
    iconOut: {
        borderRadius: 50,
        borderWidth: 2,
        borderColor: whiteColor,
        width: 35,
        height: 35,
        alignItems: 'center',
        justifyContent: 'center',
        position: 'absolute',
        paddingTop: 3,
        paddingLeft: 2,
        right: 20
    },
    mainContainer: {
        padding: 25,
        marginBottom: buttonView
    },
    textHeading: {
        fontSize: fontLarge,
        color: '#4F4F4F',
        marginBottom: 20,
        letterSpacing: 2
    },
    text: {
        fontSize: fontMedium,
        color: '#828282',
        marginBottom: 20,
    },
    btnOut: {
        width: width,
        position: 'absolute',
        bottom: buttonBottom,
        alignItems: 'center'
    },
    buttonStyle: {
        width: width - 50
    }
})
