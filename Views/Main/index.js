import React from 'react';
import { View, Text, Dimensions, StyleSheet, TouchableOpacity } from 'react-native';
import { connect } from 'react-redux'
import MapScreen from './Map';
import Calender from './Calender';
import { whiteColor } from '../../components/constant';
var { height, width } = Dimensions.get('window')


class Main extends React.Component {
    static navigationOptions = {
        header: null
    }
    constructor() {
        super()
        this.state = {
            selectedIndex : 1
        };
    }

    handleScreens(){
        let { selectedIndex } = this.state
        switch (selectedIndex) {
            case 1:
                return <MapScreen  navigation={this.props.navigation} />
                break;
            case 2:
                return <Calender navigation={this.props.navigation} />
                break;
            default:
                break;
        }
    }
   
    handleTextStyles(val){
        let { selectedIndex } = this.state
        if (val == selectedIndex) {
            return styles.textColor
        }else{
            return styles.textColorDark
        }
    }

    render() {
        return (
            <View style={styles.fullScreen}>
                <View  style={styles.alignCenter}>
                    <View style={styles.tabContainer}>
                        <TouchableOpacity onPress={() => this.setState({selectedIndex: 1})} style={[styles.tabs, styles.extraBorder]}>
                            <Text style={this.handleTextStyles(1)}>Map View</Text>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => this.setState({selectedIndex: 2})} style={styles.tabs}>
                            <Text style={this.handleTextStyles(2)}>Calender View</Text>
                        </TouchableOpacity>
                    </View>
                </View>
                {this.handleScreens()}
            </View>
        )
    }
}
export default connect(state => state)(Main)

const styles = StyleSheet.create({
    fullScreen: {
        flex: 1
    },
    tabContainer:{
        position:"absolute",
        top:30,
        width:width-80,
        zIndex:99999,
        flexDirection:'row',
        height:30,
        backgroundColor:"rgba(0, 0, 0, 0.54)",
        opacity:0.8,
        borderRadius:5,
    },
    extraBorder:{
        borderRightColor:whiteColor,
        borderRightWidth:2
    },
    tabs:{
        width:width/2 -40,
        alignItems:'center',
        justifyContent:'center'
    },
    textColor:{
        color:whiteColor,
        fontWeight:'600'
    },
    textColorDark:{
        color:'#C1C1C1',
        fontWeight:'600'
    },
    alignCenter:{
        zIndex:99999,
        width:width,
        alignItems:'center'
    }
})