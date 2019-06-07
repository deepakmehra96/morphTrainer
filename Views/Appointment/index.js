import React from 'react';
import { StyleSheet, Text, View, Dimensions, Image, TouchableOpacity, ListView } from 'react-native';
import { Button, Icon, Footer, FooterTab, List, Container, Content } from 'native-base'
import { connect } from 'react-redux'
import Header from '../../components/Header';
import CalendarPicker from 'react-native-calendar-picker';
import LinearGradient from 'react-native-linear-gradient';
import { getAppointmentList, deleteAppointment, openToast } from '../../redux/actions';
import moment from 'moment';
import ShowLoader from '../../components/ShowLoader';
var { height, width } = Dimensions.get('window');
const row = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 })

class Appointment extends React.Component {
    static navigationOptions = {
        header: null
    }

    constructor() {
        super()
        this.state = {
            apoointmentList: row,
            showLoader: false,
            selectedDate:'',appointementData:[]
        }
    }
    componentDidMount() {
        let dateToSend = moment().format('YYYY-MM-DD')
        this.setState({  selectedDate: dateToSend})
        this.handleAppointmentDate(dateToSend)
    }

    onDateChange = (date) => {
        let dateToSend = date.format('YYYY-MM-DD')
        this.handleAppointmentDate(dateToSend)
        this.setState({  selectedDate: date.format('YYYY-MM-DD')})
    }

    handleAppointmentDate = (date) => {
        let { apoointmentList } = this.state
        this.setState({ showLoader: true })
        this.props.dispatch(getAppointmentList(date)).then(res => {
            this.setState({ apoointmentList: apoointmentList.cloneWithRows(res.data.data), showLoader: false, appointementData : res.data.data })
        }).catch(err => {
            this.setState({ showLoader: false })
            console.log(err, "err err")
            if (err.data.message) {
                this.props.dispatch(openToast(err.data.message))
            }
        })
    }

    onRemoveGoal(data) {
        console.log(data,"datadata")
        let dataToSend ={
            appointmentID :data._id
        }
        this.setState({ showLoader: true })
        this.props.dispatch(deleteAppointment(dataToSend)).then(res => {
            this.setState({ showLoader: false })
            this.handleAppointmentDate(this.state.selectedDate)
            this.props.dispatch(openToast('Appointment deleted successfully'))
        }).catch(err => {
            this.setState({ showLoader: false })
            console.log(err, "err err")
            if (err.data.message) {
                this.props.dispatch(openToast(err.data.message))
            }
        })
    }

    handelLoader() {
        let { showLoader } = this.state
        if (showLoader) {
            return <ShowLoader />
        } else {
            return null
        }
        return
    }
    render() {
        let listToDisplay = this.state && this.state.apoointmentList
        let { selectedDate, showLoader, appointementData } = this.state
        return (
            <Container>
                <Header navigation={this.props.navigation} showShadow={!showLoader} label="Appointments" />
                <Content style={styles.contentStyles}>
                    <View style={styles.mainContainer}>
                        <View style={styles.dateSlot}>
                            <View>
                                <LinearGradient colors={['#f7b944', '#f49a3e', '#ef6937']} style={styles.iconsOutGradientLeft}>
                                    <View style={styles.iconsOutMainLeft}>
                                        <Image source={require('../../assets/images/arrowLeftWhite.png')} style={styles.iconsOut} />
                                    </View>
                                </LinearGradient>
                                <LinearGradient colors={['#f7b944', '#f49a3e', '#ef6937']} style={styles.iconsOutGradientRight}>
                                    <View style={styles.iconsOutMainRight}>
                                        <Image source={require('../../assets/images/arrowRightWhite.png')} style={styles.iconsOut} />
                                    </View>
                                </LinearGradient>
                            </View>
                            <CalendarPicker
                                minDate={moment().format("YYYY-MM-DD")}
                                onDateChange={this.onDateChange}
                                selectedDayColor="orange"
                                selectedDayTextColor="white"
                                scaleFactor={470}
                                width={width}
                                styles={{ backgroundColor: 'red' }}
                                previousTitle=" "
                                nextTitle=" "
                            />
                        </View>
                    </View>
                    <View>
                        <View style={styles.dateLabelOut}>
                            <Text style={styles.dateLabelText}>
                                {selectedDate || moment().format("YYYY-MM-DD")}
                            </Text>
                        </View>

                        { appointementData && appointementData.length ?  

                        <List
                            rightOpenValue={-75}
                            disableRightSwipe={true}
                            dataSource={listToDisplay}
                            style={styles.listStyles}
                            renderRow={data =>
                                <View style={styles.secondView}>
                                    <View style={styles.timeConOut}>
                                        <View style={styles.textHeight}>
                                            <Text style={styles.timeTextOut}>
                                                {data.time.start}
                                            </Text>
                                        </View>
                                        <View>
                                            <Text style={styles.timeTextOut}>
                                                {data.time.end}
                                            </Text>
                                        </View>
                                    </View>
                                    <View style={styles.imageOutCon}>
                                        <Image source={data.avatar ? {uri: data.avatar} :require('../../assets/images/person.jpg')} style={styles.iconsOut} />
                                    </View>

                                    <View style={styles.nameTextOut}>
                                        <Text style={{ fontWeight: '500' }}>
                                            {data.user_name}
                                        </Text>
                                    </View>
                                </View>
                            }
                            renderRightHiddenRow={(data, secId, rowId, rowMap) =>
                                <Button style={styles.cancelBtnOut} danger onPress={_ => this.onRemoveGoal(data)} >
                                    <Icon active name="ios-close-circle" style={styles.iconSize} />
                                    <Text style={styles.cancelText}>Cancel</Text>
                                </Button>}
                        /> : 
                        <View style={{alignItems:'center', marginTop:30}}>
                            <Text style={{color: '#ef6937'}}>No Appointments yet</Text>
                        </View>
                        }

                    </View>
                </Content>
                {this.handelLoader()}
            </Container>
        )
    }
}
export default connect(state => state)(Appointment)

