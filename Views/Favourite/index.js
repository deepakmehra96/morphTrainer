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
            listArray:[
                { name :'JODI PITOUT', rating:4.9},
                { name :'JODI PITOUT', rating:4.9},
                { name :'JODI PITOUT', rating:4.9},
                { name :'JODI PITOUT', rating:4.9}
            ],
            tabIndex: 0
        };
    }

    handleTab(val) {
        this.setState({ tabIndex: val })
    }

    handleBooking(data){
        if (data.type == 'upcomimg') {
            this.props.navigation.navigate('ManageBooking', {
                item: data,
              });
        }
    }
    render() {
        let { listArray, tabIndex } = this.state
        let arrayToShow = tabIndex == 0 ? listArray : []  
        return (
            <View style={styles.fullScreen}>
                 <View style={styles.flexMain}>
                    <ProfileBackground textHeading="FAVOURITES" />
                </View>
                <View style={styles.flexSecondCon}>
                        <View style={styles.tabOut}>
                            <TouchableOpacity onPress={() => this.handleTab(0)} style={tabIndex == 0 ? styles.tabMainActive : styles.tabMain}>
                                <Text style={styles.tabText}>TRAINERS</Text>
                            </TouchableOpacity>
                            <TouchableOpacity onPress={() => this.handleTab(1)} style={tabIndex == 1 ? styles.tabMainActive : styles.tabMain}>
                                <Text style={styles.tabText}>EXERCISES</Text>
                            </TouchableOpacity>
                        </View>
                        <ScrollView>
                            <View style={styles.scrollContent}>
                                {arrayToShow.map((val, index) => {
                                    return(
                                        <View key={index} style={styles.boxMain}>
                                            <View style={styles.deleteIconOut}>
                                                <Image style={styles.imagMain} source={require('../../assets/delete.png')} />
                                            </View>
                                            <View style={styles.imageOut}>
                                                <Image style={styles.imagMain} source={require('../../assets/dp.png')} />
                                            </View>
                                            <Text numberOfLines={1} style={styles.textAll}>{val.name}</Text>
                                            <Text style={styles.textAll}>{val.rating}</Text>
                                        </View>
                                    )
                                })}
                               
                            </View>
                        </ScrollView>

                    </View>
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
