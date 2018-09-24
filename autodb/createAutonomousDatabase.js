/*
    Version 1.1

    Author: kris.bhanushali@oracle.com
    
    Create an Autonomous Transaction Processing Service

    Before running this example, install necessary dependencies by running:
    npm install http-signature jssha
*/
var auth = require('./auth.js');
var regions = require('./regions.js');
var headers = require('./headers.js');
var https = require('https');
//Create autonomous database ATP 

function createADB(dbt, dbdisplayname, dbname, dbpasswd, dbocpus, dbstorage,callback) {
    console.log('Creating ATP');
    var dbType = '';
    if(dbt == 'Autonomous Datawarehouse'){
        dbType = 'autonomousDataWarehouses';
    }else if (dbt == 'Autonomous Transaction Processing '){
        dbType = 'autonomousDatabases';
    }else {
        dbType ='databases';
    }

var body = JSON.stringify({
    "compartmentId" : auth.compartmentId,
    "displayName" : dbdisplayname,
    "dbName" : dbname,
    "adminPassword" :dbpasswd,
    "cpuCoreCount" : dbocpus,
    "dataStorageSizeInTBs" : dbstorage
});
var options = {
        host: regions.dbAshburnRegion,
        path: '/20160918/'+dbt,
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


//     console.log("\nCREATING ATP Service:");

    
//     createATP(function(data) {
//         console.log(data);
//     });

// });

//createADW((response)=> console.log(response));
//createADW('killerdb','WElcome12_34#', '1', '1', function (response){console.log(response)});

module.exports = {
    createADB : createADB
};


   
