import React from 'react';
import { View, Text, Dimensions, StyleSheet, ScrollView, Platform, TouchableOpacity, Image } from 'react-native';
import { connect } from 'react-redux'
import { whiteColor, fontMedium, buttonBottom } from '../../components/constant';
import ButtonMain from '../../components/ButtonMain';
import Header from '../../components/Header';
import ProfileBackground from '../../components/ProfileBackground';
var { height, width } = Dimensions.get('window')
import { CheckBox, Card } from 'react-native-elements'
import { openToast } from '../../redux/actions';



class BookTrainer extends React.Component {
    static navigationOptions = {
        header: null
    }
    constructor() {
        super()
        this.state = {
            checked:false,
            listArray: [
                { _id:1, name: 'JODI PITOUT', rating: 4.9 },
                { _id:2, name: 'JODI PITOUT', rating: 4.9 },
                { _id:3, name: 'JODI PITOUT', rating: 4.9 },
                { _id:4, name: 'JODI PITOUT', rating: 4.9 },
                { _id:5, name: 'JODI PITOUT', rating: 4.9 },
                { _id:6, name: 'JODI PITOUT', rating: 4.9 },
                { _id:7, name: 'JODI PITOUT', rating: 4.9 },
                { _id:8, name: 'JODI PITOUT', rating: 4.9 }
            ],
            selectedId:'',
            tabIndex: 0,
            selectGender:'',
            setDropDown: false,
            genderArray: [
                { title: 'MALE' },
                { title: 'FEMALE' },
                { title: 'ALL' },
            ],

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

    handleBooking() {
        this.props.navigation.navigate('TrainerProfile')
    }
    handleCheck() {
        let { checked } = this.state
        this.setState({ checked: !checked })
    }
    handleDropDownSelect() {
        let { setDropDown } = this.state
        this.setState({ setDropDown: !setDropDown })
    }
    handleDropDown() {
        let { selectGender } = this.state
        if (selectGender == '') {
            return (
                <TouchableOpacity onPress={() => this.handleDropDownSelect()}  style={{ justifyContent: 'center', flexDirection: 'row', alignItems: 'center', width: 60 }}>
                    <Text style={styles.textStyle}>Gender</Text>
                    <Image style={{ height: 6, width: 10, marginLeft:3 }} source={require('../../assets/colorDrop.png')} />
                </TouchableOpacity>
            )
        } else {
            return (
                <TouchableOpacity onPress={() => this.handleDropDownSelect()} style={{ justifyContent: 'center', flexDirection: 'row', alignItems: 'center', width: 60 }}>
                    <Text numberOfLines={1}  style={styles.textStyle}>{selectGender}</Text>
                </TouchableOpacity>
            )
        }
    }

    getDropDown() {
        let { setDropDown, genderArray } = this.state
        if (setDropDown) {
            return (
                <View style={{ width: 170, alignItems: 'center', zIndex: 1,borderWidth:1, backgroundColor:whiteColor, borderColor: "#d1d1d1", position:'absolute',right: 30, top:30 }}>
                    {genderArray.map((val, index) => {
                        console.log(val)
                        return (
                            <TouchableOpacity key={index} onPress={() => this.handleDisplayGender(val.title)} style={{ zIndex: 999999999, height: 40, width:'100%', borderBottomColor: "#d1d1d1", borderBottomWidth: 0.8, alignItems: 'center', justifyContent: 'center' }}>
                                <Text style={styles.textStyle}>
                                    {val.title}
                                </Text>
                            </TouchableOpacity>
                        )
                    })}
                </View>
            )
        }
    }

    handleDisplayGender(data) {
        if (data === "ALL") {
            this.setState({ setDropDown: false, selectGender:'' })
            return
        }
        this.setState({ selectGender: data, setDropDown: false })
    }
    handleSubmit(){
        let { selectedId } = this.state
        if (selectedId) {
            this.props.navigation.navigate('TrainerProfile')
        }else{
            this.props.dispatch(openToast('Please Select Trainer'))
        }
    }

    render() {
        let { listArray, checked } = this.state
        return (
            <View style={styles.fullScreen}>
                <View style={styles.flexMain}>
                    <ProfileBackground textHeading="TRAINERS"  />
                    <Header source={require('../../assets/back-white-arrow.png')} navigation={this.props.navigation} />
                </View>
                <View style={styles.flexSecondCon}>
                {this.getDropDown()}
                    <View style={styles.mainContainer}>
                        <View style={styles.options}>
                            <View style={styles.favoriteOut}>
                                <Text style={styles.textStyle}>FAVOURITES</Text>
                                <CheckBox
                                    containerStyle={{marginTop:-13, marginLeft:0}}
                                    checked={checked}
                                    onPress={() => this.handleCheck()}
                                    checkedColor="#753DCF"
                                    uncheckedColor="#753DCF"
                                    checkedIcon="check-square"
                                />
                            </View>
                            <View style={styles.genderOut}>
                                {this.handleDropDown()}
                            </View>
                        </View>
                        <ScrollView>
                            <View style={styles.scrollContent}>
                                {listArray.map((val, index) => {
                                    return (
                                        <TouchableOpacity onPress={() => this.handleSizeSelect(val)} key={index} style={[styles.boxMain, this.hnadleSelctedColor(val)]}>
                                            <View style={styles.imageOut}>
                                                <Image style={styles.imagMain} source={require('../../assets/dp.png')} />
                                            </View>
                                            <Text numberOfLines={1} style={[styles.textAll, this.hnadleSelctedColor(val)]}>{val.name}</Text>
                                            <Text style={[styles.textAll, this.hnadleSelctedColor(val)]}>{val.rating}</Text>
                                        </TouchableOpacity>
                                    )
                                })}
                            </View>
                        </ScrollView>
                    </View>
                    <View style={styles.btnOut}>
                        <ButtonMain onPress={() => this.handleSubmit()} buttonStyle={styles.buttonStyle} isColored={true} label="NEXT" />
                    </View>
                </View>
            </View>
        )
    }
}
export default connect(state => state)(BookTrainer)

const styles = StyleSheet.create({
    flexMain: {
        flex: 1
    },
    flexSecondCon: {
        flex: 2,
        backgroundColor:whiteColor
    },
    fullScreen: {
        height: height,
    },
    upperCon: {
        marginTop: 22,
    },
    mainContainer: {
        paddingTop: 45,
        marginBottom: Platform.OS  == 'ios' ? 60 : 75,
    },
    options:{
        paddingLeft:35,
        paddingRight:35,
        height:35,
        position:'absolute',
        top:20,
        flexDirection:'row',
        // padding:25
    },
    favoriteOut:{
        width:'50%',
        // alignItems:'flex-start',
        flexDirection:'row',
        justifyContent:'flex-start',
        alignContent:'flex-start',
        alignItems:'flex-start'
    },
    textStyle:{
       color: '#4F4F4F',
       letterSpacing:1,
    },
    genderOut:{
        width:'50%',
        alignItems:'flex-end'
    },
    listStyle: {
        paddingLeft: 40
    },
    iconRight: {
        width: 10,
        height: 20
    },
    scrollContent: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        paddingLeft: 18,

    },
    boxMain: {
        height: 124,
        width: width / 2 - 40,
        borderWidth: 1,
        margin: 10,
        borderColor: '#C1C1C1',
        borderRadius: 5,
        alignItems: 'center',
        justifyContent: 'center'
    },
    tabText: {
        letterSpacing: 3
    },
    imageOut: {
        height: 60,
        width: 60,
        borderRadius: 50,
        borderWidth: 3,
        borderColor: whiteColor,
        shadowColor: "#000000",
        shadowOpacity: 0.4,
        shadowRadius: 3,
        shadowOffset: { height: 2, width: 1 },
        marginBottom: 10
    },
    imagMain: {
        height: '100%',
        width: '100%'
    },
    textAll: {
        color: "#A1A1A1",
        letterSpacing: 1
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
    colorBlue:{
        color:"#753DCF", 
        borderColor:'#753DCF'
    },
})
