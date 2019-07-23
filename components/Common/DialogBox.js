import React from 'react';
import { StyleSheet, Text, View, Dimensions, TextInput, Keyboard, TouchableOpacity } from 'react-native';
import Dialog, { SlideAnimation, DialogContent } from 'react-native-popup-dialog';
import StarRating from 'react-native-star-rating';
import ButtonMain from '../ButtonMain';
import { fontMedium } from '../constant';
var { height, width } = Dimensions.get('window')

class DialogBox extends React.Component {
    constructor() {
        super()
        this.state = {
            starCount: 3
        };
    }
    onStarRatingPress(rating) {
        this.setState({
            starCount: rating
        });
    }
    onTouchOutside() {
        this.props.openCloseModal(false)
    }

    render() {
        return (
            <Dialog
                visible={this.props.visible}
                dialogAnimation={new SlideAnimation({
                    slideFrom: 'bottom'
                })}
                onTouchOutside={() => {
                    Keyboard.dismiss()
                }}
                dialogStyle={[this.props.propStyle, styles.dialogStyles]}
                containerStyle={styles.containerOut}>
                <DialogContent>
                    <View style={[this.props.height, styles.ratingOut]}>
                        <View style={styles.textOut}>
                            <Text style={styles.ratingText}>RATE TRAINER</Text>
                        </View>
                        <View style={styles.starOut}>
                            <StarRating
                                disabled={false}
                                maxStars={5}
                                starSize={20}
                                rating={this.state.starCount}
                                fullStarColor="#F3C214"
                                selectedStar={(rating) => this.onStarRatingPress(rating)}
                            />
                        </View>
                    </View>
                    <View style={styles.textBoxOut}>
                        <Text style={styles.headStyle}>Comments</Text>
                        <TextInput
                            multiline={true}
                            style={styles.textInputStyles} />
                    </View>
                </DialogContent>
                <TouchableOpacity onPress={() => this.onTouchOutside()} style={styles.crossOut}>
                    <Text>X</Text>
                </TouchableOpacity>
                <View style={styles.btnOut}>
                    <ButtonMain isColored={true} label="SEND" />
                </View>
            </Dialog>

        )
    }
}
export default DialogBox;

const styles = StyleSheet.create({
    textOut: {
        width: '50%',
    },
    starOut: {
        width: '50%',
    },
    ratingText: {
        letterSpacing: 2
    },
    textBoxOut: {
        paddingLeft: 25,
        paddingRight: 20
    },
    headStyle: {
        color: "#A1A1A1",
        fontSize: fontMedium,
        fontWeight: '700',
        marginBottom: 5
    },
    textInputStyles: {
        height: 60,
        borderBottomWidth: 2,
        borderBottomColor: "#A1A1A1"
    },
    btnOut:{ 
        alignItems: 'center', 
        position: 'absolute', 
        bottom: 20, 
        left: '18%' 
    },
    crossOut:{ 
        position: 'absolute', 
        right: 30, 
        top: 2 
    },
    ratingOut:{ 
        width: width, 
        paddingTop: 30, 
        padding: 20, 
        flexDirection: 'row', 
        alignItems: 'center' 
    },
    containerOut:{ 
        padding: 0, 
        width: width 
    },
    dialogStyles:{
        backgroundColor: '#fff', borderRadius: 0, padding: 0 
    }
})


