"use strict";

var oci = require( './OCI-Rest-APIs-nodejs/oci' );
var auth = require('./auth');

module.exports = {

    metadata: () => ({
        "name": "getAdb",
        "properties": {
            "adbocids": { "type": "string", "required": true },
            "dbchkstatus": { "type": "string", "required": true },
            "adbtype":{ "type": "string", "required": true }
        },
        "supportedActions": []
    }),

    invoke: (conversation, done) => {
         var doneAsync = false;
         var result;
         var res="";
         var dbid = "";
         var adbname = '';
         var adbocids = conversation.properties().adbocids;
         var dbchkstatus = conversation.properties().dbchkstatus;
         var adbtype = conversation.properties().adbtype;

         var dbchkstatus = dbchkstatus.split(" ")[0];
         var adbocids = adbocids.split(',');
         for(var k=0; k < adbocids.length; k++){
            if (adbocids[k].startsWith(dbchkstatus)){
                dbid = adbocids[k].split('-')[1];
            }
         }

         console.log('DBID::   ',dbid);

        var parameters = {
            compartmentId: auth.compOCID,
            autonomousDataWarehouseId : dbid
        }

         
         if (adbtype == 'Autonomous Datawarehouse') {
                    oci.database.autonomousDataWarehouse.get( auth.authorization, parameters, function(response){result = response; doneAsync = true;});
                    require('deasync').loopWhile(function(){return !doneAsync;});
                } else if (adbtype == 'Autonomous Transaction Processing'){
                    oci.database.autonomousDatabase.get( auth.authorization, parameters, function(response){result = response; doneAsync = true;});
                    require('deasync').loopWhile(function(){return !doneAsync;});
                // }else if (dbtype == 'Database on VM'){
                //     oci.database.database.list(auth.authorization, {compartmentId: auth.compOCID }, function(response){result = response; doneAsync = true;});
                }else {
                    conversation.reply({text: 'Please select appropriate option'});
                }
         
        res = 'CPU Cores : '+result.cpuCoreCount+', Storage :' +result.dataStorageSizeInTBs;   
        adbname = result.dbName; 
        conversation.variable("adbdetails",res );
        conversation.variable("adbname", adbname);
        conversation.variable("adbocids", dbid, );
        conversation.transition();
        done();
    },

    // invoke: () => {

    //     var doneAsync = false;
    //     var result;
    //     var res="";
    //     var dbid ;
    //     var adbocids = 'DemoADW-ocid1.autonomousdwdatabase.oc1.phx.abyhqljrzxfmmlkp43cssqe2etvgenmt534jjl4dtdimig75buh72jkawrxa';
    //     var dbchkstatus = 'DemoADW - AVAILABLE';
    //     var adbtype = 'Autonomous Datawarehouse';

    //     var dbchkstatus = dbchkstatus.split(" ")[0];
    //      var adbocids = adbocids.split(',');
    //      for(var k=0; k < adbocids.length; k++){
    //         if (adbocids[k].startsWith(dbchkstatus)){
    //             dbid = adbocids[k].split('-')[1];
    //         }
    //      }

    //     console.log('DBID::   ',dbid);

    //     var parameters = {
    //         compartmentId: auth.compOCID,
    //         autonomousDataWarehouseId : dbid
    //     }

        
    //     if (adbtype == 'Autonomous Datawarehouse') {
    //                console.log();
    //                oci.database.autonomousDataWarehouse.get( auth.authorization, parameters, function(response){result = response; doneAsync = true;});
    //                require('deasync').loopWhile(function(){return !doneAsync;});
    //            } else if (adbtype == 'Autonomous Transaction Processing'){
    //                oci.database.autonomousDatabase.get( auth.authorization, parameters, function(response){result = response; doneAsync = true;});
    //                require('deasync').loopWhile(function(){return !doneAsync;});
    //            // }else if (dbtype == 'Database on VM'){
    //            //     oci.database.database.list(auth.authorization, {compartmentId: auth.compOCID }, function(response){result = response; doneAsync = true;});
    //            }else {
    //               // conversation.reply({text: 'Please select appropriate option'});
    //            }
    //    console.log(result); 
    //    res = 'CPU Cores : '+result.cpuCoreCount+', Storage :' +result.dataStorageSizeInTBs;   
    //    adbname = result.dbName;   
    //    console.log(adbname);
    // },
};

