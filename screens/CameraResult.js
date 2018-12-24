import React, { Component } from 'react'
import { Text, View, Image } from 'react-native'

export class CameraResult extends Component {

    static navigationOptions = {
        title: 'EaseEat - Results'
      };
    
  render() {


    return (
<View style={{flex:1}}>
<Text>{this.props.navigation.getParam('json','failed').results}</Text>
  <Image source={{uri : this.props.navigation.getParam('image',require('../images/img0.jpg')).uri}}
  style={{flex:1}}/>

</View>
    )
  }
}


export default CameraResult
