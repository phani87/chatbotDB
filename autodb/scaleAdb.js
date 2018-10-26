"use strict";

var oci = require( './OCI-Rest-APIs-nodejs/oci' );
var auth = require('./auth');

module.exports = {

    metadata: () => ({
        "name": "scaleAdb",
        "properties": {
            "adbocids" : { "type": "string", "required": true },
            "adbtype" : { "type": "string", "required": true },
            "adbpasswd": { "type": "string", "required": true },
            "adbocpus":{ "type": "string", "required": true },
            "adbstorage" : { "type": "string", "required": true }
        },
        "supportedActions": []
    }),

    invoke: (conversation, done) => {
        console.log('Calling List Status Method')
        var doneAsync = false;
        var result;
        var res="";
        var adbocids = conversation.properties().adbocids;
        var dbtype = conversation.properties().adbtype;
        var adbpasswd =  ( conversation.properties().adbpasswd  == "${adbpasswd.value}" ? null :  conversation.properties().adbpasswd);
        var adbocpus = ( conversation.properties().adbocpus  == "${adbocpus.value}" ? null :  conversation.properties().adbocpus);
        var adbstorage = ( conversation.properties().adbstorage  == "${adbstorage.value}" ? null :  conversation.properties().adbstorage);
        
        var parameters = {
           autonomousDataWarehouseId : adbocids,
           body : {}
       }
        if(adbpasswd){
            parameters.body.adminPassword = adbpasswd;
        }
        if(adbocpus){
            parameters.body.cpuCoreCount = adbocpus;
        }
        if(adbstorage){
            parameters.body.dataStorageSizeInTBs = adbstorage;
        }


        conversation.reply(JSON.stringify(parameters));              
        if (dbtype == 'Autonomous Datawarehouse') {
                   oci.database.autonomousDataWarehouse.update( auth.authorization, parameters, function(response){result = response; doneAsync = true;});
                   require('deasync').loopWhile(function(){return !doneAsync;});
               } else if (dbtype == 'Autonomous Transaction Processing'){
                   oci.database.autonomousDatabase.update( auth.authorization, parameters, function(response){result = response; doneAsync = true;});
                   require('deasync').loopWhile(function(){return !doneAsync;});
               // }else if (dbtype == 'Database on VM'){
               //     oci.database.database.list(auth.authorization, {compartmentId: auth.compOCID }, function(response){result = response; doneAsync = true;});
               }else {
                   conversation.reply({text: 'Please select appropriate option'});
               }
        
       if (adbpasswd){
           res = result.dbName + ' : Admin Password Updated';
       }else if (adbocpus){
           res = result.dbName + ' : '+result.lifecycleState +' with OCPUs :' + result.cpuCoreCount;
       }else {
           res = result.dbName + ' : '+result.lifecycleState +' with Storage :' + result.dataStorageSizeInTBs;
       }
       res = result.dbName + ', ' +result.lifecycleState+'...';   

        conversation.reply(`Database ${res}`);
        conversation.keepTurn(true);
        conversation.transition();
        done();
    },

    // invoke: () => {

      
    //     console.log('Calling List Status Method')
    //     var doneAsync = false;
    //     var result;
    //     var res="";
    //     var status="";
    //     var id ="";
    //     var adbocids = 'ocid1.autonomousdwdatabase.oc1.phx.abyhqljttg2hihbzhctpbs4fjnj2whaeek5ntadl2b2tjcleq25dtig6sc3a';
    //     var dbtype = 'Autonomous Datawarehouse';
    //     var adbpasswd = null;
    //     var adbocpus = 2;
    //     var adbstorage = null;
    //     var parameters = {
    //        autonomousDataWarehouseId : adbocids,
    //        body : {}
    //    }
    //     if(adbpasswd){
    //         parameters.body.adminPassword = adbpasswd;
    //     }
    //     if(adbocpus){
    //         parameters.body.cpuCoreCount = adbocpus;
    //     }
    //     if(adbstorage){
    //         parameters.body.dataStorageSizeInTBs = adbstorage;
    //     }


    //     console.log(JSON.stringify(parameters));              
    //     if (dbtype == 'Autonomous Datawarehouse') {
    //                oci.database.autonomousDataWarehouse.update( auth.authorization, parameters, function(response){result = response; doneAsync = true;});
    //                require('deasync').loopWhile(function(){return !doneAsync;});
    //            } else if (dbtype == 'Autonomous Transaction Processing'){
    //                oci.database.autonomousDatabase.update( auth.authorization, parameters, function(response){result = response; doneAsync = true;});
    //                require('deasync').loopWhile(function(){return !doneAsync;});
    //            // }else if (dbtype == 'Database on VM'){
    //            //     oci.database.database.list(auth.authorization, {compartmentId: auth.compOCID }, function(response){result = response; doneAsync = true;});
    //            }else {
    //                console.log({text: 'Please select appropriate option'});
    //            }
        
    //    if (adbpasswd){
    //        res = result.dbName + ' : Admin Password Updated';
    //    }else if (adbocpus){
    //        res = result.dbName + ' : '+result.lifecycleState +' with OCPUs :' + result.cpuCoreCount;
    //    }else {
    //        res = result.dbName + ' : '+result.lifecycleState +' with Storage :' + result.dataStorageSizeInTBs;
    //    }
    //    res = result.dbName + ', ' +result.lifecycleState+'...';   

    // //    conversation.reply(`Database ${res}`);
    // //    conversation.keepTurn(true);
    // //    conversation.transition();
    // //    done();
   
    //    console.log(result)
   
    // },
};

