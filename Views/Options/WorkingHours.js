import React from 'react'
import { View, Text, StyleSheet, TouchableOpacity,Image } from 'react-native' 
import { Container, Content } from 'native-base';
import Header from '../../components/Header';
import TextContent from '../../components/TextContent';
import { privacypolicy, changeWorkingHours, getSettings, openToast } from '../../redux/actions';
import ShowLoader from '../../components/ShowLoader';
import { Switch } from 'react-native-switch';
import { connect } from 'react-redux'
import DialogBox from '../../components/Common/DialogBox';
import GradientBtn from '../../components/LinearGradient';
import DateTimePicker from "react-native-modal-datetime-picker";
import moment from 'moment'

class WorkingHours extends React.Component{

    static navigationOptions = {
        header: null
    }
    state ={ 
        editHours: false,
        isDateTimePickerVisible: false,
        isDateTimePickerVisible2: false,
        start_time: '00:00',
        end_time: '00:00',
        dayId: '',
        showLoader: false
    }
    changeNotification(){
        
    }
    showDateTimePicker(){
        console.log('hi')
        this.setState({ isDateTimePickerVisible: true });
    };
     
    hideDateTimePicker = () => {
    this.setState({ isDateTimePickerVisible: false });
    };
     
    handleDatePicked = date => {
        console.log("A date has been picked: ", date);
        let newDate = moment(date).format('hh:mm A')
        console.log(newDate,"newDate")
        this.setState({ start_time: newDate })
        this.hideDateTimePicker();
    };
    openWorkingHours = (visible,data) => {
        this.setState({ editHours: visible })
        if(data){
            this.setState({ start_time: data.start_time, end_time: data.end_time, dayId: data._id })
        }
    }

    showDateTimePicker2(){
        console.log('hi')
        this.setState({ isDateTimePickerVisible2: true });
    };
     
    hideDateTimePicker2 = () => {
        this.setState({ isDateTimePickerVisible2: false });
    };
     
    handleDatePicked2 = date => {
        console.log("A date has been picked: ", date);
        let newDate = moment(date).format('hh:mm A')
        console.log(newDate,"newDate")
        this.setState({ end_time: newDate })
        this.hideDateTimePicker2();
    };

    updateTime(){
        let { start_time, end_time, dayId } = this.state
        let data = {
            dayId: dayId,
            start_time: start_time,
            end_time: end_time,
            status: true
        }
        this.setState({ showLoader: true })
        console.log(data,"data")
        this.props.dispatch(changeWorkingHours(data)).then(res => {
            if(res.data.message){
                this.props.dispatch(openToast(res.data.message))
            }
            console.log(res,"resdone")
            if(res.data.message === 'Working hour updated successfully'){
                this.props.dispatch(getSettings()).then(res => {
                    this.setState({ showLoader: false, editHours: false })
                    console.log(res,"res")
                }).catch(err => {
                    this.setState({ showLoader: false })
                    console.log(err,"err")
                })
            }
        }).catch(err => {
            console.log(err,"err")
            this.setState({ showLoader: false })
        })
    }

