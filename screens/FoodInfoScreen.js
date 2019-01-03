import React, { Component } from 'react'
import { Text, View, StyleSheet, Image, ScrollView } from 'react-native'
import SwitchSelector from 'react-native-switch-selector';

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
        detail: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus non molestie purus, efficitur tempor elit. Morbi euismod felis interdum eros aliquam vulputate. Vestibulum consectetur accumsan enim venenatis malesuada. Aliquam scelerisque venenatis dapibus. Vestibulum eu posuere purus, nec iaculis diam. Mauris vestibulum vitae elit nec accumsan. Aenean volutpat euismod elit, auctor porta tellus suscipit et. Morbi vitae auctor dui, at maximus eros. Duis in aliquet urna. Fusce volutpat semper tincidunt. Sed molestie nibh ut mi tincidunt, nec aliquam dolor vehicula. Sed nunc erat, auctor non sapien sit amet, malesuada feugiat nibh. Vestibulum tristique non purus sit amet sollicitudin. Morbi ac sem ex. Suspendisse tortor odio, fermentum vel ipsum a, sodales aliquam metus. Donec eleifend lobortis diam sed facilisis.Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus non molestie purus, efficitur tempor elit. Morbi euismod felis interdum eros aliquam vulputate. Vestibulum consectetur accumsan enim venenatis malesuada. Aliquam scelerisque venenatis dapibus. Vestibulum eu posuere purus, nec iaculis diam. Mauris vestibulum vitae elit nec accumsan. Aenean volutpat euismod elit, auctor porta tellus suscipit et. Morbi vitae auctor dui, at maximus eros. Duis in aliquet urna. Fusce volutpat semper tincidunt. Sed molestie nibh ut mi tincidunt, nec aliquam dolor vehicula. Sed nunc erat, auctor non sapien sit amet, malesuada feugiat nibh. Vestibulum tristique non purus sit amet sollicitudin. Morbi ac sem ex. Suspendisse tortor odio, fermentum vel ipsum a, sodales aliquam metus. Donec eleifend lobortis diam sed facilisis.',
        ingredient: 'Praesent volutpat bibendum odio, vitae molestie massa. Duis convallis, est eu lobortis tincidunt, arcu nisl mattis magna, nec tempor velit elit eu nisi. Nullam id sem vitae ante volutpat cursus ut lobortis mi. Praesent vel bibendum metus. Nam sed ipsum sem. Pellentesque dapibus lacus a mattis luctus. Mauris vitae elementum augue. Fusce mollis ligula ut orci vehicula gravida. Sed id magna lacus. Nullam vitae neque placerat, sollicitudin magna eget, vestibulum velit. Suspendisse at dictum quam, quis mollis nulla. Nam imperdiet non magna eu elementum. Vestibulum enim sem, rhoncus vitae mollis sit amet, rhoncus et urna. Morbi eros sapien, bibendum nec facilisis pharetra, dignissim sit amet leo.',
        recipe: 'Suspendisse imperdiet, quam ac bibendum gravida, ipsum sapien maximus metus, iaculis aliquet justo lectus a nunc. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Ut est enim, pharetra a condimentum quis, bibendum at dui. Sed ac neque condimentum, efficitur nulla a, ullamcorper erat. Nam ut imperdiet nisi. In gravida tincidunt ex, ac euismod ex vestibulum non. Aenean posuere mi aliquet magna porttitor tempus. Cras tristique dui id lorem blandit, eget scelerisque velit lacinia. Ut a lectus eros. Aenean varius, dolor ac maximus efficitur, mauris leo sodales turpis, laoreet tempus metus massa vitae nisl. Nullam pellentesque metus tortor, nec congue enim interdum vel. Cras dui arcu, tempus blandit ligula id, euismod condimentum augue'
      },
      textToShow: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus non molestie purus, efficitur tempor elit. Morbi euismod felis interdum eros aliquam vulputate. Vestibulum consectetur accumsan enim venenatis malesuada. Aliquam scelerisque venenatis dapibus. Vestibulum eu posuere purus, nec iaculis diam. Mauris vestibulum vitae elit nec accumsan. Aenean volutpat euismod elit, auctor porta tellus suscipit et. Morbi vitae auctor dui, at maximus eros. Duis in aliquet urna. Fusce volutpat semper tincidunt. Sed molestie nibh ut mi tincidunt, nec aliquam dolor vehicula. Sed nunc erat, auctor non sapien sit amet, malesuada feugiat nibh. Vestibulum tristique non purus sit amet sollicitudin. Morbi ac sem ex. Suspendisse tortor odio, fermentum vel ipsum a, sodales aliquam metus. Donec eleifend lobortis diam sed facilisis.Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus non molestie purus, efficitur tempor elit. Morbi euismod felis interdum eros aliquam vulputate. Vestibulum consectetur accumsan enim venenatis malesuada. Aliquam scelerisque venenatis dapibus. Vestibulum eu posuere purus, nec iaculis diam. Mauris vestibulum vitae elit nec accumsan. Aenean volutpat euismod elit, auctor porta tellus suscipit et. Morbi vitae auctor dui, at maximus eros. Duis in aliquet urna. Fusce volutpat semper tincidunt. Sed molestie nibh ut mi tincidunt, nec aliquam dolor vehicula. Sed nunc erat, auctor non sapien sit amet, malesuada feugiat nibh. Vestibulum tristique non purus sit amet sollicitudin. Morbi ac sem ex. Suspendisse tortor odio, fermentum vel ipsum a, sodales aliquam metus. Donec eleifend lobortis diam sed facilisis.',
    }


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
            <Image source={require('../images/img0.jpg')}
              style={styles.image}
            />
            <View style={styles.textContainer}>
              <Text style={styles.engText}>Hamburger</Text>
              <Text>แฮมเบอร์เกอร์</Text>
            </View>
          </View>
          <View style={{flex:1, flexDirection:"row", marginTop : 40,marginHorizontal:16}}>
            <View style={styles.textContainer}>
              <Text style={styles.engText}>Allergies</Text>
              <Text>หมู,หมึก,กุ้ง</Text>
            </View>
            <View style={styles.textContainer}>
              <Text style={styles.engText}>Spiciness</Text>
              <Text>High</Text>
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
