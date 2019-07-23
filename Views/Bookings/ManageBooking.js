import React from 'react';
import { View, Text, Dimensions, StyleSheet, ScrollView, SafeAreaView, TouchableOpacity } from 'react-native';
import { connect } from 'react-redux'
import Header from '../../components/Header';
import { whiteColor, fontXL, buttonBottom } from '../../components/constant';
import ListItem from '../../components/ListItem.js';
import ButtonMain from '../../components/ButtonMain';
import ProfileBackground from '../../components/ProfileBackground';
var { height, width } = Dimensions.get('window')


class ManageBooking extends React.Component {
    static navigationOptions = {
        header: null
    }
    constructor() {
        super()
        this.state = {
        };
    }
    componentDidMount() {
        const { navigation } = this.props;
        const item = navigation.getParam('item', 'NO-ID');
    }

    render() {
        return (
            <View style={styles.fullScreen}>
                <View style={styles.flexMain}>
                    <Header source={require('../../assets/back-white-arrow.png')} navigation={this.props.navigation} />
                    <ProfileBackground textHeading="MANAGE BOOKINGS" />
                </View>
                <View style={styles.flexSecondCon}>
                    <View>
                        <ListItem
                            heading="22 Jun 2019, 14:30"
                            iconLeftStyle={styles.iconOutCalender}
                            iconLeft={require('../../assets/calender.png')}
                        />
                        <ListItem
                            iconLeftStyle={styles.iconOutLoaction}
                            heading="Home, SW4 ABC "
                            iconLeft={require('../../assets/location.png')}
                        />
                        <ListItem
                            heading="Kit size: Large"
                            iconLeftStyle={styles.iconOutNotes}
                            iconLeft={require('../../assets/notes.png')}
                        />
                        <ListItem
                            heading="£35"
                            iconLeftStyle={styles.iconOut}
                            iconLeft={require('../../assets/card.png')}
                        />
                    </View>
                    <View style={styles.btnStyles}>
                        <ButtonMain isColored={true} label="CANCLE BOOKING" />
                    </View>
                </View>
            </View>
        )
    }
}
export default connect(state => state)(ManageBooking)

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
    iconOutCalender: {
        height: 26,
        width: 22,
    },
    iconOutNotes: {
        height: 30,
        width: 30,
    },
    btnStyles: {
        position: 'absolute',
        bottom: buttonBottom,
        width: width,
        alignItems: 'center'
    }
})
