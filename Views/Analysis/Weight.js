import React from 'react'
import { Text, View, StyleSheet, Dimensions, TouchableOpacity } from 'react-native';
import { connect } from 'react-redux'
import { Container, Content, Tab, Tabs } from 'native-base';
import GradientBtn from '../../components/LinearGradient';
import PureChart from 'react-native-pure-chart';
import { weightGraph, setGraphType } from '../../redux/actions';
import ShowLoader from '../../components/ShowLoader';
import moment from 'moment';
var { height, width } = Dimensions.get('window');

class WeightAnalytics extends React.Component {
    constructor() {
        super()
        this.state = {
            btnArray: [
                { _id: 1, value: 'week' },
                { _id: 2, value: 'month' },
                { _id: 3, value: 'year' }
            ],
            btnId: "1",
            weightData: {},
            showContent: false,
        }
    }
    static navigationOptions = {
        header: null,
    }

    componentDidMount(){
        let {graphType} = this.props.userData
        this.weightGraphApi(graphType)
    }

    weightGraphApi(type){
        let {user_id} = this.props.navigation.state && this.props.navigation.state.params
        let data = {
            userId: user_id,
            type: type
        }
        this.setState({ showLoader: true })
        this.props.dispatch(weightGraph(data)).then(res => {
            console.log(res,"ress")
            if(res.data.message = "success"){
                this.setState({ weightData: res.data.data, showContent: true })
            }
            this.setState({ showLoader: false })
        }).catch(err => {
            console.log({...err},"err")
            this.setState({ showLoader: false })
        })
    }

    handelChangeValues(val) {
        console.log(val.value,"val")
        this.props.dispatch(setGraphType(val.value))
        this.weightGraphApi(val.value)
        // this.setState({ btnId: val._id })
    }

