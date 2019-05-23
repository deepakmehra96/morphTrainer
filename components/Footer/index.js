import React from 'react';
import { StyleSheet, Text, View, Dimensions, Image , AsyncStorage} from 'react-native';
import { Button, Icon, Footer, FooterTab } from 'native-base'
import Header from '../Header';
import Profile from '../../Views/Profile';
import Options from '../../Views/Options';
import Customers from '../../Views/Customers';
import ShowLoader from '../ShowLoader';
import { getUserDetails } from '../../redux/actions';
import { connect } from 'react-redux'
import Appointment from '../../Views/Appointment';
import { StackActions, NavigationActions } from 'react-navigation';
var { height, width } = Dimensions.get('window');

class FooterMain extends React.Component {
    static navigationOptions = {
        header: null
    }

    constructor(){
        super()
        this.state = {
            activeIndex:2,
            loader: false
        }
    }
    async componentDidMount(){
        this.setState({ loader: true })
        let user = await AsyncStorage.getItem('user')
        user = JSON.parse(user)
        console.log(user,"useruser")
        if(user){
            this.props.dispatch(getUserDetails(user._id)).then(res => {
                console.log(res,"res123")
                this.setState({ loader: false })
            }).catch(err => {
                this.setState({ loader: false })
                if(err.data.message === 'Token has expired'){
                    const resetAction = StackActions.reset({
                        index: 0,
                        actions: [NavigationActions.navigate({ routeName: 'SignIn' })],
                    })
                    this.props.navigation.dispatch(resetAction)
                }
            })
        }
    }
 
    onClickBtn(val){
        this.setState({ activeIndex : val})
    }
    imageStyle(val){
        let { activeIndex } = this.state;
        if(val == 1){
            if(activeIndex !== val){
                return require('../../assets/images/calender.png')
            }else{
                return require('../../assets/images/menu-icons_03.png')
            }
        }
        if(val == 2){
            if(activeIndex !== val){
                return require('../../assets/images/people.png')
            }else{
                return require('../../assets/images/menu-icons_05.png')
            }
        }
        if(val == 3){
            if(activeIndex !== val){
                return require('../../assets/images/menu-icons_07.png')
            }else{
                return require('../../assets/images/profileColor.png')
            }
        }
        if(val == 4){
            if(activeIndex !== val){
                return require('../../assets/images/settings.png')
            }else{
                return require('../../assets/images/menu-icons_09.png')
            }
        }
    }

    handleComponents(){
        let { activeIndex } = this.state
        switch (activeIndex) {
            case 1:
                return <Appointment navigation={this.props.navigation}/>
                break;
            case 2:
                return <Customers navigation={this.props.navigation}/>
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

    handelLoader() {
        let { loader } = this.state
        if (loader) {
            return <ShowLoader />
        } else {
            return null
        }
        return
    }

    render() {
        return (
            <View style={styles.containerMain}>

            {/* <View> */}
                {this.handleComponents()}
                {this.handelLoader()}
            {/* </View> */}
                <Footer style={{ position: "absolute", bottom: 0, backgroundColor:'#fff',height:60}}>
                    <FooterTab style={{ backgroundColor:'#fff'}}>
                        <Button vertical onPress={() => this.onClickBtn(1)}>
                            <View style={styles.imageOutFirst}>
                                <Image source={this.imageStyle(1)} style={styles.imageMain} />
                            </View>
                            <Text style={styles.footerText}>Appointments</Text>
                        </Button>
                        <Button vertical onPress={() => this.onClickBtn(2)}>
                            <View style={styles.imageOutPeople}>
                                <Image source={this.imageStyle(2)} style={styles.imageMain} />
                            </View>
                            <Text style={styles.footerText}>Customers</Text>
                        </Button>
                        <Button vertical onPress={() => this.onClickBtn(3)}>
                            <View style={styles.imageOutPeople}>
                                <Image source={this.imageStyle(3)} style={styles.imageMain} />
                            </View>
                            <Text style={styles.footerText}>Profile</Text>
                        </Button>
                        <Button vertical  onPress={() => this.onClickBtn(4)}>
                            <View style={styles.imageOutPeople} >
                                <Image source={this.imageStyle(4)} style={styles.imageMain} />
                            </View>
                            <Text style={styles.footerText}>Settings</Text>
                        </Button>
                    </FooterTab>
                </Footer>
             </View>
        )
    }
}
export default connect(state => state)(FooterMain)

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

