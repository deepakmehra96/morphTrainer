import React from 'react';
import { View, Text, Dimensions, StyleSheet, ScrollView, AsyncStorage, TouchableOpacity } from 'react-native';
import { connect } from 'react-redux'
import BackgroundText from '../../components/BackgroundText';
import BackgroundContent from '../../components/BackgroundContent';
import Header from '../../components/Header';
import { whiteColor, fontXL } from '../../components/constant';
import ListItem from '../../components/ListItem.js';
import ActivationCode from '../Auth/ActivationCode';
import Login from '../Auth/Login';
import ProfileBackground from '../../components/ProfileBackground';
var { height, width } = Dimensions.get('window')


class Accounts extends React.Component {
    static navigationOptions = {
        header: null
    }
    constructor() {
        super()
        this.state = {
        };
    }

    handleAvailability(){
        this.props.navigation.navigate("Availability")
    }
    handleReview(){
        this.props.navigation.navigate("Review")
    }
    handleLocation() {
        this.props.navigation.navigate("Location")
    }
    handlePayment() {
        this.props.navigation.navigate("Payment")
    }
    handleLogout() {
        AsyncStorage.removeItem('token')
        this.props.navigation.navigate("Login")
    }
    handleBankDetails() {
        this.props.navigation.navigate("BankDetails")
    }
    render() {
        return (
            <View style={styles.fullScreen}>
                <View style={styles.flexMain}>
                    <ProfileBackground textHeading="ACCOUNT & SETTINGS" />
                </View>
                <View style={styles.flexSecondCon}>
                    <ScrollView>
                        <TouchableOpacity onPress={() => this.handleAvailability()}>
                            <ListItem
                                iconLeftStyle={styles.iconOutLoaction}
                                heading="Availability"
                                // iconLeft={require('../../assets/location.png')}
                                iconRight={require('../../assets/arrow.png')}
                            />
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => this.handleReview()}>
                            <ListItem
                                iconLeftStyle={styles.iconOutLoaction}
                                heading="Reviews"
                                // iconLeft={require('../../assets/location.png')}
                                iconRight={require('../../assets/arrow.png')}
                            />
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => this.handleLocation()}>
                            <ListItem
                                iconLeftStyle={styles.iconOutLoaction}
                                heading="Locations reach"
                                iconLeft={require('../../assets/location.png')}
                                iconRight={require('../../assets/arrow.png')}
                            />
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => this.handlePayment()}>
                            <ListItem
                                heading="Payments"
                                iconLeftStyle={styles.iconOut}
                                iconLeft={require('../../assets/card.png')}
                                iconRight={require('../../assets/arrow.png')}
                            />
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => this.handleBankDetails()}>
                            <ListItem
                                heading="Bank details"
                                iconLeftStyle={styles.iconOutCredits}
                                iconRight={require('../../assets/arrow.png')}
                            />
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => this.handleLogout()}>
                            <ListItem
                                heading="Sign out"
                                iconLeftStyle={styles.iconOutSignOut}
                                iconLeft={require('../../assets/logout.png')}
                            />
                        </TouchableOpacity>
                    </ScrollView>
                </View>
            </View>
        )
    }
}
export default connect(state => state)(Accounts)

const styles = StyleSheet.create({
    fullScreen: {
        height: height,
    },
    flexMain: {
        flex: 1
    },
    flexSecondCon: {
        flex: 2,
        backgroundColor: whiteColor,
        paddingBottom: 60
    },
    iconOutLoaction: {
        marginLeft: 5
    },
    iconOutCalender:{
        height: 32,
        width: 27,
    },
    iconOut: {
        height: 25,
        width: 32,
    },
    iconOutCredits: {
        height: 22,
        width: 36,
    },
    iconOutNotes: {
        height: 30,
        width: 30,
    },
    iconOutSignOut:{
        height: 25,
        width: 25,
    }
})
