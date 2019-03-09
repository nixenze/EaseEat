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

export class GuidePdfScreen extends Component
{
    
  static navigationOptions = {
    title: '',
    

  };

  static navigationOptions = ({ navigation }) => {
    return {
      title: navigation.getParam('type', 'no data')+' guide',
      headerStyle: {
        backgroundColor: 'orange',
      },
      headerTintColor: '#fff',
      headerTitleStyle: {
        fontFamily: 'Pacifico'
      },
    };
  };


    renderPdf(sourceURI)
    {

        const source = {uri:"bundle-assets://restaurant.pdf",cache:true};
        //const source = { uri: sourceURI, cache: true };
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
                        fitPolicy={0}
                        onLoadComplete={(numberOfPages, filePath) =>
                        {
                            console.log(`number of pages: ${numberOfPages}`);
                        }}
                        onPageChanged={(page, numberOfPages) =>
                        {
                            console.log(`current page: ${page}`);
                        }}
                        onError={(error) =>
                        {
                            console.log(error);
                        }}
                        style={styles.pdf} />
                </View>
                
        )
    }


    render()
    {
        return (
            <View style={{flex:1}}>
                {this.renderPdf("notnowboisss")}
            </View>
        )
    }
}

const styles = StyleSheet.create({
    pdf: {
      flex: 1,
      width: Dimensions.get('window').width,
    }
  });
export default GuidePdfScreen
