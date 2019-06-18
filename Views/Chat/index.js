import React from 'react'
import { Text, View, TextInput, ScrollView, Dimensions, KeyboardAvoidingView, StyleSheet, Image, Platform,TouchableOpacity, Linking } from 'react-native';
import { connect } from 'react-redux'
import { Container, Content } from 'native-base';
import Header from '../../components/Header';
import LinearGradient from 'react-native-linear-gradient';
import ShowLoader from '../../components/ShowLoader';
import { getConverstationById, setConversationDetails, setConverstation, setMessage } from '../../redux/actions';
import moment from 'moment'

var { height, width } = Dimensions.get('window');

class Chat extends React.Component {
    constructor() {
        super()
        this.state = {
            toggle: false,
            ChatArr: [],
            chatBox: '',
            showLoader: false,
            coachDetails:{}
        }
    }
    static navigationOptions = {
        header: null
    }

    componentDidMount() {
        let { user } = this.props.userData
        let { customer } = this.props.navigation.state && this.props.navigation.state.params
        let participants = [user._id, customer._id]
        this.setState({ showLoader: true })
        this.props.dispatch(setConverstation({ participants })).then(res => {
            this.props.dispatch(setConversationDetails(res.data))

            let { user } = this.props.userData
            getConverstationById(res.data._id, user._id)
                .then(res => {
                    console.log(res,"res")
                    this.setState({ showLoader: false })
                    if (res.status == 200) {
                        this.setState({
                            ChatArr: res.data.messages,
                            conversationResposnse: res.data.conversation,
                            showLoader: false
                        })
                    }
                })
        }).catch(err => {
            this.setState({ showLoader: false })
            console.log({ ...err }, "err")
        })
    }
    componentWillReceiveProps(nextprops) {
        if (!!nextprops.userData.message) {
            let data = this.state.ChatArr;
            data.push({ value: nextprops.userData.message })
            this.setState({ ChatArr: data })
            this.props.dispatch(setMessage(''))
        }
    }

    handleChatMessages(val, index) {
        let { user } = this.props.userData
        let { customer } = this.props.navigation.state && this.props.navigation.state.params
        if (val.from == user._id) {
            return (
                <LinearGradient colors={['#f7b944', '#f49a3e', '#ef6937']} style={styles.sentMsgOutMain}>
                    <View style={styles.sentMsgOut}>
                        <Text style={styles.sentMsg}>
                            {val.value}
                        </Text>
                    </View>
                    <Text style={styles.timeMainSend}>
                        {this.getTime(val.updatedAt)}
                    </Text>
                </LinearGradient>
            )
        } else {
            return (
                <View style={styles.messageOutImage}>
                    <View style={styles.profileImageOut}>
                        <Image  source={customer.avatar ? {uri: customer.avatar} : require('../../assets/images/person.jpg')} style={styles.imageMain} />
                    </View>
                    <View key={index} style={styles.recieveMsgOutMain}>
                        <View style={styles.recieveMsgOut}>
                            <Text style={styles.recieveMsg}>
                                {val.value}
                            </Text>
                        </View>
                        <Text style={styles.timeMainRecieve}>
                            {this.getTime(val.updatedAt)}
                        </Text>
                    </View>
                </View>

            )
        }
    }
    getTime(date) {
        let newDate = moment(date)
        newDate = newDate.format('hh:mm A')
        return newDate
    }


    sendMessage() {
        let { user } = this.props.userData
        let { customer } = this.props.navigation.state && this.props.navigation.state.params

        let { chatBox } = this.state
        let socket = this.props.navigation.getScreenProps()
        if (chatBox) {
            let sendingData = {
                from: user._id,
                to: customer._id,
                value: chatBox,
                conversation: this.state.conversationResposnse,
                conversationId: this.state.conversationResposnse._id,
                participants: this.state.conversationResposnse.participants,
            }
            socket.socket.emit('sendMessage', sendingData)
            let messages = this.state.ChatArr;
            messages.push(sendingData);
            this.setState({ ChatArr: messages, chatBox: '' })
            socket.socket.on('receivedMessage', data => {
                console.log(data, "datarecieved")
            })
        }
    }


    handelChnage(key, event) {
        let { chatBox } = this.state
        chatBox = event
        this.setState({ chatBox, errors: {} })
    }
    handelLoader() {
        let { showLoader, loader } = this.state
        if (showLoader || loader) {
            return <ShowLoader />
        } else {
            return null
        }
    }

