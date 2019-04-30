import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import Dialog, { SlideAnimation, DialogContent } from 'react-native-popup-dialog';
import GradientBtn from '../../components/LinearGradient';
import ScrollPicker from '../Common/ScrollPicker';
import { connect } from 'react-redux';

class PickerSelect extends React.Component {
    constructor() {
        super()
    }

    render() {
        return (
            <Dialog
                visible={this.props.modalVisible}
                dialogAnimation={new SlideAnimation({
                slideFrom: 'bottom',
                })}
                onTouchOutside={() => {
                    this.props.toggleModal(false)
                }}
                dialogStyle={{backgroundColor: '#fff',width: '100%',borderRadius: 0,padding: 0}}
                containerStyle={{justifyContent: 'flex-end',padding: 20,paddingBottom: 0,width: '100%',marginBottom: -25}}
            >
                <DialogContent>
                    <View style={{height: 500}}>
                    <View style={{flexDirection: 'row',height: 500,backgroundColor: 'red',marginLeft: -20,marginRight: -20}}>
                        <View style={{width: '50%',borderRightWidth: 4,borderColor: '#dadada'}}>
                            <ScrollPicker
                                ref={(sp) => {this.sp = sp}}
                                dataSource={this.props.dataSource}
                                selectedIndex={this.props.selectedIndex - 1}
                                itemHeight={40}
                                wrapperHeight={500}
                                wrapperColor="#fff"
                                highlightColor="#fff"
                                renderItem={(data, index, isSelected) => {
                                    return(
                                        <View>
                                            <Text style={isSelected ? {color: '#fff',fontWeight: '600'} : {color: '#d2d0d0'}}>{data}</Text>
                                        </View>
                                    )
                                }}
                                onValueChange={(data, selectedIndex) => {
                                    this.props.onChangeDataSource(data)

                                }}
                            />
                        </View>
                        <View style={{width: '50%'}}>
                            <ScrollPicker
                                ref={(sp) => {this.sp = sp}}
                                dataSource={this.props.rightDataSource}
                                selectedIndex={this.props.selected - 1}
                                itemHeight={40}
                                wrapperHeight={500}
                                wrapperColor="#fafafa"
                                highlightColor="#fff"
                                renderItem={(data, index, isSelected) => {
                                    return(
                                        <View>
                                            <Text style={isSelected ? {color: '#fff',fontWeight: '600'} : {color: '#d2d0d0'}}>{data}</Text>
                                        </View>
                                    )
                                }}
                                onValueChange={(data, selectedIndex) => {
                                    this.props.onChageRightSource(data)
                                }}
                            />
                        </View>
                    </View>
                        <TouchableOpacity onPress={this.props.confirmButton} style={{position: 'absolute',bottom: 50,width: '100%'}}>
                            <GradientBtn text="DONE" style={{height: 40}}/>
                        </TouchableOpacity>
                    </View>
                </DialogContent>
            </Dialog>
        )
    }
}
export default connect(state => state)(PickerSelect)


