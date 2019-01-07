import React, { Component } from 'react'
import { Text, StyleSheet, View } from 'react-native'
import {remoteDB,localDB} from '../components/database'

export default class WelcomeScreen extends Component {

    updateDatabase() {

        remoteDB.logIn('administrator','iAGfms6v').then(() => {
            remoteDB.get('5682c099326de4b161c65d0814061d8d',{attachments:false}).then((result) => console.log(result._attachments["PadThai.jpg"]))
        localDB.sync(remoteDB, {
            live: true, retry: true
        })
        .on('error', console.log.bind(console))
        .on('complete',this.props.navigation.navigate('app'))
        
        return remoteDB.logOut();
    }).catch(err => console.log("err"));
    }
    
    render() {

        this.updateDatabase();
        //localDB.get('5682c099326de4b161c65d0814002c58').then(result => console.log(result.English))
        // setTimeout(() => {
        //     this.props.navigation.navigate('')
        // }, 2000)

        return (
            <View style={styles.container}>
                <Text > WelcomeScreen </Text>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",

    }
})
