import React from 'react'
import { StyleSheet, Text, View, Image, Dimensions, TouchableOpacity, AsyncStorage } from 'react-native';
import { Container, Content, CheckBox } from 'native-base';
import Header from '../../components/Header';
import GradientButton from '../../components/GradientButton';
import TextBox from '../../components/TextField';
import microValidator from 'micro-validator'
import is from 'is_js'
import { coachLogin, openToast } from '../../redux/actions';
import { connect } from 'react-redux'
import Toast, {DURATION} from 'react-native-easy-toast'
import ShowLoader from '../../components/ShowLoader';

var { height, width } = Dimensions.get('window');
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
    }
}

class SignIn extends React.Component {
    static navigationOptions = {
        header: null
    }
    constructor() {
        super()
        this.state = {
            userData: {
                email: '',
                password: ''
            },
            checked: false,
            errors:{},
            showLoader: false
        }
    }
    handelChnage(key, event) {
        let { userData } = this.state
        userData[key] = event
        this.setState({ userData })
    }
    handleCheck() {
        let { checked } = this.state
        this.setState({ checked: !checked })
    }
    showCheck() {
        let { checked } = this.state
        if (checked) {
            return (
                <View style={styles.checkboxOut}>
                    <Image style={styles.imageMain} source={require('../../assets/images/checked.png')} />
                </View>
            )
        } else {
            return (
                <View style={styles.checkboxOut}>
                    <Image style={styles.imageMain} source={require('../../assets/images/unchecked.png')} />
                </View>
            )
        }
    }
    handleValidation = () => {
        let { userData, checked } = this.state 
        const errors = microValidator.validate(validationSchema, userData)

        if (!is.empty(errors)) {
            this.setState({ errors })
            return
        }
        this.setState({ showLoader: true })
        this.props.dispatch(coachLogin(userData)).then(async res => {
            console.log(res,"response")
            this.setState({ showLoader: false })
            if(res.data.msg === 'Logged in successfully' && !checked){
                userData.email= ''
                userData.password= ''
                this.setState({userData})
            }
            if(res.data.msg === 'Logged in successfully'){
                this.props.navigation.navigate('FooterMain')
            }
            if (checked) {
                await AsyncStorage.setItem('remember', 'true')
            }
            if(res.data.msg){
                this.props.dispatch(openToast(res.data.msg))
            }
        }).catch(err => {
            this.setState({ showLoader: false })
            if(err.data.msg){
                this.props.dispatch(openToast(err.data.msg))
            }
            console.log(err,"err")
        })
        this.setState({ errors: {} })
    }

    handelLoader() {
        let { showLoader } = this.state
        if (showLoader) {
            return <ShowLoader />
        } else {
            return null
        }
        return
    }
    render() {
        let { email,password } = this.state.userData
        let { errors } = this.state
        return (
            <Container>
                <Content>
                    <View style={styles.con}>
                        <Header label="Sign In" navigation={this.props.navigation} />
                        <View style={styles.main}>
                            <View style={styles.imageLogo}>
                                <Image style={styles.imageMain} source={require('../../assets/images/logo.png')} />
                            </View>
                            <View style={styles.relitive}>
                                <TextBox label="Login" onChange={this.handelChnage.bind(this, 'email')} value={email}/>
                                <Text style={{fontSize:10, color:"red"}}>{errors.email && errors.email[0]}</Text>
                            </View>
                            <View style={[styles.relitive, styles.textMargin]}>
                                <TextBox label="Password" secureTextEntry={true} onChange={this.handelChnage.bind(this, 'password')} value={password}/>
                                <Text style={{fontSize:10, color:"red"}}>{errors.password && errors.password[0]}</Text>
                            </View>
                            <View style={styles.ALignInRow}>
                                <View style={styles.rememberTextMain}>
                                    <TouchableOpacity onPress={() => this.handleCheck()} style={styles.flexRow}>
                                        {this.showCheck()}
                                        <Text style={styles.remeberText}>Remember me</Text>
                                    </TouchableOpacity>
                                </View>
                                <View style={styles.forgotTextMain}>
                                    <TouchableOpacity onPress={() => this.props.navigation.navigate('ForgetPassword')} >
                                        <Text style={styles.forgotText}>Forgot Password?</Text>
                                    </TouchableOpacity>
                                </View>
                            </View>
                            <View style={[styles.marginTop20, styles.width100]}>
                                <GradientButton source={require('../../assets/images/sign-in.png')} onClickBtn={() => this.handleValidation()} />
                            </View>
                        </View>
                    </View>
                    <Toast
                        ref="toast"
                        style={{backgroundColor: 'rgba(0,0,0,0.7)', width: width - 40}}
                        position='bottom'
                        fadeInDuration={1000}
                        fadeOutDuration={1000}
                        opacity={0.8}
                        textStyle={{color: '#fff', textAlign: 'center'}}
                    />
                </Content>
                {this.handelLoader()}
            </Container>
        )
    }
}
export default connect(state => state)(SignIn)

