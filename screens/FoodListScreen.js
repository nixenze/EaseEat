import React, { Component } from 'react'
import {
    Text,
    StyleSheet,
    View,
    ScrollView,
    Image,
    Button,
    TouchableNativeFeedback as TouchNative,
    Platform,
    FlatList,
} from 'react-native'
import { createStackNavigator } from 'react-navigation'
import FoodInfoScreen from './FoodInfoScreen';
import FoodItem from '../components/FoodItem';
import { localDB } from '../components/database';






class FoodListScreen extends Component {

    static navigationOptions = {
        title: 'EaseEat',
        headerStyle: {
            backgroundColor: 'orange',
        },
        headerTintColor: '#fff',
        headerTitleStyle: {
            fontWeight: 'bold',
        },
    };
    constructor(props) {
        super(props);
        this.state = {

            foodData: [
            ],
        };
        
    }

    componentWillMount(){
        this.loadData();
    }

    async loadData(){
        const response = (await localDB.allDocs({include_docs:true}))
        console.log(response.total_rows);
        tempList = []
        response.rows.map(data => {
            if(data.doc.hasOwnProperty('image'))
                base64 = {uri : 'data:' + data.doc.image.type.toString() + ';base64,' + data.doc.image.data.toString()};
                //{uri : 'data:' + data.doc.image.type.toString() + ';base64,' + data.doc.image.data.toString()}
            else
                base64 = null;

            tempList.push({
                id:data.id,
                engName:data.doc.English,
                thaiName:data.doc.Thai,
                img:base64
            })
        })
        this.setState({
            foodData:tempList
        })
    }


    render() {

       

        return (
            <View style={{flex:1}}>
            <FoodScrollView data={this.state.foodData}
                nav={this.props.navigation}
                style={styles.container}
            />
            </View>
        )
    }
}

class FoodScrollView extends Component {

    renderItem = ({ item }) => {
        return <FoodItem
            engName={item.engName}
            thaiName={item.thaiName}
            img={item.img}
            id={item.id}
            nav={this.props.nav}
        />

    }
    render() {
        return (
            <FlatList
                keyExtractor={item => item.id}
                data={this.props.data}
                ItemSeparatorComponent={() => <View style={{ height: 1, backgroundColor: 'gainsboro' }} />}
                renderItem={this.renderItem}
            />
        )
    }
}




export default createStackNavigator({
    Menu: FoodListScreen,
    foodInfo: FoodInfoScreen
}, {
        cardStyle: { backgroundColor: 'white' }
    }
);




const styles = StyleSheet.create({
    container: {
        flex:1
    }
});