const styles = StyleSheet.create({
    contentStyles: {
        marginBottom: 70
    },
    dateSlot: {
        paddingBottom: 10,
        // height:270,
        width: "100%",
        backgroundColor: 'white',
        shadowColor: "#000000",
        shadowOpacity: 0.25,
        shadowRadius: 7,
        shadowOffset: {
            height: 2,
            width: 2
        }
    },
    iconsOutMainLeft: {
        width: 10,
        height: 13,
    },
    iconsOutGradientLeft: {
        width: 20,
        height: 20,
        left: 30,
        position: "absolute",
        top: 10,
        borderRadius: 50,
        alignItems: 'center',
        justifyContent: "center"
    },
    iconsOut: {
        width: '100%',
        height: '100%'
    },
    iconsOutMainRight: {
        width: 10,
        height: 13,

    },
    iconsOutGradientRight: {
        right: 35,
        position: "absolute",
        width: 20,
        height: 20,
        top: 10,
        borderRadius: 50,
        alignItems: 'center',
        justifyContent: "center"
    },
    mainContainer: {
        padding: 20,
        paddingBottom: 0
    },
    secondView: {
        borderRadius: 6,
        alignItems: 'center',
        backgroundColor: "#fff",
        flexDirection: "row",
        marginBottom: 6,
        padding: 3,
        shadowColor: "#000000",
        shadowOpacity: 0.25,
        shadowRadius: 7,
        shadowOffset: {
            height: 2,
            width: 2
        }
    },
    timeConOut: {
        flexDirection: 'column',
        paddingLeft: 10,
        paddingRight: 10,
    },
    imageOutCon: {
        height: 45,
        width: 45,
        marginLeft: 10,
        marginRight: 10,
        borderRadius: 50,
        borderWidth: 0.5,
        borderColor: 'grey',
        padding: 1,
        overflow: 'hidden'
    },
    dateLabelOut: {
        paddingLeft: 22,
        marginTop: 20,
    },
    dateLabelText: {
        color: '#ef6937',
        fontSize: 13
    },
    nameTextOut: {
        paddingLeft: 10,
    },
    timeTextOut: {
        fontSize: 11,
    },
    cancelText: {
        color: "#fff"
    },
    cancelBtnOut: {
        flexDirection: 'column',
        marginBottom: 5,
        borderTopRightRadius: 6,
        borderBottomRightRadius: 6
    },
    listStyles: {
        backgroundColor: 'transparent',
        padding: 20,
        paddingBottom: 0
    },
    iconSize: {
        fontSize: 25
    },
    textHeight: {
        height: 20
    }
})