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
    ActivityIndicator
} from 'react-native'
import { createStackNavigator } from 'react-navigation'
import FoodInfoScreen from './FoodInfoScreen';
import FoodItem from '../components/FoodItem';
import { localDB } from '../components/database';
import { SearchBar } from 'react-native-elements';




const foodCompList = []

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
            loading: true
        };

    }

    componentWillMount() {
        this.loadData();
    }

    async loadData() {
        try {
            const response = (await localDB.allDocs({ include_docs: true }))
            console.log(response.total_rows);

            //console.log(response);

            response.rows.map(data => {
                base64 = { uri: null };
                //console.log(data.doc);
                if (data.doc.hasOwnProperty('image'))
                    if (data.doc.image.data != '')
                        base64 = { uri: 'data:' + data.doc.image.type.toString() + ';base64,' + data.doc.image.data.toString() };
                //{uri : 'data:' + data.doc.image.type.toString() + ';base64,' + data.doc.image.data.toString()}


                foodCompList.push({
                    id: data.id,
                    engName: data.doc.English,
                    thaiName: data.doc.Thai,
                    img: base64
                })
            })

            foodCompList.pop()

            this.setState({
                foodData: foodCompList,
                loading: false
            })

        } catch (error) {
            console.log(error);
        }

    }

    // upperText(text) {
    //     return text.trim();
    // }

    searchFunc(textSearch) {
        const newData = foodCompList.filter(item => {

            const itemData = `${item.engName} ${item.thaiName}`;
            const upper = itemData.toUpperCase()
            const textData = textSearch.toUpperCase();

            return upper.indexOf(textData) > -1;
        });
        this.setState({ foodData: newData });
    }
    onClearSearchFunc() {
        this.setState({
            foodData: foodCompList
        })
    }

    renderScreen() {
        if (this.state.loading)
            return (
                <View style={{ flex: 1, justifyContent:'center', alignItems:'center' }}>
                    <ActivityIndicator size='large'/>
                    <Text style= {{opacity:0.3}}>loading...</Text>
                </View>
            )
        return (
            <View style={{ flex: 1 }}>
                <SearchBar
                    lightTheme
                    onChangeText={this.searchFunc.bind(this)}
                    onClear={this.onClearSearchFunc.bind(this)}
                    placeholder='Search' />
                <FoodScrollView data={this.state.foodData}
                    nav={this.props.navigation}
                    style={styles.container}
                />
            </View>
        )
    }
    render() {
        return (
            this.renderScreen()
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