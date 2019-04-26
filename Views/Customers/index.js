import React from 'react'
import { View, Text, StyleSheet, TouchableOpacity, Image, AsyncStorage, Dimensions } from 'react-native'
import { Container, Content } from 'native-base';
import Header from '../../components/Header';
import { Switch } from 'react-native-switch';
import { setUserDetail } from '../../redux/actions';
import { connect } from 'react-redux'
import GradientBtn from '../../components/LinearGradient';
var { height, width } = Dimensions.get('window');

class Options extends React.Component {

    static navigationOptions = {
        header: null
    }
    state = {
        list: [1,1,1,1,1,1,1]
    }
    
    render() {
        let { list } = this.state;
        return (
            <Container>
                <Header navigation={this.props.navigation} showShadow={true} label="Customers list"  />
                <Content>
                    <View style={{paddingLeft: 25,paddingRight: 25,marginBottom: 100}}>
                        {list.map((item,key) => {
                            return(
                                <View style={[styles.alignRowGoals,styles.mainList]} key={key}>
                                    <View>
                                        <TouchableOpacity style={styles.marginBottom10}>
                                            <GradientBtn text="Analytics" style={styles.gradientButn}/>
                                        </TouchableOpacity>
                                        <TouchableOpacity style={styles.marginBottom10} onPress={() => this.props.navigation.navigate('Dashboard')}>
                                            <GradientBtn text="Dashboard" style={styles.gradientButn}/>
                                        </TouchableOpacity>
                                        <Text style={styles.greyText}>Calories intake: 1030 cal</Text>
                                    </View>
                                    <View style={{flexWrap: 'wrap',overflow: 'hidden'}}>
                                        <Text style={styles.nameText}>Mike Brown</Text>
                                        <View style={styles.centerRow}><Text style={styles.goalText}>Goal: </Text><Text style={styles.orangeText}>Gain weight</Text></View>
                                        <Text style={[styles.orangeText]}>72 kg</Text>
                                    </View>
                                    <View style={styles.mainImageStyle}>
                                        <Image source={require('../../assets/images/person.jpg')} style={styles.imageStyle}/>
                                    </View>
                                    <View style={styles.alignEnd}>
                                        <TouchableOpacity style={styles.marginBottom10}>
                                            <GradientBtn text="Chat" style={styles.gradientButn}/>
                                        </TouchableOpacity>
                                        <TouchableOpacity style={styles.marginBottom10} onPress={() => this.props.navigation.navigate('PersonalityQa')}>
                                            <GradientBtn text="Personality Q&A" style={styles.gradientButn}/>
                                        </TouchableOpacity>
                                        <Text style={styles.greyText}>Calories intake: 1030 cal</Text>
                                    </View>
                                </View>
                            )
                        })}
                    </View>
                </Content>
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