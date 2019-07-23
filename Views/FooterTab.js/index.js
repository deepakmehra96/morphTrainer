import React from 'react'
import { Image, View, StyleSheet } from 'react-native'
import { createStackNavigator, createBottomTabNavigator } from "react-navigation"
import Main from '../Main';
import Bookings from '../Bookings';
import Favourite from '../Favourite';
import Accounts from '../Accounts';
import UserLocation from '../Accounts/UserLocation';
import UserCredits from '../Accounts/UserCredits';
import UserNotes from '../Accounts/UserNotes';
import UserPayment from '../Accounts/UserPayment';

const AccountsStack = createStackNavigator({
    Accounts: {
        screen: Accounts,
    },
    UserLocation: {
        screen: UserLocation,
    },
    UserCredits: {
        screen: UserCredits,
    },
    UserNotes: {
        screen: UserNotes,
    },
    UserPayment: {
        screen: UserPayment,
    },
});

const TabIcon = ({ activeImage, style }) => {
    let icon = activeImage
    return (
        <View style={styles.centerItem}>
            <View style={styles.activeBorder}>
            </View>
            <View style={style}>
                <Image source={icon} style={styles.imageMain} />
            </View>
        </View>
    )
}

const TabIconActive = ({ activeImage, style }) => {
    let icon = activeImage
    return (
        <View style={style}>
            <Image source={icon} style={styles.imageMain} />
        </View>
    )
}

const Tabs = createBottomTabNavigator({
    Home: {
        screen: Main,
        navigationOptions: {
            title: '',
            tabBarIcon: ({ focused }) => focused ? <TabIcon
                activeImage={require('../../assets/home.png')}
                style={styles.iconMain}

            /> : <TabIconActive
                    activeImage={require('../../assets/home.png')}
                    style={styles.iconMain}
                />
        }
    },
    Bookings: {
        screen: Bookings,
        navigationOptions: {
            title: '',
            tabBarIcon: ({ focused }) => focused ? <TabIcon
                activeImage={require('../../assets/booking.png')}
                style={styles.iconMain}

            /> : <TabIconActive
                    activeImage={require('../../assets/booking.png')}
                    style={styles.iconMain}
                />
        }
    },
    Favourite: {
        screen: Favourite,
        navigationOptions: {
            title: '',
            tabBarIcon: ({ focused }) => focused ? <TabIcon
                activeImage={require('../../assets/fav.png')}
                style={styles.iconHeart}

            /> : <TabIconActive
                    activeImage={require('../../assets/fav.png')}
                    style={styles.iconHeart}
                />
        }
    },
    Setting: {
        screen: AccountsStack,
        navigationOptions: {
            title: '',
            tabBarIcon: ({ focused }) => focused ? <TabIcon
                activeImage={require('../../assets/account.png')}
                style={styles.iconMenu}

            /> : <TabIconActive
                    activeImage={require('../../assets/account.png')}
                    style={styles.iconMenu}
                />
        },
    },
}, {
        tabBarOptions: {
            style: {
                height: 60,
                paddingTop: 20,
                backgroundColor: '#4d32b0',
            },
        }
    });

const LoggedinTabs = createStackNavigator({
    LoggedinTabs: Tabs,
}, { headerMode: true })


LoggedinTabs.navigationOptions = {
    header: null
}


export default LoggedinTabs

const styles = StyleSheet.create({
    imageMain: {
        height: '100%',
        width: '100%'
    },
    iconMain: {
        height: 18,
        width: 18
    },
    iconHeart: {
        height: 18,
        width: 22
    },
    iconMenu: {
        height: 18,
        width: 20
    },
    activeBorder:{ 
        borderWidth: 2, 
        borderColor: '#FFC379', 
        width: 40, 
        position: "absolute", 
        top: -23, 
    },
    centerItem:{ 
        alignItems: 'center' 
    }
})