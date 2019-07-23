import React, { Component } from 'react';
import { StyleSheet, View, Dimensions } from 'react-native';
import { connect } from 'react-redux'
import Toast from 'react-native-easy-toast'
import { openToast } from '../../redux/actions';
import { whiteColor } from '../constant';
var { width } = Dimensions.get('window');

class ToastComponent extends Component {
  componentWillReceiveProps(nextProps) {
    if (this.props.reducer.toast_msg !== nextProps.reducer.toast_msg && nextProps.reducer.toast_msg !== '') {
      this.refs.toast.show(nextProps.reducer.toast_msg);
      this.props.dispatch(openToast(''))
    }
  }
  render() {
    return (
      <Toast
        ref="toast"
        style={styles.container}
        position='bottom'
        fadeInDuration={1000}
        fadeOutDuration={1000}
        opacity={0.8}
        textStyle={styles.textColors}
      />
    );
  }
}
export default connect(state => state)(ToastComponent)
const styles = StyleSheet.create({
  container: {
    backgroundColor: 'rgba(0,0,0,0.7)',
    width: width - 40,
    zIndex: 1000000000000
  },
  textColors: {
    color: whiteColor,
    textAlign: 'center'
  }
});
