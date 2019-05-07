import React from 'react'
import { StyleSheet, Text, View, Image, Dimensions, TouchableOpacity, CameraRoll, TextInput } from 'react-native';
import { Container, Content, Tabs, Tab, Picker } from 'native-base';
import Dialog, { SlideAnimation, DialogContent } from 'react-native-popup-dialog';
import { connect } from 'react-redux'
import Header from '../../../components/Header';
import DownButton from '../../../components/DownButton';
import GradientBtn from '../../../components/LinearGradient';
import { ticketReasonList, createTicket, ticketList, openToast } from '../../../redux/actions';
import ShowLoader from '../../../components/ShowLoader';
import microValidator from 'micro-validator'
import is from 'is_js'
var { height, width } = Dimensions.get('window');

let validationSchema = {
    title: {
        required: {
            errorMsg: 'Title is required'
        },
    },
    message: {
        required: {
            errorMsg: 'Message is required'
        },
    },
    reason: {
        required: {
            errorMsg: 'Reason is required'
        },
    }
}

class CreateYourTicket extends React.Component {
    constructor() {
        super()
        this.state = {
            list: [1,1,1,1,1],
            ticketModal: false,
            showLoader: false,
            reasonList: [],
            ticketData: {
                title: '',
                name: 'my ticket name',
                message: '',
                reason: ''
            },
            errors: {},
            loader: false
        }
    }
    static navigationOptions = {
        header: null
    }
    componentDidMount(){
        this.setState({ showLoader: true })
        this.props.dispatch(ticketReasonList()).then(res => {
            console.log(res,"ressss")
            this.setState({ showLoader: false, reasonList: res.data.data })
        }).catch(err => {
            this.setState({ showLoader: false })
        })
    }

    onChange = (key, event) => {
        console.log(event,"event")
        let { ticketData } = this.state
        if(key == 'reason'){
            this.onValueChange(event)
        }
        ticketData[key] = event
        this.setState({ ticketData, errors: {}, resError: '' })
    }

    onValueChange = (event) => {
        console.log(event,'hi')
        this.setState({ reason: event })
    }

    handelSubmit = () => {
        // this.setState({ ticketModal: true })
        let { ticketData } = this.state
        let { user } = this.props.userData
        const errors = microValidator.validate(validationSchema, ticketData)
        if (!is.empty(errors)) {
            this.setState({ errors })
            return
        }
        let data = {
            title: ticketData.title,
            name: ticketData.name,
            message: ticketData.message,
            reason: ticketData.reason,
            userId: user._id
        }
        this.setState({ showLoader: true, loader: true })
        this.props.dispatch(createTicket(data)).then(res => {
            console.log(res,"ressss123")
            this.setState({ showLoader: false })
            if(res.data.message){
                this.props.dispatch(openToast(res.data.message))
            }
            if(res.data.message === 'Ticket created successfully'){
                ticketData.title=''
                ticketData.reason= ''
                ticketData.message= ''
                this.setState({ticketData})
                this.props.dispatch(ticketList(user._id)).then(res => {
                    console.log(res,"res1234567")
                    if(res.data.message === 'ticket List'){
                        console.log('hipgl')
                        this.setState({ ticketModal: true })
                    }
                    this.setState({ loader: false })
                }).catch(err => {
                    this.setState({ loader: false })
                })
            }
        }).catch(err => {
            this.setState({ showLoader: false })
            if(err.data.message){
                this.props.dispatch(openToast(err.data.message))
            }
        })

    }

    handelLoader() {
        let { showLoader, loader } = this.state
        if (showLoader || loader) {
            return <ShowLoader />
        } else {
            return null
        }
        return
    }
   
