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
    


  static navigationOptions = ({ navigation }) => {
    return {
      title: navigation.getParam('type', 'no data')+' guide',
      headerStyle: {
        backgroundColor: '#ea893f',
      },
      headerTintColor: '#fff',
      headerTitleStyle: {
        fontFamily: 'Pacifico'
      },
    };
  };


    renderPdf(sourceURI)
    {

        const source = {uri:"data:application/pdf;base64,"+sourceURI,cache:true}
        //const source = { uri: sourceURI, cache: true };
        return ( this.props.isFocused ?
            
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
                : null
        )
    }


    render()
    {
        return (  
            <View style={{flex:1}}>
                {this.renderPdf(this.props.navigation.getParam("pdfData"))}
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
export default withNavigationFocus(GuidePdfScreen)
