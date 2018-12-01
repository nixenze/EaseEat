import React, {Component} from 'react';
import FoodListScreen from './screens/FoodListScreen';
import CameraScreen from './screens/CameraScreen';
import TestCameraScreen from './screens/TestCameraScreen';
import {createBottomTabNavigator,createStackNavigator,createAppContainer} from 'react-navigation';




let AppNavigator = createBottomTabNavigator({
    Menu : {screen: FoodListScreen},
    Camera : {screen: CameraScreen},
    Camera2 : {screen: TestCameraScreen},
    },
);


export default class App extends Component {
  static navigationOptions = {
    title: 'EaseEat'
  };
  render() {
    return (
      <AppNavigator />
    );
  }
}
