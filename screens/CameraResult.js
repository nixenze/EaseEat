import React, { Component } from 'react'
import { Text, View, Image } from 'react-native'

export class CameraResult extends Component {
  render() {
    return (
      <View style={{flex:1}}>
        <Image source={{uri : this.props.navigation.getParam('image',require('../images/img0.jpg')).uri}}
        style={{flex:1}}
        />
      </View>
    )
  }
}

export default CameraResult
