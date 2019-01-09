'use strict';
import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Button,
  Alert,

} from 'react-native';
import { RNCamera } from 'react-native-camera';
import { NavigationEvents, createStackNavigator } from 'react-navigation';
import CameraResult from './CameraResult';
import SwitchSelector from 'react-native-switch-selector';
import ImagePicker from 'react-native-image-crop-picker';
import FoodInfoScreen from './FoodInfoScreen';

class CameraScreen extends Component {
  static navigationOptions = {
    title: 'EaseEat',
    headerStyle: {
      backgroundColor: 'orange',
    },
    headerTintColor: '#fff',
    headerTitleStyle: {
      fontWeight: 'bold',
    }
  };

  constructor(props) {
    super(props);

    this.state = {
      focused: null,
      cameraOption: {

      },
      menuMode: false
    };
    
  }

  sendToServer(image) {

    const sendJson = JSON.stringify(
      {
        image: image.data,
        filename: "img.jpeg",
      }
    );

    // const json = JSON.stringify({
    //   results: 'test'
    // });
    // this.props.navigation.navigate('result', { image: image, json: json })


    var url = 'http://35.186.151.151:5000/predict'

    if (this.state.menuMode) {

      url = 'http://35.187.232.27:5000/test'
    }

    fetch(url, {
      method: 'post',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: sendJson
    }).then(
      (response) => {
        return response.json();
      }).then((res) => {
        console.log(res);
        this.props.navigation.navigate('result', { image: image, json: res })

      }).catch((err) => {
        Alert.alert(
          'Error',
          'Network Error',
          [
            {text:'OK', onPress: () => {}}
          ]
        );
        console.log(err);
      })


  }

  async getImage(mode) {

    var image = null;
    const pickerSetting = {
      width: 600,
      height: 600,
      includeBase64: true,
      cropping: true,
      hideButtomControl: true
    }
    try {
      if (mode === 'camera') {
        image = await ImagePicker.openCamera(pickerSetting)
      }
      else {
        image = await ImagePicker.openPicker(pickerSetting)
      }
      ImagePicker.cleanSingle(image.path);
      this.sendToServer(image);
      


    } catch (error) {
      console.log(error);
    }
  }

  renderScreen() {

    {
      const switchOption = [
        { label: "Food Scan", value: false },
        { label: "Menu Scan", value: true }
      ]

      return (
        <View style={{
          flex: 1,
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          marginTop: 50,
          marginBottom: 50
        }}>
          <TouchableOpacity
            onPress={() => this.getImage('camera')}
            style={styles.capture}
          >
            <Text style={styles.fontStyle}>Take Photo</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => this.getImage('gallery')}
            style={styles.capture}
          >
            <Text style={styles.fontStyle}>Pick From Gallery</Text>
          </TouchableOpacity>
          <SwitchSelector
            initial={0}
            onPress={value => this.setState({ menuMode: value })}
            textColor={'orange'} //'#7a44cf'
            selectedColor={'white'}
            buttonColor={'orange'}
            borderColor={'orange'}
            hasPadding
            options={switchOption}
            style={{ margin: 50 }}
          />
        </View>
      )
    }
  }


  render() {
    //console.log(this.props.navigation.state);
    return (
      //<View style={styles.container}>
      this.renderScreen()



    );
  }


}

export default createStackNavigator({
  cameraRoot: CameraScreen,
  result: CameraResult,
  foodInfo:FoodInfoScreen

}, {
    cardStyle: { backgroundColor: 'white' }
  }
);





const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  preview: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center'
  },
  capture: {

    backgroundColor: 'orange',
    borderRadius: 160,
    height: 160,
    width: 160,
    justifyContent: 'center',
    alignItems: 'center',
    margin: 40
  },
  fontStyle: {
    color: 'white',
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
    padding: 5
  }
});