    handleCall(){
        let { customer } = this.props.navigation.state && this.props.navigation.state.params
        console.log(customer,"coachDetails.phone_number")


        if (Platform.OS == 'ios') {
            Linking.openURL(`tel://${customer.phone_number || 555555}`)
        }else{
            Linking.openURL(`tel:${customer.phone_number || 555555}`)
        }
    }
    render() {
        let { chatBox } = this.state
        let { customer } = this.props.navigation.state && this.props.navigation.state.params
        return (
            <Container>
                <Header
                    source={require('../../assets/images/back-btn.png')}
                    textStyleHeader={styles.textStyleHeader}
                    label={customer.name}
                    navigation={this.props.navigation}
                    appointment={true}
                    showShadow={true}
                    shadowStyles={styles.shadowTopMargin}
                    borderStyle={{ marginBottom: 0, paddingBottom: 10, zIndex: 99999999, backgroundColor: '#fff' }}
                />
                <KeyboardAvoidingView
                    contentContainerStyle={{ height: '100%' }}
                    behavior={Platform.OS == 'ios' ? 'position' : ''}
                    style={{ flex: 1, }}>
                    {/* <Content contentContainerStyle={{ flex: 1 }}> */}
                        <ScrollView
                            ref={ref => this.scrollView = ref}
                            onContentSizeChange={(contentWidth, contentHeight) => {
                                this.scrollView.scrollToEnd({ animated: false });
                            }}>
                            <View style={{ paddingLeft: 5, paddingRight: 5 }}>
                                {
                                    this.state && this.state.ChatArr.map((val, index) => {
                                        return (
                                            this.handleChatMessages(val, index)
                                        )
                                    })
                                }
                            </View>
                        </ScrollView>

                    {/* </Content> */}
                    <View style={styles.textFieldOut}>
                        <View style={styles.iconOut}>
                            <TouchableOpacity onPress={() => this.handleCall()}>
                                <Image style={styles.imageMain} source={require('../../assets/images/call.png')} />
                            </TouchableOpacity>
                        </View>
                        <TextInput
                            value={chatBox}
                            placeholder="Message"
                            multiline={true}
                            style={styles.textField}
                            onChangeText={this.handelChnage.bind(this, 'chatBox')} />

                        <View style={{
                            position: 'absolute',
                            zIndex: 999,
                            right: 0,
                            height:50, 
                            width:50
                        }}>
                            <TouchableOpacity onPress={() => this.sendMessage()} style={{zIndex:999}}> 
                                <Image style={styles.imageMain} source={require('../../assets/images/send.png')} />
                            </TouchableOpacity>
                        </View>
                    </View>
                </KeyboardAvoidingView>
                {this.handelLoader()}
            </Container>
        )
    }
}

export default connect(state => state)(Chat)

const styles = StyleSheet.create({
    widthAdjust: {
        position: 'absolute',
        right: 20,
        top: -5,
        width: 15,
        height: 18
    },
    shadowTopMargin: {
        marginTop: 5,
    },
    sentMsgOutMain: {
        minWidth: 70,
        borderRadius: 15,
        margin: 10,
        position: 'relative',
        alignSelf: 'flex-end',
    },
    sentMsgOut: {
        // backgroundColor: '#fff',
        margin: 3,
        overflow: 'hidden',
        // borderTopRightRadius: 10,
        // borderBottomLeftRadius: 10,
        // borderTopLeftRadius: 10,
        // borderWidth:1,
        // padding:5,
        // borderColor:"#b2b2b2",
    },
    sentMsg: {
        padding: 5,
        paddingLeft: 11,
        paddingRight: 11,
        borderRadius: 50,
        maxWidth: width - 130,
        color: '#fff',
        fontSize: 11,
    },
    recieveMsgOutMain: {
        minWidth: 70,
        borderRadius: 15,
        margin: 10,
        marginLeft: 0,
        backgroundColor: '#fff',
        alignSelf: 'flex-start',
        shadowColor: '#000',
        shadowOffset: { width: 7, height: 7 },
        shadowOpacity: 0.2,
        shadowRadius: 8,
        elevation: 1,
    },
    recieveMsgOut: {
        padding: 5,
        paddingBottom: 0,
        // borderWidth:0.8,
        // borderColor:"#7f7e7e",
        backgroundColor: '#fff',
        alignSelf: 'flex-start',
        borderRadius: 15,
        overflow: 'hidden',
        margin: 3,
    },
    recieveMsg: {
        paddingTop: 5,
        paddingBottom: 0,
        paddingLeft: 11,
        paddingRight: 11,
        maxWidth: width - 140,
        color: '#000',
        fontSize: 11,
    },
    timeMainSend: {
        color: "#fff",
        fontSize: 9,
        alignSelf: "flex-end",
        marginRight: 10,
        marginBottom: 5
    },
    timeMainRecieve: {
        color: "#7f7e7e",
        fontSize: 9,
        alignSelf: "flex-end",
        marginRight: 10,
        marginBottom: 5
    },
    textField: {
        // height:35,
        padding: 10,
        borderRadius: 20,
        width: '100%',
        backgroundColor: "#fff",
        paddingLeft: 15,
        paddingRight: 10,
        borderWidth: 0.5,
        borderColor: '#bfbfbf',
        paddingTop: 10
    },
    textFieldOut: {
        maxHeight: 120,
        position: 'relative',
        padding: 8,
        justifyContent: 'center',
        paddingLeft: 50,
        paddingRight: 50,
        backgroundColor: "#f2f2f2",
        borderWidth: 0.5,
        borderColor: '#bfbfbf'
    },
    imageMain: {
        height: '100%',
        width: "100%"
    },
    iconOut: {
        position: 'absolute',
        height: 30,
        width: 30,
        left: 10
    },
    messageOutImage: {
        position: 'relative',
        paddingLeft: 40,
        justifyContent: "center"
    },
    profileImageOut: {
        position: "absolute",
        height: 25,
        width: 25,
        left: 8,
        borderWidth:0.5,
        borderColor:'#ccc',
        borderRadius:20,
        overflow:'hidden'
    }
})