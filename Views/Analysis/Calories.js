import React from 'react'
import { Text, View, StyleSheet, Dimensions, TouchableOpacity } from 'react-native';
import { connect } from 'react-redux'
import { Container, Content, Tab, Tabs } from 'native-base';
import FooterMain from '../../components/Footer';
import Header from '../../components/Header';
import GradientBtn from '../../components/LinearGradient';
import LinearGradient from 'react-native-linear-gradient';
import PureChart from 'react-native-pure-chart';
var { height, width } = Dimensions.get('window');

class CaloriesAnalytics extends React.Component {
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
        header: null
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
        const data = [50, 10, 40, 95, 55, 91, 35, 53, 24, 50,]
        const contentInset = { top: 20, bottom: 20 }
        let { btnArray } = this.state
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
                            formatLabel={(value, index) => index}
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
                        formatLabel={(value, index) => index}
                        contentInset={{ left: 10, right: 10 }}
                        svg={{ fontSize: 10, fill: 'black', }}
                    /> */}
                    <PureChart data={sampleData} type='line' />
                    <Text style={styles.weekText}>WEEKS</Text>

                    <View style={styles.secondContainer}>
                        <Text style={styles.textHeading}>
                            Lastest weight, Jan 22
                        </Text>
                    </View>
                </View>
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
        alignItems: 'flex-end'
    },
    weekText: {
        fontWeight: '500',
        marginLeft: 20,
        marginTop: 10,
        fontSize: 10
    },
    secondContainer: {
        padding: 10
    },
    textHeading: {
        color: 'grey',
        fontSize: 12
    },

})