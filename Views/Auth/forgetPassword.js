import React from 'react'
import { ScrollView, StyleSheet, Text, View, Image, TextInput, Dimensions, TouchableOpacity } from 'react-native';
import { Container, Content } from 'native-base';
import Header from '../../components/Header';
import GradientButton from '../../components/GradientButton';
import TextBox from '../../components/TextField';
import microValidator from 'micro-validator'
import is from 'is_js'
import { forgotPassword, openToast } from '../../redux/actions';
import { connect } from 'react-redux'
import ShowLoader from '../../components/ShowLoader';
import Toast, {DURATION} from 'react-native-easy-toast'
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
}

class ForgetPassword extends React.Component {
    static navigationOptions = {
        header: null
    }
    constructor() {
        super()
        this.state = {
            email: '',
            errors:{},
            showLoader: false
        }
    }
    handelChnage(event, key) {
        this.setState({ email : event })
    }
    handleValidation = () => {
        let { email } = this.state  
        console.log(email,'email')
        const errors = microValidator.validate(validationSchema, {email})
            console.log(errors,"errors")

        if (!is.empty(errors)) {
            console.log(errors,"errors")
            this.setState({ errors })
            return
        }
        this.setState({ showLoader: true })
        this.props.dispatch(forgotPassword({email: email})).then(res => {
            this.setState({ showLoader: false })
            console.log(res,"response")
            if(res.data.msg === 'Mail has been sent successfully'){
                this.props.navigation.navigate('SignIn')
            }
            if(res.data.msg){
                this.props.dispatch(openToast(res.data.msg))
            }
        }).catch(error => {
            this.setState({ showLoader: false })
            console.log(error,"error")
            if(error.data.message){
                this.props.dispatch(openToast(error.data.message))
            }
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
        let { errors } = this.state
        return (
            <Container>
                <Content>
                    <View style={styles.con}>
                        <Header 
                            source={require('../../assets/images/back-btn.png')} 
                            label="Forgot Password" navigation={this.props.navigation}/>
                        <View style={styles.main}>
                            <View style={styles.imageLogo}>
                                <Image style={styles.imageMain} source={require('../../assets/images/logo.png')} />
                            </View>
                            <View>
                                <Text style={styles.textForget}>
                                    We just need your registered email address to send your password reset.
                                </Text>
                            </View>
                            <View style={styles.relitive}>
                                <TextBox label="Email" onChange={this.handelChnage.bind(this)}/>
                                <Text style={{fontSize:10, color:"red"}}>{errors.email && errors.email[0]}</Text>
                            </View>
                            <View style={[styles.marginTop20, styles.width100]}>
                                <GradientButton onClickBtn={() => this.handleValidation()} source={require('../../assets/images/reset-password.png')} />
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
export default connect(state => state)(ForgetPassword)

const styles = StyleSheet.create({
    width100: {
        width: '100%'
    },
    imageMain:{
        width:'100%',
        height:'100%'
    },
    imageLogo: {
        marginTop: 40,
        marginBottom: 20,
        height:70,
        width:130
    },
    con: {
        backgroundColor: '#fff',
        alignItems: 'center',
        height:height
    },
    main: {
        alignItems: 'center',
        width: width - 50,
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
    relitive: {
        position: 'relative',
        width: '100%',
        marginTop:50
    },
    textMargin: {
        marginTop: 20
    },
    marginTop20: {
        marginTop: '20%'
    },
    textForget:{
        fontSize:11,
        textAlign:'center',
        paddingLeft:30, 
        paddingRight:30
    }

});
