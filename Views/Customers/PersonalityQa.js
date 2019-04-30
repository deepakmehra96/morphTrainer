import React from 'react'
import { View, Text, StyleSheet, TouchableOpacity, Image, AsyncStorage, Dimensions } from 'react-native'
import { Container, Content } from 'native-base';
import Header from '../../components/Header';
import { connect } from 'react-redux'
import GradientBtn from '../../components/LinearGradient';
import LinearGradient from 'react-native-linear-gradient';
import { questionList, getUserAnswers } from '../../redux/actions';
import ShowLoader from '../../components/ShowLoader';
var { height, width } = Dimensions.get('window');

class PersonalityQa extends React.Component {

    static navigationOptions = {
        header: null
    }
    state = {
        list: [1,1,1,1,1,1,1],
        showLoader: false,
        allScreenData: [],
        stepsData: {},
        editLoader: false,
        options: [],
        active: false,
        answers: {}
    }
    componentDidMount(){
        let {user_id} = this.props.navigation.state && this.props.navigation.state.params
        this.setState({ showLoader: true, editLoader: true })
        this.props.dispatch(questionList()).then(res => {
            this.setState({ showLoader: false })
            console.log(res)
            if(res.data.message === 'Question List'){
                this.setState({allScreenData : res.data.question})
            }
        }).catch(err => {
            this.setState({ showLoader: false })
            console.log({...err},"err")
        })
        this.props.dispatch(getUserAnswers(user_id)).then(res => {
            console.log(res,"qares")
            this.setState({editLoader: false})
            if(res.data.message === 'success'){
                let apiData = res.data.data
                let optionData = apiData.options
                let optionsId = optionData.map(item => item)
                this.setState({ options: optionsId, answers: apiData })
            }
        }).catch(err => {
            console.log(err,"err123")
        })
    }

    handelLoader() {
        let { showLoader, editLoader } = this.state
        if (showLoader || editLoader) {
            return <ShowLoader />
        } else {
            return null
        }
        return
    }
    activeOption(id){
        let { options } = this.state;
        let activeOption = options.length && options.includes(id)
        if(activeOption){
            return  <View style={styles.activeOptionStyle}>
                        <Image source={require('../../assets/images/steps-checked.png')} style={styles.imageStyle}/>
                    </View>
        }
    }
    activeStyle(id){
        let { options } = this.state;
        let activeOption = options.length && options.includes(id)
        if(activeOption){
            return styles.activeDot
        }
    }
    renderData(){
        let { allScreenData, active } = this.state;
        if(allScreenData.length){
            return(
                <View>
                    {allScreenData.map((item,key) => {
                        return(
                            <View style={{marginBottom: 15}} key={key}>
                                <View style={[styles.shadowMain]}>
                                    <LinearGradient colors={['#f7b944', '#f49a3e', '#ef6937']} style={[styles.gradientMain]}>
                                        <Text style={styles.textHeading}>
                                            {item.question}
                                        </Text>
                                    </LinearGradient>
                                </View>
                                <View style={[styles.innerCon,styles.shadowMain]}>
                                    {item.options.map((itm, index) => {
                                        return(
                                            <View style={[styles.innerQue,this.activeStyle(itm._id)]} key={index}>
                                                <Text style={styles.textBlack}>{itm.option}</Text>
                                                {this.activeOption(itm._id)}
                                            </View>
                                        )
                                    })}
                                </View>
                            </View>
                        )
                    })}
                </View>
            )
        }
    }
    
