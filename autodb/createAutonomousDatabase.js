/*
    Version 1.1

    Author: phani.turlapati@oracle.com
    
    Create an Autonomous Datawarehousing service

    Before running this example, install necessary dependencies by running:
    npm install http-signature jssha
*/

var auth =  require('./auth.js');
var regions = require('./regions.js');
var headers = require('./headers.js');
var https = require('https');
//Create autonomous database ADW 
//'WElCome123_34#', '1', '1',
function createADW(dbname, dbpasswd, dbocpus, dbstorage, callback) {
    console.log('dbname---->',dbname)

var body = JSON.stringify({
  "compartmentId" : auth.compartmentId,
  "displayName" : "killllleeerrrr",
  "dbName" : dbname,
  "adminPassword" :dbpasswd,
  "cpuCoreCount" : dbocpus,
  "dataStorageSizeInTBs" : dbstorage
});
var options = {
        host: regions.dbAshburnRegion,
        path: '/20160918/autonomousDataWarehouses',
        method: 'POST',
        headers: {
            "Content-Type": "application/json"
        }
    };

var request = https.request(options, headers.handleRequest(callback));

headers.sign(request, {
    body: body,
    privateKey: auth.privateKey,
    keyFingerprint: auth.keyFingerprint,
    tenancyId: auth.tenancyId,
    userId: auth.authUserId
});

request.end(body);

};


// headers.getUser(auth.authUserId, function(data) {
//     console.log(data);


//     console.log("\nCREATING ADWC Service:");

    
//      createADW('killerdb','WElcome12_34#', '1', '1', function(data) {
//          console.log(data);
//      });

// });

//createADW((response)=> console.log(response));
//createADW('killerdb','WElcome12_34#', '1', '1', function (response){console.log(response)});

module.exports = {
    createADW : createADW
};



   
