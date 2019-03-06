import React from 'react'
import { View, Text, StyleSheet, TouchableOpacity, Image, AsyncStorage } from 'react-native'
import { Container, Content } from 'native-base';
import Header from '../../components/Header';
import LinearGradient from 'react-native-linear-gradient';
import { Switch } from 'react-native-switch';
import { setUserDetail } from '../../redux/actions';
import { connect } from 'react-redux'

class Options extends React.Component {

    static navigationOptions = {
        header: null
    }
    async logout(){
        await AsyncStorage.removeItem('token')
        await AsyncStorage.removeItem('user')
        this.props.dispatch(setUserDetail({}))
        this.props.navigation.navigate('SignIn')
    }
    render() {
        return (
            <Container>
                <Header navigation={this.props.navigation} showShadow={true} label="Settings"  />
                <Content>
                <View style={styles.mainContainer}>
                    <View style={styles.shadowMain}>
                        <LinearGradient colors={['#f7b944', '#f49a3e', '#ef6937']} style={styles.gradientMain}>
                            <Text style={styles.textHeading}>
                                Prefrence
                            </Text>
                        </LinearGradient>
                        <View style={styles.innerCon}>
                            <View style={styles.contentOut}>
                                <View style={styles.iconContainer}>
                                    <Image source={require('../../assets/images/coach-settings_07.png')} style={styles.imageMain} />
                                </View>
                                <Text style={styles.textMain}>
                                    Notification
                                </Text>
                                <View style={styles.colorTextOut}>
                                <Switch
                                    onValueChange={(val) => console.log(val)}
                                    circleSize={20}
                                    backgroundActive={'#d6d6d6'}
                                    backgroundInactive={'#d6d6d6'}
                                    circleBorderWidth={0}
                                    circleActiveColor={'orange'}
                                    circleInActiveColor={'orange'}
                                    innerCircleStyle={{ alignItems: "center", justifyContent: "center" }} // style for inner animated circle for what you (may) be rendering inside the circle
                                />
                                </View>

                            </View>
                            <View style={styles.contentOut}>
                                <View style={styles.iconContainer}>
                                    <Image source={require('../../assets/images/coach-settings_13.png')} style={styles.imageMain} />
                                </View>
                                <Text style={styles.textMain}>
                                    Working Hour
                                </Text>
                                <View style={styles.colorTextOut}>
                                    <Image source={require('../../assets/images/right-arrow.png')} style={styles.imageMain} />
                                </View>
                            </View>
                            <View style={styles.contentOut}>
                                <View style={styles.iconContainer}>
                                    <Image source={require('../../assets/images/coach-settings_16.png')} style={styles.imageMain} />
                                </View>
                                <Text style={styles.textMain}>
                                    Appointment Slot
                                </Text>
                                <View style={styles.colorTextOut}>
                                    <Text style={styles.coloredText}>
                                        30 mins
                                    </Text>
                                </View>
                            </View>
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