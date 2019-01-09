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

            foodData: [{
                engName: 'Sautéed mixed vegetables in oyster sauce',
                thaiName: 'แฮมเบอร์เกอร์',
                img: require('../images/img0.jpg')
            }, {
                engName: 'Hamburger2',
                thaiName: 'แฮมเบอร์เกอร์',
                img: require('../images/img0.jpg')
            }, {
                engName: 'Hamburger3',
                thaiName: 'แฮมเบอร์เกอร์',
                img: require('../images/img0.jpg')
            }, {
                engName: 'Hamburger3',
                thaiName: 'แฮมเบอร์เกอร์',
                img: require('../images/img0.jpg')
            }, {
                engName: 'Hamburger3',
                thaiName: 'แฮมเบอร์เกอร์',
                img: require('../images/img0.jpg')
            }, {
                engName: 'Hamburger3',
                thaiName: 'แฮมเบอร์เกอร์',
                img: require('../images/img0.jpg')
            }, {
                engName: 'Hamburger3',
                thaiName: 'แฮมเบอร์เกอร์',
                img: require('../images/img0.jpg')
            }, {
                engName: 'Hamburger3',
                thaiName: 'แฮมเบอร์เกอร์',
                img: require('../images/img0.jpg')
            }, {
                engName: 'Hamburger3',
                thaiName: 'แฮมเบอร์เกอร์',
                img: require('../images/img0.jpg')
            },
            ],
        };
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