import React from 'react'
import { StyleSheet, Text, View, Image, Dimensions, TouchableOpacity, CameraRoll } from 'react-native';
import { Container, Content, Tabs, Tab } from 'native-base';

import { connect } from 'react-redux'
import Header from '../../../components/Header';
import { ticketList } from '../../../redux/actions';
import ShowLoader from '../../../components/ShowLoader';
import moment from 'moment'
var { height, width } = Dimensions.get('window');

class Ticket extends React.Component {
    constructor() {
        super()
        this.state = {
            list: [1, 1, 1, 1, 1],
            anotherList: [1, 1],
            showLoader: false
        }
    }
    static navigationOptions = {
        header: null
    }
    componentDidMount() {
        let { user } = this.props.userData
        this.setState({ showLoader: true })
        this.props.dispatch(ticketList(user._id)).then(res => {
            console.log(res, "res")
            this.setState({ showLoader: false })
        }).catch(err => {
            this.setState({ showLoader: false })
        })
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

    handleGoToChat(item) {
        console.log(item)
        this.props.navigation.navigate('TicketMessage', { item: item })
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

    handleGoToChat(item) {
        this.props.navigation.navigate('TicketMessage', { item: item })
    }

    render() {
        let { showLoader } = this.state;
        let { ticketData } = this.props.userData
        let filteredOpenArray = ticketData.length && ticketData.filter(item => parseInt(item.status) === 1)
        let filteredResolvedArray = ticketData.length && ticketData.filter(item => parseInt(item.status) === 0)
        console.log(filteredOpenArray, filteredResolvedArray, "filteredArray")
        return (
            <Container>
                <Header navigation={this.props.navigation} label="YOUR TICKETS" source={require('../../../assets/images/back-btn.png')} backText="CREATE NEW TICKET" widthAdjust={{ position: 'absolute', right: 25, top: 10, width: 83, borderBottomWidth: 1 }} backStyle={{ fontSize: 9, letterSpacing: -1, fontWeight: 'bold' }} handleRightBtn={() => this.props.navigation.navigate('CreateYourTicket')} />
                <Tabs tabBarUnderlineStyle={{ backgroundColor: '#f18173', height: 2 }} scrollWithoutAnimation={true} >
                    <Tab heading="OPEN" tabStyle={styles.whiteBgColor} activeTabStyle={styles.whiteBgColor} activeTextStyle={{ color: '#f18173', fontSize: 12, fontWeight: 'bold' }} textStyle={{ color: '#000', fontSize: 12, fontWeight: 'bold' }}>
                        <Content>
                            <View style={styles.borderBottomcon}>
                                {!showLoader && filteredOpenArray.length ? filteredOpenArray.map((itm, key) => {
                                    return (
                                        <TouchableOpacity onPress={() => this.handleGoToChat(itm)} style={styles.mainList} key={key}>
                                            <View style={styles.boxTicket}>
                                                <Text style={styles.title}>You</Text>
                                            </View>
                                            <View>
                                                <Text style={styles.title}>{itm.ticket_title}</Text>
                                                <Text style={styles.answer}>({moment(itm.created_at).format('dddd MMMM DD, YYYY')})</Text>
                                            </View>
                                            <View style={styles.imageCon}>
                                                <Image source={require('../../../assets/images/right.jpg')} style={styles.imageStyle} />
                                            </View>
                                        </TouchableOpacity>
                                    )
                                }) : <View style={{ alignItems: 'center', marginTop: 30 }}>
                                        <Text style={{ color: '#ef6937' }}>No Ticket available</Text>
                                    </View>}
                            </View>
                        </Content>
                    </Tab>
                    <Tab heading="RESOLVED" tabStyle={styles.whiteBgColor} activeTabStyle={styles.whiteBgColor} activeTextStyle={{ color: '#f18173', fontSize: 12, fontWeight: 'bold' }} textStyle={{ color: '#000', fontSize: 12, fontWeight: 'bold' }}>
                        <Content>
                            <View style={styles.borderBottomcon}>
                                {!showLoader && filteredResolvedArray.length ? filteredResolvedArray.map((itm, key) => {
                                    return (
                                        <TouchableOpacity onPress={() => this.handleGoToChat(itm)} style={styles.mainList} key={key}>
                                            <View style={styles.boxTicket}>
                                                <Text style={styles.title}>You</Text>
                                            </View>
                                            <View>
                                                <Text style={styles.title}>{itm.ticket_title}</Text>
                                                <Text style={styles.answer}>({moment(itm.created_at).format('dddd MMMM DD, YYYY')})</Text>
                                            </View>
                                            <View style={styles.imageCon}>
                                                <Image source={require('../../../assets/images/right.jpg')} style={styles.imageStyle} />
                                            </View>
                                        </TouchableOpacity>
                                    )
                                }) : <View style={{ alignItems: 'center', marginTop: 30 }}>
                                        <Text style={{ color: '#ef6937' }}>No Ticket available</Text>
                                    </View>}
                            </View>
                        </Content>
                    </Tab>
                </Tabs>
                {this.handelLoader()}
            </Container>
        )
    }
}
export default connect(state => state)(Ticket)

const styles = StyleSheet.create({
    margintop20: {
        marginTop: 20
    },
    whiteBgColor: {
        backgroundColor: '#fff'
    },
    mainList: {
        padding: 17,
        paddingLeft: 80,
        borderBottomWidth: 1,
        borderColor: '#e6e6e6',
        paddingRight: 30
    },
    imageCon: {
        position: 'absolute',
        right: 10,
        top: 21,
        height: 15,
        width: 15
    },
    imageStyle: {
        width: '100%',
        height: '100%'
    },
    title: {
        fontSize: 12,
        color: '#000',
        fontWeight: 'bold'
    },
    answer: {
        fontSize: 10,
        color: '#a2a2a2'
    },
    boxTicket: {
        position: 'absolute',
        left: 20,
        borderWidth: 1,
        borderColor: '#e6e6e6',
        borderRadius: 3,
        padding: 10,
        paddingTop: 5,
        paddingBottom: 5,
        top: 17
    },
    borderBottomcon: {
        borderTopWidth: 1,
        marginTop: 30,
        borderColor: '#e6e6e6'
    }
})



