//import pouchdb from 'pouchdb-react-native'

import '../shim'

var PouchDB = require('pouchdb')

PouchDB.plugin(require('pouchdb-authentication'));
PouchDB.plugin(require('pouchdb-adapter-asyncstorage').default);
var localDB = new PouchDB('ease_eat',{adapter: 'asyncstorage'});
var remoteDB = new PouchDB('http://35.198.213.67:5984/test/',{skip_setup:true});

console.log("db js run!!!!!");
localDB.allDocs().then(res => console.log(res.total_rows));

export {remoteDB,localDB}