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

class cameraComp extends Component
{

  takePicture = async function ()
  {
    if (this.camera)
    {
      const options = { quality: 0.5, base64: true };
      const data = await this.camera.takePictureAsync(options)
      console.log(data.uri);
    }
  };

  myCamera = 
    <RNCamera
      ref={ref =>
      {
        this.camera = ref;
      }}
      style={styles.preview}
      type={RNCamera.Constants.Type.front}
      flashMode={RNCamera.Constants.FlashMode.off}
      permissionDialogTitle={'Permission to use camera'}
      permissionDialogMessage={'We need your permission to use your camera phone'}
      onGoogleVisionBarcodesDetected={({ barcodes }) =>
      {
        console.log(barcodes)
      }}
    >
      <View style={{ flex: 0, flexDirection: 'column', justifyContent: 'center', }}>
        <TouchableOpacity
          onPress={this.takePicture.bind(this)}
          style={styles.capture}
        >
          <Text style={{ fontSize: 14 }}> TOUCH ME SENPAI </Text>
        </TouchableOpacity>
        <Button onPress={() => { this.props.navigation.navigate('Home') }} title='Back' />
      </View>
    </RNCamera>
  ;
  render()
  {
    //this.renderCamera();
  
    return (
       <View style={styles.container}>
        <NavigationEvents
        onDidBlur = {payload => console.log(this.focused)}
        onDidFocus = {payload => console.log(this.focused)}
        />

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
