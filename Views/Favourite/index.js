import React from 'react';
import { View, Text, Dimensions, StyleSheet, ScrollView, SafeAreaView, TouchableOpacity, Image } from 'react-native';
import { connect } from 'react-redux'
import BackgroundText from '../../components/BackgroundText';
import BackgroundContent from '../../components/BackgroundContent';
import { whiteColor } from '../../components/constant';
import ProfileBackground from '../../components/ProfileBackground';
var { height, width } = Dimensions.get('window')


class Favorite extends React.Component {
    static navigationOptions = {
        header: null
    }
    constructor() {
        super()
        this.state = {
        };
    }

   
    render() {
        return (
            <View style={styles.fullScreen}>
                <Text>Comming Soon</Text>
            </View>
        )
    }
}
export default connect(state => state)(Favorite)

const styles = StyleSheet.create({
    fullScreen: {
        height: height,
    },
    flexMain: {
        flex: 1
    },
    flexSecondCon: {
        flex: 2,
        backgroundColor: whiteColor,
        paddingBottom: 60
    },
    listStyle: {
        paddingLeft: 40
    },
    iconRight: {
        width: 10,
        height: 20
    },
    scrollContent: {
        flexDirection:'row',
        flexWrap:'wrap',
        paddingLeft:18
    },
    tabOut: {
        height: 60,
        flexDirection: 'row',
        borderBottomWidth: 1,
        borderColor: '#E5E5E5',
        marginBottom:10,
    },
    tabMain: {
        backgroundColor: '#EEEEEE',
        width: width / 2,
        justifyContent: 'center',
        alignItems: 'center',
    },
    tabMainActive: {
        width: width / 2,
        borderTopWidth: 4,
        borderTopColor: '#FFC379',
        justifyContent: 'center',
        alignItems: 'center',
    },
    boxMain:{
        height: 124, 
        width:width/2-40, 
        borderWidth:1, 
        margin:10,
        borderColor:'#C1C1C1',
        borderRadius:5,
        alignItems:'center',
        justifyContent:'center'
    },
    tabText:{
        letterSpacing:3
    },
    imageOut:{
        height:60,
        width:60,
        borderRadius:50,
        borderWidth:3,
        borderColor:whiteColor,
        shadowColor: "#000000",
        shadowOpacity: 0.4,
        shadowRadius: 3,
        shadowOffset: { height: 2, width: 1 },
        marginBottom:10
    },
    imagMain:{
        height:'100%',
        width:'100%'
    },
    textAll:{
        color:"#A1A1A1",
        letterSpacing:2
    },
    deleteIconOut:{
        height:17, 
        width:13, 
        position:'absolute', 
        right:10, 
        top:10
    }
})
