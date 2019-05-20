import React, {Component} from 'react';
import { StyleSheet, View, Dimensions} from 'react-native';
import Router from './Routes';
import { Provider } from 'react-redux'
import store from './redux/store'
import ToastComponent from './components/Common/ToastComponent';
import SplashScreen from 'react-native-splash-screen';
var { height, width } = Dimensions.get('window');

export default class App extends Component {
  componentDidMount() {
    SplashScreen.hide()
  }

  render() {
    console.disableYellowBox = true;
    return (
      <Provider style={styles.container} store={store}>
        <View style={{flex: 1}}>
          <ToastComponent />
          <Router />
        </View>
      </Provider>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    height:height
  },
});
