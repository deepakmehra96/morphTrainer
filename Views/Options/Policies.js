import React from 'react'
import { View, Text, StyleSheet, TouchableOpacity,Image } from 'react-native' 
import { Container, Content } from 'native-base';
import Header from '../../components/Header';
import TextContent from '../../components/TextContent';
import { privacypolicy } from '../../redux/actions';
import ShowLoader from '../../components/ShowLoader';
import { connect } from 'react-redux'

class Policies extends React.Component{

    static navigationOptions = {
        header: null
    }
    state ={ 
        showLoader: false,
        data: null
    }
    componentDidMount(){
        this.setState({ showLoader: true})
        this.props.dispatch(privacypolicy()).then(res => {
            console.log(res,"resg")
            this.setState({ showLoader: false, data: res.data.data})
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
    render(){
        let {data} = this.state;
        return(
            <Container>
                <Header  navigation={this.props.navigation} showShadow={true} label="Privacy Policy" source={require('../../assets/images/back-btn.png')} />
                <TextContent htmlContent={data}/> 
                {this.handelLoader()}
            </Container>
        )
    }
}
export default connect(state => state)(Policies)

const styles = StyleSheet.create({
    paddingMain:{
        padding:20
    },
    textMain:{
        fontSize:10,
        marginTop:20,
        opacity:0.9
    },
    textHeading:{
        paddingTop:20,
        fontWeight:'bold'
    }

})