import React from 'react'
import { StyleSheet, ActivityIndicator, View } from 'react-native';
import { connect } from 'react-redux'

class ShowLoader extends React.Component {
    render() {
        return (
            <View style={styles.conMain}>
                <View style={styles.innerContainer}>
                </View>
                <View 
                style={styles.loaderBack}>
                    <ActivityIndicator size="large" color="orange" />
                </View>
            </View>
        )
    }
}
export default connect(state => state)(ShowLoader)

const styles = StyleSheet.create({
    loaderBack:{
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        justifyContent: 'center',
        alignItems: 'center',
        zIndex: 10
    },
    conMain:{
        position: 'absolute', 
        height: '100%' ,
        width: '100%' 
    },
    innerContainer:{ 
        justifyContent: 'center', 
        opacity: 0.5, 
        backgroundColor: 'black', 
        height: '100%', 
        width: '100%' 
    }
});
