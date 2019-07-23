import React from 'react';
import { View, Text, Dimensions, StyleSheet, ScrollView, SafeAreaView, TouchableOpacity } from 'react-native';
import { connect } from 'react-redux'
import BackgroundText from '../../components/BackgroundText';
import BackgroundContent from '../../components/BackgroundContent';
import Header from '../../components/Header';
import { whiteColor, fontXL } from '../../components/constant';
import ListItem from '../../components/ListItem.js';
import ProfileBackground from '../../components/ProfileBackground';
var { height, width } = Dimensions.get('window')

class UserPayment extends React.Component {
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
                    <ProfileBackground textHeading="PAYMENT" />
                </View>
                <View style={styles.flexSecondCon}>
                    <ScrollView>
                            <View style={styles.textOutMain}>
                                <Text style={styles.textMain}>PAYMENT METHOD</Text>
                            </View>
                            <ListItem
                                listStyle={styles.listStyle}
                                heading="Card ending in ****1234 *"
                                iconRight={require('../../assets/delete.png')}
                                iconRightStyle={styles.iconRight}
                            />
                            <ListItem
                                listStyle={styles.listStyle}
                                heading="New payment method..."
                                iconRight={require('../../assets/plus.png')}
                                iconRightStyle={styles.iconRightPlus}
                            />
                            <View style={styles.textOutMain}>
                                <Text style={styles.textMain}>TRANSACTIONS</Text>
                            </View>
                            <ListItem
                                listStyle={styles.listStyle}
                                heading="£35"
                                bottomText="19 May 2019 12:23"
                                iconRight={require('../../assets/arrow.png')}
                            />
                            <ListItem
                                listStyle={styles.listStyle}
                                heading="1 Credit"
                                bottomText="19 May 2019 12:23"
                                iconRight={require('../../assets/arrow.png')}
                            />
                            <ListItem
                                listStyle={styles.listStyle}
                                heading="£35"
                                bottomText="19 May 2019 12:23"
                                iconRight={require('../../assets/arrow.png')}
                            />
                    </ScrollView>
                </View>
            </View>
        )
    }
}
export default connect(state => state)(UserPayment)

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
        marginBottom: 70,
    },
    listStyle: {
        paddingLeft: 40
    },
    textOutMain: {
        justifyContent: 'center',
        height: 80,
        borderBottomWidth: 1,
        borderColor: '#4A0BAF',
    },
    textMain: {
        color: '#4F4F4F',
        fontSize: fontXL,
        letterSpacing: 2,
        marginLeft: 40,
    },
    iconRight: {
        width: 16,
        height: 20
    },
    iconRightPlus: {
        width: 20,
        height: 20
    },
})
