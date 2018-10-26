"use strict";

var oci = require( './OCI-Rest-APIs-nodejs/oci' );
var auth = require('./auth');


module.exports = {

    metadata: () => ({
        "name": "startadbprovision",
        "properties": {
            "adbtype": { "type": "string", "required": true },
            "adbdisplayname": { "type": "string", "required": true },
            "adbname": { "type": "string", "required": true },
            "adbocpus":{ "type": "string", "required": true },
            "adbstorage":{ "type": "string", "required": true },
            "adbusername":{ "type": "string", "required": true },
            "adbpasswd" :{ "type": "string", "required": true }
        },
        "supportedActions": []
    }),

     invoke: (conversation, done) => {
        var adbtype = conversation.properties().adbtype;
        var adbdisplayname = conversation.properties().adbdisplayname; 
        var adbname = conversation.properties().adbname;
        var adbocpus = conversation.properties().adbocpus;
        var adbstorage = conversation.properties().adbstorage;
        var adbusername = conversation.properties().adbusername;
        var adbpasswd = conversation.properties().adbpasswd;
        var doneAsync = false;

        //----------------------------------------------------------------
        //Testing Values
        //----------------------------------------------------------------
        // var adbtype = 'Autonomous Transaction Processing';
        // var adbdisplayname = 'trial2'; 
        // var adbname = 'trial2';
        // var adbocpus = '1';
        // var adbstorage = '1';
        // //var adbusername = conversation.properties().adbusername;
        // var adbpasswd = 'WElCOme12_34#';
        //-----------------------------------------------------------------

        var db = 'Autonomous Datawarehouse';
        var result;

        var dbBody = {
            adminPassword :adbpasswd,
            compartmentId : auth.compOCID,
            cpuCoreCount: adbocpus,
            dataStorageSizeInTBs : adbstorage,
            dbName : adbname,
            displayName : adbdisplayname
        }

        var parameters = {
            body : dbBody
        } 

        if (adbtype == 'Autonomous Datawarehouse') {
            oci.database.autonomousDataWarehouse.create( auth.authorization, parameters, function(response){result = response; doneAsync = true;});
            require('deasync').loopWhile(function(){return !doneAsync;});
            conversation.reply(`Creating Autonomous Warehouse : ${JSON.stringify(result.dbName)}`);
        } else if (adbtype == 'Autonomous Transaction Processing'){
            oci.database.autonomousDatabase.create( auth.authorization, parameters, function(response){result = response; doneAsync = true;});
            require('deasync').loopWhile(function(){return !doneAsync;});
            conversation.reply(`Creating Autonomous Transaction Processing  : ${JSON.stringify(result.dbName)}`);
        }else {
            conversation.reply({text: 'Please select appropriate option'});
        }
       
        conversation.keepTurn(true);
        conversation.transition();
        done();
    },
    
};