    workingHoursContent = () => {
        let { start_time, end_time } = this.state;
        return (
            <View style={styles.paddingDialog}>
                <TouchableOpacity style={styles.inputoutMain} onPress={this.showDateTimePicker.bind(this)}>
                    <Text style={styles.distanceText}>From</Text>
                    <Text style={styles.milText}>{start_time}</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.inputoutMain} onPress={this.showDateTimePicker2.bind(this)}>
                    <Text style={styles.distanceText}>To</Text>
                    <Text style={styles.milText}>{end_time}</Text>
                </TouchableOpacity>
                <TouchableOpacity style={[styles.alignRowGoals,{backgroundColor: 'transparent'}]} onPress={this.updateTime.bind(this)}>
                    <GradientBtn text="UPDATE" style={{height: 40}}/>
                </TouchableOpacity>
            </View>
        )
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
    render(){
        let { editHours, isDateTimePickerVisible, isDateTimePickerVisible2 } = this.state;
        console.log(this.props,"props")
        let { workingHours } = this.props.userData || []
        return(
            <Container>
                <Header navigation={this.props.navigation} showShadow={true} label="Working Hours" source={require('../../assets/images/back-btn.png')} />
                <Content>
                    <View style={styles.paddingMain}>
                        <View style={styles.alignRowGoals}>
                            {workingHours.length && workingHours.map((item, key) => {
                                return (
                                    <View style={{borderBottomWidth: 1,borderBottomColor: '#eeeeee'}} key={key}>
                                        <View style={styles.paddingMain}>
                                            <View style={styles.newView}>
                                                <Text style={styles.greyText}>{item.day}</Text>
                                                <View style={styles.flexRowCom}>
                                                    <View style={[styles.marginRight30]}><Text style={styles.blackText}>{item.start_time}</Text></View>
                                                    <View style={[styles.marginRight30,{width: 25,height: 15}]}><Image source={require('../../assets/images/orange.png')} style={styles.imageStyle}/></View>
                                                    <View style={[styles.marginRight30]}><Text style={styles.blackText}>{item.end_time}</Text></View>
                                                </View>
                                            </View>
                                        </View>
                                        <View style={styles.notification}>
                                            <Switch
                                                onValueChange={this.changeNotification.bind(this)}
                                                circleSize={20}
                                                backgroundActive={'#d6d6d6'}
                                                backgroundInactive={'#d6d6d6'}
                                                circleBorderWidth={0}
                                                circleActiveColor={'orange'}
                                                circleInActiveColor={'orange'}
                                                value={item.status}
                                                disabled={false}
                                                innerCircleStyle={{ alignItems: "center", justifyContent: "center" }} // style for inner animated circle for what you (may) be rendering inside the circle
                                            />
                                            <TouchableOpacity style={{padding: 10}} onPress={this.openWorkingHours.bind(this, true, item)}>
                                                <Text style={styles.editStyle}>Edit</Text>
                                            </TouchableOpacity>
                                        </View>
                                    </View>
                                )
                            })}
                        </View>
                        <DateTimePicker
                            isVisible={isDateTimePickerVisible}
                            onConfirm={this.handleDatePicked}
                            onCancel={this.hideDateTimePicker}
                            mode="time"
                            titleIOS="Pick a time"
                            is24Hour={false}
                        />
                        <DateTimePicker
                            isVisible={isDateTimePickerVisible2}
                            onConfirm={this.handleDatePicked2}
                            onCancel={this.hideDateTimePicker2}
                            mode="time"
                            titleIOS="Pick a time"
                            is24Hour={false}
                        />
                    </View>
                </Content>
                {this.handelLoader()}
                <DialogBox visible={editHours} openCloseModal={this.openWorkingHours} headingText={"Monday's Working Hours"} content={this.workingHoursContent}/>
                
            </Container>
        )
    }
}
export default connect(state => state)(WorkingHours)

const styles = StyleSheet.create({
    paddingMain:{
        padding:20
    },
    alignRowGoals: {
        marginTop: 15,
        backgroundColor: '#fff',
        width: '100%',
        elevation: 7,
        shadowColor: "#000000",
        shadowOpacity: 0.4,
        shadowRadius: 5,
        shadowOffset: { height: 2, width: 1 },
        borderRadius: 5
    },
    newView: {
        flexDirection: 'column'
    },
    flexRowCom: {
        flexDirection: 'row'
    },
    marginRight30: {
        marginRight: 30
    },
    imageStyle: {
        width: '100%',
        height: '100%'
    },
    greyText: {
        color: '#919191',
        fontSize: 10,
        marginBottom: 3
    },
    blackText: {
        color: '#303030',
        fontSize: 12
    },
    notification: {
        position: 'absolute',
        right: 10,
        top: 10
    },
    editStyle: {
        color: 'orange',
        fontSize: 12
    },
    inputoutMain: {
        height: 45,
        width: '100%',
        marginBottom: 20,
        borderWidth: 1,
        borderRadius: 5,
        borderColor: '#ededed',
        paddingLeft: 20,
        justifyContent: 'center'
    },
    distanceText: {
        color: '#e4814f',
        fontSize: 12
    },
    milText: {
        color: '#000',
        fontSize: 12,
        marginBottom: 5
    },
    paddingDialog: {
        padding: 20,
        paddingLeft: 50,
        paddingRight: 50
    }

})