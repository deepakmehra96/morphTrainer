import React from 'react';
import { View, Image, Dimensions, StyleSheet, ScrollView, SafeAreaView, TouchableOpacity } from 'react-native';
import { connect } from 'react-redux'
import ListItem from '../../components/ListItem.js';
var { height, width } = Dimensions.get('window')

class Calender extends React.Component {
    static navigationOptions = {
        header: null
    }
    constructor() {
        super()
        this.state = {
        };
    }

    handleBookingList() {
        this.props.navigation.navigate('ManageBooking');
    }

    render() {
        return (
            <View style={styles.fullScreen}>
                <ScrollView>
                    <TouchableOpacity onPress={() => this.handleBookingList()}>
                        <ListItem
                            listStyle={styles.leftTextOut}
                            heading="EMS, Emma Wilkins"
                            bottomText="10 Down Street"
                            leftText="09 : 30"
                            iconRight={require('../../assets/arrow.png')}
                        />
                    </TouchableOpacity>
                </ScrollView>
            </View>
        )
    }
}
export default connect(state => state)(Calender)

const styles = StyleSheet.create({
    fullScreen: {
        height: height,
        paddingTop: 70
    },
    leftTextOut: {
        paddingLeft: 100
    }
})
