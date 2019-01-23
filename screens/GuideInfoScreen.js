import React, { Component } from 'react'
import { Text, View } from 'react-native'

export class GuideInfoScreen extends Component {
    
  render() {
    return (
        <View style={{
            // marginHorizontal: 16,
            justifyContent: 'center',
            alignItems: 'center',
            flex: 1
          }}>
            <Text
              style={{
                fontSize: 24,
                opacity: 0.3
              }}
            >Under Construction !
            </Text>
          </View>
    )
  }
}

export default GuideInfoScreen
