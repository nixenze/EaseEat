'use strict';
import React, { Component } from 'react';
import
{
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Button,
  CameraRoll
} from 'react-native';
import { RNCamera } from 'react-native-camera';
import { NavigationEvents,createStackNavigator } from 'react-navigation';
import CameraResult from './CameraResult';

class CameraScreen extends Component
{
  static navigationOptions = {
    title: 'EaseEat'
  };

  constructor(props)
  {
    super(props);

    this.state = {
      focused: null,
      cameraOption: {
        type: RNCamera.Constants.Type.back,
        flashMode: RNCamera.Constants.FlashMode.off,
      }
    };
  }

  async takePicture ()
  {
    if (this.camera)
    {
      const options = { 
        quality: 0.5, 
        base64: true,
        doNotSave: true,
        fixOrientation : true,
        orientation : "portrait"
      };
      const data = await this.camera.takePictureAsync(options);
      const url = 'http://35.187.232.27:5000/test'
      const sendJson = JSON.stringify(
        {
          image : data.base64,
          filename : "img.jpeg",
        }
      );
       console.log(sendJson);
      fetch(url, {
        method: 'post',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: sendJson
      }).then(
        (response) => {
          console.log("sent!");
          return response.json();
      }).then((res) => {
        console.log(res);
        this.props.navigation.navigate('result',{image : data,json : res})
        //CameraRoll.saveToCameraRoll(data.uri);
      }).catch((err)=>{console.log(err)})
    }
  };

  changeCam(){
     const { back, front } = RNCamera.Constants.Type;
    if (this.state.cameraOption.type === front)
      this.setState({
        cameraOption : {
          type: back
        }}
      )
    else
    this.setState({
      cameraOption : {
        type: front
      }}
    )
  }

  renderCamera(){
  {
    if (this.state.focused)
      return (
        <RNCamera
          ref={ref =>
          {
            this.camera = ref;
          }}
          style={styles.preview}
          type={this.state.cameraOption.type}
          flashMode={this.state.cameraOption.flashMode}
          permissionDialogTitle={'Permission to use camera'}
          permissionDialogMessage={'We need your permission to use your camera phone'}
        >
          <View style={{ flex: 0, flexDirection: 'column', justifyContent: 'center', }}>
            <TouchableOpacity
              onPress={this.takePicture.bind(this)}
              style={styles.capture}
            >
              <Text style={{ fontSize: 14 }}> Take Photo </Text>
            </TouchableOpacity>
            <Button onPress={

              this.changeCam.bind(this)

            } title='Switch Camera' />
          </View>
        </RNCamera>
      )
    else
      return null;
  }
}
  render()
  {
    //this.renderCamera();
    

    return (
      <View style={styles.container}>
        <NavigationEvents
          onDidBlur={payload => this.setState({ focused: false })}
          onDidFocus={payload => this.setState({ focused: true })}
        />
        {this.renderCamera()}
      </View>


    );
  }


}

export default createStackNavigator({
  cameraRoot : CameraScreen,
  result : CameraResult

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
    flex: 0,
    backgroundColor: '#fff',
    borderRadius: 5,
    padding: 15,
    paddingHorizontal: 20,
    alignSelf: 'center',
    margin: 20
  }
});