    render() {
        let { list, allScreenData, answers } = this.state;
        console.log(answers,"answers")
        return (
            <Container>
                <Header navigation={this.props.navigation} showShadow={true} label="Personality Q&A" source={require('../../assets/images/back-btn.png')} />
                <Content>
                    <View style={{paddingLeft: 25,paddingRight: 25,marginTop: 20}}>
                        {this.renderData()}
                        {allScreenData.length ? <View style={[styles.shadowMain,{padding: 10,backgroundColor: '#fff',borderRadius: 5,marginBottom: 15}]}>
                            <Text style={styles.boldText}>What is your current weight?</Text>
                            <View style={styles.shadowMain}><GradientBtn text={parseInt(answers.current_weight)+' kg'} btnStyle={[styles.textHeading,{textAlign: 'left'}]} style={styles.gradientBtn}/></View>
                        </View>:<View></View>}
                        {allScreenData.length ? <View style={[styles.shadowMain,{padding: 10,backgroundColor: '#fff',borderRadius: 5,marginBottom: 15}]}>
                            <Text style={styles.boldText}>What is your goal weight?</Text>
                            <View style={styles.shadowMain}><GradientBtn text={parseInt(answers.goal_weight)+ ' kg'} btnStyle={[styles.textHeading,{textAlign: 'left'}]} style={styles.gradientBtn}/></View>
                        </View>:<View></View>}
                        {allScreenData.length ? <View style={[styles.shadowMain,{padding: 10,backgroundColor: '#fff',borderRadius: 5,marginBottom: 15}]}>
                            <Text style={styles.boldText}>How quickly do you want to reach your goal?</Text>
                            {answers.goal_type === 'Easy' ?
                            <View style={styles.shadowMain}><GradientBtn text="Easy" btnStyle={[styles.textHeading,{textAlign: 'left'}]} style={styles.gradientBtn}/></View>:
                            <View style={styles.innerQue}>
                                <Text style={styles.textBlack}>Easy</Text>
                            </View>}
                            {answers.goal_type === 'Average' ?
                            <View style={styles.shadowMain}><GradientBtn text="Average" btnStyle={[styles.textHeading,{textAlign: 'left'}]} style={styles.gradientBtn}/></View>:
                            <View style={styles.innerQue}>
                                <Text style={styles.textBlack}>Average</Text>
                            </View>}
                            {answers.goal_type === 'Intense' ?
                            <View style={styles.shadowMain}><GradientBtn text="Intense" btnStyle={[styles.textHeading,{textAlign: 'left'}]} style={styles.gradientBtn}/></View>:
                            <View style={styles.innerQue}>
                                <Text style={styles.textBlack}>Intense</Text>
                            </View>}
                        </View>:<View></View>}
                    </View>
                </Content>
                {this.handelLoader()}
            </Container>
        )
    }
}
export default connect(state => state)(PersonalityQa)

const styles = StyleSheet.create({
    
    contentOut:{
        borderBottomWidth: 0.5, 
        borderColor: '#d8d6d6',
        flexDirection:'row',
        padding:10,
        position:'relative'
    },
    mainContainer: {
        padding: 20
    },
    secondContainer: {
        padding: 20,
        paddingTop: 0
    },
    shadowMain: {
        elevation: 7,
        shadowColor: "#000000",
        shadowOpacity: 0.4,
        shadowRadius: 5,
        shadowOffset: { height: 1, width: 1 },
        borderBottomLeftRadius: 5,
        borderBottomRightRadius: 5,
        zIndex: 10
    },
    gradientMain: {
        width: '100%',
        borderRadius: 5,
        padding: 12,
    },
    textHeading: {
        fontWeight: 'bold',
        fontSize: 12,
        color: '#fff'
    },
    textMain: {
        fontSize: 11,
        color: 'black',
        paddingTop:5,
        marginLeft:7
    },
    coloredText:{
        fontSize: 11,
        color: '#f7b944',
    },
    innerCon: {
        backgroundColor: '#fff',
        paddingLeft: 10,
        paddingRight: 10,
        paddingBottom: 10,
        marginLeft: 5,
        marginRight: 5
    },
    iconContainer:{
        height:0,
        width:20
    },
    imageMain:{
        height:'100%',
        width:'100%'
    },
    colorTextOut:{
        position:'absolute', 
        right:10,
        top:15,
    },
    innerQue: {
        padding: 10,
        borderRadius: 5,
        borderWidth: 0.5,
        borderColor: '#aca3a3',
        marginTop: 10
    },
    textBlack: {
        color: '#000',
        fontSize: 12
    },
    gradientBtn: {
        borderRadius: 5,
        padding: 10,
        marginTop: 12,
        paddingLeft: 10
    },
    boldText: {
        color: '#000',
        fontSize: 12,
        fontWeight:'bold'
    },
    imageStyle: {
        height: '100%',
        width: '100%'
    },
    activeOptionStyle: {
        height: 30,
        width: 30,
        borderRadius: 15,
        position: 'absolute',
        right: 5,
        top: 5
    },
    activeDot: {
        paddingRight: 40
    }
})