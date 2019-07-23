import React from 'react';
import { View, Text, StyleSheet, Dimensions, KeyboardAvoidingView, Platform, ScrollView, TouchableOpacity } from 'react-native';
import { connect } from 'react-redux'
import microValidator from 'micro-validator'
import is from 'is_js'
import Header from '../../components/Header';
import TextBox from '../../components/TextField.js';
import { fontSmall, errorColor, whiteColor, fontXXL, fontMedium, buttonBottom } from '../../components/constant';
import { SignUpApi } from '../../redux/actions';
import ButtonMain from '../../components/ButtonMain';
import BackgroundContent from '../../components/BackgroundContent';
import BackgroundText from '../../components/BackgroundText';
import { CheckBox } from 'react-native-elements'
var { height, width } = Dimensions.get('window')

let validationSchema = {
    fullName: {
        required: {
            errorMsg: 'First Name is required'
        },
    },
    email: {
        required: {
            errorMsg: 'Email is required'
        },
        email: {
            errorMsg: 'Email is not valid'
        }
    },
    password: {
        required: {
            errorMsg: 'Password is required'
        },
    },
}

class SignUp extends React.Component {
    static navigationOptions = {
        header: null
    }
    constructor() {
        super()
        this.state = {
            checked: true,
            userData: {
                fullName: '',
                email: '',
                password: ''
            },
            errors: {},
            checked: false
        };
    }
    handleChangeText(key, event) {
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
            fullName: userData.fullName,
            lastName: userData.lastName,
            email: userData.email,
            password: userData.password,
        }
        this.props.dispatch(SignUpApi(data))

        //empty textBoxes
        userData.fullName = ''
        userData.lastName = ''
        userData.email = ''
        userData.password = ''
        this.setState({ userData })
        this.props.navigation.navigate("ActivationCode")
    }

    handleCheck() {
        let { checked } = this.state
        this.setState({ checked: !checked })
    }

    render() {
        let { userData, errors, checked } = this.state
        return (
            <View>
                <View style={styles.fullHeight}>
                    <BackgroundContent />
                    <Header source={require('../../assets/back-white-arrow.png')} navigation={this.props.navigation} />
                    <KeyboardAvoidingView behavior={"position"}>
                        <View style={styles.mainContainer}>
                            <BackgroundText showImage={true} textHeading="SIGN UP" />
                            <View style={styles.formContainer}>
                                <View style={styles.textBoxOut}>
                                    <TextBox
                                        mode='outline'
                                        placeholder="Full Name"
                                        onChangeText={this.handleChangeText.bind(this, 'fullName')}
                                        value={userData.fullName}
                                        rightIcon={require('../../assets/person.png')}
                                    />
                                    <Text style={styles.errorMsgText}>{errors.fullName && errors.fullName[0]}</Text>
                                </View>
                                <View style={styles.textBoxOut}>
                                    <TextBox
                                        mode='outline'
                                        placeholder="Email"
                                        onChangeText={this.handleChangeText.bind(this, 'email')}
                                        value={userData.email}
                                        rightIcon={require('../../assets/email.png')}
                                        iconStylesProps={styles.emailIcon}
                                    />
                                    <Text style={styles.errorMsgText}>{errors.email && errors.email[0]}</Text>
                                </View>
                                <View style={styles.textBoxOut}>
                                    <TextBox
                                        mode='outline'
                                        placeholder="Password"
                                        secureTextEntry={true}
                                        onChangeText={this.handleChangeText.bind(this, 'password')}
                                        value={userData.password}
                                        secureTextEntry={true}
                                        rightIcon={require('../../assets/lock.png')}
                                        password={true}
                                    />
                                    <Text style={styles.errorMsgText}>{errors.password && errors.password[0]}</Text>
                                </View>
                                <View style={styles.textOut}>
                                    <Text style={styles.textMain}>Can we contact you with offers, events and our newsletter?</Text>
                                    <View>
                                        <CheckBox
                                            checked={checked}
                                            onPress={() => this.handleCheck()}
                                            checkedColor={whiteColor}
                                            checkedIcon="check-square"
                                        />
                                    </View>
                                </View>
                            </View>
                        </View>
                    </KeyboardAvoidingView>
                </View>
                <View style={styles.buttonOut}>
                    <ButtonMain
                        onPress={() => this.handleSubmit()}
                        isColored={false}
                        label='CONTINUE'
                    />
                    <View style={styles.flexRow}>
                        <Text style={styles.textBottom}>Already signed up? </Text>
                        <TouchableOpacity style={styles.signInTextOut} onPress={() => this.props.navigation.navigate('Login')}>
                            <Text style={styles.textBottom}>Sign in here</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        )
    }
}
export default connect(state => state)(SignUp)

const styles = StyleSheet.create({
    fullHeight: {
        height: height
    },
    fullScreen: {
        height: height,
        width: width,
        position: 'relative',
    },
    mainContainer: {
        marginTop: 52,
        alignItems: 'center',
    },
    formContainer: {
        marginTop: 40,
        width: width - 70,
    },
    textBoxOut: {
        marginTop: 5,
    },
    textOut: {
        paddingTop: 5,
        padding: 15,
        paddingRight: 35,
        flexDirection: 'row',
        alignItems: 'center',
        // justifyContent:'center',
        position: 'relative'
    },
    textMain: {
        color: whiteColor,
        fontSize: fontMedium,
    },
    checkBoxStyle: {
        position: 'absolute',
        right: 10,
        color: whiteColor,
        borderColor: whiteColor
    },
    buttonOut: {
        position: 'absolute',
        bottom: buttonBottom,
        width: '100%',
        justifyContent: 'center',
        alignItems: 'center'
    },
    errorMsgText: {
        fontSize: fontSmall,
        color: errorColor,
        letterSpacing:2,
    },

    fullScreen: {
        height: height,
    },
    mainCon: {
        marginTop: 52,
        alignItems: 'center',
        position: "relative"
    },
    backImageOut: {
        height: 110,
        width: width,
    },
    logoMain: {
        height: 25,
        width: 135,
        position: 'absolute',
        top: '50%'
    },

    textHeading: {
        color: whiteColor,
        fontSize: fontXXL
    },
    textBottom: {
        marginTop: 15,
        color: whiteColor,
        textAlign: 'center',
        fontSize: fontMedium
    },
    flexRow: {
        flexDirection: "row"
    },
    emailIcon: {
        height: 13,
        width: 15
    },
    signInTextOut: {
        borderBottomColor: whiteColor,
        borderBottomWidth: 1
    }
})