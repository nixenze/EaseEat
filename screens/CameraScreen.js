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
    header: null,
    title: 'EaseEat',
    headerStyle: {
      backgroundColor: '#ea893f',
      //justifyContent:"center"
    },
    headerTintColor: '#fff',
    headerTitleStyle: {
      fontFamily: 'Pacifico',
      fontWeight: '400',
      fontSize: 26
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


    var url = 'http://35.240.146.181:5000/predict'

    if (this.state.menuMode)
    {

      url = 'http://35.240.146.181:5001/menuRetrieval'
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
    const iconSource = menuMode ? require("../images/menuScanIcon.png") : require("../images/foodScanIcon.png")
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
        style={{
          flex: 1,
          width: Dimensions.get("window").width,

        }}
      >
        <View style={{
          flex: 1,
          width: Dimensions.get("window").width,
          //borderRadius: 
        }}>
          <ImageBackground
            style={{
              flex: 1,
              width: Dimensions.get("window").width,
              //borderRadius: 16,
              justifyContent: "center",


            }}
            source={source}
            imageStyle={{ borderWidth: 2, borderColor: "grey" }}
          >
            <View style={{ flex: 1, flexDirection: `${menuMode ? "row-reverse" : "row"}`, justifyContent: "center", alignItems: "center" }}>
              <View style={{
                height: Dimensions.get('window').width / 4,
                width: Dimensions.get('window').width / 4,
                justifyContent: "center", alignItems: "center",
                margin: 16
              }}>
                <Image source={iconSource}
                  style={{
                    height: Dimensions.get('window').width / 3,
                    width: Dimensions.get('window').width / 3
                  }}
                />
              </View>
              <Text style={{ margin: 16, fontSize: 40, fontWeight: "bold", color: "white", fontFamily: 'Pacifico' }}>{textShow}</Text>
            </View>
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
          //justifyContent: "space-around",

        }}>
          <View style={{
            flex: 1,
            //width:Dimensions.get("window").width,
            //flexDirection: "row",
            justifyContent: "center",
            alignItems: "center",
            //marginVertical: 16,
            backgroundColor: "#EA893F"
          }}>
            <View style={{ flex: 1 }}>
              <Image source={require("../images/Logo-EaseEat.png")}
                style={{
                  height: Dimensions.get("window").width / 4,
                  width: Dimensions.get("window").width / 4,
                  borderRadius: 8,
                  marginTop: 32
                }} />
            </View>
            <View style={{ flex: 1 }}>
              <Text style={{ fontSize: 48, fontFamily: "Pacifico", color: "white" }}>EaseEat </Text>
            </View>

            {/* <Text>Welcome to ...</Text>
            <Text style={{ fontSize: 48, fontWeight: "bold" }}>EaseEat app!</Text>
            <Text>Use this app to scan Thai food and read Thai menu for you</Text> */}
          </View>
          <View style={{ flex: 2, justifyContent: "space-evenly" }}>
            {this.renderButton(false, require("../images/2foodScan1.jpg"), "Food Scan")}
            {this.renderButton(true, require("../images/menuScan5.jpg"), "Menu Scan")}
          </View>




          <Overlay isVisible={this.state.isVisible}
            onBackdropPress={() => this.setState({ isVisible: false })}
            borderRadius={16}
            animationType="slide"
            overlayStyle={{padding:0,borderRadius:16}}
            children={
              <View style={{ flex: 1 }}>
                <View style={{ flex: 9, justifyContent: "center", alignItems: "center" }}>
                  <View style={{ flex: 0.7, backgroundColor: "#ea893f", justifyContent: "center", alignItems: "center",width:"100%",borderTopStartRadius:16,borderTopEndRadius:16 }}>
                    <Text style={{ fontSize: 32, color: "white",fontWeight:"bold" }}>{(this.state.menuMode) ? "Menu Scan" : "Food Scan"}</Text>
                  </View>
                  <View style={{ flex: 0.5, alignItems: "center" }}>
                    <Text style={{ fontSize: 24, fontWeight: 'bold', marginTop:24 }}>Choose your photo!</Text>
                  </View>
                  <View style = {{width:"100%",flex:2, justifyContent:"space-around",alignItems:"center",flexDirection:"column"}}>
                  <TouchableOpacity
                    onPress={() => this.getImage('camera')}
                    style={styles.capture}
                  >
                    <Icon name="camera" type = "feather" color = "#FFEBA3" size={72} />
                    <Text style={styles.fontStyle}>Take a Photo</Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    onPress={() => this.getImage('gallery')}
                    style={styles.capture}
                  >
                    <Icon name="md-images" type = "ionicon" color = "#FFEBA3" size={72} />
                    <Text style={styles.fontStyle}>Pick From Gallery</Text>
                  </TouchableOpacity>
                  </View>
                </View>

                <View style={{ flex: 1 ,justifyContent:"center",alignItems:"center" }}>
                  <Icon
                    name="cancel"
                    type="material"
                    size={40}
                    onPress={() => this.setState({ isVisible: false })}
                  />
                </View>

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
  loading: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(0,0,0,0.3)'
  },
  capture: {

    backgroundColor: 'orange',
    borderRadius: 144,
    height: 144,
    width: 144,
    justifyContent: 'center',
    alignItems: 'center',
    //margin: 40
  },
  fontStyle: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
    paddingHorizontal: 10,
  }
});
