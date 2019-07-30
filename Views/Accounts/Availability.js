import React from 'react';
import { View, Text, Dimensions, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { connect } from 'react-redux'
import Header from '../../components/Header';
import ProfileBackground from '../../components/ProfileBackground';
import { whiteColor, fontMedium, fontSmall } from '../../components/constant';

var { height, width } = Dimensions.get('window')

class Availability extends React.Component {
    static navigationOptions = {
        header: null
    }
    constructor() {
        super()
        this.state = {
            timeMap: [],
            daysArray: [
                { label: 'Mon', _id: 1 },
                { label: 'Tue', _id: 2 },
                { label: 'Wed', _id: 3 },
                { label: 'Thu', _id: 4 },
                { label: 'Fri', _id: 5 },
                { label: 'Sat', _id: 6 },
                { label: 'Sun', _id: 7 }
            ],
            availabitityArray: []
        }
    }

    componentDidMount() {
        let diff = 1800; //diff in seconds
        let timeArray = []
        for (let i = 12; i <= 48; i++) {
            timeArray.push(diff * i)
        }
        this.setState({ timeMap: timeArray })
    }

    leftPad = (width, n) => {
        if ((n + '').length > width) {
            return n;
        }
        const padding = new Array(width).join('0');
        return (padding + n).slice(-width);
    }

    handleTimeStamp(day, time) {
        let { availabitityArray } = this.state
        if (availabitityArray.filter(val => val._id === day._id && val.time === time).length) {
            let index = availabitityArray.findIndex(val => val._id === day._id && val.time === time)
            availabitityArray.splice(index, 1)
        } else {
            let availableDates = { label: day.label, _id: day._id, time: time }
            availabitityArray.push(availableDates)
        }
        this.setState({ availabitityArray })

    }

    handleActiveColor(day, time) {
        let { availabitityArray } = this.state
        if (availabitityArray.filter(val => val._id === day._id && val.time === time).length) {
            return styles.activeBoxMain
        } else {
            return styles.boxMain
        }
    }
    handleActiveTextColor(day, time) {
        let { availabitityArray } = this.state
        if (availabitityArray.filter(val => val._id === day._id && val.time === time).length) {
            return styles.activeTimeText
        } else {
            return styles.timeText
        }
    }
render() {
    let { daysArray, timeMap } = this.state
    return (
        <View style={styles.fullScreen}>
            <View style={styles.flexMain}>
                <Header source={require('../../assets/back-white-arrow.png')} navigation={this.props.navigation} />
                <ProfileBackground textHeading="AVAILABILITY" />
            </View>
            <View style={styles.flexSecondCon}>
                <ScrollView>
                    <View style={styles.listInRow}>
                        {
                            daysArray.map((val, index) => {
                                return (
                                    <View>
                                        <View key={index} style={styles.boxMain}>
                                            <Text style={styles.daysText}>{val.label}</Text>
                                        </View>
                                        <View style={styles.boxInColumn}>
                                            {
                                                timeMap.map((value, index) => {
                                                    let milliSeconds = value
                                                    let minutes = Math.floor(milliSeconds / 60);
                                                    milliSeconds = milliSeconds % 60;
                                                    let hours = Math.floor(minutes / 60)
                                                    minutes = minutes % 60;
                                                    return (
                                                        <TouchableOpacity key={index} onPress={() => this.handleTimeStamp(val, value)} style={this.handleActiveColor(val, value)}>
                                                            <Text style={this.handleActiveTextColor(val, value)}>
                                                                {this.leftPad(2, hours)}:{this.leftPad(2, minutes)}
                                                            </Text>
                                                        </TouchableOpacity>
                                                    )
                                                })
                                            }
                                        </View>
                                    </View>
                                )
                            })}
                    </View>
                </ScrollView>
            </View>
        </View>
    )
}
}
export default connect(state => state)(Availability)

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
        marginBottom: 70
    },
    boxMain: {
        borderWidth: 1,
        width: width / 7 - 10,
        margin: 3,
        height: width <= 360 ? 35 : 45,
        alignItems: "center",
        justifyContent: 'center',
        borderRadius: 4,
        borderColor: "#A1A1A1"
    },
    activeBoxMain: {
        borderWidth: 1,
        width: width / 7 - 10,
        margin: 3,
        height: width <= 360 ? 35 : 45,
        alignItems: "center",
        justifyContent: 'center',
        borderRadius: 4,
        borderColor: "#A1A1A1",
        backgroundColor: "#549D1B"
    },
    listInRow: {
        flexDirection: "row",
        padding: 15
    },
    daysText:{
        color: "#4F4F4F",
        fontSize: width <= 360 ? fontSmall : fontMedium,
        fontWeight:'bold'
    },
    timeText: {
        color: "#4F4F4F",
        fontSize: width <= 360 ? fontSmall : fontMedium
    },
    activeTimeText: {
        color: whiteColor,
        fontSize: width <= 360 ? fontSmall : fontMedium
    },
    boxInColumn:{ 
        flexDirection: 'column' ,
        marginTop:5
    }
})
