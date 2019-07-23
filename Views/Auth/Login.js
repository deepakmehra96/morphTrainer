import React from 'react';
import { View, Text, Dimensions, StyleSheet, TouchableOpacity, KeyboardAvoidingView, Platform, AsyncStorage } from 'react-native';
import { connect } from 'react-redux'
import microValidator from 'micro-validator'
import is from 'is_js'
import { errorColor, fontLarge, whiteColor, fontMedium, buttonBottom } from '../../components/constant';
import TextBox from '../../components/TextField.js';
import ButtonMain from '../../components/ButtonMain';
import { LoginApi } from '../../redux/actions';
import BackgroundText from '../../components/BackgroundText';
import BackgroundContent from '../../components/BackgroundContent';
var { height, width } = Dimensions.get('window')

let validationSchema = {
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

class Login extends React.Component {
    static navigationOptions = {
        header: null
    }
    constructor() {
        super()
        this.state = {
            checked: true,
            userData: {
                email: '',
                password: ''
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
            email: userData.email,
            password: userData.password,
        }
        this.props.dispatch(LoginApi(data))

        //empty textBoxes
        userData.email = '',
            userData.password = '',
            this.setState({ userData })
        this.props.navigation.navigate("LoggedinTabs")
        AsyncStorage.setItem('token','sdhfvhbskdguvhdbouhj')
    }

    render() {
        let { userData, errors } = this.state
        return (
            <View style={styles.fullScreen}>
                <BackgroundContent />
                <KeyboardAvoidingView
                    behavior={Platform.OS == 'ios' ? 'position' : 'position'}
                >
                    <View style={styles.mainContainer}>
                        <BackgroundText showImage={true} textHeading="SIGN IN" />
                        <View style={styles.formContainer}>
                            <View style={styles.textBoxOut}>
                                <TextBox
                                    mode='outline'
                                    placeholder="Email"
                                    onChangeText={this.handleChange.bind(this, 'email')}
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
                                    onChangeText={this.handleChange.bind(this, 'password')}
                                    value={userData.password}
                                    rightIcon={require('../../assets/lock.png')}
                                    password={true}
                                />
                                <Text style={styles.errorMsgText}>{errors.password && errors.password[0]}</Text>
                            </View>
                        </View>
                    </View>
                </KeyboardAvoidingView>
                <View style={styles.buttonOut}>
                    <ButtonMain
                        onPress={() => this.handleSubmit()}
                        isColored={false}
                        label='CONTINUE'
                    />
                    <View style={styles.flexRow}>
                        <Text style={styles.textBottom}>Not signed up yet? </Text>
                        <TouchableOpacity style={styles.signUpTextOut} onPress={() => this.props.navigation.navigate('SignUp')}>
                            <Text style={styles.textBottom}>Sign up here</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        )
    }
}
export default connect(state => state)(Login)

const styles = StyleSheet.create({
    fullScreen: {
        height: height,
    },
    mainContainer: {
        marginTop: 52,
        alignItems: 'center',
    },
    formContainer: {
        width: width - 80,
        // height: height - 350,
        marginTop: 50,
        // justifyContent: 'center'
    },
    flexRow:{ 
        flexDirection: 'row' 
    },
    textBoxOut: {
        marginTop: 25,
    },
    errorMsgText: {
        fontSize: fontLarge,
        letterSpacing:2,
        color: errorColor
    },
    signUpText: {
        color: 'blue'
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
        fontSize: fontMedium,
        textAlign: 'center',
    },
    emailIcon: {
        height: 13,
        width: 15
    },
    signUpTextOut: {
        borderBottomColor: whiteColor,
        borderBottomWidth: 1,
    }
})