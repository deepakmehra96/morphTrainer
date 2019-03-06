import React, {Component} from 'react';
import { StyleSheet, View, Dimensions} from 'react-native';
import Router from './Routes';
import { Provider } from 'react-redux'
import store from './redux/store'
var { height, width } = Dimensions.get('window');

export default class App extends Component {
  render() {
    return (
      <Provider style={styles.container} store={store}>
        <Router />
      </Provider>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    height:height
  },
});
