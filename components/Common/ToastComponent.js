import React, {Component} from 'react';
import { StyleSheet, View, Dimensions} from 'react-native';
import { connect } from 'react-redux'
import Toast, {DURATION} from 'react-native-easy-toast'
import { openToast } from '../../redux/actions';
var { height, width } = Dimensions.get('window');

class ToastComponent extends Component {
  componentWillReceiveProps(nextProps){
    if(this.props.userData.toast_msg !== nextProps.userData.toast_msg && nextProps.userData.toast_msg !== ''){
      this.refs.toast.show(nextProps.userData.toast_msg);
      this.props.dispatch(openToast(''))
    }
  }
  render() {
    return (
        <Toast
          ref="toast"
          style={{backgroundColor: 'rgba(0,0,0,0.7)', width: width - 40,zIndex: 1000000000000}}
          position='bottom'
          fadeInDuration={1000}
          fadeOutDuration={1000}
          opacity={0.8}
          textStyle={{color: '#fff', textAlign: 'center'}}
      />
    );
  }
}
export default connect(state => state)(ToastComponent)
const styles = StyleSheet.create({
  container: {
    height:height
  },
});
