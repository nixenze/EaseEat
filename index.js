/** @format */

import {AppRegistry} from 'react-native';
import App from './App';
import {name as appName} from './app.json';
import CameraScreen from './screens/CameraScreen';
import CameraScreen2 from './screens/CameraScreen2';
import {StackNavigator} from 'react-navigation';

const Navi = StackNavigator({
    Home : {screen: App},
    Camera : {screen: CameraScreen},
    Camera2 : {screen: CameraScreen2},
    },
    );

AppRegistry.registerComponent(appName, () => Navi);
