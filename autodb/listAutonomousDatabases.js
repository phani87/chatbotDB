var headers = require('./headers.js');
var auth = require('./auth.js');
var regions = require('./regions.js');

var https = require('https');

//Create autonomous database ATP 


function listStatus(dbt, callback) {
    var dbType = '';
    if(dbt == 'Autonomous Datawarehouse'){
        dbType = 'autonomousDataWarehouses';
    }else if (dbt == 'Autonomous Transaction Processing '){
        dbType = 'autonomousDatabases';
    }else {
        dbType ='databases';
    }
    console.log('Database Type >>>> ', dbType);
    var options = {
        host: regions.dbAshburnRegion,
        path: '/20160918/'+dbType+'?'+'compartmentId='+ auth.compartmentId,
        method: 'GET',
        headers: {
            "Content-Type": "application/json",
        }
    };

    var request = https.request(options, headers.handleRequest(callback));

    headers.sign(request, {
        privateKey: auth.privateKey,
        keyFingerprint: auth.keyFingerprint,
        tenancyId: auth.tenancyId,
        userId: auth.authUserId
    });

    request.end();
};

module.exports = {
    listStatus : listStatus
};