const styles = StyleSheet.create({
    flexRow: {
        flexDirection: 'row'
    },
    con: {
        alignItems: 'center',
        height: height
    },
    width100: {
        width: '100%',
    },
    flex1: {
        // flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    alignCenter: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 20
    },
    imageMain: {
        width: '100%',
        height: '100%'
    },
    imageLogo: {
        marginTop: 30,
        marginBottom: 45,
        height: 70,
        width: 130
    },
    main: {
        alignItems: 'center',
        width: width - 50,
    },
    label: {
        fontSize: 18,
        marginTop: 50
    },
    textField: {
        width: width - 50,
        borderWidth: 1,
        borderColor: '#b0aeae',
        borderRadius: 5,
        display: 'flex',
        alignItems: 'flex-end',
        justifyContent: 'flex-end',
        paddingTop: 25,
        paddingBottom: 8,
        paddingLeft: 20
    },
    rememberTextMain: {
        width: '50%',
        flexDirection: 'row'
    },
    forgotTextMain: {
        alignItems: 'flex-end',
        width: '50%'
    },
    relitive: {
        position: 'relative',
        width: '100%'
    },
    textMargin: {
        marginTop: 25
    },
    marginTop20: {
        height:'50%',
        justifyContent:'center',
        alignItems:'center'
    },
    inputLableFirst: {
        color: '#467bdd',
        position: 'absolute',
        marginTop: 20,
        paddingLeft: 22,
        fontSize: 12
    },
    inputLable: {
        color: '#467bdd',
        position: 'absolute',
        marginTop: 10,
        paddingLeft: 22,
        fontSize: 12
    },
    ALignInRow: {
        display: 'flex',
        flexDirection: 'row',
        position: 'relative',
        width: width - 50,
        marginTop: 10
    },
    remeberText: {
        fontSize: 11,
        paddingLeft: 5,
        paddingTop: 2
    },
    forgotText: {
        fontSize: 11,
        color: '#eaa057',
        paddingTop: 2
    },
    borderOutMain: {
        flexDirection: 'row',
        marginTop: 10
    },
    TextExtra: {
        fontSize: 12,
        width: 30,
        textAlign: 'center'
    },
    borderExtra: {
        marginTop: 7,
        borderTopWidth: 1,
        borderColor: 'grey',
        width: 80,
    },
    fbBTn: {
        backgroundColor: '#3e5d93',
        width: '100%',
        height: 40,
        borderRadius: 20,
        alignItems: 'center',
        justifyContent: 'center'
    },
    fbText: {
        fontSize: 14,
        color: '#fff'
    },
    colorOrange: {
        color: '#eaa057',
        fontSize: 11,
        paddingLeft: 3
    },
    textAccountContent: {
        fontSize: 11
    },
    fbBtnMargin: {
        marginTop: 30
    },
    checkBoxMain: {
        height: 20,
        width: 20
    },
    checkboxOut: {
        height: 18,
        width: 18
    }
});
