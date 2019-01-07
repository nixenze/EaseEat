import pouchdb from 'pouchdb-react-native'


pouchdb.plugin(require('pouchdb-authentication'));
const localDB = new pouchdb('ease_eat');
const remoteDB = new pouchdb('http://35.198.213.67:5984/ease_eat/',{skip_setup:true});

export {remoteDB,localDB}