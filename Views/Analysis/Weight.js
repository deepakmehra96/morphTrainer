import React from 'react'
import { Text, View, StyleSheet, Dimensions, TouchableOpacity } from 'react-native';
import { connect } from 'react-redux'
import { Container, Content, Tab, Tabs } from 'native-base';
import Header from '../../components/Header';
import GradientBtn from '../../components/LinearGradient';
import LinearGradient from 'react-native-linear-gradient';
import PureChart from 'react-native-pure-chart';

var { height, width } = Dimensions.get('window');

class WeightAnalytics extends React.Component {
    constructor() {
        super()
        this.state = {
            btnArray: [
                { _id: 1, value: 'Week' },
                { _id: 2, value: 'Month' },
                { _id: 3, value: 'Year' }
            ],
            btnId: "1"
        }
    }
    static navigationOptions = {
        header: null,
    }

    handelChangeValues(val) {
        this.setState({ btnId: val._id })
    }

    ChangeStyle(val) {
        let { btnId } = this.state
        if (val._id == btnId) {
            return <GradientBtn text={val.value} style={styles.gradientStyle} btnStyle={{ fontSize: 10 }} />
        } else {
            return (
                <View style={styles.btn30}>
                    <Text style={this.textChangeStyle(val._id)}>{val.value}</Text>
                </View>
            )
        }
    }
    textChangeStyle(val) {
        let { btnId } = this.state
        if (val == btnId) {
            return styles.textContentWeightActive
        } else {
            return styles.textContentWeight
        }
    }
    render() {
        const data = [10, 20, 30, 45, 55, 95, 35, 53, 24, 50,35, 53, 24, 50,]
        const contentInset = { top: 20, bottom: 20 }
        let { btnArray } = this.state

        let sampleData = [
            {
              seriesName: 'series1',
              data: [
                {x: '01', y: 170},
                {x: '02', y: 360},
                {x: '03', y: 100},
                {x: '04', y: 250},
                {x: '05', y: 100}
              ],
              color: '#297AB1'
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
                                            {this.ChangeStyle(val)}
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
                        <PureChart data={sampleData} type='line' />
                    </View>
                    <Text style={styles.weekText}>WEEKS</Text>
                    <View style={styles.secondContainer}>
                        <View style={styles.flexRowMain}>
                            <View style={styles.flexColumn}>
                                <Text style={styles.textHeading}>
                                    Lastest weight, Jan 22
                                </Text>
                                <View style={styles.flexRow}>
                                    <Text style={styles.weightFont}>
                                        73
                                    </Text>
                                    <Text style={styles.weightFontKg}>
                                        kg
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
                                    Start weight, Dec 13
                                </Text>
                                <View style={styles.flexRow}>
                                    <Text style={styles.textWeightFont}>
                                        72.8
                                    </Text>
                                    <Text style={styles.textWeightFontKg}>
                                        kg
                                    </Text>
                                </View>
                            </View>
                            <View style={styles.flexColumnBack}>
                                <Text style={styles.textHeading}>
                                    Goal weight
                                </Text>
                                <View style={styles.flexRow}>
                                    <Text style={styles.textWeightFont}>
                                        80
                                    </Text>
                                    <Text style={styles.textWeightFontKg}>
                                        kg
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
                                        7
                                    </Text>
                                    <Text style={styles.textWeightFontKg}>
                                        kg
                                    </Text>
                                </View>
                            </View>
                            <View style={styles.flexColumnBack}>
                                <Text style={styles.textHeading}>
                                    Time left
                                </Text>
                                <View style={styles.flexRow}>
                                    <Text style={styles.textWeightFont}>
                                        12
                                    </Text>
                                    <Text style={styles.textWeightFontKg}>
                                        weeks
                                    </Text>
                                    <Text style={styles.textWeightFontDates}>
                                        2
                                    </Text>
                                    <Text style={styles.textWeightFontKg}>
                                        days
                                    </Text>
                                </View>
                            </View>
                        </View>
                    </View>
                </View>
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