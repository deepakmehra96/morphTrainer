import React from 'react';
import { View, Text, Dimensions, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { connect } from 'react-redux'
import ProfileBackground from '../../components/ProfileBackground';
import Header from '../../components/Header';
import { whiteColor, fontXL, fontLarge, fontSmall, fontMedium, fontXXL, buttonBottom, buttonView } from '../../components/constant';
import ButtonMain from '../../components/ButtonMain';
import BackgroundText from '../../components/BackgroundText';
import { openToast } from '../../redux/actions';
var { height, width } = Dimensions.get('window')

class BookingTime extends React.Component {
    static navigationOptions = {
        header: null
    }
    constructor() {
        super()
        this.state = {
            dateArray: [
                { date: '1', day: 'Mon', _id: 1 },
                { date: '2', day: 'Tue', _id: 2 },
                { date: '3', day: 'Wed', _id: 3 },
                { date: '4', day: 'Thu', _id: 4 },
            ],
            timeArray: [
                { time: '14:30', price: '£35', _id: 1 },
                { time: '14:30', price: '£35', _id: 2 },
                { time: '14:30', price: '£35', _id: 3 },
                { time: '14:30', price: '£35', _id: 4 },
                { time: '14:30', price: '£35', _id: 5 }
            ],
            selectedDateId:'',
            selectedTimeId:''
        };
    }

    handleSubmit(){
        let { selectedDateId,selectedTimeId } = this.state
        if (selectedTimeId && selectedDateId) {
            this.props.navigation.navigate('BookTrainer')
        }else{
            this.props.dispatch(openToast('Please Select Proper Time'))
        }
    }

    handleDateSelect(val) {
        this.setState({ selectedDateId: val._id })
    }
    hnadleSelctedColorDate(val) {
        let { selectedDateId } = this.state
        if (val._id == selectedDateId) {
            return styles.colorBlue
        }
    }
    handleTimeSelect(val) {
        this.setState({ selectedTimeId: val._id })
    }
    hnadleSelctedColorTime(val) {
        let { selectedTimeId } = this.state
        if (val._id == selectedTimeId) {
            return styles.colorBlue
        }
    }

    render() {
        let { dateArray, timeArray } = this.state
        return (
            <View style={styles.fullScreen}>
                <View style={styles.flexMain}>
                    <Header source={require('../../assets/back-white-arrow.png')} navigation={this.props.navigation} />
                    <ProfileBackground textHeading="TIME" />
                </View>
                <View style={styles.flexSecondCon}>
                    <View style={styles.mainContainer}>
                        <ScrollView>
                            <Text style={styles.textHeading}>SELECT THE <Text style={styles.colorBlueText}>DATE</Text></Text>
                            <View style={styles.flexRow}>
                                {dateArray.map((val, index) => {
                                    return (
                                        <TouchableOpacity onPress={() => this.handleDateSelect(val)} style={[styles.boxOut, this.hnadleSelctedColorDate(val)]}>
                                            <Text style={[styles.date, this.hnadleSelctedColorDate(val)]}>{val.date}</Text>
                                            <Text style={[styles.textSize, this.hnadleSelctedColorDate(val)]}>{val.day}</Text>
                                        </TouchableOpacity>
                                    )
                                })}
                            </View>
                            <Text style={styles.textHeading}>SELECT THE <Text style={styles.colorBlueText}>TIME</Text></Text>
                            <View style={styles.flexRow}>
                                {
                                    timeArray.map((val, index) => {
                                        return (
                                            <TouchableOpacity onPress={() => this.handleTimeSelect(val)} style={[styles.boxOut, this.hnadleSelctedColorTime(val)]}>
                                                <Text style={[styles.time, this.hnadleSelctedColorTime(val)]}>{val.time}</Text>
                                                <Text style={[styles.textSize, this.hnadleSelctedColorTime(val)]}>{val.price}</Text>
                                            </TouchableOpacity>
                                        )
                                    })
                                }
                            </View>
                        </ScrollView>
                    </View>
                </View>
                <View style={styles.btnOut}>
                    <ButtonMain onPress={() => this.handleSubmit()} buttonStyle={styles.buttonStyle} isColored={true} label="NEXT" />
                </View>
            </View>
        )
    }
}
export default connect(state => state)(BookingTime)

const styles = StyleSheet.create({
    flexMain: {
        flex: 1
    },
    flexSecondCon: {
        flex: 2,
        backgroundColor: whiteColor
    },
    fullScreen: {
        height: height,
    },
    mainContainer: {
        padding: 25,
        marginBottom: buttonView,
    },
    textHeading: {
        fontSize: fontLarge,
        color: '#4F4F4F',
        marginBottom: 10,
        letterSpacing: 2
    },
    btnOut: {
        width: width,
        position: 'absolute',
        bottom: buttonBottom,
        alignItems: 'center'
    },
    buttonStyle: {
        width: width - 50
    },
    boxOut: {
        borderWidth: 1,
        borderColor: "#C1C1C1",
        height: 50,
        width: 60,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 5,
        marginRight: 10,
        marginBottom: 10
    },
    date: {
        fontSize: fontXL,
        color: '#A1A1A1',
        fontWeight: 'bold'
    },
    time:{
        fontSize: fontMedium,
        color: '#A1A1A1',
        fontWeight: '500'
    },
    textSize: {
        fontSize: fontMedium,
        color: '#C1C1C1'
    },
    flexRow: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        marginBottom:10,
        marginLeft:5
    },
    colorBlue: {
        color: "#753DCF",
        borderColor: '#753DCF'
    },
    colorBlueText: {
        color: "#753DCF",
    }
})
