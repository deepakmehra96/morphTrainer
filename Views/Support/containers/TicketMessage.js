import React from 'react'
import { StyleSheet, Text, View, TextInput, Dimensions, TouchableOpacity, ScrollView } from 'react-native';
import { Container, Content, Tabs, Tab } from 'native-base';
import { connect } from 'react-redux'
import Header from '../../../components/Header';
import DownButton from '../../../components/DownButton';
import { Switch } from 'react-native-switch';
import LinearGradient from 'react-native-linear-gradient';

var { height, width } = Dimensions.get('window');

class TicketMessage extends React.Component {
    constructor() {
        super()
        this.state ={
            toggle:false,
            ChatArr:[
                {
                    text:'Hey this is a dummy text',
                    status:1
                },
                {
                    text:'Hi there, Thanks for reaching out.Feel Free to text us, when you have questions concern, we are always here to help you',
                    status:2
                },
                {
                    text:'Hi there, Thanks for reaching out.Feel Free to text us, when you have questions concern, we are always here to help you',
                    status:2
                },
                {
                    text:'Hi there, Thanks for reaching out.Feel Free to text us, when you have questions concern, we are always here to help you',
                    status:1
                },
                {
                    text:'Hi there, Thanks for reaching out.Feel Free to text us, when you have questions concern, we are always here to help you',
                    status:2
                },
                {
                    text:'Hi there, Thanks for reaching out.Feel Free to text us, when you have questions concern, we are always here to help you',
                    status:2
                },
                {
                    text:'Hi there, Thanks for reaching out.Feel Free to text us, when you have questions concern, we are always here to help you',
                    status:1
                },

               
            ]
        }
       
    }
    static navigationOptions = {
        header: null
    }

    handleChatMessages(val , index) {
        if (val.status == 1) {
           return (
            <LinearGradient colors={['#f7b944', '#f49a3e', '#ef6937']} style={styles.sentMsgOutMain}>
               {/* <View key={index} style={styles.sentMsgOutMain}> */}
                   <View style={styles.sentMsgOut}>
                       <Text style={styles.sentMsg}>
                       {val.text}
                       </Text>
                   </View>
                   <Text style={styles.timeMainSend}>
                            07:00 AM
                       </Text>
                       
               {/* </View> */}
               </LinearGradient>
           )
       } else {
           return (
                <View style={styles.messageOutImage}>
                    {/* <View style={styles.profileImageOut}>
                        <Image style={styles.imageMain} source={require('../../assets/images/plus-icon_06.png')} />
                    </View> */}
                    <View key={index} style={styles.recieveMsgOutMain}>
                    <View style={styles.recieveMsgOut}>
                        <Text style={styles.recieveMsg}>
                        {val.text}
                        </Text>
                    </View>
                    <Text style={styles.timeMainRecieve}>
                            07:00 AM
                        </Text>
                    </View>
                </View>

           )
       }
   }
   changeToggle(){
    let { toggle } = this.state
       this.setState({toggle : !toggle})
   }

    render() {
        let { toggle } = this.state
        return (
            <Container>
                <Header
                    navigation={this.props.navigation}
                    label="TICKET TITLE"
                    source={require('../../../assets/images/back-btn.png')}
                    borderStyle={{borderBottomWidth: 1, borderColor: '#e6e6e6',paddingBottom: 10}}
                />
                <Content contentContainerStyle={{flex:1}}>
                    <View>
                        <ScrollView
                            ref={ref => this.scrollView = ref}
                            onContentSizeChange={(contentWidth, contentHeight) => {
                                this.scrollView.scrollToEnd({animated:false});
                            }}>
                            <View style={styles.marginNotchBotm}>
                                {this.state.ChatArr.map((val, index) => {
                                    return (
                                        this.handleChatMessages(val, index)
                                 )
                                })}
                            </View>
                        </ScrollView> 
                    </View>
                </Content>
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
                <View>
                    <DownButton textMain="SUBMIT"/> 
                </View>
            </Container>
        )
    }
}
export default connect(state => state)(TicketMessage)

const styles = StyleSheet.create({
    bottomContainer: {
        height: 240,
        paddingLeft: 25,
        paddingRight:25,
        paddingTop:15, 
        paddingBottom:5,
        backgroundColor: 'white',
        shadowColor: "#000000",
        shadowOpacity: 0.25,
        shadowRadius: 20,
        shadowOffset: {
            height: 2,
            width: 2
        }
    },
    title:{
        fontWeight:'bold',
        fontSize:16
    },
    toogleBtnOut:{
        flexDirection:'row',
        alignItems:"center"
    },
    titleToogle:{
        fontSize:13,
        marginLeft:10,
        color:'grey'
    },
    textField:{
        padding:10,
        height:150,
        borderColor:"#dbdbdb",
        borderWidth:0.8,
        marginTop:10,
        marginBottom:10
    },
    sentMsgOutMain:{
        borderRadius:15,
        margin:10,
        position:'relative',
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
        fontSize:11,
       
    },   

    recieveMsgOutMain:{
        borderRadius:15,
        margin:10,
        marginLeft:0,
        backgroundColor:'#fff',
        alignSelf: 'flex-start',
        shadowColor: '#000',
        shadowOffset: { width: 7, height: 7 },
        shadowOpacity: 0.2,
        shadowRadius: 8,
        elevation: 1,
    },
    recieveMsgOut: {
        padding:5,
        paddingBottom:0,
        // borderWidth:0.8,
        // borderColor:"#7f7e7e",
        backgroundColor: '#fff',
        alignSelf: 'flex-start',
        borderRadius:15,
        overflow: 'hidden',
        margin: 3,
    },
    recieveMsg: {
        paddingTop: 5,
        paddingBottom:0,
        paddingLeft: 11,
        paddingRight: 11,
        maxWidth: width - 140,
        color: '#000',
        fontSize:11,
    },
    timeMainSend:{
        color:"#fff",
        fontSize:9,
        alignSelf:"flex-end",
        marginRight:10,
        marginBottom:5
    },
    timeMainRecieve:{
        color:"#7f7e7e",
        fontSize:9,
        alignSelf:"flex-end",
        marginRight:10,
        marginBottom:5
    },
    messageOutImage:{
        position:'relative',
        paddingLeft:10,
        justifyContent:"center"
    },
})