    ChangeStyle(val) {
        let {graphType} = this.props.userData
        // let { btnId } = this.state
        if (val == graphType) {
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
        let {graphType} = this.props.userData
        console.log(val,graphType,"graphTypegraphType")
        if (val == graphType) {
            console.log(val,graphType,"graphTypegraphType")
            return styles.textContentWeightActive
        } else {
            console.log(val,graphType,"graphTypegraphType")
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
        let {graphType} = this.props.userData
        let { btnArray, weightData, showContent } = this.state
        console.log(weightData,"weightDataweightData")
        let calculateWeeks = weightData && weightData.Time_left && weightData.Time_left.split(' ')
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
                    {/* <View style={{ flexDirection: 'row' }}>
                        <YAxis
                            data={data}
                            contentInset={contentInset}
                            svg={{
                                fill: 'grey',
                                fontSize: 10,
                            }}
                            // numberOfTicks={ 10 } 
                            formatLabel={(value, index) => value}
                        />
                        <AreaChart
                            style={{ height: 200, width: '100%', paddingLeft: 10 }}
                            data={data}
                            contentInset={{ top: 30, bottom: 30 }}
                            svg={{ fill: 'rgba(220, 135, 38, 0.8)' }}
                        >
                            <Grid />
                        </AreaChart>

                    </View>
                    <XAxis
                        data={data}
                        formatLabel={(value, index) => value}
                        contentInset={{ left: 10, right: 10 }}
                        svg={{ fontSize: 10, fill: 'black', }}
                    /> */}
                    <View style={{ marginTop:20}}>
                    {console.log(weightData && weightData.graphData&& weightData.graphData.length && weightData.graphData[0],"weightData && weightData.graphData&& weightData.graphData.length && weightData.graphData[0]")}
                       {showContent && <PureChart data={weightData.graphData[0].data} type='line' />}
                    </View>
                    <Text style={styles.weekText}>{graphType.toUpperCase()}</Text>
                    <View style={styles.secondContainer}>
                        <View style={styles.flexRowMain}>
                            <View style={styles.flexColumn}>
                                <Text style={styles.textHeading}>
                                    Lastest weight, {moment(weightData.Latest_weight_date).format('MMMM DD')}
                                </Text>
                                <View style={styles.flexRow}>
                                    <Text style={styles.weightFont}>
                                        {weightData.Latest_weight}
                                    </Text>
                                    <Text style={styles.weightFontKg}>
                                        {weightData.Latest_weight_unit}
                                    </Text>
                                </View>
                            </View>
                            {/* <TouchableOpacity style={styles.btnOut} onPress={() => this.props.navigation.navigate('AddWeight')}>
                                <GradientBtn btnStyle={styles.btnText} style={styles.btnMain} text="ADD ENTRY" />
                            </TouchableOpacity> */}
                        </View>
                        <View style={styles.flexRowMain}>
                            <View style={styles.flexColumn}>
                                <Text style={styles.textHeading}>
                                    Start weight, {moment(weightData.Start_weight_date).format('MMMM DD')}
                                </Text>
                                <View style={styles.flexRow}>
                                    <Text style={styles.textWeightFont}>
                                        {weightData.Start_weight}
                                    </Text>
                                    <Text style={styles.textWeightFontKg}>
                                        {weightData.Start_weight_unit}
                                    </Text>
                                </View>
                            </View>
                            <View style={styles.flexColumnBack}>
                                <Text style={styles.textHeading}>
                                    Goal weight
                                </Text>
                                <View style={styles.flexRow}>
                                    <Text style={styles.textWeightFont}>
                                        {weightData.Goal_weight}
                                    </Text>
                                    <Text style={styles.textWeightFontKg}>
                                        {weightData.Goal_weight_unit}
                                    </Text>
                                </View>
                            </View>
                        </View>

                        <View style={styles.flexRowMain}>
                            <View style={styles.flexColumn}>
                                <Text style={styles.textHeading}>
                                    Left to goal
                                </Text>
                                <View style={styles.flexRow}>
                                    <Text style={styles.textWeightFont}>
                                        {weightData.Left_goal_weight}
                                    </Text>
                                    <Text style={styles.textWeightFontKg}>
                                        {weightData.Left_goal_weight_unit}
                                    </Text>
                                </View>
                            </View>
                            <View style={styles.flexColumnBack}>
                                <Text style={styles.textHeading}>
                                    Time left
                                </Text>
                                <View style={styles.flexRow}>
                                <Text style={styles.textWeightFont}>
                                        {calculateWeeks && calculateWeeks.length && calculateWeeks[0]}
                                    </Text>
                                    <Text style={styles.textWeightFontKg}>
                                    {calculateWeeks && calculateWeeks.length && calculateWeeks[1]}
                                    </Text>
                                    <Text style={styles.textWeightFontDates}>
                                    {calculateWeeks && calculateWeeks.length && calculateWeeks[2]}
                                    </Text>
                                    <Text style={styles.textWeightFontKg}>
                                    {calculateWeeks && calculateWeeks.length && calculateWeeks[3]}
                                    </Text>
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

export default connect(state => state)(WeightAnalytics)

const styles = StyleSheet.create({
    mainContainer: {
        padding: 20,
    },

    whiteBgColor: {
        backgroundColor: '#fff'
    },
    secondContainer: {
        padding: 10
    },
    flexRowMain: {
        marginTop: 25,
        flexDirection: "row",
        alignItems: 'flex-end'
    },
    flexRow: {
        paddingTop: 5,
        flexDirection: "row",
        alignItems: 'flex-end'
    },
    flexColumn: {
        width: '50%',
        flexDirection: "column"
    },
    flexColumnBack: {
        width: '50%',
        flexDirection: "column",
        paddingLeft: 25
    },
    textHeading: {
        color: 'grey',
        fontSize: 12
    },
    weightFont: {
        fontSize: 45
    },
    weightFontKg: {
        marginLeft: 10,
        fontSize: 30
    },
    btnOut: {
        width: "50%",
        alignItems: 'flex-end',
        elevation: 7,
        shadowColor: "#000000",
        shadowOpacity: 0.4,
        shadowRadius: 6,
        shadowOffset: { height: 2, width: 1 },
    },
    btnMain: {
        height: 45,
        width: 140,
        borderRadius: 50,
        elevation: 7,
        shadowColor: "#000000",
        shadowOpacity: 0.8,
        shadowRadius: 10,
        shadowOffset: { height: 2, width: 1 },
    },
    btnText: {
        fontWeight: '700',
        fontSize: 18
    },
    textWeightFont: {
        fontWeight: '300',
        fontSize: 25
    },
    textWeightFontKg: {
        fontWeight: '300',
        marginLeft: 7,
        fontSize: 15
    },
    textWeightFontDates: {
        fontSize: 25,
        fontWeight: '300',
        marginLeft: 7
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
        alignItems: 'flex-end'
    },
    weekText: {
        fontWeight: '500',
        marginLeft: 20,
        marginTop: 10,
        fontSize: 10
    }
})