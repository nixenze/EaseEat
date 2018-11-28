'use strict';
import React, { Component } from 'react';
import
{
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Button
} from 'react-native';
import { RNCamera } from 'react-native-camera';
import { NavigationEvents } from 'react-navigation';

class CameraScreen extends Component
{
  constructor(props)
  {
    super(props);

    this.state = {
      focused: null,
      cameraOption: {
        type: RNCamera.Constants.Type.front,
        flashMode: RNCamera.Constants.FlashMode.off,
      }


    };
  }

  takePicture = async function ()
  {
    if (this.camera)
    {
      const options = { quality: 0.5, base64: true };
      const data = await this.camera.takePictureAsync(options)
      console.log(data.uri);
    }
  };

  changeCam = () =>
  {
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

  renderCamera = () =>
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
              <Text style={{ fontSize: 14 }}> TOUCH ME SENPAI </Text>
            </TouchableOpacity>
            <Button onPress={

              this.changeCam

            } title='Switch Camera' />
          </View>
        </RNCamera>
      )
    else
      return null;
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

export default CameraScreen;



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
