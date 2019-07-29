import React from 'react';
import { View, Text, Dimensions, StyleSheet, ScrollView, KeyboardAvoidingView, Platform } from 'react-native';
import { connect } from 'react-redux'
import microValidator from 'micro-validator'
import is from 'is_js'
import Header from '../../components/Header';
import { whiteColor, fontLarge, errorColor, buttonBottom, fontXL } from '../../components/constant';
import ProfileBackground from '../../components/ProfileBackground';
import ButtonMain from '../../components/ButtonMain';
import TextBox from '../../components/TextField.js';
var { height, width } = Dimensions.get('window')

let validationSchema = {
    accountName: {
        required: {
            errorMsg: 'Name is required'
        },
    },
    accountNumber: {
        required: {
            errorMsg: 'Account Number is required'
        },
    },
    sortCode: {
        required: {
            errorMsg: 'Code is required'
        },
    },
}

class BankDetails extends React.Component {
    static navigationOptions = {
        header: null
    }
    constructor() {
        super()
        this.state = {
            userData: {
                accountName: '',
                accountNumber: '',
                sortCode: ''
            },
            errors: {}
        };
    }

    handleChange(key, event) {
        let { userData } = this.state
        userData[key] = event
        this.setState({ userData, errors: {} })
    }

    handleSubmit() {
        let { userData } = this.state
        const errors = microValidator.validate(validationSchema, userData)
        if (!is.empty(errors)) {
            this.setState({ errors })
            return
        }
        let data = {
            accountName: userData.accountName,
            accountNumber: userData.accountNumber,
            sortCode: userData.sortCode
        }
        // this.props.dispatch(LoginApi(data))

        //empty textBoxes
        userData.accountName = '',
            userData.accountNumber = '',
            userData.sortCode = ''
        this.setState({ userData })
        // this.props.navigation.navigate("LoggedinTabs")
        AsyncStorage.setItem('token', 'sdhfvhbskdguvhdbouhj')
    }

    render() {
        let { userData, errors } = this.state
        return (
            <View style={styles.fullScreen}>
                <View style={styles.flexMain}>
                    <Header source={require('../../assets/back-white-arrow.png')} navigation={this.props.navigation} />
                    <ProfileBackground textHeading="BANK DETAILS" />
                </View>
                <View style={styles.flexSecondCon}>
                    <View style={styles.formContainer}>
                        <View style={styles.textBoxOut}>
                            <TextBox
                                mode='outline'
                                placeholder="Account Name"
                                tintColor={'#520CC3'}
                                highlightColor={'#520CC3'}
                                placeholderTextColor={'#520CC3'}
                                onChangeText={this.handleChange.bind(this, 'accountName')}
                                value={userData.email}
                                floatingLabelFont={styles.label}
                                rightIcon={require('../../assets/email.png')}
                                textInputStyle={styles.textInput}
                            />
                            <Text style={styles.errorMsgText}>{errors.email && errors.email[0]}</Text>
                        </View>
                        <View style={styles.textBoxOut}>
                            <TextBox
                                mode='outline'
                                placeholder="Sort code"
                                tintColor={'#520CC3'}
                                highlightColor={'#520CC3'}
                                placeholderTextColor={'#520CC3'}
                                keyboardType="numeric"
                                onChangeText={this.handleChange.bind(this, 'sortCode')}
                                value={userData.password}
                                floatingLabelFont={styles.label}
                                rightIcon={require('../../assets/lock.png')}
                                textInputStyle={styles.textInput}
                            />
                            <Text style={styles.errorMsgText}>{errors.password && errors.password[0]}</Text>
                        </View>
                        <View style={styles.textBoxOut}>
                            <TextBox
                                mode='outline'
                                placeholder="Account number"
                                secureTextEntry={true}
                                tintColor={'#520CC3'}
                                highlightColor={'#520CC3'}
                                placeholderTextColor={'#520CC3'}
                                keyboardType="numeric"
                                onChangeText={this.handleChange.bind(this, 'accountNumber')}
                                value={userData.password}
                                floatingLabelFont={styles.label}
                                rightIcon={require('../../assets/lock.png')}
                                textInputStyle={styles.textInput}
                            />
                            <Text style={styles.errorMsgText}>{errors.password && errors.password[0]}</Text>
                        </View>
                    </View>
                </View>
                <View style={styles.buttonOut}>
                    <ButtonMain
                        onPress={() => this.handleSubmit()}
                        isColored={true}
                        label='SAVE'
                    />
                </View>
            </View>
        )
    }
}
export default connect(state => state)(BankDetails)

const styles = StyleSheet.create({
    fullScreen: {
        height: height,
    },
    flexMain: {
        flex: 1
    },
    label: {
        paddingLeft: 8,
        fontSize: fontXL,
        color: '#520CC3',
        fontWeight: '700'
    },
    textInput: {
        fontWeight: '700',
        paddingLeft: 12,
        fontSize: fontLarge,
        color: '#520CC3',
        paddingBottom: 10,
        width: '100%'
    },
    flexSecondCon: {
        flex: 2,
        backgroundColor: whiteColor,
        marginBottom: 75,
        alignItems: 'center'
    },
    textBoxOut: {
        marginTop: 15,
    },
    errorMsgText: {
        fontSize: fontLarge,
        letterSpacing: 2,
        color: errorColor
    },
    buttonOut: {
        position: 'absolute',
        bottom: buttonBottom,
        width: '100%',
        alignItems: 'center',
        bottom: 80
    },
    formContainer: {
        width: width - 70,
        marginTop: 10
    }
})
