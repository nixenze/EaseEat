'use strict';
import React, { Component } from 'react';
import
{
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Button,
  Alert,
  ActivityIndicator,
  Modal,
  TouchableNativeFeedback as TouchNative,
  Image,
  ImageBackground,
  Platform,
  Dimensions

} from 'react-native';
import { RNCamera } from 'react-native-camera';
import { NavigationEvents, createStackNavigator } from 'react-navigation';
import CameraResult from './CameraResult';
import SwitchSelector from 'react-native-switch-selector';
import ImagePicker from 'react-native-image-crop-picker';
import FoodInfoScreen from './FoodInfoScreen';
import { Overlay, Icon } from 'react-native-elements'
import { platform } from 'os';


class CameraScreen extends Component
{
  static navigationOptions = {
    title: 'EaseEat',
    headerStyle: {
      backgroundColor: 'orange',
    },
    headerTintColor: '#fff',
    headerTitleStyle: {
      fontFamily: 'Pacifico'
    },

  };

  constructor(props)
  {
    super(props);

    this.state = {
      focused: null,
      menuMode: false,
      loading: false,
      isVisible: false
    };

  }

  async sendToServer(image)
  {

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


    var url = 'http://35.247.156.49:5000/predict'

    if (this.state.menuMode)
    {

      url = 'http://35.247.156.49:4321/menuRetrieval'
    }

    this.setState({ loading: true });

    fetch(url, {
      method: 'post',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: sendJson
    }).then(
      (response) =>
      {
        return response.json();
      }).then((res) =>
      {
        console.log(res);
        this.setState({
          loading: false
        })
        this.props.navigation.navigate('result', { image: image, json: res })

      }).catch((err) =>
      {
        Alert.alert(
          'Error',
          'Network Error',
          [
            { text: 'OK', onPress: () => { } }
          ]
        );
        console.log(err);
        this.setState({
          loading: false
        })
      })

  }

  async getImage(mode)
  {
    this.setState({ isVisible: false })
    var image = null;
    const pickerSetting = {
      width: 600,
      height: 600,
      includeBase64: true,
      cropping: true,
      hideBottomControls: false,
      avoidEmptySpaceAroundImage: false,
      showCropGuidelines: false,

    }
    try
    {

      if (mode === 'camera')
      {
        image = await ImagePicker.openCamera(pickerSetting)
      }
      else
      {
        image = await ImagePicker.openPicker(pickerSetting)
      }

      ImagePicker.cleanSingle(image.path);
      this.sendToServer(image);



    } catch (error)
    {
      console.log(error);
    }
  }

  renderButton(menuMode, source, textShow)
  {
    return (

      <TouchableOpacity
        background={Platform.OS === 'android' ? TouchNative.SelectableBackground() : ''}
        //useForeground={true}
        onPress={() =>
        {
          this.setState({
            menuMode: menuMode,
            isVisible: true
          });

        }}
        style={{flex:1, marginLeft: 32}}
      >
        <View style={{
          height: Dimensions.get("window").height / 4 - 16,
          width: Dimensions.get("window").width - 64,
          borderRadius: 16
        }}>
          <ImageBackground
            style={{
              height: Dimensions.get("window").height / 4 - 16,
              width: Dimensions.get("window").width - 64,
              borderRadius: 16,
              justifyContent: "center",


            }}
            source={source}
            imageStyle={{ borderRadius: 16 }}
          >

            <Text style={{ fontSize: 40, marginLeft: 16, fontWeight: "bold", color: "white" }}>{textShow}</Text>
          </ImageBackground>
        </View>

      </TouchableOpacity>

    )

  }

