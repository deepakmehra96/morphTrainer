import React from 'react';
import { StyleSheet, Text, View, Dimensions, Image, AsyncStorage, ListView } from 'react-native';
import { Button, Icon, Footer, FooterTab, List } from 'native-base'
import { connect } from 'react-redux'
import Header from '../../components/Header';
import CalendarPicker from 'react-native-calendar-picker';
import LinearGradient from 'react-native-linear-gradient';
var { height, width } = Dimensions.get('window');
const row = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 })

class Appointment extends React.Component {
    static navigationOptions = {
        header: null
    }

    constructor() {
        super()
        this.state = {
            tasks_list: row
        }
    }
    componentDidMount() {
        let data = [{
            name: " Mike Brown"
        },
        {
            name: " Mike Brown"
        }]
        let { tasks_list } = this.state
        this.setState({ tasks_list: tasks_list.cloneWithRows(data) });
    }
    onRemoveGoal() {
        alert("deleted")
    }
    render() {
        return (
            <View>
                <Header navigation={this.props.navigation} showShadow={true} label="Appointments" />
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

                    <View style={styles.dateLabelOut}>
                        <Text style={styles.dateLabelText}>
                            Monday 10 Nov, Today
                            </Text>
                    </View>
                </View>
                <View>
                    <List
                        rightOpenValue={-75}
                        disableRightSwipe={true}
                        dataSource={this.state.tasks_list}
                        style={{ backgroundColor: 'transparent', padding: 20 }}
                        renderRow={data =>
                            <View style={styles.secondView}>
                                <View style={styles.timeConOut}>
                                    <View style={{ height: 20 }}>
                                        <Text style={styles.timeTextOut}>
                                            09:15 AM
                                            </Text>
                                    </View>
                                    <View>
                                        <Text style={styles.timeTextOut}>
                                            10:15 AM
                                            </Text>
                                    </View>
                                </View>
                                <View style={styles.imageOutCon}>
                                    <Image source={require('../../assets/images/person.jpg')} style={styles.iconsOut} />
                                </View>
                                <View style={styles.nameTextOut}>
                                    <Text>
                                        Mike Brown
                                            </Text>
                                </View>
                            </View>
                        }
                        renderRightHiddenRow={(data, secId, rowId, rowMap) =>
                            <Button  style={styles.cancelBtnOut} danger onPress={_ => this.onRemoveGoal(data)} >
                                <Icon active name="ios-close-circle" style={{ fontSize: 25 }} />
                                <Text style={styles.cancelText}>Cancel</Text>
                            </Button>}
                    />
                </View>
            </View>
        )
    }
}
export default connect(state => state)(Appointment)

const styles = StyleSheet.create({
    dateSlot: {
        paddingBottom: 10,
        // height:270,
        width: "100%",
        backgroundColor: 'white',
        shadowColor: "#000000",
        shadowOpacity: 0.25,
        shadowRadius: 10,
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
        paddingBottom:10
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
        shadowRadius: 10,
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
        marginTop: 20,
        paddingLeft: 2
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
    cancelText:{
        color:"#fff"
    },
    cancelBtnOut:{
        flexDirection:'column',
        marginBottom:5,
        borderTopRightRadius:6,
        borderBottomRightRadius:6
    }
})