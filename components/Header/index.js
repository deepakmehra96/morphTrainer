import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Dimensions, Image } from 'react-native';
import { Icon } from 'native-base'
var { height, width } = Dimensions.get('window');
import DeviceInfo from 'react-native-device-info';

class Header extends React.Component {

    checkNotch() {
        const hasNotch = DeviceInfo.hasNotch();
        if (hasNotch) {
            return styles.headerOutNotch
        } else {
            return styles.headerOut
        }
    }
    handleBack() {
        if(this.props.source){
            if (this.props.handleBackBtn) {
                return this.props.handleBackBtn()
            }
            this.props.navigation.goBack();
        }
    }
    checkBorderBottom(val) {
        if (val) {
            return (
                <View
                    style={[{
                        width: '100%',
                        elevation: 7,
                        opacity: 0.4,
                        borderColor: 'transparent',
                        marginTop: 10,
                        borderWidth: 1,
                        borderRadius: 2,
                        borderColor: '#fff',
                        shadowColor: '#000',
                        shadowOffset: { width: 0, height: 8 },
                        shadowOpacity: 0.8,
                        shadowRadius: 2,
                    },this.props.shadowStyles]}>
                </View>
            )
        }
    }
    handleRight(){
        this.props.handleRightBtn()
    }
    render() {
        return (
            <View style={[{marginBottom: 10, zIndex:999},this.props.borderStyle]}>
                <View style={this.checkNotch()}>
                    <View style={styles.width20}>
                        <TouchableOpacity onPress={() => { this.handleBack() }}>
                            <Image style={styles.imageaMain} source={this.props.source} />
                        </TouchableOpacity>
                    </View>
                    <View style={styles.width100}>
                        <View style={styles.headerMain}>
                            <Text style={[styles.label, this.props.textStyleHeader]}>{this.props.label}</Text>
                        </View>
                    </View>
                    <View style={[styles.widthRight, this.props.widthAdjust]}>
                        <TouchableOpacity onPress={() => this.handleRight()}>
                            <Text style={[styles.backText,this.props.backStyle]}>{this.props.backText}</Text>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => this.handleRight()}>
                            <Image style={styles.imageaMain} source={this.props.imageBack} />
                        </TouchableOpacity>
                    </View>
                </View>
                {this.checkBorderBottom(this.props.showShadow)}
            </View>
        )
    }
}
export default Header;

const styles = StyleSheet.create({
    width20: {
        position: 'absolute',
        left: 20,
        top: 9,
        width: 17,
        height: 13
    },
    widthRight: {
        position: 'absolute',
        right: 30,
        top: 9,
        width: 27,
        height: 13
    },
    backBtnOut: {
        height: 25,
        width: 25,
        backgroundColor: 'red'
    },
    imageaMain: {
        height: '100%',
        width: '100%',
    },
    width100: {
        width: '100%',
    },
    headerOutNotch: {
        flexDirection: 'row',
        marginTop: 50,
        paddingLeft: 40,
        paddingRight: 40,
        position: 'relative'
    },
    headerOut: {
        flexDirection: 'row',
        marginTop: 25,
        paddingLeft: 40,
        paddingRight: 40,
        position: 'relative'
    },
    headerMain: {
        alignItems: 'center',
        justifyContent: 'center',
    },
    label: {
        fontSize: 15,
        marginTop: 5
    },
    backText: {
        fontSize: 13
    }
});

