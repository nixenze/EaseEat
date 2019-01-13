//import pouchdb from 'pouchdb-react-native'

var pouchdb = require('pouchdb');


pouchdb.plugin(require('pouchdb-authentication'));
var localDB = new pouchdb('test0000000');
var remoteDB = new pouchdb('http://35.198.213.67:5984/test2/',{skip_setup:true});
console.log("db js run!!!!!")

export {remoteDB,localDB}