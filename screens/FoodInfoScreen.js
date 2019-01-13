import React, { Component } from 'react'
import { Text, View, StyleSheet, Image, ScrollView } from 'react-native'
import SwitchSelector from 'react-native-switch-selector';
import { localDB, remoteDB } from '../components/database';

export class FoodInfoScreen extends Component {
  static navigationOptions = {
    title: 'Food Info',
    headerStyle: {
      backgroundColor: 'orange',
    },
    headerTintColor: '#fff',
    headerTitleStyle: {
      fontWeight: 'bold',
    }
  };

  constructor(props) {
    super(props);
    this.state = {
      param: {
        thaiName:'',
        engName:'',
        image:{uri: ''},
        allergies: '',
        spiciness: '',
        detail: '',
        ingredient: '',
        recipe: '',
      },
      textToShow: ''
    }

  }


  componentDidMount(){
    remoteDB.get(this.props.navigation.getParam('id')).then(result => {
      base64 = {uri:null};
      if (result.hasOwnProperty('image'))
        if(result.image.data!='')
          base64 = { uri: 'data:' + result.image.type + ';base64,' + result.image.data };

     this.setState({
       thaiName:result.Thai,
       engName:result.English,
       image : base64,
       allergies : result.Allergies,
       spiciness:result.Spiciness,
     })     
    })
  }

  

  showText(key) {
    switch (key) {
      case 0:
        this.setState({ textToShow: this.state.param.detail })
        break;
      case 1:
        this.setState({ textToShow: this.state.param.ingredient })
        break;
      case 2:
        this.setState({ textToShow: this.state.param.recipe })
        break;
      default:
        this.setState({ textToShow: this.state.param.detail })
        break;
    }
  }

  render() {

    const switchOption = [
      { label: "Details", value: 0 },
      { label: "Ingredients", value: 1 },
      { label: "Recipe", value: 2 }
    ]


    return (
      <View style={{ flex: 1 }}>
        <View style={{
          flex: 0.4,

          // justifyContent:'center',
          // alignContent:'center'
        }}>
          <View style={{flex:1, flexDirection:"row"}}>
            <Image source={this.state.image}
            defaultSource={require('../images/No_Image_Available.png')}
              style={styles.image}
            />
            <View style={styles.textContainer}>
              <Text style={styles.engText}>{this.state.engName}</Text>
              <Text>{this.state.thaiName}</Text>
            </View>
          </View>
          <View style={{flex:1, flexDirection:"row", marginTop : 40,marginHorizontal:16}}>
            <View style={styles.textContainer}>
              <Text style={styles.engText}>Allergies</Text>
              <Text>{this.state.allergies}</Text>
            </View>
            <View style={styles.textContainer}>
              <Text style={styles.engText}>Spiciness</Text>
              <Text>{this.state.spiciness}</Text>
            </View>

          </View>

        </View>
        <View style={{ flex: 0.6 }}>

          <SwitchSelector
            initial={0}
            onPress={key => this.showText(key)}
            textColor={'orange'} //'#7a44cf'
            selectedColor={'white'}
            buttonColor={'orange'}
            borderColor={'orange'}
            hasPadding
            options={switchOption}
            style={{ margin: 8 }}
          />
          <ScrollView style={{ flex: 1 }}>
            <Text
              style={{ marginHorizontal: 24 }}
            >{this.state.textToShow}</Text>
          </ScrollView>
        </View>
      </View>
    )
  }
}

export default FoodInfoScreen

const styles = StyleSheet.create({
  image: {
    flex: 0.4,
    width: 150,
    height: 150,
    borderRadius: 150,
    margin: 24,

  },
  textContainer: {
    flex: 0.6,
    justifyContent: 'center'
  }, engText: {
    fontSize: 20,
    fontWeight: 'bold'
  }
})
