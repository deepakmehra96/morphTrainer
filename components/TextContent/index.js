import React from 'react'
import { View, Text, StyleSheet, TouchableOpacity, Image, ScrollView } from 'react-native'
import { Container, Content } from 'native-base';
import Header from '../../components/Header';
import HTML from 'react-native-render-html';

class TextContent extends React.Component {

    static navigationOptions = {
        header: null
    }
    render() {
        let { htmlContent } = this.props
        return (
            <Content>
                {/* <View style={styles.paddingMain}>
                    <Text style={styles.textMain}>
                        Before we get into the minutes of the regine, its important ot go through a few rules guide your tarining
                        </Text>
                    <Text style={styles.textHeading}>
                        1. Stick to lower rap rages
                        </Text>
                    <Text style={styles.textMain}>
                        Before we get into the minutes of the regine, its important ot go through a few rules guide your tarining
                        Before we get into the minutes of the regine, its important ot go through a few rules guide your tarining
                        Before we get into the minutes of the regine, its important ot go through a few rules guide your tarining
                        Before we get into the minutes of the regine, its important ot go through a few rules guide your tarining
                        Before we get into the minutes of the regine, its important ot go through a few rules guide your tarining
                        Before we get into the minutes of the regine, its important ot go through a few rules guide your tarining
                        Before we get into the minutes of the regine, its important ot go through a few rules guide your tarining
                        Before we get into the minutes of the regine, its important ot go through a few rules guide your tarining
                        Before we get into the minutes of the regine, its important ot go through a few rules guide your tarining
                        Before we get into the minutes of the regine, its important ot go through a few rules guide your tarining
                        </Text>
                    <Text style={styles.textMain}>
                        Before we get into the minutes of the regine, its important ot go through a few rules guide your tarining
                        Before we get into the minutes of the regine, its important ot go through a few rules guide your tarining
                        Before we get into the minutes of the regine, its important ot go through a few rules guide your tarining
                        Before we get into the minutes of the regine, its important ot go through a few rules guide your tarining
                        Before we get into the minutes of the regine, its important ot go through a few rules guide your tarining
                        Before we get into the minutes of the regine, its important ot go through a few rules guide your tarining
                        Before we get into the minutes of the regine, its important ot go through a few rules guide your tarining
                        Before we get into the minutes of the regine, its important ot go through a few rules guide your tarining
                        Before we get into the minutes of the regine, its important ot go through a few rules guide your tarining
                        Before we get into the minutes of the regine, its important ot go through a few rules guide your tarining
                        </Text>
                    <Text style={styles.textMain}>
                        Before we get into the minutes of the regine, its important ot go through a few rules guide your tarining
                        Before we get into the minutes of the regine, its important ot go through a few rules guide your tarining
                        Before we get into the minutes of the regine, its important ot go through a few rules guide your tarining
                        Before we get into the minutes of the regine, its important ot go through a few rules guide your tarining
                        Before we get into the minutes of the regine, its important ot go through a few rules guide your tarining
                        Before we get into the minutes of the regine, its important ot go through a few rules guide your tarining
                        Before we get into the minutes of the regine, its important ot go through a few rules guide your tarining
                        Before we get into the minutes of the regine, its important ot go through a few rules guide your tarining
                        Before we get into the minutes of the regine, its important ot go through a few rules guide your tarining
                        Before we get into the minutes of the regine, its important ot go through a few rules guide your tarining
                        </Text>
                        
                </View> */}
                <ScrollView style={{ flex: 1,paddingLeft: 20, paddingRight: 20 }}>
                    <HTML html={htmlContent}  />
                </ScrollView>
            </Content>
        )
    }
}
export default TextContent

const styles = StyleSheet.create({
    paddingMain: {
        padding: 20
    },
    textMain: {
        fontSize: 10,
        marginTop: 20,
        opacity: 0.9
    },
    textHeading: {
        paddingTop: 20,
        fontWeight: 'bold'
    }

})