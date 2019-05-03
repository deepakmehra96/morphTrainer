import React from 'react'
import { ScrollView, StyleSheet, Text, View, Image, TextInput, Dimensions, TouchableOpacity, AsyncStorage } from 'react-native';
import { Container, Content } from 'native-base';
import Header from '../../components/Header';
import GradientButton from '../../components/GradientButton';
import TextBox from '../../components/TextField';
import { connect } from 'react-redux'
import { userDetail, setUserDetail, getUserDetails } from '../../redux/actions';
import ShowLoader from '../../components/ShowLoader';
import FooterMain from '../../components/Footer';
var { height, width } = Dimensions.get('window');

class Profile extends React.Component {
    static navigationOptions = {
        header: null
    }
    constructor() {
        super()
        this.state = {
            text: '',
            showLoader: false
        }
    }
    async componentDidMount(){
        if(this.props.userData && this.props.userData.user){
            this.setState({ showLoader: true })
            this.props.dispatch(getUserDetails(this.props.userData.user._id)).then(res => {
                console.log(res,"res123")
                this.setState({ showLoader: false })
            })
            .catch(err => {
                this.setState({ showLoader: false })
                if(err.data.message){
                    this.refs.toast.show(err.data.message)
                }
            })
        }
    }
    handelLoader() {
        let { showLoader } = this.state
        if (showLoader) {
            return <ShowLoader />
        } else {
            return null
        }
        return
    }
    render() {
        let { user } = this.props.userData
        return (
            <Container>
                 <Header 
                        showShadow={true}
                        widthAdjust={styles.widthImageRight} 
                        imageBack={require('../../assets/images/coach-editBtn.png')} 
                        label="My Profile" 
                        leftArrow={false} 
                        navigation={this.props.navigation}
                        handleRightBtn={() => this.props.navigation.navigate('EditPofile')} />
                <Content style={{marginBottom:60}}>
                    <View style={styles.alIgnItemCenter}>
                        <View style={styles.imageOut}>
                            <View style={styles.prolileOnlineImg}>
                                <Image source={require('../../assets/images/online.png')} style={styles.imageMain} />
                            </View>
                            <View style={styles.imageOutMain}>
                                <Image source={user.avatar ? {uri: user.avatar} : require('../../assets/images/person.jpg')} style={styles.imageMain} />
                            </View>
                        </View>
                        <View style={styles.alIgnItemCenter}>
                            <Text style={styles.coloredtext}>{user.name}</Text>
                            <Text style={styles.textMain}>{user.job_role}</Text>
                        </View>
                    </View>

                    <View style={styles.containerMain}>
                        <Text style={styles.textHeading}>ABOUT</Text>
                        <View style={styles.smallBorder}></View>
                        <Text style={[styles.textMain,{minHeight: 200}]}>
                        {user.about}    
                        </Text>

                        <Text style={styles.textHeading}>CONTACT INFO</Text>
                        <View style={styles.smallBorder}></View>

                        <View style={styles.secondConOut}>
                            <View style={styles.width50}>
                                <Text style={styles.addressHeading}>Address</Text>
                                <Text style={styles.textMain}>{user.address}</Text>
                                {/* <Text style={styles.textMain}>320 VICTORIA PARADE</Text> */}
                                {/* <Text style={styles.textMain}>EAST MALBOURNE 3002</Text> */}
                            </View>
                            <View style={styles.width50SecondContainer}>
                                <View style={[styles.alignImagesInRow]}>
                                    <View style={styles.imageOutIcon}>
                                        <Image source={require('../../assets/images/phone.png')} style={styles.imageMain} />
                                    </View>
                                    <View style={{flexWrap:'wrap'}}>
                                        <Text style={[styles.textMain,{flexWrap:'wrap'}]}>{user.phone_number}</Text>
                                    </View>
                                </View>
                                <View style={styles.alignImagesInRow}>
                                    <View style={styles.imageOutIcon}>
                                        <Image source={require('../../assets/images/email.png')} style={styles.imageMain} />
                                    </View>
                                    <View style={{flexWrap:'wrap'}}>
                                        <Text style={[styles.textMain,{flexWrap:'wrap'}]}>{user.email}</Text>
                                    </View>
                                </View>
                            </View>
                        </View>
                    </View>
                </Content>
                {this.handelLoader()}
            </Container>
        )
    }
}
export default connect(state => state)(Profile)

const styles = StyleSheet.create({
    prolileOnlineImg:{ 
        height: 11, 
        width: 9, 
        zIndex: 1, 
        position: 'absolute', 
        left:'45%', 
        bottom: -7
    },
    imageOutIcon:{
        height:14,
        width:24,
        paddingRight:10,
        position: 'absolute',
        left: 10,
        top: 5
    },
    alignImagesInRow:{
        flexDirection:'row',
        width:'100%',
        paddingLeft:30,
        marginBottom:10,
        // height: 15
    },
    widthImageRight:{
        position: 'absolute',
        right: 20,
        top: -13,
        width: 25,
        height: 30
    },
    textHeading:{
        marginTop:12,
        fontSize:12
    },
    containerMain:{
        padding:20,
        paddingTop:5
    },
    alIgnItemCenter:{
        width:'100%',
        alignItems:'center',
    },
    imageOutMain:{
        borderRadius: 50,
        overflow: 'hidden',
        borderWidth: 1,
        borderColor: '#e6e6e6'
    },
    imageOut:{
        position: 'relative', 
        height: 80, 
        width: 80, 
        borderRadius:50,
        elevation: 6,
        shadowColor: "#000000",
        shadowOpacity: 0.3,
        shadowRadius: 10,
        shadowOffset: { height: 2, width: 0 },
        marginTop:20,
    },
    imageMain:{
        height:'100%',
        width:'100%',
        overflow:'hidden',
    },
    coloredtext:{
        color:'#e5834f',
        fontSize:12,
        marginTop:13,
        fontWeight:'bold',
    },
    textMain:{
        opacity:0.7,
        fontSize:11,
        marginTop:3,
    },
    smallBorder:{
        borderColor:'#e5834f',
        borderWidth:0.5,
        width:30,
        marginBottom:7
    },
    secondConOut:{
        flexDirection:'row'
    },
    width50:{
        width:'50%',
    },
    width50SecondContainer:{
        width:'50%',
        alignItems:'flex-end'
    },
    addressHeading:{
        fontSize:11
    }
});
