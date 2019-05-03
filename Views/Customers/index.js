import React from 'react'
import { View, Text, StyleSheet, TouchableOpacity, Image, AsyncStorage, Dimensions } from 'react-native'
import { Container, Content } from 'native-base';
import Header from '../../components/Header';
import { Switch } from 'react-native-switch';
import { setUserDetail, getCustomerList } from '../../redux/actions';
import { connect } from 'react-redux'
import GradientBtn from '../../components/LinearGradient';
import ShowLoader from '../../components/ShowLoader';
var { height, width } = Dimensions.get('window');

class Options extends React.Component {

    static navigationOptions = {
        header: null
    }
    state = {
        list: [1,1,1,1,1,1,1],
        showLoader: false
    }
    componentDidMount(){
        let { user } = this.props.userData
        console.log(user,"user12121212")
        this.setState({ showLoader: true })
        this.props.dispatch(getCustomerList(user._id)).then(res => {
            this.setState({ showLoader: false })
            console.log(res,"resres")   
        })
    }

    handelLoader() {
        let { showLoader } = this.state
        if (showLoader) {
            return <ShowLoader />
        } else {
            return null
        }
        return
    }
    
    render() {
        let { customerList } = this.props.userData
        console.log(customerList,"customerList")
        return (
            <Container>
                <Header navigation={this.props.navigation} showShadow={true} label="Customers list"  />
                <Content>
                    <View style={{paddingLeft: 25,paddingRight: 25,marginBottom: 100}}>
                        {customerList.length ? customerList.map((item,key) => {
                            return(
                                <View style={[styles.alignRowGoals,styles.mainList]} key={key}>
                                    <View>
                                        <TouchableOpacity style={styles.marginBottom10}>
                                            <GradientBtn text="Analytics" style={styles.gradientButn}/>
                                        </TouchableOpacity>
                                        <TouchableOpacity style={styles.marginBottom10} onPress={() => this.props.navigation.navigate('Dashboard',{user_id: item._id})}>
                                            <GradientBtn text="Dashboard" style={styles.gradientButn}/>
                                        </TouchableOpacity>
                                        <Text style={styles.greyText}>Calories intake: 1030 cal</Text>
                                    </View>
                                    <View style={{flexWrap: 'wrap',overflow: 'hidden'}}>
                                        <Text style={styles.nameText}>{item.name}</Text>
                                        <View style={styles.centerRow}><Text style={styles.goalText}>Goal: </Text><Text style={styles.orangeText}>Gain weight</Text></View>
                                        <Text style={[styles.orangeText]}>72 kg</Text>
                                    </View>
                                    <View style={styles.mainImageStyle}>
                                        <Image source={item.avatar ? item.avatar : require('../../assets/images/person.jpg')} style={styles.imageStyle}/>
                                    </View>
                                    <View style={styles.alignEnd}>
                                        <TouchableOpacity style={styles.marginBottom10}>
                                            <GradientBtn text="Chat" style={styles.gradientButn}/>
                                        </TouchableOpacity>
                                        <TouchableOpacity style={styles.marginBottom10} onPress={() => this.props.navigation.navigate('PersonalityQa',{user_id: item._id})}>
                                            <GradientBtn text="Personality Q&A" style={styles.gradientButn}/>
                                        </TouchableOpacity>
                                        <Text style={styles.greyText}>Calories intake: 1030 cal</Text>
                                    </View>
                                </View>
                            )
                        }): <View></View>}
                    </View>
                </Content>
                {this.handelLoader()}
            </Container>
        )
    }
}
export default connect(state => state)(Options)

const styles = StyleSheet.create({
    
    shadowMain: {
        elevation: 7,
        shadowColor: "#000000",
        shadowOpacity: 0.4,
        shadowRadius: 5,
        shadowOffset: { height: 1, width: 1 },
        borderWidth: 1
    },
    mainList: {
        height: 95,
        flexDirection: 'row',
        alignItems: 'center',
        paddingLeft: 20,
        paddingRight: 20,
        justifyContent: 'space-around'
    },
    gradientButn: {
        width: 100,
        height: 25,
        borderRadius: 5
    },
    marginBottom10: {
        marginBottom: 7
    },
    alignRowGoals: {
        marginTop: 40,
        flexDirection: 'row',
        backgroundColor: '#fff',
        width: '100%',
        elevation: 7,
        shadowColor: "#000000",
        shadowOpacity: 0.4,
        shadowRadius: 5,
        shadowOffset: { height: 2, width: 1 },
        borderRadius: 5
    },
    greyText: {
        fontSize: 11,
        color: '#919191'
    },
    alignEnd: {
        alignItems: 'flex-end'
    },
    centerRow: {
        flexDirection: 'row'
    },
    goalText: {
        fontSize: 10,
        color: '#919191'
    },
    orangeText: {
        color: '#ed5921',
        fontSize: 10,
        textAlign: 'center'
    },
    nameText: {
        color: '#303030',
        fontSize: 11,
        textAlign: 'center'
    },
    imageStyle: {
        width: '100%',
        height: '100%'
    },
    mainImageStyle: {
        position: 'absolute',
        left: width/2-50,
        height: 50,
        width: 50,
        borderRadius: 25,
        overflow: 'hidden',
        top: -25
    }
})