    render() {
        let { list, ticketModal, reasonList, errors, ticketData } = this.state;
        console.log(ticketData,"ticketDataticketData")
        return (
            <Container>
                <Header navigation={this.props.navigation} label="CREATE YOUR TICKET" source={require('../../../assets/images/back-btn.png')} backText="CANCEL" widthAdjust={{position: 'absolute',right: 25,top: 10,width: 35,borderBottomWidth: 1}} backStyle={{fontSize: 9,letterSpacing: -1,fontWeight: 'bold'}} handleRightBtn={() => this.props.navigation.goBack()} borderStyle={{borderBottomWidth: 1, borderColor: '#e6e6e6',paddingBottom: 10}}/>
                <Content>
                    <View style={styles.mainList}>
                        <View style={{marginBottom: 30}}>
                            <View style={styles.titleView}>
                                <Text style={styles.greyText}>Ticket Title</Text>
                                <View style={styles.startStyle}><Text style={styles.redText}>*</Text></View>
                            </View>
                            <View style={styles.mainTextView}>
                                <TextInput
                                    style={{height: 30, borderColor: '#e6e6e6', borderBottomWidth: 1, fontSize: 12}}
                                    onChangeText={this.onChange.bind(this, 'title')}
                                    placeholder="e.g#11023"
                                    placeholderTextColor="#000"
                                    value={ticketData.title}
                                />
                                <Text style={styles.errorMsgText}>{errors.title && errors.title[0]}</Text>
                            </View>
                        </View>
                        <View style={{marginBottom: 30}}>
                            <View style={styles.titleView}>
                                <Text style={styles.greyText}>Reasons</Text>
                                <View style={styles.startStyle}><Text style={styles.redText}>*</Text></View>
                            </View>
                            <View style={styles.mainTextView}>
                                <View style={{borderBottomWidth: 1,borderBottomColor: '#e6e6e6'}}>
                                    <Picker
                                        mode="dropdown"
                                        note
                                        style={{ width: '100%',backgroundColor: '#fff',color: 'red',  height: 30, borderRadius: 0,marginLeft: -20 }}
                                        selectedValue={ticketData.reason}
                                        textStyle={{ color: "#000", fontSize: 12}}
                                        placeholder="e.g Transaction, Campaign"
                                        placeholderStyle={{ color: "#000", fontSize: 12 }}
                                        onValueChange={this.onChange.bind(this, 'reason')}
                                        iosIcon={<Image source={require('../../../assets/images/down_arrow.png')} style={{width: 12, height: 8,marginRight: -5}}/>}
                                        >
                                        {reasonList.map((itm, key) => {
                                            return(
                                                <Picker.Item label={itm.reason} value={itm._id} key={key}>{itm.reason}</Picker.Item>
                                            )
                                        })}
                                    </Picker>
                                </View>
                                <Text style={styles.errorMsgText}>{errors.reason && errors.reason[0]}</Text>
                            </View>
                        </View>
                        <View style={{marginBottom: 30}}>
                            <View style={styles.titleView}>
                                <Text style={styles.greyText}>Messsage</Text>
                                {/* <View style={styles.startStyle}><Text style={styles.redText}>*</Text></View> */}
                            </View>
                            <View style={[styles.mainTextView,{height: 80}]}>
                                <TextInput
                                    style={{height: 80, borderColor: '#e6e6e6', borderBottomWidth: 1, fontSize: 12, justifyContent: 'flex-start',paddingRight: 5}}
                                    onChangeText={this.onChange.bind(this, 'message')}
                                    placeholder="Write your text here..."
                                    placeholderTextColor="#000"
                                    multiline={true}
                                    value={ticketData.message}
                                />
                                <Text style={styles.errorMsgText}>{errors.message && errors.message[0]}</Text>
                            </View>
                        </View>
                    </View>
                </Content>
                {this.handelLoader()}
                <View style={{position: 'absolute',width: '100%',bottom: 0}}>
                    <DownButton textMain="SUBMIT" onClickBtn={() => this.handelSubmit()} />
                </View>
                <Dialog
                    visible={ticketModal}
                    dialogAnimation={new SlideAnimation({
                    slideFrom: 'bottom',
                    })}
                    onTouchOutside={() => {
                        this.setState({ ticketModal: false })
                    }}
                    dialogStyle={[{backgroundColor: 'transparent',width: '100%',padding: 0}]}
                    containerStyle={{justifyContent: 'center',padding: 20,width: '100%'}}
                >
                    <DialogContent>
                        <View style={{marginLeft: -20,marginRight: -20}}>
                            <View style={{height: 100,width: 100,alignSelf: 'center',zIndex: 10}}>
                                <Image source={require('../../../assets/images/popup-right.png')} style={{height: '100%',width: '100%'}}/>
                            </View>
                            <View style={{backgroundColor: '#fff',marginTop: -50,borderRadius: 10,padding: 20, paddingTop: 30}}>
                                <View style={{marginTop: 40,alignItems: 'center'}}>
                                    <Text style={styles.orangeText}>SUCCESS!</Text>
                                </View>
                                <View style={{alignItems: 'center',padding: 40,paddingTop: 30}}>
                                    <Text style={[styles.orangeText,{fontSize: 14,textAlign: 'center'}]}>Ticket has been created successfully.</Text>
                                </View>
                                <View style={styles.alignRowGoals}>
                                    <TouchableOpacity style={{height: 40,marginLeft: 60,marginRight: 60}} onPress={() => {
                                        this.setState({ ticketModal: false })
                                        this.props.navigation.navigate('Ticket')
                                        }
                                    }>
                                        <GradientBtn text="SUCCESS" style={{height: 40}} btnStyle={{fontWeight: 'bold'}}/>
                                    </TouchableOpacity>
                                </View>
                            </View>
                        </View>
                    </DialogContent>
                </Dialog>
            </Container>
        )
    }
}
export default connect(state => state)(CreateYourTicket)

const styles = StyleSheet.create({
    mainList: {
        marginTop: 50
    },
    titleView: {
        position: 'absolute',
        left: 10,
        top: 5
    },
    mainTextView: {
        paddingLeft: 100
    },
    greyText: {
        color: '#a2a2a2',
        fontSize: 12
    },
    startStyle: {
        position: 'absolute',
        top: -5, 
        right: -7
    },
    redText: {
        color: 'red'
    },
    orangeText: {
        color: '#ed5736',
        fontSize: 18,
        fontWeight: 'bold'
    },
    alignRowGoals: {
        elevation: 7,
        shadowColor: "#000000",
        shadowOpacity: 0.4,
        shadowRadius: 5,
        shadowOffset: { height: 2, width: 1 },
        borderRadius: 5
    },
    errorMsgText: {
        fontSize: 10,
        color: "red"
    }
})



