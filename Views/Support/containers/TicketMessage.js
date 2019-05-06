import React from 'react'
import { StyleSheet, Text, View, TextInput, Dimensions, TouchableOpacity, ScrollView } from 'react-native';
import { Container, Content, Tabs, Tab } from 'native-base';
import { connect } from 'react-redux'
import Header from '../../../components/Header';
import DownButton from '../../../components/DownButton';
import { Switch } from 'react-native-switch';

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
               <View key={index} style={styles.sentMsgOutMain}>
                   <TouchableOpacity style={styles.sentMsgOut}>
                       <Text style={styles.sentMsg}>
                       {val.text}
                       </Text>
                   </TouchableOpacity>
                   <Text style={styles.timeMainSend}>
                            07:00 AM, MON JAN 14, 2019
                       </Text>
                       
               </View>
           )
       } else {
           return (
            <View key={index} style={styles.recieveMsgOutMain}>
               <View style={styles.recieveMsgOut}>
                   <Text style={styles.recieveMsg}>
                   {val.text}
                   </Text>
               </View>
               <Text style={styles.timeMainRecieve}>
                    07:00 AM, MON JAN 14, 2019
                </Text>
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
        margin:5,
        position:'relative',
        alignSelf: 'flex-end',
    },
    sentMsgOut: {
        backgroundColor: '#fff',
        margin: 3,
        borderTopRightRadius: 10,
        borderBottomLeftRadius: 10,
        borderTopLeftRadius: 10,
        overflow: 'hidden',
        borderWidth:1,
        padding:5,
        borderColor:"#b2b2b2",
    },
    sentMsg: {
        opacity:0.8,
        padding: 8,
        paddingLeft: 11,
        paddingRight: 11,
        borderRadius: 50,
        maxWidth: width - 80,
        color: '#000',
    },   
    recieveMsgOutMain:{
        margin:5,
        alignSelf: 'flex-start',
    },
    recieveMsgOut: {
        padding:5,
        borderWidth:0.8,
        borderColor:"#7f7e7e",
        backgroundColor: '#fff',
        alignSelf: 'flex-start',
        borderTopRightRadius: 10,
        borderBottomRightRadius: 10,
        borderTopLeftRadius: 10,
        overflow: 'hidden',
        margin: 3,
    },
    recieveMsg: {
        padding: 8,
        paddingLeft: 11,
        paddingRight: 11,
        maxWidth: width - 70,
        color: '#000',
    },
   
    timeMainSend:{
        color:"#7f7e7e",
        fontSize:9,
        alignSelf:"flex-end",
        marginRight:10
    },
    timeMainRecieve:{
        color:"#7f7e7e",
        fontSize:9,
        alignSelf:"flex-start",
        marginLeft:10
    }
})



