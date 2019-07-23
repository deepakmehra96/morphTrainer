import React from 'react';
import { View, Text, Dimensions, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { connect } from 'react-redux'
import ProfileBackground from '../../components/ProfileBackground';
import Header from '../../components/Header';
import { whiteColor, fontXL, fontLarge, fontSmall, fontMedium, fontXXL, buttonBottom } from '../../components/constant';
import ButtonMain from '../../components/ButtonMain';
import BackgroundText from '../../components/BackgroundText';
import { openToast } from '../../redux/actions';
var { height, width } = Dimensions.get('window')

class Options extends React.Component {
    static navigationOptions = {
        header: null
    }
    constructor() {
        super()
        this.state = {
            selectedId:'',
            dataArray:[
                {code:'XS',size:'Extra Small', _id:1},
                {code:'S',size:'Small', _id:2},
                {code:'M',size:'Medium', _id:3},
                {code:'L',size:'Large', _id:4},
                {code:'XL',size:'Extra Large', _id:5}
            ]
        };
    }
    handleSizeSelect(val){
        this.setState({ selectedId: val._id})
    }
    hnadleSelctedColor(val){
        let { selectedId } = this.state
        if (val._id == selectedId) {
            return styles.colorBlue
        }
    }
    handleSubmit() {
        let { selectedId } = this.state
        if (selectedId) {
            this.props.navigation.navigate('BookingTime')
        }else{
            this.props.dispatch(openToast('Please Select Kit Size'))
        }
    }
    
    render() {
        let { dataArray } = this.state
        return (
            <View style={styles.fullScreen}>
                <View style={styles.flexMain}>
                    <Header source={require('../../assets/back-white-arrow.png')} navigation={this.props.navigation} />
                    <ProfileBackground textHeading="OPTIONS"  />
                </View>
                <View style={styles.flexSecondCon}>
                    <View style={styles.mainContainer}>
                    <Text style={styles.textHeading}>SELECT THE <Text style={styles.colorBlueText}>KIT SIZE</Text></Text>
                        <ScrollView>
                            {dataArray.map((val, index) => {
                                return(
                                    <TouchableOpacity onPress={() => this.handleSizeSelect(val)} style={[styles.boxOut, this.hnadleSelctedColor(val)]}>
                                        <Text style={[styles.sizeCode, this.hnadleSelctedColor(val)]}>{val.code}</Text>
                                        <Text style={[styles.textSize, this.hnadleSelctedColor(val)]}>{val.size}</Text>
                                    </TouchableOpacity>
                                )
                            })}
                        </ScrollView>
                    </View>
                </View>
                <View style={styles.btnOut}>
                    <ButtonMain onPress={() => this.handleSubmit()} buttonStyle={styles.buttonStyle} isColored={true} label="NEXT" />
                </View>
            </View>
        )
    }
}
export default connect(state => state)(Options)

const styles = StyleSheet.create({
    flexMain:{
        flex: 1
    },
    flexSecondCon:{
        flex:2,
        backgroundColor:whiteColor
    },
    fullScreen: {
        height: height,
    },
    mainContainer: {
        padding: 25,
        marginBottom:80,
    },
    textHeading: {
        fontSize: fontLarge,
        color: '#4F4F4F',
        marginBottom: 20,
        letterSpacing: 2
    },
    btnOut: {
        width: width,
        position: 'absolute',
        bottom: buttonBottom,
        alignItems: 'center'
    },
    buttonStyle: {
        width: width - 50
    },
    boxOut:{
        borderWidth:1,
        borderColor:"#C1C1C1",
        height:50,
        width:100,
        alignItems:'center',
        justifyContent:'center',
        borderRadius:5,
        marginBottom:20
    },
    sizeCode:{
        fontSize:fontXXL,
        color:'#A1A1A1',
        fontWeight:'bold'
    },
    textSize:{
        fontSize:fontMedium,
        color:'#C1C1C1'
    },
    colorBlue:{
        color:"#753DCF", 
        borderColor:'#753DCF'
    },
    colorBlueText:{
        color:'#753DCF'
    }
})
