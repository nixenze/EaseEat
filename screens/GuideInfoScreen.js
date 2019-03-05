import React, { Component } from 'react'
import { Text, View, StyleSheet, Dimensions } from 'react-native'
import Pdf from 'react-native-pdf';

export class GuideInfoScreen extends Component {
    
  render() {

    const source = {uri:'http://samples.leanpub.com/thereactnativebook-sample.pdf',cache:true};

    return (
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

export default GuideInfoScreen
