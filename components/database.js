//import pouchdb from 'pouchdb-react-native'

import '../shim'

var PouchDB = require('pouchdb')

PouchDB.plugin(require('pouchdb-adapter-asyncstorage').default);
PouchDB.plugin(require('pouchdb-authentication'));
var localDB = new PouchDB('ease_eat',{adapter: 'asyncstorage'});
var remoteDB = new PouchDB('http://35.240.146.181:5984/ease_eat/',{
    //magic code snippet that enable to authen via pouchdb7
    fetch(url, opts){
      opts.credentials='include'
      return PouchDB.fetch(url, opts)
    }
  });

console.log("db js run!!!!!");
localDB.allDocs().then(res => console.log(res.total_rows));


// function loadData() {
//   try {
//       localDB.allDocs({ include_docs: true }).then(response => {
        
//       response.rows.map(data => {
//         base64 = { uri: null };
//         //console.log(data.doc);
//         if (data.doc.hasOwnProperty('image'))
//             if (data.doc.image.data != '')
//                 base64 = { uri: 'data:' + data.doc.image.type.toString() + ';base64,' + data.doc.image.data.toString() };
//         //{uri : 'data:' + data.doc.image.type.toString() + ';base64,' + data.doc.image.data.toString()}
//         foodCompList.push({
//             id: data.id,
//             engName: data.doc.Englis1h,
//             thaiName: data.doc.Thai,
//             img: base64
//         })
//         foodCompList.pop();
//     })
      
//     }).then()
      

//       //console.log(response);


//       this.setState({
//           foodData: foodCompList,
//           loading: false
//       })

//   } catch (error) {
//       console.log(error);
//   }

// }



export {remoteDB,localDB}