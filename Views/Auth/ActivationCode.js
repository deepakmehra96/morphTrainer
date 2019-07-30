import React from 'react';
import { View, Text, StyleSheet, Dimensions, TouchableOpacity } from 'react-native';
import { connect } from 'react-redux'
import Header from '../../components/Header';
import TextBox from '../../components/TextField.js';
import { fontSmall, errorColor, whiteColor, fontMedium, buttonBottom, fontLarge } from '../../components/constant';
import { ActivationCodeApi } from '../../redux/actions';
import ButtonMain from '../../components/ButtonMain';
import BackgroundContent from '../../components/BackgroundContent';
import BackgroundText from '../../components/BackgroundText';
var { height, width } = Dimensions.get('window')

class ActivationCode extends React.Component {
    static navigationOptions = {
        header: null
    }

    constructor() {
        super()
        this.state = {
            OTP: '',
            errors: ''
        };
    }

    handleChange(event) {
        let { OTP } = this.state
        OTP = event
        this.setState({ OTP, errors: '' })
    }

    handleSubmit() {
        let { OTP } = this.state
        if (OTP.length == 0) {
            this.setState({ errors: 'OTP is required' })
            return
        }
        this.props.dispatch(ActivationCodeApi(OTP))
        OTP = ''
        this.setState({ OTP })
        this.props.navigation.navigate('LoggedinTabs')
    }

    render() {
        let { OTP, errors } = this.state
        return (
            <View style={styles.fullScreen}>
                <BackgroundContent />
                <View style={styles.flexMain}>
                    <Header source={require('../../assets/back-white-arrow.png')} navigation={this.props.navigation} />
                    <View style={styles.mainContainer}>
                        <BackgroundText showImage={true} textHeading="ACTIVATE" />
                    </View>
                </View>
                <View style={styles.flexContainer}>
                    <View style={styles.formContainer}>
                        <View style={styles.textBoxOut}>
                            <TextBox
                                mode='outline'
                                placeholder="Activation Code"
                                onChangeText={this.handleChange.bind(this)}
                                value={OTP}
                            />
                            <Text style={styles.errorMsgText}>{errors}</Text>
                        </View>
                    </View>
                </View>
                <View style={styles.buttonOut}>
                    <ButtonMain
                        onPress={() => this.handleSubmit()}
                        isColored={false}
                        label='CONTINUE'
                    />
                    <View style={{ flexDirection: 'row' }}>
                        <Text style={styles.textBottom}>Didn’t receive the code? </Text>
                        <TouchableOpacity style={styles.resendTextOut}>
                            <Text style={styles.textBottom}>Resend it.</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        )
    }
}
export default connect(state => state)(ActivationCode)

const styles = StyleSheet.create({
    fullScreen: {
        height: height
    },
    flexMain:{
        flex: 1 
    },
    flexContainer:{ 
        flex: 2, 
        alignItems: 'center' 
    },
    mainContainer: {
        marginTop: 50,
        alignItems: 'center',
    },
    formContainer: {
        width: width - 70,
        justifyContent: 'center',
    },
    textBoxOut: {
        marginTop: 20,
        width: '100%'
    },
    errorMsgText: {
        fontSize: fontLarge,
        marginTop:4,
        color: errorColor
    },
    buttonOut: {
        position: 'absolute',
        bottom: buttonBottom,
        width: '100%',
        justifyContent: 'center',
        alignItems: 'center'
    },
    textBottom: {
        marginTop: 15,
        color: whiteColor,
        textAlign: 'center',
        fontSize: fontMedium
    },
    resendTextOut: {
        borderBottomColor: whiteColor,
        borderBottomWidth: 1
    }
})