import React from 'react'
import { StyleSheet, Text, View, Image, Dimensions, TouchableOpacity } from 'react-native';
import { Container, Content } from 'native-base';
import Header from '../../components/Header';
import TextBox from '../../components/TextField';
import DownButton from '../../components/DownButton';
import microValidator from 'micro-validator'
import { connect } from 'react-redux'
import is from 'is_js'
import { changePassword } from '../../redux/actions';
import Toast, {DURATION} from 'react-native-easy-toast'
import ShowLoader from '../../components/ShowLoader';
var { height, width } = Dimensions.get('window');

let validationSchema = {
    oldPassword:{
        required: {
            errorMsg: 'Old Password is required'
        },
    },
    newPassword:{
        required: {
            errorMsg: 'New Password is required'
        },
    },
}

class ChangePassword extends React.Component {
    constructor() {
        super()
        this.state = {
            errors:{},
            errorPassword:"",
            userData:{
                oldPassword:'',
                newPassword:'',
                confirmPassword:''
            },
            showLoader: false
        }
    }
    static navigationOptions = {
        header: null
    }
    handelChnage(key, event) {
        let { userData } = this.state
        userData[key] = event
        this.setState({ userData, errors: {} , errorPassword:''})
    }
    handelSubmit() {
        let { userData } = this.state 
        const errors = microValidator.validate(validationSchema, userData)
        if (!is.empty(errors)) {
            this.setState({ errors })
            return
        }
        if (userData.newPassword === userData.confirmPassword) {
            let data = {
                old_password: userData.oldPassword,
                new_password: userData.newPassword
            }
            this.setState({ showLoader: true })
            this.props.dispatch(changePassword(data)).then(res => {
                this.setState({ showLoader: false })
                console.log(res,"resssssss")
                if(res.data.message){
                    console.log(this.refs.toast,res.data.message,"res.data.messageres.data.message")
                    this.refs.toast.show(res.data.message);
                }
                if(res.data.message == 'Password updated Successfully'){
                    userData.oldPassword= ''
                    userData.newPassword= ''
                    userData.confirmPassword= ''
                    this.setState({userData})
                    this.props.navigation.navigate('Profile')
                }
            }).catch(err => {
                this.setState({ showLoader: false })
                if(err.data.message){
                    this.refs.toast.show(err.data.message);
                }
            })
        }
        else{
            this.setState({ errorPassword:'Password didn`t match' })
        }
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
        let { errors, errorPassword } = this.state
        return (
            <Container>
                <Content>
                    <View style={{ position: "absolute", height: height, width: '100%' }}>
                        <Image source={require('../../assets/images/bg.png')} style={styles.imageMain}></Image>
                    </View>
                    <Header widthAdjust={styles.widthAdjust}
                        textStyleHeader={styles.textStyleHeader}
                        source={require('../../assets/images/back-white-arrow.png')}
                        label="Change Password"
                        navigation={this.props.navigation} />
                    <View style={styles.conatiner}>
                        <View style={styles.prfilepicOut}>
                            <View style={styles.prolileEditImg}>
                                <Image source={require('../../assets/images/edit.png')} style={styles.imageMain} />
                            </View>
                            <View style={styles.imageOut}>
                                <Image source={require('../../assets/images/person.jpg')} style={styles.imageMain} />
                            </View>
                        </View>
                    </View>
                    <View style={styles.paddingMain}>
                        <View style={styles.margintop20}>
                            <TextBox secureTextEntry={true} label="Old password"  onChange={this.handelChnage.bind(this, 'oldPassword')} />
                            <Text style={styles.errorMsgText}>{errors.oldPassword && errors.oldPassword[0]}</Text>
                        </View>
                        <View style={styles.margintop20}>
                            <TextBox secureTextEntry={true} label="New password"  onChange={this.handelChnage.bind(this, 'newPassword')}/>
                            <Text style={styles.errorMsgText}>{errors.newPassword && errors.newPassword[0]}</Text>
                        </View>
                        <View style={styles.margintop20}>
                            <TextBox secureTextEntry={true} label="Confirm new password"  onChange={this.handelChnage.bind(this, 'confirmPassword')} />
                            <Text style={styles.errorMsgText}>{errorPassword}</Text>
                        </View>
                    </View>
                    
                </Content>
                <Toast
                    ref="toast"
                    style={{backgroundColor: 'rgba(0,0,0,0.7)', width: width - 40}}
                    position='top'
                    fadeInDuration={1000}
                    fadeOutDuration={1000}
                    opacity={0.8}
                    textStyle={{color: '#fff', textAlign: 'center'}}
                />
                {this.handelLoader()}
                <View style={{position: 'absolute',bottom: -20,width: '100%'}}>
                    <DownButton textMain="SAVE CHANGES" onClickBtn={() => this.handelSubmit()}/>
                </View>
            </Container>
        )
    }
}
export default connect(state => state)(ChangePassword)

const styles = StyleSheet.create({
    margintop20: {
        marginTop: 20
    },
    widthAdjust: {
        position: 'absolute',
        right: 20,
        top: -5,
        width: 15,
        height: 18
    },
    imageMain: {
        height: '100%',
        width: '100%',
    },
    textStyleHeader: {
        color: '#fff',
        fontSize: 13,
        marginTop: 12
    },
    conatiner: {
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 99,
        marginTop: 120,
        paddingLeft: 30,
        paddingRight: 30,
    },
    prfilepicOut: {
        position: 'relative',
        height: 80,
        width: 80,
        borderWidth: 1,
        borderColor: '#fff',
        borderRadius: 50,
        elevation: 6,
        shadowColor: "#000000",
        shadowOpacity: 0.3,
        shadowRadius: 10,
        shadowOffset: { height: 2, width: 0 },
    },
    prolileEditImg: {
        height: 16,
        width: 17,
        zIndex: 99,
        position: 'absolute',
        right: -10,
        top: 18
    },
    imageOut: {
        borderRadius: 50,
        overflow: 'hidden'
    },
    innerText: {
        fontSize: 11
    },
    paddingMain:{
        paddingLeft:30,
        paddingRight:30,
        marginBottom: 50
    },
    errorMsgText:{
        fontSize:10, 
        color:"red"
    }
})



