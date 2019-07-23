import React from 'react';
import { View, Text, Dimensions, StyleSheet, ScrollView, Platform } from 'react-native';
import { connect } from 'react-redux'
import ProfileBackground from '../../components/ProfileBackground';
import Header from '../../components/Header';
import { whiteColor, fontXL, fontLarge, fontSmall, fontMedium, buttonBottom } from '../../components/constant';
import Icon from 'react-native-vector-icons/dist/FontAwesome'
import ButtonMain from '../../components/ButtonMain';
var { height, width } = Dimensions.get('window')

class ExerciseView extends React.Component {
    static navigationOptions = {
        header: null
    }
    constructor() {
        super()
        this.state = {
            exerciseName: ''
        };
    }

    componentDidMount() {
        const { navigation } = this.props;
        const data = navigation.getParam('data', 'NO-ID');
        this.setState({ exerciseName: data.title })
    }

    textContent() {
        let { exerciseName } = this.state
        return (
            <View style={styles.headingContent}>
                <Text style={styles.textStyle}>{exerciseName}</Text>
                <View style={styles.iconOut}>
                    <Icon name="heart" size={18} color={whiteColor} />
                </View>
            </View>
        )
    }
    handleBtnPress(){
        this.props.navigation.navigate('Options')
    }

    render() {
        return (
            <View style={styles.fullScreen}>
                <View style={styles.flexMain}>
                    <Header source={require('../../assets/back-white-arrow.png')} navigation={this.props.navigation} />
                    <ProfileBackground content={this.textContent()} imageMain={require('../../assets/exercise.png')} />
                </View>
                <View style={styles.flexMain}>
                    <View style={styles.mainContainer}>
                        <ScrollView>
                            <Text style={styles.textHeading}>DESCRIPTION</Text>
                            <Text style={styles.text}>test</Text>
                        </ScrollView>
                    </View>
                </View>
                <View style={styles.btnOut}>
                    <ButtonMain onPress={() => this.handleBtnPress()} buttonStyle={styles.buttonStyle} isColored={true} label="Book" />
                </View>
            </View>
        )
    }
}
export default connect(state => state)(ExerciseView)

const styles = StyleSheet.create({
    flexMain:{
        flex: 1
    },
    fullScreen: {
        height: height,
    },
    headingContent: {
        height: 70,
        justifyContent: 'center'
    },
    textStyle: {
        color: whiteColor,
        fontSize: fontXL,
        letterSpacing: 3,
        fontWeight: '600',
        marginLeft: 30
    },
    iconOut: {
        borderRadius: 50,
        borderWidth: 2,
        borderColor: whiteColor,
        width: 35,
        height: 35,
        alignItems: 'center',
        justifyContent: 'center',
        position: 'absolute',
        paddingTop: 3,
        paddingLeft: 2,
        right: 20
    },
    mainContainer: {
        padding: 25,
        marginBottom: 40

    },
    textHeading: {
        fontSize: fontLarge,
        color: '#4F4F4F',
        marginBottom: 20,
        letterSpacing: 2
    },
    text: {
        fontSize: fontMedium,
        color: '#828282',
        marginBottom: 20,
    },
    btnOut: {
        width: width,
        position: 'absolute',
        bottom: buttonBottom,
        alignItems: 'center'
    },
    buttonStyle: {
        width: width - 50
    }
})
