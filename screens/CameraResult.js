import React, { Component } from 'react'
import { Text, View, Image, StyleSheet, ImageBackground, FlatList } from 'react-native'
import FoodItem from '../components/FoodItem';
import { remoteDB, localDB } from '../components/database'

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
      param: {
        image: this.props.navigation.getParam('image', require('../images/img0.jpg')),
        json: this.props.navigation.getParam('json', null)
      },
      notFound: false
    };
    
  }

  componentDidMount(){
    this.addData();
  }

  addData() {
    if (this.state.param.json.results.length == 0){
      this.setState({
        notFound:true
      });
      console.log('not found');
    }
    else
      this.state.param.json.results.map(id => {
        localDB.get(id)
        .then( (result) => {
          // var imageAttch = Object.keys(result._attachments)[0];
          // console.log(imageAttch);
          // var trueImg = null;
          // localDB.getAttachment(id,imageAttch).then((blob) => trueImg = blob)
          console.log(result.image.type.toString());
          let base64 = 'data:' + result.image.type.toString() + ';base64,' + result.image.data.toString()
          console.log(base64.length)
          tempList = this.state.foodData;
          tempList.push({
            engName: result.English,
            thaiName: result.Thai,
            img: {uri:base64}
          });
          this.setState({
            foodData:tempList
          });
        })
      });


  }

  showResult(){
    if(this.state.notFound)
    return (
      <View style={{flex:1, justifyContent:'center', alignItems:'center'}}>
        <Text style={{fontWeight:"bold",fontSize:24,color:'rgba(0,0,0,0.2)'}}> Not Found </Text>
      </View>
    )
    else return (
      <ResultList data={this.state.foodData}
      nav={this.props.navigation}
      style={{ flex: 1 }}
    />
    )
  }

  render() {
    const base64Uri = 'data:image/png;base64,' + this.state.param.image.data;


    //console.log(this.state.param.json.results);


    return (
      <View style={styles.container}>
        <ImageBackground source={{ uri: base64Uri }}
          style={styles.resultsBanner}
        >
          <Text style={styles.resultBannerText}>Results</Text>
        </ImageBackground>
        {this.showResult()}
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
