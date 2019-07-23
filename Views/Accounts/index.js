import React from 'react';
import { View, Text, Dimensions, StyleSheet, ScrollView, SafeAreaView, TouchableOpacity } from 'react-native';
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

    handleLocation() {
        console.log(1)
        this.props.navigation.navigate("UserLocation")
    }
    handlePayment() {
        console.log(2)
        this.props.navigation.navigate("UserPayment")
    }
    handleCredits() {
        console.log(3)
        this.props.navigation.navigate("UserCredits")
    }
    handleNotes(){
        this.props.navigation.navigate("UserNotes")
    }
    render() {
        return (
            <View style={styles.fullScreen}>
                <View style={styles.flexMain}>
                    <ProfileBackground textHeading="ACCOUNT & SETTINGS" />
                </View>
                <View style={styles.flexSecondCon}>
                    <ScrollView>
                        <TouchableOpacity onPress={() => this.handleLocation()}>
                            <ListItem
                                iconLeftStyle={styles.iconOutLoaction}
                                heading="Locations"
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
                        <TouchableOpacity onPress={() => this.handleCredits()}>
                            <ListItem
                                heading="Credits"
                                iconLeftStyle={styles.iconOutCredits}
                                iconLeft={require('../../assets/dollar.png')}
                                iconRight={require('../../assets/arrow.png')}
                            />
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => this.handleNotes()}>
                            <ListItem
                                heading="Notes"
                                iconLeftStyle={styles.iconOutNotes}
                                iconLeft={require('../../assets/notes.png')}
                                iconRight={require('../../assets/arrow.png')}
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
    iconOut: {
        height: 27,
        width: 35,
    },
    iconOutCredits: {
        height: 22,
        width: 36,
    },
    iconOutNotes: {
        height: 30,
        width: 30,
    }
})
