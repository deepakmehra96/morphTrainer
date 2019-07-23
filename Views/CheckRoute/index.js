import React from 'react'
import { Text, View, AsyncStorage, StyleSheet } from 'react-native';
import { connect } from 'react-redux'
import { whiteColor } from '../../components/constant';

class CheckRoute extends React.Component {
    static navigationOptions = {
        header: null
    }
    
    async componentWillMount(){
        let token = await AsyncStorage.getItem('token')
        if(token){
            this.props.navigation.navigate('LoggedinTabs')
        }else{
            this.props.navigation.navigate('Login')
        }
    }
    render() {
        return (
            <View style={styles.bgColor}>
                <Text></Text>
            </View>
        )
    }
}

export default connect(state => state)(CheckRoute)


const styles = StyleSheet.create({
    bgColor:{
        backgroundColor:whiteColor
    }
 })