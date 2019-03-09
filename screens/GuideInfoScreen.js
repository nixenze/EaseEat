import React, { Component } from 'react'
import
{
  Text, View, StyleSheet, Dimensions, Image,
  TouchableNativeFeedback as TouchNative,
  TouchableOpacity,
  ImageBackground,
  ScrollView
} from 'react-native'
import Pdf from 'react-native-pdf';
import { withNavigationFocus, createStackNavigator } from 'react-navigation';
import GuidePdfScreen from "./GuidePdfScreen"

export class GuideInfoScreen extends Component
{

  static navigationOptions = {
    title: 'Eating Guide',
    headerStyle: {
      backgroundColor: 'orange',
    },
    headerTintColor: '#fff',
    headerTitleStyle: {
      fontFamily: 'Pacifico'
    },

  };




  renderGuide(logo,type)
  {


    return (
      <View style={{width: Dimensions.get("window").width / 2, height: Dimensions.get("window").width / 2,borderWidth:1,borderColor:"grey"}}>
      <TouchableOpacity
        style={{
          flex: 1,
          // backgroundColor:"orange"
        }}
        onPress={() => this.props.navigation.navigate("guidePdf",{type:type})}
      >
        <ImageBackground
          source={require("../images/foodScan3.jpg")}
          style={{
            flex: 1,
            justifyContent:"center",
            alignItems:"center"
          }}
          imageStyle={{
          }}
        >
          <Image source={logo}
          style={{
          width: Dimensions.get("window").width / 4, height: Dimensions.get("window").width / 4,
          resizeMode:"cover",
          
          margin:8
          }}
          
          
          />
          <Text style={{fontSize:20, color:"white", fontWeight:"bold"}}>{type.toUpperCase()}</Text>
        </ImageBackground>

      </TouchableOpacity>
      </View>
    )
  }


  render()
  {




    return (
      <View style={{ flex: 1 }}>
        <View style={{ flex: 0.5, backgroundColor: "white" }}>
          <Image source={require("../images/guide_header.png")}
            style={{
              //height:Dimensions.get("window").height/4,
              flex: 1,
              width: Dimensions.get("window").width
            }}
            resizeMethod="auto"
            resizeMode="center"
          />
        </View>
        <ScrollView style={{flex:1}}>
        <View style={{
          flex: 1,
          flexDirection: "row",
          flexWrap:"wrap"
        }}>
        {this.renderGuide(require("../images/made-to-order.png"),"Made to order")}
        {this.renderGuide(require("../images/food-stall.png"),"Food stall")}
        {this.renderGuide(require("../images/thai-restaurant.png"),"Thai restaurant")}
        {this.renderGuide(require("../images/made-to-order.png"),"More soon...")}
        </View>
        </ScrollView>
      </View>
    )

    //   <View style={{flex:2,backgroundColor:"#FF9A52",}}>
    //   <Image source={require("../images/guide_menu_header.png")}
    //   resizeMode="center"
    //   style={{
    //     flex:1,
    //     width:Dimensions.get("window").width
    //   }}
    //   />
    //   <Image source={require("../images/guide_menu.png")}
    //   resizeMode="center"
    //   style={{
    //     flex:1,
    //     width:Dimensions.get("window").width
    //   }}
    //   />
    // </View>
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
    marginTop: 25,
  },
  pdf: {
    flex: 1,
    width: Dimensions.get('window').width,
  }
});

export default createStackNavigator({
  guideRoot: withNavigationFocus(GuideInfoScreen),
  guidePdf : GuidePdfScreen

}, {
    cardStyle: { backgroundColor: 'white' }
  }
)
