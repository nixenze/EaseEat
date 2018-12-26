import React, {Component} from 'react';
import FoodListScreen from './screens/FoodListScreen';
import CameraScreen from './screens/CameraScreen';
import TestCameraScreen from './screens/TestCameraScreen';
import {createBottomTabNavigator, createStackNavigator} from 'react-navigation';
import CameraResult from './screens/CameraResult';




const temp = createStackNavigator({
  Test : {screen: CameraResult},
},{
  cardStyle: { backgroundColor: 'white' }
}
)

const AppNavigator = createBottomTabNavigator({
    Menu : {screen: FoodListScreen},
    Camera : {screen: CameraScreen},
    Test : {screen: temp},
    },
);


export default class App extends Component {
  render() {
    return (
      <AppNavigator />
    );
  }
}
