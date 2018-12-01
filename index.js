/** @format */

import {AppRegistry} from 'react-native';
import App from './App';
import {name as appName} from './app.json';
import {createStackNavigator} from 'react-navigation';

const EaseEat = createStackNavigator({
    Home: App
})

AppRegistry.registerComponent(appName, () => EaseEat);
