import React from 'react';
import { View, Text, Dimensions, StyleSheet, SafeAreaView, Image, ScrollView, ImageBackground, TouchableOpacity } from 'react-native';
import { connect } from 'react-redux'
// import LinearGradient from 'react-native-linear-gradient';
import { fontMedium, fontLarge, whiteColor, fontXXL, fontXL, fontSmall } from '../../components/constant';
import MapMain from '../Map';
var { height, width } = Dimensions.get('window')


class Main extends React.Component {
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
            ]
        };
    }
    handleGoToExercise(item) {
        this.props.navigation.navigate('ExerciseView', {
            data: item,
        });
    }
    render() {
        let { data } = this.state
        return (
            <View style={styles.fullScreen}>
                <View style={styles.flexMain}>
                    <MapMain />
                </View>
                <View style={styles.flexContainer}>
                    <Text style={styles.textMain}>No booking selected. </Text>
                    <Text style={styles.textColor}>Tap one to see the details.</Text>
                </View>
            </View>
        )
    }
}
export default connect(state => state)(Main)

const styles = StyleSheet.create({
    fullScreen: {
        height: height,
    },
    flexMain: {
        flex: 5,
    },
    flexContainer: {
        flex: 3,
        justifyContent: "center",
        alignItems: "center",
        marginBottom:48
    },
    textContainer: {
        justifyContent: "center",
        alignItems: "center"
    },
    textMain:{
        color:"#4F4F4F",
        letterSpacing:2,
        fontSize:fontMedium
    },
    textColor:{
        color:"#520CC3",
        letterSpacing:2,
        fontSize:fontMedium

    },
})