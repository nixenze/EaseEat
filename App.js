import React, { Component } from 'react';
import FoodListScreen from './screens/FoodListScreen';
import CameraScreen from './screens/CameraScreen';
import TestCameraScreen from './screens/TestCameraScreen';
import { createBottomTabNavigator, createStackNavigator, createSwitchNavigator } from 'react-navigation';
import CameraResult from './screens/CameraResult';
import WelcomeScreen from './screens/WelcomeScreen';
import FoodInfoScreen from './screens/FoodInfoScreen';
import {Icon} from 'react-native-elements'
import Ionicons from 'react-native-vector-icons/Ionicons';
import GuideInfoScreen from './screens/GuideInfoScreen'



const mainApp = createBottomTabNavigator({
  Menu: FoodListScreen ,
  Home: CameraScreen ,
  "How to order":  GuideInfoScreen ,
},
  {
    navigationOptions: ({ navigation }) => ({
      tabBarIcon: ({ focused, tintColor }) => {
        const { routeName } = navigation.state;
        //let isReverse = false;
        let iconName;
        let iconType;
        const pressColor = '#ea893f';
        if (routeName === 'Home') {
          iconName = `home${focused ? '' : '-outline'}`;
          iconType = "material-community"
    
        } else if (routeName === 'Menu') {
          iconName = 'food'
          iconType = "material-community"

       
        } else if (routeName === 'How to order'){
          iconName = `ios-information-circle${focused ? '' : '-outline'}`;
          iconType = 'ionicon'
        }

        // You can return any component that you like here!
        return <Icon name={iconName} color={tintColor} size={32} type={iconType} />;
      },
    }),


    initialRouteName:"Home",
    tabBarOptions: {
      activeTintColor: '#ea893f',
      inactiveTintColor: 'black',
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
