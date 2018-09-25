"use strict";

var oci = require( './oci' );
var auth = require('./auth');


module.exports = {

    metadata: () => ({
        "name": "startdbprovision",
        "properties": {
            "dbtype": { "type": "string", "required": true },
            "dbname": { "type": "string", "required": true },
            "dbshape":{ "type": "string", "required": true },
            "dbstorage":{ "type": "string", "required": true },
            "dbusername":{ "type": "string", "required": true },
            "dbpasswd" :{ "type": "string", "required": true }
        },
        "supportedActions": []
    }),

    invoke: (conversation, done) => {
        
        var dbname = conversation.properties().dbname;
        var dbocpus = conversation.properties().dbocpus;
        var dbstorage = conversation.properties().dbstorage;
        var dbusername = conversation.properties().dbusername;
        var dbpasswd = conversation.properties().dbpasswd;
       

        var dbBody = {
            adminPassword :dbpasswd,
            compartmentId : auth.compOCID,
            cpuCoreCount: dbocpus,
            dataStorageSizeInTBs : dbstorage,
            dbName : dbname,
            displayName : dbname
        }

        var parameters = {
            body : dbBody
        } 

        oci.database.autonomousDatabase.create( auth.authorization, parameters , function(response){result = response; doneAsync = true;});
                    require('deasync').loopWhile(function(){return !doneAsync;});

        console.log(res);
        conversation.reply(`done creating db : ${res}`);
        conversation.transition();

        done();
    },

    invoke: () => {
        
        var dbname = "ChrisTrial";
        var dbocpus = "1";
        var dbstorage = "1";
        var dbusername = "";
        var dbpasswd = "WElCome12_34#";
        var doneAsync = false;
        var result;
       

        var dbBody = {
            adminPassword :dbpasswd,
            compartmentId : auth.compOCID,
            cpuCoreCount: dbocpus,
            dataStorageSizeInTBs : dbstorage,
            dbName : dbname,
            displayName : dbname
        }

        var parameters = {
            body : dbBody
        } 

        oci.database.autonomousDatabase.create( auth.authorization, parameters , function(response){result = response; doneAsync = true;});
                    require('deasync').loopWhile(function(){return !doneAsync;});

        console.log(JSON.stringify(result));
        // conversation.reply(`done creating db : ${res}`);
        // conversation.transition();

        // done();
    },
    
};
