import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';

class ExtraBtn extends React.Component {
    constructor() {
        super()
    }

    render() {
        return (
            <View style={[styles.borderOutMain]}>
                <View style={styles.borderExtra}>
                </View>
                <Text style={styles.TextExtra}>
                    or
            </Text>
                <View style={styles.borderExtra}>
                </View>
            </View>
        )
    }
}
export default ExtraBtn;

const styles = StyleSheet.create({
    borderOutMain: {
        flexDirection: 'row',
        marginTop: 10
    },
    TextExtra: {
        fontSize: 12,
        width: 30,
        textAlign: 'center'
    },
    borderExtra: {
        marginTop: 7,
        borderTopWidth: 1,
        borderColor: 'grey',
        width: 80,
    },

});
