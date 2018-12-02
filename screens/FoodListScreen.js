import React, { Component } from 'react'
import {
    Text,
    StyleSheet,
    View,
    ScrollView,
    Image,
    Button,
    TouchableNativeFeedback as TouchNative,
    Platform
} from 'react-native'
import { createStackNavigator } from 'react-navigation'
import FoodInfoScreen from './FoodInfoScreen';






class FoodListScreen extends Component {

    static navigationOptions = {
        title: 'EaseEat',
    };

    render() {
        return (

            <ScrollView style={{backgroundColor:'white'}}>
                <FoodItem />
                <FoodItem />
                <FoodItem />
                <FoodItem />
                <FoodItem />
                <FoodItem />
                <FoodItem />
                <FoodItem />
                <FoodItem />
            </ScrollView>

        )
    }
}


class FoodItem extends Component {

    render() {
        return (
            <TouchNative
                onPress={() => {}}
                background={Platform.OS === 'android' ? TouchNative.SelectableBackground() : ''}
            >
            <View>
                <View style={foodStyles.container}>
                    <Image
                        style={{ width: 150, height: 150 }}
                        source={require('../images/img0.jpg')}
                    />
                    <View style={{paddingLeft:32,justifyContent:'center'}}>
                    <Text style={{fontSize:20,fontWeight:'bold'}}>Hamburger</Text>
                    <Text>แฮมเบอร์เกอร์</Text>
                    </View>
                    

                </View>
                <View style={{height:1, backgroundColor:'gainsboro'}}/>
            </View>
            </TouchNative>
        )
    }
}



export default createStackNavigator({
    Menu: FoodListScreen,
    popUp: FoodInfoScreen
});


const foodStyles = StyleSheet.create({
    container: {
        height: 150,
        flexDirection:'row'

    }
});

// const styles = StyleSheet.create({
//     container: {
//         flex: 1,
//         alignItems: "stretch",
//         //justifyContent: "center"
//     }
// });