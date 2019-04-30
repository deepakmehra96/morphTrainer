import React from 'react'
import { View, Text, StyleSheet, TouchableOpacity, Image, AsyncStorage } from 'react-native'
import { Container, Content } from 'native-base';
import Header from '../../components/Header';
import LinearGradient from 'react-native-linear-gradient';
import { Switch } from 'react-native-switch';
import { setUserDetail, getSettings, changeNotification, setNotification, openToast, setDurationType, setDuration, setDataSource, selectSlot, setSlots } from '../../redux/actions';
import { connect } from 'react-redux'
import ShowLoader from '../../components/ShowLoader';
import PickerSelect from '../../components/PickerSelect'

class Options extends React.Component {

    static navigationOptions = {
        header: null
    }
    state = {
        toggle: false,
        showLoader: false,
        modalVisible: false,
        selected: 1,
        selectedIndex: 1,
        duration: 1,
        duration_type: 'min',
        dataSource: [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31,32,33,34,35,36,37,38,39,40,41,42,43,44,45,46,47,48,49,50,51,52,53,54,55,56,57,58,59,60],
        rightDataSource: ["min","hour"],
    }

    componentDidMount(){
        console.log('hi there')
        let { slots } = this.props.userData
        let item = [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24]
        if(slots && slots.slotType === 'hour') {
            console.log('hi')
            this.setState({ dataSource: item })
        }
        // this.props.dispatch(setDuration(1))
        // this.props.dispatch(setDurationType('min'))
        this.setState({ showLoader: true })
        this.props.dispatch(getSettings()).then(res => {
            this.setState({ showLoader: false })
            console.log(res,"res")
        }).catch(err => {
            this.setState({ showLoader: false })
            console.log(err,"err")
        })
    }
    async logout(){
        await AsyncStorage.removeItem('token')
        await AsyncStorage.removeItem('user')
        this.props.dispatch(setUserDetail({}))
        this.props.navigation.navigate('SignIn')
    }
    changeNotification(){
        this.setState({ showLoader: true })
        let { user, notification } = this.props.userData
        let data = {
            coachId: user._id,
            notificationStatus: !notification
        }
        this.props.dispatch(changeNotification(data)).then(res => {
            this.setState({ showLoader: false })
            if(res.data.message){
                this.props.dispatch(openToast(res.data.message))
            }
            if(res.data.message === 'Notification Status updated successfully'){
                this.props.dispatch(setNotification(!notification))
            }
            console.log(res,"rescN")
        }).catch(err => {
            this.setState({ showLoader: false })
            this.props.dispatch(openToast(err.data.message))
            console.log(err,"errnf")
        })
    }

    toggleModal = (visible) => {
        this.setState({ modalVisible: visible })
    }

    onChangeDataSource = (data) => {
        console.log(data,"data1")
        // this.props.dispatch(setDuration(data))
        this.setState({ selectedIndex: data, duration: data})
    }

    onChageRightSource = (data) => {
        console.log(data,"datadatadata")
        if(data === 'hour'){
            let item = [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24]
            // this.props.dispatch(setDataSource(item))
            // this.props.dispatch(setDurationType('hour'))
            this.setState({ selected: 2, duration_type: 'hour', dataSource: item })
        }
        if(data === 'min'){
            let item = [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31,32,33,34,35,36,37,38,39,40,41,42,43,44,45,46,47,48,49,50,51,52,53,54,55,56,57,58,59,60]
            // this.props.dispatch(setDataSource(item))
            // this.props.dispatch(setDurationType('min'))
            this.setState({ selected: 1, duration_type: 'min', dataSource: item })
        }
    }
    renderType(){
        let { slots } = this.props.userData
        if(slots.slotType == 'min'){
            console.log(1)
            return 1
        }else{
            console.log(2)
            return 2
        }
    }
    confirmButton = () => {
        let { duration, duration_type } = this.state;
        this.setState({ showLoader: true })
        console.log(this.props.userData,"this.props.userData")
        let { user } = this.props.userData
        let data = {
            slotTime: duration,
            slotType: duration_type,
            coachId: user._id
        }
        
        this.props.dispatch(selectSlot(data)).then(res => {
            this.setState({ showLoader: false })
            if(res.data.message){
                this.props.dispatch(openToast(res.data.message))
            }
            if(res.data.message === 'Slot information updated successfully'){
                this.props.dispatch(setSlots({ slotTime: duration, slotType: duration_type }))
                this.setState({ modalVisible: false })
            }
            console.log(res,"res")
        }).catch(err => {
            this.setState({ showLoader: false })
            if(err.data.message){
                this.props.dispatch(openToast(res.data.message))
            }
            console.log(err,"err")
        })
    }

