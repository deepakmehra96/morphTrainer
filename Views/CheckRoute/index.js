import React from 'react'
import { Text, View, AsyncStorage } from 'react-native';
import { connect } from 'react-redux'
import { setUserDetail } from '../../redux/actions';

class CheckRoute extends React.Component {
    static navigationOptions = {
        header: null
    }
    async componentWillMount(){
        let token = await AsyncStorage.getItem('token')
        let user = await AsyncStorage.getItem('user')
        if(token && user){
            this.props.dispatch(setUserDetail(JSON.parse(user)))
            this.props.navigation.navigate('FooterMain')
        }else{
            this.props.navigation.navigate('SignIn')
        }
    }
    render() {
        return (
            <View style={{backgroundColor: '#fff'}}>
                <Text></Text>
            </View>
        )
    }
}

export default connect(state => state)(CheckRoute)