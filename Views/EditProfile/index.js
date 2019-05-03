import React from 'react'
import { StyleSheet, Text, View, Image, Dimensions, TouchableOpacity, CameraRoll } from 'react-native';
import { Container, Content } from 'native-base';
import Header from '../../components/Header';
import TextBox from '../../components/TextField';
import microValidator from 'micro-validator'
import is from 'is_js'
import DownButton from '../../components/DownButton';
import { userDetail, editProfile, getUserDetails, openToast } from '../../redux/actions';
import ShowLoader from '../../components/ShowLoader';
import { connect } from 'react-redux'
import Toast, {DURATION} from 'react-native-easy-toast'
var { height, width } = Dimensions.get('window');

let validationSchema = {
    name:{
        required: {
            errorMsg: 'Name is required'
        },
    },
    age:{
        required: {
            errorMsg: 'Age is required'
        },
    },
    gender:{
        required: {
            errorMsg: 'Gender is required'
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
    job_role:{
        required: {
            errorMsg: 'Job Title is required'
        },
    },
    about:{
        required: {
            errorMsg: 'About you is required'
        },
    },
    address:{
        required: {
            errorMsg: 'Address is required'
        },
    },
    phone_number:{
        required: {
            errorMsg: 'Phone is required'
        },
    },
}

class EditPofile extends React.Component {
    constructor() {
        super()
        this.state = {
            text: '',
            errors:{},
            userData:{
                name:'',
                age:'',
                gender:'',
                email:'',
                job_role:'',
                about:'',
                address:'',
                phone_number:''
            },
            resError:'',
            showLoader: false,
            loader: false
        }
    }
    static navigationOptions = {
        header: null
    }
    componentDidMount(){
        console.log(this.props)
        if(this.props.userData && this.props.userData.user){
            this.setState({ showLoader: true })
            this.props.dispatch(getUserDetails(this.props.userData.user._id)).then(res => {
                console.log(res,"res123")
                this.setState({ showLoader: false, userData: res.data.user })
            })
            .catch(err => {
                this.setState({ showLoader: false })
                if(err.data.message){
                    this.props.dispatch(openToast(err.data.message))
                }
            })
        }
        
    }
    handelChnage(key, event) {
        let { userData } = this.state
        userData[key] = event
        this.setState({ userData, errors: {}, resError:'' })
    }
    handelSubmit() {
        let { userData } = this.state 
        const errors = microValidator.validate(validationSchema, userData)
        if (!is.empty(errors)) {
            this.setState({ errors })
            return
        }
        let data = {
            name: userData.name,
            age: userData.age,
            gender: userData.gender,
            email: userData.email,
            phone_number: userData.phone_number,
            about: userData.about,
            address: userData.address,
            job_role: userData.job_role
        }
        this.setState({ loader: true })
        this.props.dispatch(editProfile(data)).then(res => {
            console.log(res,"resedit")
            this.setState({ loader: false })
            if(res.data.message){
                this.props.dispatch(openToast(res.data.message))
            }
            if(res.data.message === 'profile updated successfully'){
                this.props.navigation.navigate('FooterMain')
            }
        }).catch(err => {
            this.setState({ loader: false })
            if(err.data.message){
                this.props.dispatch(openToast(err.data.message))
            }
        })
        this.setState({ errors: {} })
    }

    handelLoader() {
        let { showLoader, loader, anotherLoader } = this.state
        if (showLoader || loader || anotherLoader) {
            return <ShowLoader />
        } else {
            return null
        }
        return
    }

    getPhoto = () => {
        this.setState({ anotherLoader: true })
        console.log(CameraRoll,)
        CameraRoll.getPhotos({
            first: 200,
            assetType: 'Photos',
        })
        .then(r => {
            this.setState({ anotherLoader: false })
            if(r.edges){
                this.props.navigation.navigate('Gallery', {
                    photos: r.edges
                })
            }
        })
        .catch((err) => {
            this.setState({ anotherLoader: false})
            //Error Loading Images
        })
    }

    render() {
        let { errors, resError, userData } = this.state
        let { user } = this.props.userData
        return (
            <Container>
                <Content>
                    <View style={{ position: "absolute", height: width - 120, width: '100%' }}>
                        <Image source={require('../../assets/images/bg.png')} style={styles.imageMain}></Image>
                    </View>
                    <Header widthAdjust={styles.widthAdjust}
                        textStyleHeader={styles.textStyleHeader}
                        source={require('../../assets/images/back-white-arrow.png')}
                        label="Edit profile"
                        navigation={this.props.navigation} />
                    <TouchableOpacity style={styles.conatiner} onPress={this.getPhoto} activeOpacity={0.7}>
                        <View style={styles.prfilepicOut}>
                            <View style={styles.prolileEditImg}>
                                <Image source={require('../../assets/images/edit.png')} style={styles.imageMain} />
                            </View>
                            <View style={styles.imageOut}>
                                <Image source={user.avatar ? {uri: user.avatar} : require('../../assets/images/person.jpg')} style={styles.imageMain} />
                            </View>
                        </View>
                        <TouchableOpacity onPress={() => this.props.navigation.navigate('ChangePassword')}>
                            <Text style={styles.textChangePass}>Change Password</Text>
                        </TouchableOpacity>
                    </TouchableOpacity>
                    <View style={styles.paddingMain}>
                        <View style={styles.margintop20}>
                            <TextBox label="Name" onChange={this.handelChnage.bind(this, 'name')} value={userData.name}/>
                            <Text style={styles.errorMsgText}>{errors.name && errors.name[0]}</Text>
                        </View>
                        <View style={styles.margintop20}>
                            <TextBox label="Age" type='numeric'  onChange={this.handelChnage.bind(this, 'age')} value={userData.age}/>
                            <Text style={styles.errorMsgText}>{errors.age && errors.age[0]}</Text>
                        </View>
                        <View style={styles.margintop20}>
                            <TextBox label="Gender"  onChange={this.handelChnage.bind(this, 'gender')} value={userData.gender}/>
                            <Text style={styles.errorMsgText}>{errors.gender && errors.gender[0]}</Text>
                        </View>

                        <View style={styles.margintop20}>
                            <TextBox label="Job title"  onChange={this.handelChnage.bind(this, 'job_role')} value={userData.job_role}/>
                            <Text style={styles.errorMsgText}>{errors.job_role && errors.job_role[0]}</Text>
                        </View>
                        <View style={styles.margintop20}>
                            <TextBox styleMainBox={styles.about} label="About"  onChange={this.handelChnage.bind(this, 'about')} value={userData.about} multiline={true}/>
                            <Text style={styles.errorMsgText}>{errors.about && errors.about[0]}</Text>
                        </View>

                        <View style={styles.margintop20}>
                            <TextBox  styleMainBox={styles.address} label="Address"  onChange={this.handelChnage.bind(this, 'address')} value={userData.address} multiline={true} />
                            <Text style={styles.errorMsgText}>{errors.address && errors.address[0]}</Text>
                        </View>

                        <View style={styles.margintop20}>
                            <TextBox label="Phone number"  onChange={this.handelChnage.bind(this, 'phone_number')} value={userData.phone_number}/>
                            <Text style={styles.errorMsgText}>{errors.phone_number && errors.phone_number[0]}</Text>
                        </View>
                        <View style={styles.margintop20}>
                            <TextBox label="Email"  onChange={this.handelChnage.bind(this, 'email')} value={userData.email}/>
                            <Text style={styles.errorMsgText}>{errors.email && errors.email[0]}</Text>
                        </View>
                    </View>
                    
                </Content>
                {this.handelLoader()}
                <View style={{position: 'absolute',width: '100%',bottom: 0}}>
                    <DownButton textMain="SAVE CHANGES" onClickBtn={() => this.handelSubmit()} />
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
            </Container>
        )
    }
}
export default connect(state => state)(EditPofile)

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
        marginTop: width-210,
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
        marginTop: -40
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
    },
    address:{
        height: 50,
        justifyContent: 'flex-start'
    },
    about:{
        height: 70,
        justifyContent: 'flex-start'
    },
    textChangePass:{
        marginTop:10,
        color: '#467bdd',
        fontSize:10
    }
})



