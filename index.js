/** @format */

import {AppRegistry} from 'react-native';
import App from './App';
import {name as appName} from './app.json';
import CameraScreen from './screens/CameraScreen';
import TestCameraScreen from './screens/TestCameraScreen';
import {createBottomTabNavigator,createStackNavigator,createAppContainer} from 'react-navigation';

const Navi = createBottomTabNavigator({
    Home : {screen: App},
    Camera : {screen: CameraScreen},
    Camera2 : {screen: TestCameraScreen},
    },
);

AppRegistry.registerComponent(appName, () => Navi);
