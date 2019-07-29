import React from 'react';
import { View, Text, Dimensions, StyleSheet, ScrollView, SafeAreaView, TouchableOpacity } from 'react-native';
import { connect } from 'react-redux'
import Header from '../../components/Header';
import { whiteColor, fontXL, fontXXL, fontSmall } from '../../components/constant';
import ProfileBackground from '../../components/ProfileBackground';
import ListItem from '../../components/ListItem.js';
var { height, width } = Dimensions.get('window')

class Payment extends React.Component {
    static navigationOptions = {
        header: null
    }
    constructor() {
        super()
        this.state = {
            listArray:  [
                    {
                        price: '£35',
                        date: '19 May 2019 12:23',
                    },
                    {
                        price: '£35',
                        date: '19 May 2019 12:23',
                    },
                    {
                        price: '£35',
                        date: '19 May 2019 12:23',
                    },
                ]
        };
    }
    textContent() {
        return (
            <View style={styles.headingContent}>
                <View style={styles.flexCenter}>
                    <Text style={styles.textStyle}>£2,212</Text>
                    <Text style={styles.textDetails}>This month</Text>
                </View>

                <View style={styles.flexCenter}>
                    <Text style={styles.textStyle}>£12,000</Text>
                    <Text style={styles.textDetails}>This year</Text>
                </View>
            </View>
        )
    }

    render() {
        let { listArray } = this.state
        return (
            <View style={styles.fullScreen}>
                <View style={styles.flexMain}>
                    <Header source={require('../../assets/back-white-arrow.png')} navigation={this.props.navigation} />
                    <ProfileBackground centerImage={styles.textBarHeight} content={this.textContent()} textHeading="PAYMENT" />
                </View>
                <View style={styles.flexSecondCon}>
                    <ScrollView>
                            {
                                listArray.map((val, index) => {
                                return (
                                    <ListItem
                                        key={index}
                                        listStyle={styles.listStyle}
                                        heading={val.price}
                                        bottomText={val.date}
                                        iconRight={require('../../assets/arrow.png')}
                                        iconRightStyle={styles.iconRight}
                                    />
                                )
                            })}
                    </ScrollView>
                </View>
            </View>
        )
    }
}
export default connect(state => state)(Payment)

const styles = StyleSheet.create({
    fullScreen: {
        height: height,
    },
    flexMain: {
        flex: width <= 320 ? 3 : 1,
    },
    flexSecondCon: {
        flex: width <= 320 ? 5 : 2,
        backgroundColor: whiteColor,
        marginBottom: 70,
    },
    listStyle: {
        paddingLeft: 40
    },
    iconRight: {
        width: 8,
        height: 16
    },
 
    textBarHeight: {
        height: width <= 320 ? '70%' : '60%',
    },
    headingContent: {
        height: width <= 320 ? 60 : 70,
        justifyContent: 'space-around',
        flexDirection: 'row',
        paddingLeft: 40,
        paddingRight: 30,
    },
    flexCenter: {
        alignItems: 'center',
        justifyContent: 'center'
    },
    textStyle: {
        color: whiteColor,
        fontSize: fontXXL,
        letterSpacing: 3,
        fontWeight: '700',
    },
    textDetails: {
        fontSize: fontSmall,
        color: '#FFC379'
    },
})
