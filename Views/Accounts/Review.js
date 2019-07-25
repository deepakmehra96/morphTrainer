import React from 'react';
import { View, Text, Dimensions, StyleSheet, ScrollView, SafeAreaView, TouchableOpacity } from 'react-native';
import { connect } from 'react-redux'
import BackgroundText from '../../components/BackgroundText';
import BackgroundContent from '../../components/BackgroundContent';
import Header from '../../components/Header';
import ListItem from '../../components/ListItem.js';
import ProfileBackground from '../../components/ProfileBackground';
import { whiteColor, fontXXL, fontSmall } from '../../components/constant';
var { height, width } = Dimensions.get('window')

class Review extends React.Component {
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
                    <Text style={styles.textStyle}>82</Text>
                    <Text style={styles.textDetails}>Reviews</Text>
                </View>
            </View>
        )
    }

    render() {
        return (
            <View style={styles.fullScreen}>
                <View style={styles.flexMain}>
                    <Header source={require('../../assets/back-white-arrow.png')} navigation={this.props.navigation} />
                    <ProfileBackground  content={this.textContent()}  textHeading="REVIEW" />
                </View>
                <View style={styles.flexSecondCon}>
                    <ScrollView>
                       <Text>Comming Soom</Text>
                    </ScrollView>
                </View>
            </View>
        )
    }
}
export default connect(state => state)(Review)

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
        marginBottom:70
    },
    headingContent: {
        height: 70,
        justifyContent: 'space-around',
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
})
