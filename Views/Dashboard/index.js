import React from 'react';
import { View, Text } from 'react-native';
class Dashboard extends React.Component{
    static navigationOptions= {
        header : null
    }
    constructor(){
        super()
    }

    render(){
        return(
            <View>
                <Text>Morph app</Text>
            </View>
        )
    }
}
export default Dashboard