import React from 'react'
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native'
import { Container, Content } from 'native-base';
import Header from '../../components/Header';
import TextContent from '../../components/TextContent';

class Notifications extends React.Component {

    static navigationOptions = {
        header: null
    }
    render() {
        return (
            <Container>
                <Header leftArrow={true} navigation={this.props.navigation} showShadow={true} label="Notifications" source={require('../../assets/images/back-btn.png')} />
                <Content>
                    <View style={styles.paddingMain}>
                        <View style={styles.containerMainOut}>
                            <View style={styles.containerMain}>
                                <View style={styles.imageOut}>
                                    <Image style={styles.imageMain} source={require('../../assets/images/person.jpg')} />
                                </View>
                                <View style={styles.textOut}>
                                    <Text style={styles.textMain}>
                                        Example clint has sent you A message
                                    </Text>
                                    <Text style={styles.textDate}>
                                        jan 15 at 19:20am
                                    </Text>
                                </View>

                            </View>
                        </View>
                        <View style={styles.containerMainOut}>
                            <View style={styles.containerMain}>
                                <View style={styles.imageOut}>
                                    <Image style={styles.imageMain} source={require('../../assets/images/person.jpg')} />
                                </View>
                                <View style={styles.textOut}>
                                    <Text style={styles.textMain}>
                                        Example clint has sent you A message
                                    </Text>
                                    <Text style={styles.textDate}>
                                        jan 15 at 19:20am
                                    </Text>
                                </View>
                            </View>
                        </View>
                        <View style={styles.containerMainOut}>
                            <View style={styles.containerMain}>
                                <View style={styles.imageOut}>
                                    <Image style={styles.imageMain} source={require('../../assets/images/person.jpg')} />
                                </View>
                                <View style={styles.textOut}>
                                    <Text style={styles.textMain}>
                                        Example clint has sent you A message
                                    </Text>
                                    <Text style={styles.textDate}>
                                        jan 15 at 19:20am
                                    </Text>
                                </View>
                            </View>
                        </View>
                    </View>
                </Content>
            </Container>
        )
    }
}
export default Notifications

const styles = StyleSheet.create({
    paddingMain: {
        padding: 20,
    },
    textMain: {
        fontSize: 10,
        fontWeight:'700'
    },
    textOut:{
        marginLeft:20
    },
    textDate:{
        fontSize: 10,
        opacity: 0.9
    },
    textHeading: {
        paddingTop: 20,
        fontWeight: 'bold'
    },
    imageOut: {
        height: 30,
        width: 30,
        marginLeft:20
    },
    imageMain:{
        height:'100%',
        width:'100%'
    },
    containerMainOut:{
        width: "100%",
        height: 50,        
        marginTop:15
    },
    containerMain: {
        flexDirection:'row',
        width: "100%",
        height: '100%',
        alignItems: 'center',
        borderWidth: 2,
        backgroundColor: '#fff',
        borderColor: '#fff',
        elevation: 7,
        shadowColor: '#000',
        shadowOffset: { width: 1, height: 3 },
        shadowOpacity: 0.2,
        shadowRadius: 6,
    }

})