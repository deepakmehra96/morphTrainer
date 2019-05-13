import React from 'react'
import { StyleSheet, Text, View, TextInput, Dimensions, TouchableOpacity, ScrollView, KeyboardAvoidingView, Keyboard, Platform, Image } from 'react-native';
import { Container, Content, Tabs, Tab } from 'native-base';
import { connect } from 'react-redux'
import Header from '../../../components/Header';
import DownButton from '../../../components/DownButton';
import { Switch } from 'react-native-switch';
import LinearGradient from 'react-native-linear-gradient';
import Dialog, { SlideAnimation, DialogContent } from 'react-native-popup-dialog';
import moment from 'moment';
import ShowLoader from '../../../components/ShowLoader';
import { ticketConversation, openToast, ticketList, changeTicketStatus, sendTicketMessage } from '../../../redux/actions';
import GradientBtn from '../../../components/LinearGradient';

var { height, width } = Dimensions.get('window');

class TicketMessage extends React.Component {
    constructor() {
        super()
        this.state ={
            toggle:false,
            ticket_details: {},
            loader: false,
            text: '',
            ticketModal: false,
            showLoader: false
        }
       
    }
    static navigationOptions = {
        header: null
    }

    componentDidMount() {
        let { item } = this.props.navigation.state.params
        this.setState({ loader: true })
        this.props.dispatch(ticketConversation(item._id)).then(res => {
            this.setState({ loader: false })
            if (res.data.message === 'ticket List') {
                this.setState({ ticket_details: res.data.data.ticket_details })
            }
        }).catch(err => {
            this.setState({ loader: false })
        })
    }

    handleChatMessages(val, index) {
        let { user } = this.props.userData
        if (val.reply_id == user._id) {
            return (
                <LinearGradient colors={['#f7b944', '#f49a3e', '#ef6937']} style={styles.sentMsgOutMain}>
                    {/* <View key={index} style={styles.sentMsgOutMain}> */}
                    <View style={styles.sentMsgOut}>
                        <Text style={styles.sentMsg}>
                            {val.reply}
                        </Text>
                    </View>
                    <Text style={styles.timeMainSend}>
                        {moment(val.created_at).format('hh:mm A dddd MMMM DD, YYYY')}
                    </Text>

                    {/* </View> */}
                </LinearGradient>
            )
        } else {
            console.log(val.reply, "val.reply")
            return (
                <View style={styles.messageOutImage}>
                    {/* <View style={styles.profileImageOut}>
                         <Image style={styles.imageMain} source={require('../../assets/images/plus-icon_06.png')} />
                     </View> */}
                    <View key={index} style={styles.recieveMsgOutMain}>
                        <View style={styles.recieveMsgOut}>
                            <Text style={styles.recieveMsg}>
                                {val.reply}
                            </Text>
                        </View>
                        <Text style={styles.timeMainRecieve}>
                            {moment(val.created_at).format('hh:mm A dddd MMMM DD, YYYY')}
                        </Text>
                    </View>
                </View>

            )
        }
    }
    changeToggle() {
        let { toggle } = this.state
        this.setState({ toggle: !toggle })
        let { item } = this.props.navigation.state.params
        let { user } = this.props.userData
        let data = {
            ticketId: item._id,
            status: +!!toggle
        }
        console.log(data, "datatat")
        this.setState({ loader: true, showLoader: true })
        this.props.dispatch(changeTicketStatus(data)).then(res => {
            console.log(res, "res")
            this.setState({ loader: false })
            if (res.data.message) {
                this.props.dispatch(openToast(res.data.message))
            }
            if (res.data.message === 'Ticket status updated successfully') {
                this.props.dispatch(ticketList(user._id)).then(res => {
                    console.log(res, "res")
                    this.setState({ showLoader: false })
                    this.props.navigation.navigate('Ticket')
                }).catch(err => {
                    this.setState({ showLoader: false })
                })
            }
        }).catch(err => {
            console.log(err, "err")
            this.setState({ loader: false })
            if (err.data.message) {
                this.props.dispatch(openToast(err.data.message))
            }
        })
    }

    handelLoader() {
        let { loader, showLoader } = this.state
        if (loader || showLoader) {
            return <ShowLoader />
        } else {
            return null
        }
        return
    }
    onChangeText(event) {
        this.setState({ text: event })
    }

    onClickBtn() {
        Keyboard.dismiss()
        let { text } = this.state;
        let { item } = this.props.navigation.state.params
        let { user } = this.props.userData
        console.log(item, "item")
        let data = {
            ticketId: item._id,
            replyId: item.to,
            message: text,
        }
        this.setState({ loader: true })
        this.props.dispatch(sendTicketMessage(data)).then(res => {
            this.setState({ loader: false })
            if (res.data.message) {
                this.props.dispatch(openToast(res.data.message))
            }
            if (res.data.message === 'Ticket reply send successfully') {
                this.setState({ ticketModal: true })
            }
            console.log(res, "res")
        }).catch(err => {
            this.setState({ loader: false })
            if (err.data.message) {
                this.props.dispatch(openToast(err.data.message))
            }
        })
    }

