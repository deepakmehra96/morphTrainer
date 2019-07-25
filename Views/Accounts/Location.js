import React from 'react';
import { View, Image, Dimensions, StyleSheet, ScrollView, Slider, Text, KeyboardAvoidingView } from 'react-native';
import { connect } from 'react-redux'
import { whiteColor, fontXXL, fontXL, fontLarge } from '../../components/constant';
import MapMain from '../Map';
import TextBox from '../../components/TextField.js';
var { height, width } = Dimensions.get('window')

class Location extends React.Component {
    static navigationOptions = {
        header: null
    }
    constructor() {
        super()
        this.state = {
            value: 10,
            postcode:""
        };
    }

    handleChange(event) {
        let { postcode } = this.state
        postcode = event
        this.setState({ postcode })
    }

    render() {
        let { value } = this.state
        return (
            <View style={styles.fullScreen}>
                <View style={styles.flexMain}>
                    <MapMain />
                </View>
                <View style={styles.flexSecondCon}>
                    <ScrollView>
                    <KeyboardAvoidingView behavior={"position"}>
                        <View style={styles.locationTextCon}>
                            <Text style={styles.headingText}>LOCATION REACH</Text>
                            <View style={styles.textBoxOut}>
                                <TextBox
                                    mode='outline'
                                    placeholder="Pastcode"
                                    onChangeText={this.handleChange.bind(this)}
                                    tintColor={'#520CC3'}
                                    highlightColor={'#520CC3'}
                                    placeholderTextColor={'#520CC3'}
                                    floatingLabelFont={styles.label}
                                    textInputStyle={styles.textInput}
                                />
                            </View>
                            <Text style={styles.textLight}>Or use <Text  style={styles.textColored}>current location</Text></Text>
                            <View style={styles.sliderOut}>
                                <Text style={styles.sliderHeading}>Distance form location</Text>
                                <Slider
                                    style={{ width: width- 60, height: 40 }}
                                    minimumValue={0}
                                    maximumValue={30}
                                    minimumTrackTintColor="#520CC3"
                                    maximumTrackTintColor="#520CC3"
                                    thumbTintColor="#520CC3"
                                    value={value}
                                    onValueChange={(e) => this.setState({ value: e })}
                                />
                            </View>
                         
                            <Text style={styles.headingText}>{Math.round(value * 10) / 10}</Text>
                        </View>
                        </KeyboardAvoidingView>
                    </ScrollView>
                </View>
            </View>
        )
    }
}
export default connect(state => state)(Location)

const styles = StyleSheet.create({
    fullScreen: {
        height: height,
    },
    flexMain: {
        flex: 2
    },
    flexSecondCon: {
        flex: 1,
        backgroundColor: whiteColor,
        marginBottom: 60
    },
    label:{ 
        paddingLeft: 12, 
        fontSize: fontXL, 
        color: '#520CC3',
        fontWeight:'700'
    },
    textInput: {
        fontWeight:'700',
        paddingLeft: 12,
        fontSize: fontLarge,
        color: '#520CC3',
        paddingBottom: 10,
        width:'100%'
    },
    textColored:{
        color: '#520CC3',
        letterSpacing:3,
        fontSize:fontLarge
    },
    textLight:{
        color: '#A1A1A1',
        letterSpacing:3,
        fontSize:fontLarge,
        fontWeight:'700'
    },
    sliderOut:{
        marginTop:15
    },
    sliderHeading:{
        color: '#520CC3',
        fontSize:fontLarge
    },
    headingText:{
        letterSpacing:3,
        color:'#4F4F4F',
        fontSize:fontLarge
    },
    textBoxOut: {
        marginTop: 5,
        marginBottom:15,
        width:width - 60
    },
    locationTextCon:{
        padding:10,
        paddingLeft:30,
        paddingRight:30,
        alignItems:'center',
        justifyContent:'space-between',
        flexDirection:'column'
    }

})
