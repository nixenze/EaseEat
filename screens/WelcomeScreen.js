import React, { Component } from 'react'
import { Text, StyleSheet, View } from 'react-native'
import pouchdb from 'pouchdb-react-native'


pouchdb.plugin(require('pouchdb-authentication'));
const localDB = new pouchdb('ease_eat');
const remoteDB = new pouchdb('http://35.198.213.67:5984/ease_eat/',{skip_setup:true});

// const sync = localDB.sync(remoteDB, {
//     live: true,
//     retry: true
//   });
export default class WelcomeScreen extends Component {

    updateDatabase() {

        remoteDB.logIn('administrator','iAGfms6v').then(() => {
        localDB.sync(remoteDB, {
            live: true, retry: true
        })
        .on('error', console.log.bind(console))
        .on('complete',this.props.navigation.navigate('app'))
    }).catch(err => console.log(err));
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
