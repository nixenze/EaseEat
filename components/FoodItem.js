import React, { Component } from 'react'
import {     
    Text,
    StyleSheet,
    View,
    Image,
    TouchableNativeFeedback as TouchNative,
    Platform,
 } from 'react-native'

export class FoodItem extends Component {
    render() {
        return (
            <TouchNative
                onPress={() => { this.props.nav.navigate('foodInfo')}}
                background={Platform.OS === 'android' ? TouchNative.SelectableBackground() : ''}
                style={foodStyles.container}
            >
                <View>
                    <View style={foodStyles.foodItem}>
                        <Image
                            style={foodStyles.image}
                            source={this.props.img}
                        />
                        <View style={foodStyles.textContainer}>
                            <Text style={foodStyles.engText}>{this.props.engName}</Text>
                            <Text>{this.props.thaiName}</Text>
                        </View>


                    </View>

                </View>
            </TouchNative>
        )
    }
}

export default FoodItem

const foodStyles = StyleSheet.create({
    container:{
        height:150
    }, 
    foodItem: {
        height: 150,
        flexDirection: 'row'
    },
    image:{
        width: 150, 
        height: 150
    },
    textContainer: {
        marginLeft:32,
        justifyContent: 'center'
    },
    engText:{
        fontSize:20,
        fontWeight:'bold'
    }
});