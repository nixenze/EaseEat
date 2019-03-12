import React, { Component } from 'react'
import { Text, StyleSheet, View, Alert, ActivityIndicator, Image } from 'react-native'
import { remoteDB, localDB } from '../components/database'
import pouchdb from 'pouchdb-react-native'
import { loadavg } from 'os';
export default class WelcomeScreen extends Component {

    updateDatabase() {


        remoteDB.logIn('ease_eat', 'EeFbyhpK!QP-yQ4&').then(() => {

            localDB.replicate.from(remoteDB, {
                live: false, retry: false
            })
                .on('complete', function (result) { console.log('complete', result); })
                //.on('error', function (err) { console.log('error', err); })
                .on('change', function (change) { console.log('change', change); })

                .then(() => {


                    this.props.navigation.navigate('Home')
                })

                .catch(err => {
                    console.log(err);
                    Alert.alert(
                        'Sync Error',
                        'Cannot sync with remote database',
                        [
                            { text: 'OK', onPress: () => { } }
                        ]
                    );
                    this.props.navigation.navigate('Home');
                })
        })
            .catch(err => {
                console.log(err);
                Alert.alert(
                    'No Internet Connection',
                    'Cannot reach the database\nPlease check your internet',
                    [
                        { text: 'OK', onPress: () => { } }
                    ]
                );
                this.props.navigation.navigate('Home');
            });

    }
    componentDidMount() {
        //setTimeout(this.updateDatabase.bind(this), 1000);
        this.updateDatabase()
        //this.props.navigation.navigate('Home')
    }

    render() {
        //localDB.get('5682c099326de4b161c65d0814002c58').then(result => console.log(result.English))
        // setTimeout(() => {
        //     this.props.navigation.navigate('')
        // }, 2000)

        return (
            <View style={styles.container}>

                <View style={styles.logo}>
                    <Image source={require('../images/Logo-EaseEat-final.png')}
                            style={{width: 256, height: 256}}
                    />
                </View>
                <View style={styles.loading}>
                    <ActivityIndicator size='large' />
                    <Text style={styles.subText} > Checking for updates </Text>
                </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#e9893f"
    },
    logo: {
        flex: 7,
        justifyContent: "center",
        alignItems: "center",

    },
    text: {
        fontWeight: 'bold',
        fontSize: 36,
        color: 'white',
        fontStyle: 'italic'
    },
    loading: {
        flex: 3,
        justifyContent: 'center',
        alignItems: "center",
    },
    subText: {
        //fontWeight:'bold',
        fontSize: 20,
        color: 'white',
        fontStyle: 'normal'
    },

})