    handelLoader() {
        let { showLoader } = this.state
        if (showLoader ) {
            return <ShowLoader />
        } else {
            return null
        }
        return
    }
    render() {
        let { notification, slots } = this.props.userData
        let { modalVisible, duration_type, dataSource, rightDataSource } = this.state
        console.log(dataSource,"dataSource")
        console.log(slots,duration_type,this.renderType(),"notification")
        return (
            <Container>
                <Header navigation={this.props.navigation} showShadow={true} label="Settings"  />
                <Content>
                <View style={styles.mainContainer}>
                    <View style={styles.shadowMain}>
                        <LinearGradient colors={['#f7b944', '#f49a3e', '#ef6937']} style={styles.gradientMain}>
                            <Text style={styles.textHeading}>
                                Preference
                            </Text>
                        </LinearGradient>
                        <View style={styles.innerCon}>
                            <View style={styles.contentOut}>
                                <View style={styles.iconContainer}>
                                    <Image source={require('../../assets/images/coach-settings_07.png')} style={styles.imageMain} />
                                </View>
                                <Text style={styles.textMain}>
                                    Notifications
                                </Text>
                                <View style={styles.colorTextOut}>
                                <Switch
                                    onValueChange={this.changeNotification.bind(this)}
                                    circleSize={20}
                                    backgroundActive={'#d6d6d6'}
                                    backgroundInactive={'#d6d6d6'}
                                    circleBorderWidth={0}
                                    circleActiveColor={'orange'}
                                    circleInActiveColor={'orange'}
                                    value={notification}
                                    disabled={false}
                                    innerCircleStyle={{ alignItems: "center", justifyContent: "center" }} // style for inner animated circle for what you (may) be rendering inside the circle
                                />
                                </View>

                            </View>
                            <View style={styles.contentOut}>
                                <View style={styles.iconContainer}>
                                    <Image source={require('../../assets/images/coach-settings_13.png')} style={styles.imageMain} />
                                </View>
                                <Text style={styles.textMain}>
                                    Working Hours
                                </Text>
                                <View style={styles.colorTextOut}>
                                    <Image source={require('../../assets/images/right-arrow.png')} style={styles.imageMain} />
                                </View>
                            </View>
                            <TouchableOpacity style={styles.contentOut} onPress={this.toggleModal.bind(this, true)}>
                                <View style={styles.iconContainer}>
                                    <Image source={require('../../assets/images/coach-settings_16.png')} style={styles.imageMain} />
                                </View>
                                <Text style={styles.textMain}>
                                    Appointment Slots
                                </Text>
                                <View style={styles.colorTextOut}>
                                    <Text style={styles.coloredText}>
                                        {slots.slotTime} {slots.slotType}
                                    </Text>
                                </View>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
                <View style={styles.secondContainer}>
                    <View style={styles.shadowMain}>
                        <LinearGradient colors={['#f7b944', '#f49a3e', '#ef6937']} style={styles.gradientMain}>
                            <Text style={styles.textHeading}>
                                About
                            </Text>
                        </LinearGradient>
                        <View style={styles.innerCon}>
                            <View style={styles.contentOut}>
                                <View style={styles.iconContainer}>
                                    <Image source={require('../../assets/images/coach-settings_18.png')} style={styles.imageMain} />
                                </View>
                                <Text style={styles.textMain}>
                                    Support
                                </Text>
                            </View>
                            <View style={styles.contentOut}>
                                <View style={styles.iconContainer}>
                                    <Image source={require('../../assets/images/coach-settings_20.png')} style={styles.imageMain} />
                                </View>
                                <Text style={styles.textMain}>
                                    Rate App
                                </Text>
                            </View>
                            <TouchableOpacity onPress={() => this.props.navigation.navigate('Policies')} style={styles.contentOut}>
                                <View style={styles.iconContainer}>
                                    <Image source={require('../../assets/images/coach-settings_22.png')} style={styles.imageMain} />
                                </View>
                                <Text style={styles.textMain}>
                                    Privacy Policy
                                </Text>
                            </TouchableOpacity>
                            <TouchableOpacity onPress={() => this.props.navigation.navigate('TermsConditions')} style={styles.contentOut}>
                                <View style={styles.iconContainer}>
                                    <Image source={require('../../assets/images/coach-settings_24.png')} style={styles.imageMain} />
                                </View>
                                <Text style={styles.textMain}>
                                    Terms & conditions
                                </Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={styles.contentOut} onPress={this.logout.bind(this)}>
                                <View style={styles.iconContainer}>
                                    <Image source={require('../../assets/images/coach-settings_26.png')} style={styles.imageMain} />
                                </View>
                                <Text style={styles.textMain}>
                                    Log Out
                            </Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
                </Content>
                {this.handelLoader()}
                <PickerSelect modalVisible={modalVisible} toggleModal={this.toggleModal} rightDataSource={rightDataSource} dataSource={dataSource} onChageRightSource={this.onChageRightSource} onChangeDataSource={this.onChangeDataSource} selectedIndex={slots.slotTime} selected={this.renderType()} confirmButton={this.confirmButton.bind(this)}/>
            </Container>
        )
    }
}
export default connect(state => state)(Options)

const styles = StyleSheet.create({
    contentOut:{
        borderBottomWidth: 0.5, 
        borderColor: '#d8d6d6',
        flexDirection:'row',
        padding:10,
        position:'relative'
    },
    mainContainer: {
        padding: 20
    },
    secondContainer: {
        padding: 20,
        paddingTop: 0
    },
    shadowMain: {
        elevation: 7,
        shadowColor: "#000000",
        shadowOpacity: 0.4,
        shadowRadius: 5,
        shadowOffset: { height: 1, width: 1 },
    },
    gradientMain: {
        width: '100%',
        borderRadius: 5,
        padding: 15,
        marginTop: 20,
    },
    textHeading: {
        fontWeight: 'bold',
        fontSize: 12,
        color: 'black'
    },
    textMain: {
        fontSize: 11,
        color: 'black',
        paddingTop:5,
        marginLeft:7
    },
    coloredText:{
        fontSize: 11,
        color: '#f7b944',
    },
    innerCon: {
        backgroundColor: '#fff',
    },
    iconContainer:{
        height:20,
        width:20
    },
    imageMain:{
        height:'100%',
        width:'100%'
    },
    colorTextOut:{
        position:'absolute', 
        right:10,
        top:15,
    }
})