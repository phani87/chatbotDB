"use strict";

var oci = require( './OCI-Rest-APIs-nodejs/oci' );
var auth = require('./auth');

module.exports = {

    metadata: () => ({
        "name": "killAdb",
        "properties": {
            "adbocids": { "type": "string", "required": true },
            "adbtype":{ "type": "string", "required": true }
        },
        "supportedActions": []
    }),

    invoke: (conversation, done) => {
         console.log('Calling List Status Method')
         var doneAsync = false;
         var result;
         var res="";
         var status="";
         var id ="";
         var adbocids = conversation.properties().adbocids;

        var parameters = {
            autonomousDataWarehouseId : adbocids
        }

         var dbtype = conversation.properties().adbtype;
         if (dbtype == 'Autonomous Datawarehouse') {
                    oci.database.autonomousDataWarehouse.drop( auth.authorization, parameters, function(response){result = response; doneAsync = true;});
                    require('deasync').loopWhile(function(){return !doneAsync;});
                    doneAsync = false;
                    if('opc-request-id' in result ){
                        oci.database.autonomousDataWarehouse.get(auth.authorization, parameters, function(response){result = response; doneAsync = true;})
                        require('deasync').loopWhile(function(){return !doneAsync;});
                    }else {
                        result = 'Try again';
                    }
                } else if (dbtype == 'Autonomous Transaction Processing'){
                    oci.database.autonomousDatabase.drop( auth.authorization, parameters, function(response){result = response; doneAsync = true;});
                    require('deasync').loopWhile(function(){return !doneAsync;});
                    doneAsync = false;
                    if('opc-request-id' in result ){
                        oci.database.autonomousDataWarehouse.get(auth.authorization, parameters, function(response){result = response; doneAsync = true;})
                        require('deasync').loopWhile(function(){return !doneAsync;});
                    }else {
                        result = 'Try again';
                    }
                // }else if (dbtype == 'Database on VM'){
                //     oci.database.database.list(auth.authorization, {compartmentId: auth.compOCID }, function(response){result = response; doneAsync = true;});
                }else {
                    conversation.reply({text: 'Please select appropriate option'});
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
    //     var dbtype = 'Autonomous Datawarehouse';
    //     var parameters = {
    //        compartmentId: auth.compOCID,
    //        autonomousDataWarehouseId : 'ocid1.autonomousdwdatabase.oc1.iad.abuwcljrvps3faal3xmc6kunyv2vbplyard6sawdaznon3swqem2dduhmeva'
    //     }

    //     //var dbtype = conversation.properties().dbtype;
    //     if (dbtype == 'Autonomous Datawarehouse') {
    //                oci.database.autonomousDataWarehouse.drop( auth.authorization, parameters, function(response){result = response; doneAsync = true;});
    //                require('deasync').loopWhile(function(){return !doneAsync;});
    //                 doneAsync = false;
    //                 if('opc-request-id' in result ){
    //                     oci.database.autonomousDataWarehouse.get(auth.authorization, parameters, function(response){result = response; doneAsync = true;})
    //                     require('deasync').loopWhile(function(){return !doneAsync;});
    //                 }else {
    //                     result = 'Try again';
    //                 }
    //            } else if (dbtype == 'Autonomous Transaction Processing'){
    //                oci.database.autonomousDatabase.drop( auth.authorization, parameters, function(response){result = response; doneAsync = true;});
    //                require('deasync').loopWhile(function(){return !doneAsync;});
    //            // }else if (dbtype == 'Database on VM'){
    //            //     oci.database.database.list(auth.authorization, {compartmentId: auth.compOCID }, function(response){result = response; doneAsync = true;});
    //            }else {
    //             //    conversation.reply({text: 'Please select appropriate option'});
    //            }
        
    // //    for(var j =0; j< result.length; j++){
    // //        res = res + ( res == "" ? '' : ',' ) + result[j].displayName +'| Subnet ID -'+ result[j].id;   
    // //    }
    //    console.log(result)
   
    // },
};

