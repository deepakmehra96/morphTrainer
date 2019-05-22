import React from 'react'
import { StyleSheet, Text, View, Image, Dimensions, TouchableOpacity, CameraRoll, Platform } from 'react-native';
import { Container, Content, Picker } from 'native-base';
import Header from '../../components/Header';
import TextBox from '../../components/TextField';
import microValidator from 'micro-validator'
import is from 'is_js'
import DownButton from '../../components/DownButton';
import { userDetail, editProfile, getUserDetails, openToast } from '../../redux/actions';
import ShowLoader from '../../components/ShowLoader';
import { connect } from 'react-redux'
import Toast, { DURATION } from 'react-native-easy-toast'
var { height, width } = Dimensions.get('window');

let validationSchema = {
    name: {
        required: {
            errorMsg: 'Name is required'
        },
    },
    age: {
        required: {
            errorMsg: 'Age is required'
        },
    },
    gender: {
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
    job_role: {
        required: {
            errorMsg: 'Job Title is required'
        },
    },
    about: {
        required: {
            errorMsg: 'About you is required'
        },
    },
    address: {
        required: {
            errorMsg: 'Address is required'
        },
    },
    phone_number: {
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
            errors: {},
            userData: {
                name: '',
                age: '',
                gender: 'GENDER',
                email: '',
                job_role: '',
                about: '',
                address: '',
                phone_number: ''
            },
            resError: '',
            showLoader: false,
            loader: false,
            genderError: ''
        }
    }
    static navigationOptions = {
        header: null
    }
    componentDidMount() {
        console.log(this.props)
        if (this.props.userData && this.props.userData.user) {
            this.setState({ showLoader: true })
            this.props.dispatch(getUserDetails(this.props.userData.user._id)).then(res => {
                console.log(res, "res123")
                this.setState({ showLoader: false, userData: res.data.user })
            })
                .catch(err => {
                    this.setState({ showLoader: false })
                    if (err.data.message) {
                        this.props.dispatch(openToast(err.data.message))
                    }
                })
        }

    }
    handelChnage(key, event) {
        let { userData } = this.state
        if (key === 'gender') {
            this.onValueChange(event)
        }
        userData[key] = event
        this.setState({ userData, errors: {}, resError: '' })
    }
    onValueChange(value) {
        this.setState({
            gender: value
        });
    }
    handelSubmit() {
        let { userData } = this.state
        const errors = microValidator.validate(validationSchema, userData)
        if (userData.gender == 'GENDER') {
            this.setState({ genderError: "Gender is required" })
            if (!is.empty(errors)) {
                this.setState({ errors })
                return
            }
        } else {
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
                console.log(res, "resedit")
                this.setState({ loader: false })
                if (res.data.message) {
                    this.props.dispatch(openToast(res.data.message))
                }
                if (res.data.message === 'profile updated successfully') {
                    this.props.navigation.navigate('FooterMain')
                }
            }).catch(err => {
                this.setState({ loader: false })
                if (err.data.message) {
                    this.props.dispatch(openToast(err.data.message))
                }
            })
            this.setState({ errors: {} })
        }
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
        console.log(CameraRoll)
        CameraRoll.getPhotos({
            first: 200,
            assetType: 'Photos',
        })
            .then(r => {
                this.setState({ anotherLoader: false })
                if (r.edges) {
                    this.props.navigation.navigate('Gallery', {
                        photos: r.edges
                    })
                }
            })
            .catch((err) => {
                this.setState({ anotherLoader: false })
                //Error Loading Images
            })
    }

    render() {
        let { errors, resError, userData, genderError } = this.state
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
                    <View style={styles.conatiner}>
                        <TouchableOpacity style={styles.prfilepicOut} onPress={this.getPhoto} activeOpacity={0.7}>
                            <View style={styles.prolileEditImg}>
                                <Image source={require('../../assets/images/edit.png')} style={styles.imageMain} />
                            </View>
                            <View style={styles.imageOut}>
                                <Image source={user.avatar ? { uri: user.avatar } : require('../../assets/images/person.jpg')} style={styles.imageMain} />
                            </View>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => this.props.navigation.navigate('ChangePassword')}>
                            <Text style={styles.textChangePass}>Change Password</Text>
                        </TouchableOpacity>
                    </View>
                    <View style={styles.paddingMain}>
                        <View style={styles.margintop20}>
                            <TextBox label="Name" onChange={this.handelChnage.bind(this, 'name')} value={userData.name} />
                            <Text style={styles.errorMsgText}>{errors.name && errors.name[0]}</Text>
                        </View>
                        <View style={styles.margintop20}>
                            <TextBox label="Age" type='numeric' onChange={this.handelChnage.bind(this, 'age')} value={userData.age} />
                            <Text style={styles.errorMsgText}>{errors.age && errors.age[0]}</Text>
                        </View>
                        {/* <View style={styles.margintop20}>
                            <TextBox label="Gender"  onChange={this.handelChnage.bind(this, 'gender')} value={userData.gender}/>
                            <Text style={styles.errorMsgText}>{errors.gender && errors.gender[0]}</Text>
                        </View> */}

                        <View style={[styles.relitive, { borderRadius: 5, zIndex: 999, borderColor: '#d1d1d1', borderWidth: 1, marginBottom: 10, paddingLeft: 1, paddingRight: 10, height: 50 }]}>
                            <Picker
                                note
                                mode="dropdown"
                                style={Platform.OS == 'android' ? { width: '100%', backgroundColor: '#fff', color: "#000", marginTop: 10, fontSize: 22, marginLeft: 5, height: 30 } : { paddingTop: 10, width: '100%', backgroundColor: '#fff' }}
                                selectedValue={userData.gender}
                                placeholder="Select Gender"
                                textStyle={Platform.OS == 'android' ? { color: "#000", fontSize: 12, marginTop: 10 } : { color: "#000", fontSize: 12, paddingTop: 15 }}
                                placeholderStyle={{ color: "#000", fontSize: 12, marginTop: 16 }}
                                onValueChange={this.handelChnage.bind(this, 'gender')}
                                iosIcon={<Image source={require('../../assets/images/down_arrow.png')} style={{ width: 12, height: 8, marginRight: 15 }} />}
                            >
                                <Picker.Item label="Select Gender" value="GENDER" />
                                <Picker.Item label="Male" value="Male" />
                                <Picker.Item label="Female" value="Female" />
                            </Picker>
                            {Platform.OS == 'android' ?
                                <View style={{ position: 'absolute', right: 15, top: 20, width: 12, height: 8 }}>
                                    <Image source={require('../../assets/images/down_arrow.png')} style={{ width: '100%', height: '100%' }} />
                                </View> : <View>

                                </View>
                            }

                            <View style={{ position: 'absolute', left: 15, top: 5 }}>
                                <Text style={{ fontSize: 12, color: '#467bdd' }}>Gender</Text>
                            </View>
                            <Text style={[styles.errorMsgText, { position: 'absolute', bottom: -14, width: '100%', left: 0 }]}>
                                {errors.gender && errors.gender[0] || genderError && genderError}
                            </Text>
                        </View>

                        <View style={styles.margintop20}>
                            <TextBox label="Job title" onChange={this.handelChnage.bind(this, 'job_role')} value={userData.job_role} />
                            <Text style={styles.errorMsgText}>{errors.job_role && errors.job_role[0]}</Text>
                        </View>
                        <View style={styles.margintop20}>
                            <TextBox styleMainBox={styles.about} label="About" onChange={this.handelChnage.bind(this, 'about')} value={userData.about} multiline={true} />
                            <Text style={styles.errorMsgText}>{errors.about && errors.about[0]}</Text>
                        </View>

                        <View style={styles.margintop20}>
                            <TextBox styleMainBox={styles.address} label="Address" onChange={this.handelChnage.bind(this, 'address')} value={userData.address} multiline={true} />
                            <Text style={styles.errorMsgText}>{errors.address && errors.address[0]}</Text>
                        </View>

                        <View style={styles.margintop20}>
                            <TextBox label="Phone number" onChange={this.handelChnage.bind(this, 'phone_number')} value={userData.phone_number} />
                            <Text style={styles.errorMsgText}>{errors.phone_number && errors.phone_number[0]}</Text>
                        </View>
                        <View style={styles.margintop20}>
                            <TextBox label="Email" onChange={this.handelChnage.bind(this, 'email')} value={userData.email} />
                            <Text style={styles.errorMsgText}>{errors.email && errors.email[0]}</Text>
                        </View>
                    </View>

                </Content>
                {this.handelLoader()}
                <View style={{ position: 'absolute', width: '100%', bottom: 0 }}>
                    <DownButton textMain="SAVE CHANGES" onClickBtn={() => this.handelSubmit()} />
                </View>
                <Toast
                    ref="toast"
                    style={{ backgroundColor: 'rgba(0,0,0,0.7)', width: width - 40 }}
                    position='bottom'
                    fadeInDuration={1000}
                    fadeOutDuration={1000}
                    opacity={0.8}
                    textStyle={{ color: '#fff', textAlign: 'center' }}
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
        marginTop: width - 210,
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
    paddingMain: {
        paddingLeft: 30,
        paddingRight: 30,
        marginBottom: 50
    },
    errorMsgText: {
        fontSize: 10,
        color: "red"
    },
    address: {
        height: 50,
        justifyContent: 'flex-start'
    },
    about: {
        height: 70,
        justifyContent: 'flex-start'
    },
    textChangePass: {
        marginTop: 10,
        color: '#467bdd',
        fontSize: 10
    },
    relitive: {
        position: 'relative',
        width: '100%',
        marginTop: 15
    },
})



