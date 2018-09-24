"use strict";

var oci = require( './oci' );
var auth = require('./auth');

//oci.database.autonomousDataWarehouse.list( auth.authorization, auth.compOCID, function(data){console.log(data);} );

module.exports = {

    metadata: () => ({
        "name": "listAllDatabases",
        "properties": {
            "dbtype": { "type": "string", "required": true },
        },
        "supportedActions": []
    }),

    invoke: (conversation, done) => {
         console.log('Calling List Status Method')
         var doneAsync = false;
         var result;
         var dbtype = conversation.properties().dbtype;
         if (dbtype == 'Autonomous Datawarehouse') {
                    oci.database.autonomousDataWarehouse.list( auth.authorization, {compartmentId: auth.compOCID }, function(response){result = response; doneAsync = true;});
                    require('deasync').loopWhile(function(){return !doneAsync;});
                } else if (dbtype == 'Autonomous Transaction Processing'){
                    oci.database.autonomousDatabase.list( auth.authorization, {compartmentId: auth.compOCID }, function(response){result = response; doneAsync = true;});
                    require('deasync').loopWhile(function(){return !doneAsync;});
                }else {
                    conversation.reply({text: 'Please select appropriate option'});
                }
        for(var j =0; j< result.length; j++){
            conversation.reply({text: (j+1)+'. DBName:'+result[j].dbName + '| Status:'+ result[j].lifecycleState});
        }
        
        conversation.transition();
        done();
    },

//     invoke: (dbtype) => {
//         console.log('Calling List Status Method')
//         var doneAsync = false;
//         var result;
//         //var dbtype = conversation.properties().dbtype;
//         if (dbtype == 'Autonomous Datawarehouse') {
//                    oci.database.autonomousDataWarehouse.list( auth.authorization, {compartmentId: auth.compOCID }, function(response){result = response; doneAsync = true;});
//                    require('deasync').loopWhile(function(){return !doneAsync;});
//                } else if (dbtype == 'Autonomous Transaction Processing'){
//                    oci.database.autonomousDatabase.list( auth.authorization, {compartmentId: auth.compOCID }, function(response){result = response; doneAsync = true;});
//                    require('deasync').loopWhile(function(){return !doneAsync;});
//                }else {
//                 console.log({text: 'Please select appropriate option'});
//                }
//        for(var j =0; j< result.length; j++){
//            console.log((j+1)+'. DBName:'+result[j].dbName + '| Status:'+ result[j].lifecycleState);
//        }
//    },


    
};

