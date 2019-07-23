import React from 'react';
import { View, Text, Dimensions, StyleSheet, ScrollView, SafeAreaView, TouchableOpacity, Image } from 'react-native';
import { connect } from 'react-redux'
import BackgroundText from '../../components/BackgroundText';
import BackgroundContent from '../../components/BackgroundContent';
import Header from '../../components/Header';
import { whiteColor, fontXL, buttonBottom } from '../../components/constant';
import ListItem from '../../components/ListItem.js';
import ActivationCode from '../Auth/ActivationCode';
import Login from '../Auth/Login';
import ButtonMain from '../../components/ButtonMain';
import ProfileBackground from '../../components/ProfileBackground';
import DialogBox from '../../components/Common/DialogBox';
var { height, width } = Dimensions.get('window')

class ConfirmPage extends React.Component {
    static navigationOptions = {
        header: null
    }
    constructor() {
        super()
        this.state = {
            selectPayment: '',
            dialogVisible: false
        };
    }
    componentDidMount() {
        const { navigation } = this.props;
        const item = navigation.getParam('item', 'NO-ID');
    }
    handleDropDown() {
        let { selectPayment } = this.state
        if (selectPayment == '') {
            return (
                <TouchableOpacity style={{ justifyContent: 'center', flexDirection: 'row', alignItems: 'center', width: 150, marginBottom: 10 }}>
                    <Text style={styles.textStyle}>PAYMENT OPTIONS</Text>
                    <Image style={{ height: 6, width: 10, marginLeft: 3 }} source={require('../../assets/colorDrop.png')} />
                </TouchableOpacity>
            )
        } else {
            return (
                <TouchableOpacity style={{ justifyContent: 'center', flexDirection: 'row', alignItems: 'center', width: 60 }}>
                    <Text numberOfLines={1} style={styles.textStyle}>{selectGender}</Text>
                </TouchableOpacity>
            )
        }
    }
    handleSubmit() {
        this.setState({ dialogVisible: true })
    }
    handleModal(visible) {
        this.setState({ dialogVisible: false })
    }

    render() {
        let { dialogVisible } = this.state
        return (
            <View style={styles.fullScreen}>
                <View style={styles.flexMain}>
                    <ProfileBackground textHeading="CONFIRM EMS" />
                    <Header source={require('../../assets/back-white-arrow.png')} navigation={this.props.navigation} />
                </View>
                <View style={styles.flexSecondCon}>
                    <View style={styles.innerContainer}>
                        <ScrollView>
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
                        </ScrollView>

                    </View>
                    <View style={styles.btnStyles}>
                        {this.handleDropDown()}
                        <ButtonMain onPress={() => this.handleSubmit()} isColored={true} label="CONFIRM & PAY" />
                    </View>
                </View>
                <DialogBox
                    visible={dialogVisible}
                    openCloseModal={() => this.handleModal()}
                    headingText="ADD GOAL"
                    propStyle={{ height: 230 }}
                    height="100%" />
            </View>
        )
    }
}
export default connect(state => state)(ConfirmPage)

const styles = StyleSheet.create({
    fullScreen: {
        height: height,
    },
    flexMain: {
        flex: 1
    },
    flexSecondCon: {
        flex: 2,
        backgroundColor: whiteColor
    },
    innerContainer: {
        backgroundColor: '#fff',
        paddingBottom: 90
    },
    textStyle: {
        color: '#4F4F4F',
        letterSpacing: 1,
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
