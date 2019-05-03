import React from 'react'
import { StyleSheet, Text, View, Image, Dimensions, TouchableOpacity, CameraRoll, TextInput } from 'react-native';
import { Container, Content, Tabs, Tab, Picker } from 'native-base';
import Dialog, { SlideAnimation, DialogContent } from 'react-native-popup-dialog';
import { connect } from 'react-redux'
import Header from '../../../components/Header';
import DownButton from '../../../components/DownButton';
import GradientBtn from '../../../components/LinearGradient';
var { height, width } = Dimensions.get('window');

class CreateYourTicket extends React.Component {
    constructor() {
        super()
        this.state = {
            list: [1,1,1,1,1],
            ticketModal: false
        }
    }
    static navigationOptions = {
        header: null
    }

    handelChnage = () => {

    }

    handelSubmit = () => {
        this.setState({ ticketModal: true })
    }
   
    render() {
        let { list, ticketModal } = this.state;
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
                                    onChangeText={(text) => this.setState({text})}
                                    
                                    placeholder="e.g#11023"
                                    placeholderTextColor="#000"
                                />
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
                                        selectedValue={''}
                                        textStyle={{ color: "#000", fontSize: 12}}
                                        placeholder="e.g Transaction, Campaign"
                                        placeholderStyle={{ color: "#000", fontSize: 12 }}
                                        onValueChange={this.handelChnage.bind(this, 'gender')}
                                        iosIcon={<Image source={require('../../../assets/images/down_arrow.png')} style={{width: 12, height: 8,marginRight: -5}}/>}
                                        >
                                        <Picker.Item label="Male" value="Male" />
                                        <Picker.Item label="Female" value="Female" />
                                    </Picker>
                                </View>
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
                                    onChangeText={(text) => this.setState({text})}
                                    placeholder="Write your text here..."
                                    placeholderTextColor="#000"
                                    multiline={true}
                                />
                            </View>
                        </View>
                    </View>
                </Content>
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
})



