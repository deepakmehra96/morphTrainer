import React from 'react'
import { Text, View, StyleSheet } from 'react-native';
import { connect } from 'react-redux'
import { Container, Content, Tab, Tabs } from 'native-base';
import FooterMain from '../../components/Footer';
import Header from '../../components/Header';
import WeightAnalytics from './Weight'
import CaloriesAnalytics from './Calories'

class Analysis extends React.Component {
    static navigationOptions = {
        header: null
    }

    render() {
        return (
            <Container>
                <Header
                    source={require('../../assets/images/back-btn.png')}
                    label="Analytics"
                    navigation={this.props.navigation}
                    shadowStyles={styles.shadowTopMargin}
                />
                <Tabs tabBarUnderlineStyle={{ 
                        backgroundColor: '#f18173', height: 2, 
                    }}
                    scrollWithoutAnimation={true}>
                    <Tab heading="WEIGHT" 
                            tabStyle={styles.whiteBgColor} 
                            activeTabStyle={styles.whiteBgColor}activeTextStyle={{  color: '#000', fontSize: 12, fontWeight: 'bold' }} textStyle={{ color: '#000', fontSize: 12, fontWeight: 'bold' }}>
                        <WeightAnalytics  navigation={this.props.navigation} />
                    </Tab>
                    <Tab heading="CALORIES" tabStyle={styles.whiteBgColor} activeTabStyle={styles.whiteBgColor} activeTextStyle={{  color: '#000', fontSize: 12, fontWeight: 'bold' }} textStyle={{ color: '#000', fontSize: 12, fontWeight: 'bold' }}>
                        <CaloriesAnalytics navigation={this.props.navigation} />
                    </Tab>
                </Tabs>
            </Container>
        )
    }
}

export default connect(state => state)(Analysis)

const styles = StyleSheet.create({
    mainContainer: {

    },
    whiteBgColor: {
        backgroundColor: '#fff'
    },

})