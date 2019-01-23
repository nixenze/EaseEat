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
import { SearchBar } from 'react-native-elements';






class FoodListScreen extends Component {

    static navigationOptions = {
        title: 'All Food Info',
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

    componentWillMount() {
        this.loadData();
    }

    async loadData() {
        const response = (await localDB.allDocs({ include_docs: true }))
        console.log(response.total_rows);
        tempList = []
        //console.log(response);

        response.rows.map(data => {
            base64 = { uri: null };
            console.log(data.doc);
            if (data.doc.hasOwnProperty('image'))
                if (data.doc.image.data != '')
                    base64 = { uri: 'data:' + data.doc.image.type.toString() + ';base64,' + data.doc.image.data.toString() };
            //{uri : 'data:' + data.doc.image.type.toString() + ';base64,' + data.doc.image.data.toString()}


            tempList.push({
                id: data.id,
                engName: data.doc.English,
                thaiName: data.doc.Thai,
                img: base64
            })
        })
        this.setState({
            foodData: tempList
        })
    }


    render() {
        return (
            <View style={{ flex: 1 }}>
                <SearchBar
                    lightTheme
                    onChangeText={() => { }}
                    onClear={() => { }}
                    placeholder='Search' />
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
                removeClippedSubviews={true}
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
        flex: 1
    }
});