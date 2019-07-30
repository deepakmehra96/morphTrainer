import React from 'react';
import { View, Text, Dimensions, StyleSheet, Animated, Image, ScrollView, ImageBackground, TouchableOpacity } from 'react-native';
import { connect } from 'react-redux'
import { fontMedium, fontLarge, whiteColor, fontXXL, fontXL, fontSmall } from '../../components/constant';
import MapMain from '../Map';
import ButtonMain from '../../components/ButtonMain';
import SlidingUpPanel from 'rn-sliding-up-panel';
var { height, width } = Dimensions.get('window')
const ASPECT_RATIO = width / height;
const LATITUDE_DELTA = 0.0922;
const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO;

class MapScreen extends React.Component {
    static navigationOptions = {
        header: null
    }
    constructor() {
        super()
        this.state = {
            data: [
                { title: 'FAT LOSS', trainerCount: 28 },
                { title: 'MUSCLE BUILDING', trainerCount: 280 },
                { title: 'BETTER POSTURE', trainerCount: 2822 },
                { title: 'EMS', trainerCount: 28 }
            ],
            mapPoints: [
                {
                    name: 'Emma Jones, ems',
                    discription: '14:30',
                    map: {
                        latitude: 37.793972,
                        longitude: -122.431297,
                        latitudeDelta: 0.0922,
                        longitudeDelta: LONGITUDE_DELTA * ASPECT_RATIO,
                    }
                },
                {
                    name: 'Steve Hamilto, ems',
                    discription: '16:30',
                    map: {
                        latitude: 37.761472,
                        longitude: -122.441297,
                        latitudeDelta: 0.0922,
                        longitudeDelta: LONGITUDE_DELTA * ASPECT_RATIO,
                    }
                },
                {
                    name: 'Steve Jones, ems ',
                    discription: '19:00 ',
                    map: {
                        latitude: 37.761472,
                        longitude: -122.411297,
                        latitudeDelta: 0.0922,
                        longitudeDelta: LONGITUDE_DELTA * ASPECT_RATIO,
                    }
                }
            ],
            customerDetails: null
        };
    }
    handleGoToExercise(item) {
        this.props.navigation.navigate('ExerciseView', {
            data: item,
        });
    }

    handlerMarker(values) {
        console.log(values)
        this.setState({ customerDetails: values })
    }

    handleCustomer() {
        let { customerDetails } = this.state
        if (customerDetails) {
            return (
                <View style={styles.flexContainerDesc}>
                    <View>
                        <Text style={styles.headerTitle}>LOCATION REACH</Text>
                    </View>
                    <View style={styles.desContainer}>
                        <Text style={styles.textMain}>1. {customerDetails.name}{customerDetails.description}</Text>
                        <Text style={styles.textColor}>    SW4 OVF</Text>
                    </View>
                    <View style={styles.btnCon}>
                        <ButtonMain buttonStyle={styles.buttonStyle} isColored={true} label="DETAILS" />
                        <ButtonMain buttonStyle={styles.buttonStyle} isColored={true} label="CANCEL" />
                    </View>
                </View>
            )

        } else {
            return (
                <View style={styles.flexContainer}>
                    <Text style={styles.textMain}>No booking selected. </Text>
                    <Text style={styles.textColor}>Tap one to see the details.</Text>
                </View>
            )
        }
    }
    componentDidMount() {
        this.scrollY = new Animated.Value(0);
        this.changingHeight = this.scrollY.interpolate({
            inputRange: [0, 50],
            outputRange: [120, 60],
            extrapolate: "clamp"
        });
    }

    render() {
        let { mapPoints } = this.state
        return (
            <View style={styles.fullScreen}>
                <View style={styles.mapHeight}>
                    <MapMain markers={mapPoints} handlerMarker={(values) => this.handlerMarker(values)} />
                </View>
               {this.handleCustomer()}
            </View>
        )
    }
}
export default connect(state => state)(MapScreen)

const styles = StyleSheet.create({
    fullScreen: {
        height: height,
    },
    mapHeight: {
        height: height-250,
    },
    container: {
        height:300,
        backgroundColor: 'white',
        alignItems: 'center',
        justifyContent: 'center'
      },
    flexContainer: {
        alignItems: "center",
        marginBottom: 48,
        justifyContent: 'center',
        height: 200,
        width: width,
        position: 'absolute',
        bottom: 0,
        backgroundColor: whiteColor,
        zIndex: 999999
    },
    flexContainerDesc: {
        flex: 3,
        marginBottom: 48,
        alignItems: 'center'
    },
    textContainer: {
        justifyContent: "center",
        alignItems: "center"
    },
    textMain: {
        color: "#4F4F4F",
        letterSpacing: 2,
        fontSize: fontMedium
    },
    textColor: {
        color: "#520CC3",
        letterSpacing: 2,
        fontSize: fontMedium,
        marginTop: 5
    },
    headerTitle: {
        color: "#4F4F4F",
        letterSpacing: 2,
        fontSize: fontLarge,
        marginTop: 15
    },
    desContainer: {
        flexDirection: "column",
        alignSelf: 'flex-start',
        paddingLeft: 30,
        padding: 20
    },
    btnCon: {
        paddingLeft: 30,
        padding: 20,
        flexDirection: "row",
        justifyContent: "space-between",
        width: width
    },
    buttonStyle: {
        width: 120,
        height: 40,
        alignItems: "center",
        justifyContent: 'center'
    }
})