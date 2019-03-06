import React from 'react';
import { StyleSheet, Text, View, Dimensions, Image , AsyncStorage} from 'react-native';
import { Button, Icon, Footer, FooterTab } from 'native-base'
import Header from '../Header';
import Profile from '../../Views/Profile';
import Options from '../../Views/Options';
var { height, width } = Dimensions.get('window');

class FooterMain extends React.Component {
    static navigationOptions = {
        header: null
    }

    constructor(){
        super()
        this.state = {
            activeIndex:3
        }

    }
 
    onClickBtn(val){
        this.setState({ activeIndex : val})
    }

    handleComponents(){
        let { activeIndex } = this.state
        switch (activeIndex) {
            case 1:
                return null
                break;
            case 2:
                return null
                break;
            case 3:
                return <Profile navigation={this.props.navigation}/>
                break;
            case 4:
                return <Options navigation={this.props.navigation}/>
                break;
        
            default:
                break;
        }
    }   
    render() {
        return (
            <View style={styles.containerMain}>

            {/* <View> */}
                {this.handleComponents()}
            {/* </View> */}
                <Footer style={{ position: "absolute", bottom: 0, backgroundColor:'#fff',height:60}}>
                    <FooterTab style={{ backgroundColor:'#fff'}}>
                        <Button vertical onPress={() => this.onClickBtn(3)}>
                            <View style={styles.imageOutFirst}>
                                <Image source={require('../../assets/images/calender.png')} style={styles.imageMain} />
                            </View>
                            <Text style={styles.footerText}>Appointments</Text>
                        </Button>
                        <Button vertical onPress={() => this.onClickBtn(3)}>
                            <View style={styles.imageOutPeople}>
                                <Image source={require('../../assets/images/people.png')} style={styles.imageMain} />
                            </View>
                            <Text style={styles.footerText}>Customers</Text>
                        </Button>
                        <Button vertical onPress={() => this.onClickBtn(3)}>
                            <View style={styles.imageOutPeople}>
                                <Image source={require('../../assets/images/profileColor.png')} style={styles.imageMain} />
                            </View>
                            <Text style={styles.footerText}>Profile</Text>
                        </Button>
                        <Button vertical  onPress={() => this.onClickBtn(4)}>
                            <View style={styles.imageOutPeople} >
                                <Image source={require('../../assets/images/settings.png')} style={styles.imageMain} />
                            </View>
                            <Text style={styles.footerText}>Settings</Text>
                        </Button>
                    </FooterTab>
                </Footer>
             </View>
        )
    }
}
export default FooterMain;

const styles = StyleSheet.create({
    containerMain: {
        flex:1  
    },
    imageMain: {
        height: '100%',
        width: '100%'
    },
    imageOutPeople:{
        height: 24,
        width: 26,
        marginBottom: 3
    },
    imageOut: {
        height: 25,
        width: 18,
        marginBottom: 3
    },
    imageOutFirst:{
        height: 25,
        width: 27,
        marginBottom: 3
    },
    footerText:{
        color:'grey',
        fontSize:10
    }
});

