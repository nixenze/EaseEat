import React, { Component } from 'react'
import { Text, View, Image, StyleSheet, ImageBackground } from 'react-native'
import FoodItem from '../components/FoodItem';

export class CameraResult extends Component {

  render() {


    return (
      <View>
        <ImageBackground source={require('../images/img0.jpg')}
          style={styles.resultsBanner}
        >
          <Text style={styles.resultBannerText}>Results</Text>
        </ImageBackground>
        <FoodItem
          engName='Hamburger'
          thaiName='แฮมเบอร์เกอร์'
          img={require('../images/img0.jpg')}
        />
      </View>
    )
  }
}

// <ImageBackground source={{ uri: ('data:image/png;base64,'+ this.props.navigation.getParam('image', require('../images/img0.jpg'))) }}
//   style={styles.results}>
//   
//   </ImageBackground>


export default CameraResult


const styles = StyleSheet.create({
  container: {
    flex:1
  },
  resultsBanner: {
    height: 192,
    position: 'relative', // because it's parent
    justifyContent: 'flex-end'

  },
  resultBannerText: {
    fontWeight: 'bold',
    color: 'white',
    fontSize: 30,
    padding: 8,
  }

});
