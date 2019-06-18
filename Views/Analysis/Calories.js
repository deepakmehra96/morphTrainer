import React from 'react'
import { Text, View, StyleSheet, Dimensions, TouchableOpacity } from 'react-native';
import { connect } from 'react-redux'
import { Content} from 'native-base';
import GradientBtn from '../../components/LinearGradient';
import PureChart from 'react-native-pure-chart';
import { setCaloriesGraphType, caloriesGraph } from '../../redux/actions';
import ShowLoader from '../../components/ShowLoader';
import moment from 'moment';
var { height, width } = Dimensions.get('window');

class CaloriesAnalytics extends React.Component {
    constructor() {
        super()
        this.state = {
            btnArray: [
                { _id: 1, value: 'week' },
                { _id: 2, value: 'month' },
                { _id: 3, value: 'year' }
            ],
            btnId: "1",
            caloriesData: {},
            showContent: false,
            showLoader: false
        }
    }
    static navigationOptions = {
        header: null
    }

    componentDidMount(){
        let { caloriesGraphType } = this.props.userData
        this.caloriesGraphApi(caloriesGraphType)
    }

    caloriesGraphApi(type){
        let {user_id} = this.props.navigation.state && this.props.navigation.state.params
        let data = {
            userId: user_id,
            type: type
        }

        console.log(data," data data data data")

        this.setState({ showLoader: true })
        this.props.dispatch(caloriesGraph(data)).then(res => {
            console.log(res,"ress")
            if(res.data.message = "success"){
                this.setState({ caloriesData: res.data.data, showContent: true })
            }
            this.setState({ showLoader: false })
        }).catch(err => {
            console.log({...err},"err")
            this.setState({ showLoader: false })
        })
    }

    handelChangeValues(val) {
        // this.setState({ btnId: val._id })
        this.props.dispatch(setCaloriesGraphType(val.value))
        this.caloriesGraphApi(val.value)
    }

    ChangeStyle(val) {
        let {caloriesGraphType} = this.props.userData
        if (val == caloriesGraphType) {
            return <GradientBtn text={val} style={styles.gradientStyle} btnStyle={{ fontSize: 10 }} />
        } else {
            return (
                <View style={styles.btn30}>
                    <Text style={this.textChangeStyle(val)}>{val}</Text>
                </View>
            )
        }
    }
    textChangeStyle(val) {
        let {caloriesGraphType} = this.props.userData
        if (val == caloriesGraphType) {
            return styles.textContentWeightActive
        } else {
            return styles.textContentWeight
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
        let {caloriesGraphType} = this.props.userData
        let { btnArray, caloriesData, showContent } = this.state
        let sampleData = [
            {
              seriesName: 'series1',
              data: [
                {x: '2018-02-01', y: 30},
                {x: '2018-02-02', y: 200},
                {x: '2018-02-03', y: 170},
                {x: '2018-02-04', y: 250},
                {x: '2018-02-05', y: 10}
              ],
              color: '#297AB1'
            },
            {
              seriesName: 'series2',
              data: [
                {x: '2018-02-01', y: 20},
                {x: '2018-02-02', y: 100},
                {x: '2018-02-03', y: 140},
                {x: '2018-02-04', y: 550},
                {x: '2018-02-05', y: 40},
              ],
              color: 'red'
            }
          ]
        
        return (
            <Content>
                <View style={styles.mainContainer}>
                    <View style={styles.btnOutMain}>
                        <View style={styles.alignInRow}>
                            {
                                btnArray.map((val, index) => {
                                    return (
                                        <TouchableOpacity key={index}
                                            onPress={() => this.handelChangeValues(val)}>
                                            {this.ChangeStyle(val.value)}
                                        </TouchableOpacity>
                                    )
                                })
                            }
                        </View>
                    </View>
                    {showContent && <PureChart data={caloriesData.graphData} type='line' />}
                    <Text style={styles.weekText}>{caloriesGraphType.toUpperCase()}</Text>
                    <View style={styles.secondContainer}>
                        <Text style={styles.textHeading}>
                            Lastest update: {moment().format('MMMM DD, YYYY')}
                        </Text>
                    </View>
                    <View style={styles.secondContainer}>
                            <View style={{flexDirection:'row', justifyContent:'space-between'}}>
                                <View>
                                    <View style={styles.textColoOutterCon}>
                                        <View style={styles.eatenColor}></View>
                                        <Text style={styles.textColorGrey}>Eaten</Text>
                                    </View>
                                    <View>
                                        <Text style={styles.caloriesText}>{caloriesData.Eaten_calories} Cal</Text>
                                    </View>
                                </View>
                                <View>
                                    <View style={styles.textColoOutterCon}>
                                        <View style={styles.leftColor}></View>
                                        <Text style={styles.textColorGrey}>Calories left</Text>
                                    </View>
                                    <View>
                                        <Text style={styles.caloriesText}>{caloriesData.Left_calories} Cal</Text>
                                    </View>
                                </View>
                                <View>
                                    <View style={styles.textColoOutterCon}>
                                        <View style={styles.burnedColor}></View>
                                        <Text style={styles.textColorGrey}>Calories burned</Text>
                                    </View>
                                    <View>
                                        <Text style={styles.caloriesText}>{caloriesData.Burned_calories} Cal</Text>
                                    </View>
                                </View>
                            </View>

                    </View>
                </View>
                {this.handelLoader()}
            </Content>
        )
    }
}

export default connect(state => state)(CaloriesAnalytics)

const styles = StyleSheet.create({
    mainContainer: {
        padding: 20
    },
    whiteBgColor: {
        backgroundColor: '#fff'
    },
    gradientStyle: {
        width: 50,
        height: 30,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 5,
        elevation: 4,
        shadowColor: "#000000",
        shadowOpacity: 0.3,
        shadowRadius: 5,
        shadowOffset: { height: 2, width: 0 },
    },
    btn30: {
        width: 50,
        height: 30,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 5,
        backgroundColor: '#f3f5f6',
    },
    textContentWeight: {
        fontSize: 10,
    },
    textContentWeightActive: {
        fontSize: 10,
        color: '#fff'
    },
    alignInRow: {
        backgroundColor: '#f3f5f6',
        borderRadius: 5,
        flexDirection: "row",
        height: 30,
        width: 150
    },
    btnOutMain: {
        width: '100%',
        alignItems: 'flex-end',
        marginBottom:10
    },
    weekText: {
        fontWeight: '500',
        marginLeft: 10,
        marginTop: 10,
        marginBottom:10,
        fontSize: 10
    },
    secondContainer: {
        padding: 10
    },
    textHeading: {
        color: 'grey',
        fontSize: 12
    },
    textColorGrey:{
        color:"grey",
        fontSize: 12
    },
    textColoOutterCon: {
        alignItems:'center',
        flexDirection:'row'
    },
    eatenColor:{ 
        height:10, 
        width:10, 
        backgroundColor:"#008000", 
        borderRadius:20, 
        marginRight:10
    },

    leftColor:{ 
        height:10, 
        width:10, 
        backgroundColor:"#0000ff", 
        borderRadius:20, 
        marginRight:10
    },

    burnedColor:{ 
        height:10, 
        width:10, 
        backgroundColor:"#FFFF00", 
        borderRadius:20, 
        marginRight:10
    },
    caloriesText:{
        marginTop:10,
        fontSize:18,
        marginLeft:2
    }
})