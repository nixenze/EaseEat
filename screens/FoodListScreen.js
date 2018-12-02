import React, { Component } from 'react'
import { Text, StyleSheet, View, ScrollView, Image, Button } from 'react-native'
import {createStackNavigator} from 'react-navigation'




class FoodListScreen extends Component
{
    static navigationOptions = {
        title: 'EaseEat'
      };
      
    render()
    {
        return (
            <View style={{flex:1,alignItems:"center",justifyContent:"center"}}>
            <Button onPress={()=> {this.props.navigation.push('popUp')}} title='Test'></Button>
            </View>
        )
    }
}
export default createStackNavigator({
    Menu : FoodListScreen,
    popUp : FoodListScreen
});