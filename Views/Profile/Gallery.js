import React from 'react'
import { StyleSheet, Text, View, Image, Dimensions, TouchableOpacity, CameraRoll, Alert } from 'react-native';
import { Container, Content } from 'native-base';
import { connect } from 'react-redux'
import ShowLoader from '../../components/ShowLoader';
import { editImage, openToast, getUserDetails } from '../../redux/actions';
import Header from '../../components/Header';
var { height, width } = Dimensions.get('window');

class Gallery extends React.Component {
    constructor() {
        super()
        this.state = {
            errors:{},
            showLoader: false,
            photos: [],
            image: '',
            loader: false
        }
    }
    static navigationOptions = {
        header: null
    }
    handelLoader() {
        let { showLoader, loader } = this.state
        if (showLoader || loader) {
            return <ShowLoader />
        } else {
            return null
        }
        return
    }

    onImageClick = (data) => {
        let {user} = this.props.userData
        this.setState({ loader: true, showLoader: true })
        this.props.dispatch(editImage(data)).then(res => {
            this.setState({ loader: false })
            if(res.data.message){
                this.props.dispatch(openToast(res.data.message))
            }
            if(res.data.message === 'Image updated successfully'){
                this.props.dispatch(getUserDetails(user._id)).then(res => {
                    console.log(res,"res.datadddd")
                    this.setState({ showLoader: false })
                    this.props.navigation.goBack()
                })
            }
            
        }).catch(err => {
            
            this.setState({ loader: false })
            if(err.data){
                this.props.dispatch(openToast(err.data))
            }
        })  
    }

    render() {
        let { photos } = this.props.navigation.state && this.props.navigation.state.params
        return (
            <Container>
                <Header label={"Camera Roll"} backText={"Cancel"} handleRightBtn={() => this.props.navigation.goBack()} handleRightBtn={() => this.props.navigation.goBack()} source={require('../../assets/images/back-btn.png')} navigation={this.props.navigation}/>
                <Content style={{marginTop: 10}}>
                    <View style={{flexDirection: 'row',flexWrap: 'wrap'}}>
                        {photos.map((item, key) => {
                            return(
                                <View style={{height: 120, width: width/3,borderWidth: 0.5,borderColor: '#c1bfbf'}} key={key}>
                                    <TouchableOpacity style={{width: width/3}} onPress={this.onImageClick.bind(this, item.node)} activeOpacity={0.7}>
                                        <Image source={{uri: item.node.image.uri}} style={{height: '100%',width: '100%'}}/>
                                    </TouchableOpacity>
                                </View>
                            )
                        })}
                    </View>
                </Content>
                {this.handelLoader()}
            </Container>
        )
    }
}
export default connect(state => state)(Gallery)

const styles = StyleSheet.create({
    
})