    render() {
        let { toggle, ticketModal, loader } = this.state
        let { ticketConversation } = this.props.userData
        let { item } = this.props.navigation.state.params
        console.log(ticketConversation, "ticketConversationticketConversation")
        return (
            <Container>
                <Header
                    navigation={this.props.navigation}
                    label="TICKET TITLE"
                    source={require('../../../assets/images/back-btn.png')}
                    borderStyle={{borderBottomWidth: 1, borderColor: '#e6e6e6',paddingBottom: 10}}
                />
                <KeyboardAvoidingView 
                    contentContainerStyle={{height:'100%'}} 
                    behavior={Platform.OS == 'ios' ? 'position' : ''} 
                    style={{ flex: 1, }}>
                <Content contentContainerStyle={{ flex: 1 }}>
                    <View>
                        <ScrollView
                            ref={ref => this.scrollView = ref}
                            onContentSizeChange={(contentWidth, contentHeight) => {
                                this.scrollView.scrollToEnd({ animated: false });
                            }}>
                            <View style={styles.marginNotchBotm}>
                                {!loader && ticketConversation.length ? ticketConversation.map((val, index) => {
                                    return (
                                        this.handleChatMessages(val, index)
                                    )
                                }) : <View></View>}
                            </View>
                        </ScrollView>
                    </View>
                </Content>
                {item.status ?
                    <View>
                        <View style={styles.bottomContainer}>
                            <View>
                                <Text style={styles.title}>WRITE YOUR MESSAGE</Text>
                            </View>
                            <View>
                                <TextInput
                                    style={styles.textField}
                                    multiline={true}
                                    placeholder="Write your msg here..."
                                    placeholderTextColor="#b5b5b5"
                                    onChangeText={this.onChangeText.bind(this)}
                                />
                            </View>
                            <View style={styles.toogleBtnOut}>
                                <Switch
                                    onValueChange={this.changeToggle.bind(this)}
                                    circleSize={20}
                                    backgroundActive={'#d6d6d6'}
                                    backgroundInactive={'#d6d6d6'}
                                    circleBorderWidth={0}
                                    circleActiveColor={'orange'}
                                    circleInActiveColor={'orange'}
                                    value={toggle}
                                    innerCircleStyle={{ alignItems: "center", justifyContent: "center" }}
                                />
                                <Text style={styles.titleToogle}>MARK AS COMPLETED</Text>
                            </View>
                        </View>
                        <DownButton textMain="SUBMIT" onClickBtn={this.onClickBtn.bind(this)} />
                    </View>
                    
                    : <View></View>}


                    </KeyboardAvoidingView>
                {this.handelLoader()}
                <Dialog
                    visible={ticketModal}
                    dialogAnimation={new SlideAnimation({
                        slideFrom: 'bottom',
                    })}
                    onTouchOutside={() => {
                        this.setState({ ticketModal: false })
                    }}
                    dialogStyle={[{ backgroundColor: 'transparent', width: '100%', padding: 0 }]}
                    containerStyle={{ justifyContent: 'center', padding: 20, width: '100%' }}
                >
                    <DialogContent>
                        <View style={{ marginLeft: -20, marginRight: -20 }}>
                            <View style={{ height: 100, width: 100, alignSelf: 'center', zIndex: 10 }}>
                                <Image source={require('../../../assets/images/popup-right.png')} style={{ height: '100%', width: '100%' }} />
                            </View>
                            <View style={{ backgroundColor: '#fff', marginTop: -50, borderRadius: 10, padding: 20, paddingTop: 30 }}>
                                <View style={{ marginTop: 40, alignItems: 'center' }}>
                                    <Text style={styles.orangeText}>SUCCESS!</Text>
                                </View>
                                <View style={{ alignItems: 'center', padding: 40, paddingTop: 30 }}>
                                    <Text style={[styles.orangeText, { fontSize: 14, textAlign: 'center' }]}>Ticket reply send successfully.</Text>
                                </View>
                                <View style={styles.alignRowGoals}>
                                    <TouchableOpacity style={{ height: 40, marginLeft: 60, marginRight: 60 }} onPress={() => {
                                        this.setState({ ticketModal: false })
                                        this.props.navigation.navigate('Ticket')
                                    }
                                    }>
                                        <GradientBtn text="SUCCESS" style={{ height: 40 }} btnStyle={{ fontWeight: 'bold' }} />
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
export default connect(state => state)(TicketMessage)

const styles = StyleSheet.create({
    bottomContainer: {
        height: 240,
        paddingLeft: 25,
        paddingRight: 25,
        paddingTop: 15,
        paddingBottom: 5,
        backgroundColor: 'white',
        shadowColor: "#000000",
        shadowOpacity: 0.25,
        shadowRadius: 20,
        shadowOffset: {
            height: 2,
            width: 2
        }
    },
    title: {
        fontWeight: 'bold',
        fontSize: 16
    },
    toogleBtnOut: {
        flexDirection: 'row',
        alignItems: "center"
    },
    titleToogle: {
        fontSize: 13,
        marginLeft: 10,
        color: 'grey'
    },
    textField: {
        padding: 10,
        height: 150,
        borderColor: "#dbdbdb",
        borderWidth: 0.8,
        marginTop: 10,
        marginBottom: 10
    },
    sentMsgOutMain: {
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
        minWidth: 150
    },

    recieveMsgOutMain: {
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
        minWidth: 150
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
    messageOutImage: {
        position: 'relative',
        paddingLeft: 10,
        justifyContent: "center"
    },
})



