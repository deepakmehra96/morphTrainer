import React from 'react';
import { View, Text, Dimensions, StyleSheet, ScrollView, SafeAreaView, TouchableOpacity } from 'react-native';
import { connect } from 'react-redux'
import BackgroundText from '../../components/BackgroundText';
import BackgroundContent from '../../components/BackgroundContent';
import Header from '../../components/Header';
import ListItem from '../../components/ListItem.js';
import ProfileBackground from '../../components/ProfileBackground';
import { whiteColor } from '../../components/constant';
var { height, width } = Dimensions.get('window')


class Booking extends React.Component {
    static navigationOptions = {
        header: null
    }
    constructor() {
        super()
        this.state = {
            listArray: {
                upcoming: [
                    {
                        title: 'EMS, 12 Aug 2019, 14:30',
                        address: 'Jodi Pitout, 10 Downing Street',
                        type: 'upcomimg'
                    },
                    {
                        title: 'EMS, 12 Aug 2019, 14:30',
                        address: 'Jodi Pitout, 10 Downing Street',
                        type: 'upcomimg'
                    },
                    {
                        title: 'EMS, 12 Aug 2019, 14:30',
                        address: 'Jodi Pitout, 10 Downing Street',
                        type: 'upcomimg'
                    },
                    {
                        title: 'EMS, 12 Aug 2019, 14:30',
                        address: 'Jodi Pitout, 10 Downing Street',
                        type: 'upcomimg'
                    },
                    {
                        title: 'EMS, 12 Aug 2019, 14:30',
                        address: 'Jodi Pitout, 10 Downing Street',
                        type: 'upcomimg'
                    },
                    {
                        title: 'EMS, 12 Aug 2019, 14:30',
                        address: 'Jodi Pitout, 10 Downing Street',
                        type: 'upcomimg'
                    },
                ],
                past: [
                    {
                        title: 'EMS, 12 Aug 2019, 14:30',
                        address: 'Jodi Pitout, 10 Downing Street',
                        type: 'past'
                    },
                    {
                        title: 'EMS, 12 Aug 2019, 14:30',
                        address: 'Jodi Pitout, 10 Downing Street',
                        type: 'past'
                    },
                    {
                        title: 'EMS, 12 Aug 2019, 14:30',
                        address: 'Jodi Pitout, 10 Downing Street',
                        type: 'past'
                    },
                    {
                        title: 'EMS, 12 Aug 2019, 14:30',
                        address: 'Jodi Pitout, 10 Downing Street',
                        type: 'past'
                    }
                ]
            },
            tabIndex: 0
        };
    }

    handleTab(val) {
        this.setState({ tabIndex: val })
    }

    handleBooking(data) {
        if (data.type == 'upcomimg') {
            this.props.navigation.navigate('ManageBooking', {
                item: data,
            });
        }
    }
    render() {
        let { listArray, tabIndex } = this.state
        let arrayToShow = tabIndex == 0 ? listArray.upcoming : listArray.past
        return (
            <View style={styles.fullScreen}>
                <View style={styles.flexMain}>
                    <ProfileBackground textHeading="BOOKINGS" />
                </View>
                <View style={styles.flexSecondCon}>
                    <View style={styles.tabOut}>
                        <TouchableOpacity onPress={() => this.handleTab(0)} style={tabIndex == 0 ? styles.tabMainActive : styles.tabMain}>
                            <Text style={styles.tabText}>UPCOMING</Text>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => this.handleTab(1)} style={tabIndex == 1 ? styles.tabMainActive : styles.tabMain}>
                            <Text style={styles.tabText}>PAST</Text>
                        </TouchableOpacity>
                    </View>
                    <ScrollView>
                        <View style={styles.scrollContent}>
                            {arrayToShow.map((val, index) => {
                                return (
                                    <TouchableOpacity onPress={() => this.handleBooking(val)}>
                                        <ListItem
                                            key={index}
                                            listStyle={styles.listStyle}
                                            heading={val.title}
                                            bottomText={val.address}
                                            iconRight={val.type == 'past' ? '' : require('../../assets/arrow.png')}
                                            iconRightStyle={styles.iconRight}
                                        />
                                    </TouchableOpacity>
                                )
                            })}
                        </View>
                    </ScrollView>
                </View>
            </View>
        )
    }
}
export default connect(state => state)(Booking)

const styles = StyleSheet.create({
    fullScreen: {
        height: height,
    },
    flexMain: {
        flex: 2
    },
    flexSecondCon: {
        flex: 4,
        backgroundColor: whiteColor,
        marginBottom:70
    },

    listStyle: {
        paddingLeft: 40
    },
    iconRight: {
        width: 10,
        height: 20
    },
  
    tabOut: {
        height: 60,
        flexDirection: 'row',
        borderBottomWidth: 1,
        borderColor: '#E5E5E5',
    },
    tabMain: {
        backgroundColor: '#EEEEEE',
        width: width / 2,
        justifyContent: 'center',
        alignItems: 'center',
    },
    tabMainActive: {
        width: width / 2,
        borderTopWidth: 4,
        borderTopColor: '#FFC379',
        justifyContent: 'center',
        alignItems: 'center',
    },
    tabText: {
        letterSpacing: 3
    }

})
