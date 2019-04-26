import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import Dialog, { SlideAnimation, DialogContent } from 'react-native-popup-dialog';
import GradientBtn from '../../components/LinearGradient';

class DialogBox extends React.Component {
    constructor() {
        super()
    }

    render() {
        return (
            <Dialog
                visible={this.props.visible}
                dialogAnimation={new SlideAnimation({
                slideFrom: 'bottom',
                })}
                onTouchOutside={() => {
                    this.props.openCloseModal(false)
                }}
                dialogStyle={[this.props.propStyle,{backgroundColor: '#fff',width: '100%',borderRadius: 0,padding: 0},this.props.transparent && {backgroundColor: 'transparent',marginBottom: 40}]}
                containerStyle={{justifyContent: 'flex-end',padding: 0,width: '100%'}}
            >
                <DialogContent contentContainer={{backgroundColor: 'yellow'}}>
                    <View style={[this.props.height,{marginLeft: -20,marginRight: -20}]}>
                        <View style={[{height: 30,justifyContent: 'center',borderBottomWidth: 1,paddingLeft: 20,borderColor: '#f3f3f3'},this.props.transparent && {display: 'none'}]}>
                            <Text style={{fontSize: 11,color: '#000'}}>{this.props.headingText}</Text>
                            <View style={{position: 'absolute',right: 20,top: -5}}>
                                <TouchableOpacity style={{padding: 5}} onPress={() => this.props.openCloseModal(false)}><Text style={{fontSize: 18,color: '#f7c292'}}>x</Text></TouchableOpacity>
                            </View>
                        </View>
                        {this.props.content()}
                    </View>
                </DialogContent>
            </Dialog>
        )
    }
}
export default DialogBox;


