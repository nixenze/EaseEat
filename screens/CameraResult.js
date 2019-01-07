import React, { Component } from 'react'
import { Text, View, Image, StyleSheet, ImageBackground,FlatList } from 'react-native'
import FoodItem from '../components/FoodItem';
import {remoteDB,localDB} from '../components/database'

class CameraResult extends Component {

  static navigationOptions = {
    title: 'Scan Result',
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
      foodData: [],
      param:{ 
      image:this.props.navigation.getParam('image',require('../images/img0.jpg')),
      json:this.props.navigation.getParam('json',null)
    }
    };
    this.addData();
  }

  addData(){
    this.state.param.json.results.map(id => {
    
      localDB.get(id,{attachments: false}).then( (result) => {
        // var imageAttch = Object.keys(result._attachments)[0];
        // console.log(imageAttch);
        // var trueImg = null;
        // localDB.getAttachment(id,imageAttch).then((blob) => trueImg = blob)
        console.log(result._attachments);

        tempList = this.state.foodData;
        tempList.push({
          engName : result.English,
          thaiName: result.Thai,
          img: require('../images/img0.jpg')
        });
        this.setState({
          foodData:tempList
        });

      })
    } )
  }

  render() {
    const base64Uri = 'data:image/png;base64,'+this.state.param.image.data;


    //console.log(this.state.param.json.results);


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
