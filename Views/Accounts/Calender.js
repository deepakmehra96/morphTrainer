import React from 'react';
import { View, Image, Dimensions, StyleSheet, ScrollView, SafeAreaView, TouchableOpacity } from 'react-native';
import { connect } from 'react-redux'
import BackgroundText from '../../components/BackgroundText';
import BackgroundContent from '../../components/BackgroundContent';
import Header from '../../components/Header';
import ListItem from '../../components/ListItem.js';
import ProfileBackground from '../../components/ProfileBackground';
import { whiteColor } from '../../components/constant';
var { height, width } = Dimensions.get('window')

class Calender extends React.Component {
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
            <View style={styles.fullScreen}>
                <View style={styles.flexMain}>
                    <Header source={require('../../assets/back-white-arrow.png')} navigation={this.props.navigation} />
                    <ProfileBackground textHeading="CALENDER" />
                </View>
                <View style={styles.flexSecondCon}>
                    <ScrollView>
                        <ListItem
                            listStyle={styles.leftTextOut}
                            heading="EMS, Emma Wilkins"
                            bottomText="10 Down Street"
                            leftText="09 : 30"
                            iconRight={require('../../assets/arrow.png')}
                        />
                        <ListItem
                            listStyle={styles.leftTextOut}
                            heading="EMS, Emma Wilkins"
                            bottomText="10 Down Street"
                            leftText="09 : 30"
                            iconRight={require('../../assets/arrow.png')}
                        />
                        <ListItem
                            listStyle={styles.leftTextOut}
                            heading="EMS, Emma Wilkins"
                            bottomText="10 Down Street"
                            leftText="09 : 30"
                            iconRight={require('../../assets/arrow.png')}
                        />
                        <ListItem
                            listStyle={styles.leftTextOut}
                            heading="EMS, Emma Wilkins"
                            bottomText="10 Down Street"
                            leftText="09 : 30"
                            iconRight={require('../../assets/arrow.png')}
                        />
                    </ScrollView>
                </View>
            </View>
        )
    }
}
export default connect(state => state)(Calender)

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
    leftTextOut:{
        paddingLeft:100
    }
})
