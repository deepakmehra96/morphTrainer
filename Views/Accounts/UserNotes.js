import React from 'react';
import { View, Text, Dimensions, StyleSheet, ScrollView, SafeAreaView, TouchableOpacity } from 'react-native';
import { connect } from 'react-redux'
import BackgroundText from '../../components/BackgroundText';
import BackgroundContent from '../../components/BackgroundContent';
import Header from '../../components/Header';
import { whiteColor, fontXL } from '../../components/constant';
import ListItem from '../../components/ListItem.js';
var { height, width } = Dimensions.get('window')

class UserNotes extends React.Component {
    static navigationOptions = {
        header: null
    }
    constructor() {
        super()
        this.state = {
        };
    }
    render() {
        return (
            <SafeAreaView style={styles.fullScreen}>
              <Text>COMMING SOON</Text>
            </SafeAreaView>
        )
    }
}
export default connect(state => state)(UserNotes)

const styles = StyleSheet.create({
    fullScreen: {
        height: height,
    },
    upperCon: {
        marginTop: 22,
    },
    mainContainer: {
        height: height,
        justifyContent: 'flex-end'
    },
    innerContainer: {
        backgroundColor: '#fff',
        height: height - 50
    },
    listStyle:{
        paddingLeft:20
    }
})
