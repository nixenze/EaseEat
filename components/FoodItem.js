import React, { Component,PureComponent } from 'react'
import {     
    Text,
    StyleSheet,
    View,
    Image,
    TouchableNativeFeedback as TouchNative,
    Platform,
 } from 'react-native'

export class FoodItem extends PureComponent {

    render() {
        // console.log(this.props.id,this.props.img)
        return (
            <TouchNative
                onPress={() => { this.props.nav.navigate('foodInfo',{id : this.props.id})}}
                background={Platform.OS === 'android' ? TouchNative.SelectableBackground() : ''}
                //useForeground={true}
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
                    <View style={{ height: 1, backgroundColor: 'gainsboro' }} />
                </View>
                
            </TouchNative>
        )
    }
}

export default FoodItem

const foodStyles = StyleSheet.create({
    container:{
        height:150,
        flex:1,
        
    }, 
    foodItem: {
        height: 150,
        flexDirection: 'row',
        //width:300
        flex:1
    },
    image:{
        width: 150, 
        height: 150
    },
    textContainer: {
        marginLeft:32,
        justifyContent: 'center',
        alignItems:'stretch',
        flex: 1,
    },
    engText:{
        fontSize:20,
        marginRight:16,
        fontWeight:'bold',
        flexWrap: 'wrap'
    }
});