  renderScreen()
  {

    {
      // const switchOption = [
      //   { label: "Food Scan", value: false },
      //   { label: "Menu Scan", value: true }
      // ]

      return (

        <View style={{
          flex: 1,
          justifyContent: "space-around",
        }}>
          <View style={{
            flex: 0.8,
            justifyContent: "center",
            marginLeft: 32
          }}>
            <Text>Welcome to ...</Text>
            <Text style={{ fontSize: 48, fontWeight: 'bold' }}>EaseEat app!</Text>
            <Text>Use this app to scan Thai food and read Thai menu for you</Text>
          </View>

            {this.renderButton(false, require("../images/foodScan3.jpg"), "Food Scan")}
            {this.renderButton(true, require("../images/menuScan2.jpg"), "Menu Scan")}


            <Overlay isVisible={this.state.isVisible}
              onBackdropPress={() => this.setState({ isVisible: false })}
              children={
                <View style={{ flex: 1, justifyContent: "space-around", alignItems: "center" }}>
                  <View style={{ flex: 9, justifyContent: "space-around", alignItems: "center" }}>
                    <View style={{flex:0.25,justifyContent:"center",alignItems:"center"}}>
                    <Text style={{ fontSize: 24, fontWeight: 'bold' }}>Choose your photo!</Text>
                    <Text style={{fontSize:18, color:"orange"}}>{(this.state.menuMode) ? "Menu Scan":"Food Scan"}</Text>
                    </View>
                    <TouchableOpacity
                      onPress={() => this.getImage('camera')}
                      style={styles.capture}
                    >
                      <Text style={styles.fontStyle}>Take a Photo</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                      onPress={() => this.getImage('gallery')}
                      style={styles.capture}
                    >
                      <Text style={styles.fontStyle}>Pick From Gallery</Text>
                    </TouchableOpacity>
                  </View>
                  <View style={{ flex: 1 }}>
                    <Icon
                      name="cancel"
                      type="material"
                      size={40}
                      onPress={() => this.setState({ isVisible: false })}
                    /></View>

                </View>
              }
            >

            </Overlay>

            <Modal transparent={true}
              animationType={'fade'}
              visible={this.state.loading}
              onRequestClose={() => { this.setState({ loading: true }) }}
            >
              <View style={styles.loading}>
                <ActivityIndicator size='large' />
              </View>
            </Modal>




          </View>
          )
    
          // previous homescreen
          //
      // <View style={{
            //   flex: 1,
            //   flexDirection: 'column',
            //   justifyContent: 'center',
            //   alignItems: 'center',
            //   marginTop: 50,
            //   marginBottom: 50
            // }}>
            //   <TouchableOpacity
            //     onPress={() => this.getImage('camera')}
            //     style={styles.capture}
            //   >
            //     <Text style={styles.fontStyle}>Take Photo</Text>
            //   </TouchableOpacity>
            //   <TouchableOpacity
            //     onPress={() => this.getImage('gallery')}
            //     style={styles.capture}
            //   >
            //     <Text style={styles.fontStyle}>Pick From Gallery</Text>
            //   </TouchableOpacity>
            //   <SwitchSelector
            //     initial={0}
            //     onPress={value => this.setState({ menuMode: value })}
            //     textColor={'orange'} //'#7a44cf'
            //     selectedColor={'white'}
            //     buttonColor={'orange'}
            //     borderColor={'orange'}
            //     hasPadding
            //     options={switchOption}
            //     style={{ margin: 50 }}
            //   />

            //   <Modal transparent={true}
            //     animationType={'fade'}
            //     visible={this.state.loading}
            //     onRequestClose={()=>{this.setState({loading:true})}}
            //     >
            //     <View style={styles.loading}>
            //       <ActivityIndicator size='large' />
            //       </View>
            //     </Modal>

            // </View >

          }
          }


            render()
  {
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
            foodInfo: FoodInfoScreen
          
}, {
              cardStyle: {backgroundColor: 'white' }
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
  loading: {
              flex: 1,
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: 'rgba(0,0,0,0.3)'
          },
  capture: {

              backgroundColor: 'orange',
            borderRadius: 100,
            height: 100,
            width: 200,
            justifyContent: 'center',
            alignItems: 'center',
            //margin: 40
          },
  fontStyle: {
              color: 'white',
            fontSize: 20,
            fontWeight: 'bold',
            textAlign: 'center',
            padding: 5,
          }
        });
