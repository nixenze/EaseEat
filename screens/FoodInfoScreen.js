import React, { Component } from 'react'
import { Text, View, StyleSheet, Image, ScrollView } from 'react-native'
import SwitchSelector from 'react-native-switch-selector';
import { localDB, remoteDB } from '../components/database';
import { createStackNavigator } from 'react-navigation';




class FoodInfoScreen extends Component {
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
        thaiName: '',
        engName: '',
        image: null,
        allergen: '',
        spiciness: '',
        detail: null,
        ingredients: null,
        method: null,
      },
      dataToShow: null
    }


  }


  componentDidMount() {
    localDB.get("5682c099326de4b161c65d081405a092").then(result => {
      //localDB.get(this.props.navigation.getParam('id')).then(result => {
      base64 = { uri: null };
      if (result.hasOwnProperty('image'))
        if (result.image.data != '')
          base64 = { uri: 'data:' + result.image.type + ';base64,' + result.image.data };

      const tempData = this.renderDetail(result, base64)
      this.setState({
        param: {
          thaiName: result.Thai,
          engName: result.English,
          image: base64,
          allergen: result.Allergens,
          spiciness: result.Spiciness,
          method: this.renderRecipe(result.Method),
          detail: tempData,
          ingredients: null
        },
        dataToShow: tempData
      })
    })
  }

  renderDetail(object, base64) {
    const text = '"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."'
    return (

      <ScrollView>
        <View style={{ flex: 1, marginHorizontal: 24 }}>
          <Image
            style={{ flex: 1,width:320,height:240,alignSelf:'center' }}
            resizeMode='cover'
            source={base64}
            defaultSource={require('../images/No_Image_Available.png')} />
          <View style={{ flex: 1 }}>
            <View margin={16}>
              <Text style={{fontWeight:'bold'}}>Calories (per serving):</Text>
              <Text>{'      ' + object.Calories}</Text>
            </View>
            <View margin={16}>
              <Text style={{fontWeight:'bold'}}>About:</Text>
              <Text>{'      ' + text}</Text>
            </View>
          </View>


        </View>
      </ScrollView>
    )
  }

  renderIngredients(obj) {

  }

  renderRecipe(object) {

    const array = [];
    for (var key in object) {
      if (object.hasOwnProperty(key)) {
        const element = object[key];
        array.push(<Text key={key} style={{ marginVertical: 8,fontSize:14 }}>{(++key) + '. ' + element}</Text>)
      }
    }
    if (array.length == 0)
      return (
        <View style={{
          marginHorizontal: 16,
          justifyContent: 'center',
          alignItems: 'center',
          flex: 1
        }}>
          <Text
            style={{
              fontSize: 24,
              opacity: 0.3
            }}
          >No Data
      </Text>
        </View>

      )
    return (

      <ScrollView >
        <View style={{ marginHorizontal: 24 }}>
          {array}
        </View>
      </ScrollView>

    )
  }



  showText(key) {
    switch (key) {
      case 0:
        this.setState({ dataToShow: this.state.param.detail })
        break;
      case 1:
        this.setState({ dataToShow: this.state.param.ingredients })
        break;
      case 2:
        this.setState({ dataToShow: this.state.param.method })
        break;
      default:
        this.setState({ dataToShow: this.state.param.detail })
        break;
    }
  }

  renderTopView() {

    return (
      <View style={{
        flex: 4,
        // justifyContent:'center',
        // alignContent:'center'
      }}>


        <View style={{ flex: 7, flexDirection: "row", justifyContent: 'flex-start' }}>
          <View style={{ flex: 0.4, justifyContent: 'center', alignItems: 'center' }}>
            <Image source={this.state.param.image}
              defaultSource={require('../images/No_Image_Available.png')}
              style={styles.image}
            />
          </View>
          <View style={styles.textContainer}>
            <Text style={styles.engText}>{this.state.param.engName}</Text>
            <Text>{this.state.param.thaiName}</Text>
          </View>
        </View>



        <View style={{ flex: 3, flexDirection: "row", marginLeft: 24 }}>

          <View style={styles.textContainer2}>
            <Text style={styles.engText}>Allergens</Text>
            <Text>{this.state.param.allergen}</Text>
          </View>
          <View style={styles.textContainer2}>
            <Text style={styles.engText}>Spiciness</Text>
            <Text>{this.state.param.spiciness}</Text>
          </View>

        </View>

      </View>

    )

  }
  renderButtomView() {
    const switchOption = [
      { label: "Details", value: 0 },
      { label: "Ingredients", value: 1 },
      { label: "Method", value: 2 }
    ]

    return (
      <View style={{ flex: 6 }}>

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

        {this.state.dataToShow}

      </View>)
  }

  render() {




    return (
      <View style={{ flex: 1 }}>
        {this.renderTopView()}
        {this.renderButtomView()}

      </View>
    )
  }
}

export default createStackNavigator({
  FoodInfo: { screen: FoodInfoScreen },
}, {
    cardStyle: { backgroundColor: 'white' }
  }
)

const styles = StyleSheet.create({
  image: {
    //flex: 1,
    width: 144,
    height: 144,

    borderRadius: 144,
    margin: 16,

  },
  textContainer: {
    flex: 0.6,
    marginLeft: 8,
    justifyContent: 'center',
    //alignItems:'center'
    //flexDirection:'column'
  },
  textContainer2: {
    flex: 0.6,
    //height: 150,
    //justifyContent: 'center',
    //alignItems:'center'
    //flexDirection:'column'
  },
  engText: {
    fontSize: 20,
    fontWeight: 'bold'
  }
})
