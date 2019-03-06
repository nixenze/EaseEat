import React, { Component } from 'react'
import { Text, View, StyleSheet, Dimensions } from 'react-native'
import Pdf from 'react-native-pdf';
import { withNavigationFocus, createStackNavigator } from 'react-navigation';

export class GuideInfoScreen extends Component {

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



  
  render() {

    
    const source = {uri:"bundle-assets://restaurant.pdf",cache:true};

    return (
      this.props.isFocused ? 
        <View style={{
            // marginHorizontal: 16,
            justifyContent: 'center',
            alignItems: 'center',
            flex: 1
          }}>
            {/* <Text
              style={{
                fontSize: 24,
                opacity: 0.3
              }}
            >Under Construction !
            </Text> */}
            <Pdf
                    source={source}
                    fitPolicy={0}
                    onLoadComplete={(numberOfPages,filePath)=>{
                        console.log(`number of pages: ${numberOfPages}`);
                    }}
                    onPageChanged={(page,numberOfPages)=>{
                        console.log(`current page: ${page}`);
                    }}
                    onError={(error)=>{
                        console.log(error);
                    }}
                    style={styles.pdf}/>
          </View>
          : null
    )
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
      flex:1,
      width:Dimensions.get('window').width,
  }
});

export default createStackNavigator({
  guideRoot :  withNavigationFocus(GuideInfoScreen), 
}, {
  cardStyle: { backgroundColor: 'white' }
}
)
