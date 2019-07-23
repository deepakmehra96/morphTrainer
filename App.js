import React, {Component} from 'react';
import { StyleSheet, View, Dimensions, StatusBar, BackHandler} from 'react-native';
import Router from './Routes';
import { Provider } from 'react-redux'
import store from './redux/store'
import ToastComponent from './components/Common/ToastComponent';
import SplashScreen from 'react-native-splash-screen';
var { height } = Dimensions.get('window');

export default class App extends Component {
  componentDidMount() {
    SplashScreen.hide()
    BackHandler.addEventListener('hardwareBackPress', this.willFocusSubscription)
  }

  _onNavigationChange = (prevState, newState, action) => {
    if (action.type == 'Navigation/NAVIGATE') {
      this.setState({
        routeName: action.routeName
      })
    }
    if (prevState.index !== newState.index) {
      this.setState({
        currentIndex: newState.index
      })
    }
  }

  willFocusSubscription = () => {
    let { routeName } = this.state
    if (routeName === 'LoggedinTabs') {
      BackHandler.exitApp()
      return true;
    }
  }


  render() {
    console.disableYellowBox = true;
    return (
      <Provider style={styles.container} store={store}>
        <StatusBar
              backgroundColor="#520CC3"
              barStyle="light-content"
          />
        <View style={styles.flex}>
          <ToastComponent />
          <Router
               onNavigationStateChange={this._onNavigationChange}/>
        </View>
      </Provider>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    height:height
  },
  flex:{
    flex:1
  }
});
