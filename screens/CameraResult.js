import React, { Component } from 'react'
import { Text, View, Image, StyleSheet, ImageBackground,FlatList } from 'react-native'
import FoodItem from '../components/FoodItem';

class CameraResult extends Component {


  constructor(props) {
    super(props);
    this.state = {
      foodData: [{
        engName: 'Hamburger1',
        thaiName: 'แฮมเบอร์เกอร์',
        img: require('../images/img0.jpg')
      },{
        engName: 'Hamburger1',
        thaiName: 'แฮมเบอร์เกอร์',
        img: require('../images/img0.jpg')
      }],
      param:{ 
      image:this.props.navigation.getParam('image',require('../images/img0.jpg')),
      json:this.props.navigation.getParam('json',null)
    }
    }
  }

  render() {
    const base64Uri = 'data:image/png;base64,'+this.state.param.image.data;

    return (
      <View>
        <ImageBackground source={{uri: base64Uri}}
          style={styles.resultsBanner}
        >
          <Text style={styles.resultBannerText}>Results</Text>
        </ImageBackground> 
        <ResultList data={this.state.foodData} 
        nav={this.props.navigation}
        />
      </View>
    )
  }
}

// <ImageBackground source={{ uri: ('data:image/png;base64,'+ this.props.navigation.getParam('image', require('../images/img0.jpg'))) }}
//   style={styles.results}>
//   
//   </ImageBackground>


class ResultList extends Component {
  renderItem = ({ item }) => {
    return <FoodItem
      engName={item.engName}
      thaiName={item.thaiName}
      img={item.img}
      nav={this.props.nav}
    />

  }
  render() {
    return (
      <FlatList
        keyExtractor={item => item.engName}
        data={this.props.data}
        ItemSeparatorComponent={() => <View style={{ height: 1, backgroundColor: 'gainsboro' }} />}
        renderItem={this.renderItem}
      />
    )
  }
}


export default CameraResult


const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  resultsBanner: {
    height: 192,
    position: 'relative', // because it's parent
    justifyContent: 'flex-end'

  },
  resultBannerText: {
    fontWeight: 'bold',
    color: 'white',
    fontSize: 30,
    padding: 8,
    textShadowColor: 'black',
    textShadowRadius: 10,
  }

});
