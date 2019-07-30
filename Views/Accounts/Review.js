import React from 'react';
import { View, Text, Dimensions, StyleSheet, ScrollView } from 'react-native';
import StarRating from 'react-native-star-rating';
import { connect } from 'react-redux'
import Header from '../../components/Header';
import ProfileBackground from '../../components/ProfileBackground';
import { whiteColor, fontXXL, fontSmall, fontMedium, PlatformIos, fontX3L } from '../../components/constant';
var { height, width } = Dimensions.get('window')

class Review extends React.Component {
    static navigationOptions = {
        header: null
    }
    constructor() {
        super()
        this.state = {
            reviewArray:[
                {rating:2, text:'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna wirl'},
                {rating:1, text:'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna wirl'},
                {rating:4, text:'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna wirl'},
                {rating:3, text:'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna wirl'},
                {rating:5, text:'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna wirl'},
            ]
        };
    }

    textContent() {
        return (
            <View style={styles.headingContent}>
                <View style={styles.flexCenter}>
                    <Text style={styles.textStyle}>4.8</Text>
                    <Text style={styles.textDetails}>Rating</Text>
                </View>

                <View style={styles.flexCenter}>
                    <Text style={styles.textStyle}>82</Text>
                    <Text style={styles.textDetails}>Reviews</Text>
                </View>
            </View>
        )
    }
    render() {
        let { reviewArray } = this.state
        return (
            <View style={styles.fullScreen}>
                <View style={styles.flexMain}>
                    <Header source={require('../../assets/back-white-arrow.png')} navigation={this.props.navigation} />
                    <ProfileBackground  centerImage={styles.textBarHeight} content={this.textContent()} textHeading="REVIEWS" />
                </View>
                <View style={styles.flexSecondCon}>
                    <ScrollView>
                        {
                            reviewArray.map((val, index) => {
                                return (
                                    <View key={index} style={styles.containerMain}>
                                        <View style={styles.ratingOut}>
                                            <StarRating
                                                disabled={true}
                                                maxStars={5}
                                                starSize={20}
                                                rating={val.rating}
                                                fullStarColor="#F3C214"
                                            />
                                        </View>
                                        <Text style={styles.textReview}>{val.text}</Text>
                                    </View>
                                )
                            })
                        }
                    </ScrollView>
                </View>
            </View>
        )
    }
}
export default connect(state => state)(Review)

const styles = StyleSheet.create({
    fullScreen: {
        height: height,
    },
    flexMain: {
        flex:   width <= 320 ? 3 : 1,
    },
    flexSecondCon: {
        flex:  width <= 320 ? 5 : 2,
        backgroundColor: whiteColor,
        marginBottom: 70
    },
    textBarHeight:{
        height: width <= 320 ? '70%' : '60%',
    },
    headingContent: {
        height: width <= 320 ? 60 : 70,
        justifyContent: 'space-around',
        alignItems: 'center',
        flexDirection: 'row',
        paddingLeft: 40,
        paddingRight: 30,
    },
    flexCenter: {
        alignItems: 'center',
        justifyContent: 'center'
    },
    textStyle: {
        color: whiteColor,
        fontSize: fontX3L,
        letterSpacing: 3,
        fontWeight: '700',
    },
    textDetails: {
        fontSize: fontMedium,
        color: '#FFC379'
    },
    containerMain: {
        padding: 20,
        paddingLeft: 30,
        borderBottomWidth: 2,
        borderBottomColor: '#EEEEEE'
    },
    ratingOut: {
        width: width / 2,
    },
    textReview: {
        marginTop: 15,
        lineHeight: 24,
        fontSize: fontMedium
    }
})
