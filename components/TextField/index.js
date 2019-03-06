import React from 'react';
import { StyleSheet, Text, View, TextInput , Dimensions} from 'react-native';
var { height, width } = Dimensions.get('window');
// import { TextField } from 'react-native-material-textfield';

class TextBox extends React.Component {
    constructor() {
        super()
    }
    onChange(event) {
        this.props.onChange(event)
    }
    render() {
        return (
            <View>
                {/* <TextField
                    lineWidth={0}
                    activeLineWidth={0}
                    label={this.props.label}
                    inputContainerPadding={1}
                    labelPadding={5}
                    labelHeight={10}
                    containerStyle={styles.borderMain}
                    labelFontSize={12}
                    titleFontSize={10}
                    /> */}
                <Text style={styles.inputLable}>{this.props.label}</Text>
                <TextInput
                    style={[styles.textField, this.props.styleMainBox]}
                    secureTextEntry={this.props.secureTextEntry}
                    onChangeText={this.props.onChange}
                    keyboardType= {this.props.type}
                    value={this.props.value}
                    autoCapitalize = 'none'
                />

            </View>
        )
    }
}
export default TextBox;

const styles = StyleSheet.create({
    borderMain:{
        borderWidth:1, 
        borderRadius:8,
        borderColor: '#b0aeae', 
        padding:10,
    },
    inputLable: {
        color: '#467bdd',
        position: 'absolute',
        marginTop: 5,
        paddingLeft: 22,
        fontSize: 12
    },
    textField: {
        borderWidth: 1,
        borderColor: '#d1d1d1',
        borderRadius: 5,
        display: 'flex',
        paddingTop: 20,
        paddingBottom: 0,
        paddingLeft: 22,
        paddingRight: 22,
        fontSize: 12
    },

});

