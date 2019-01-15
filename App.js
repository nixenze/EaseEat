import React, { Component } from 'react';
import FoodListScreen from './screens/FoodListScreen';
import CameraScreen from './screens/CameraScreen';
import TestCameraScreen from './screens/TestCameraScreen';
import { createBottomTabNavigator, createStackNavigator, createSwitchNavigator } from 'react-navigation';
import CameraResult from './screens/CameraResult';
import WelcomeScreen from './screens/WelcomeScreen';
import FoodInfoScreen from './screens/FoodInfoScreen'



const mainApp = createBottomTabNavigator({
  Menu: { screen: FoodListScreen },
  Camera: { screen: CameraScreen },
  FoodInfoTest: { screen: FoodInfoScreen },
},
  {
    initialRouteName:"Camera",
    tabBarOptions: {
      activeTintColor: 'orange',
      inactiveTintColor: 'gray',
    },
  }
)


const AppNavigator = createSwitchNavigator({
 WelcomeScreen ,
 mainApp
  }
)


export default class App extends Component {
  render() {
    return (
      <AppNavigator />
    );
  }
}
