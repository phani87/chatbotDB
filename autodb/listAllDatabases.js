"use strict";

var oci = require( './oci' );
var auth = require('./auth');

module.exports = {

    metadata: () => ({
        "name": "listAllDatabases",
        "properties": {
            "dbtype": { "type": "string", "required": true },
            "dblist": { "type": "string", "required": false }
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
         var dbtype = conversation.properties().dbtype;
         if (dbtype == 'Autonomous Datawarehouse') {
                    oci.database.autonomousDataWarehouse.list( auth.authorization, {compartmentId: auth.compOCID }, function(response){result = response; doneAsync = true;});
                    require('deasync').loopWhile(function(){return !doneAsync;});
                } else if (dbtype == 'Autonomous Transaction Processing'){
                    oci.database.autonomousDatabase.list( auth.authorization, {compartmentId: auth.compOCID }, function(response){result = response; doneAsync = true;});
                    require('deasync').loopWhile(function(){return !doneAsync;});
                }else if (dbtype == 'Database on VM'){
                    oci.database.database.list(auth.authorization, {compartmentId: auth.compOCID }, function(response){result = response; doneAsync = true;});
                }else {
                    conversation.reply({text: 'Please select appropriate option'});
                }
        for(var j =0; j< result.length; j++){
            if(j == 0){
                res = res.concat(JSON.stringify(result[j].dbName)+'-'+JSON.stringify(result[j].lifecycleState));
                // status = status.concat(JSON.stringify(result[j].lifecycleState));
                // id = id.concat(JSON.stringify(result[j].id));
            }else{
                res = res.concat(','+JSON.stringify(result[j].dbName)+'-'+JSON.stringify(result[j].lifecycleState));
                // status = status.concat(','+JSON.stringify(result[j].lifecycleState));
                // id = id.concat(','+JSON.stringify(result[j].id));
            }
            
        }
        conversation.variable("dblist", res);
        conversation.keepTurn(true);
        conversation.transition();
        done();
    },

//     invoke: (dbtype) => {
//         console.log('Calling List Status Method')
//         var doneAsync = false;
//         var result;
//         var res="";
//         var status="";
//         var id ="";
//         //var dbtype = conversation.properties().dbtype;
//         if (dbtype == 'Autonomous Datawarehouse') {
//                    oci.database.autonomousDataWarehouse.list( auth.authorization, {compartmentId: auth.compOCID }, function(response){result = response; doneAsync = true;});
//                    require('deasync').loopWhile(function(){return !doneAsync;});
//                } else if (dbtype == 'Autonomous Transaction Processing'){
//                    oci.database.autonomousDatabase.list( auth.authorization, {compartmentId: auth.compOCID }, function(response){result = response; doneAsync = true;});
//                    require('deasync').loopWhile(function(){return !doneAsync;});
//                }else if (dbtype == 'Database on VM'){
//                    oci.database.database.list(auth.authorization, {compartmentId: auth.compOCID }, function(response){result = response; doneAsync = true;});
//                }else {
//                    console.log({text: 'Please select appropriate option'});
//                }
//        //console.log(JSON.stringify(result));
//        for(var j =0; j< result.length; j++){
//            if(j == 0){
//                res = res.concat(JSON.stringify(result[j].dbName));
//                status = status.concat(JSON.stringify(result[j].lifecycleState));
//                id = id.concat(JSON.stringify(result[j].id));
//            }
//            res = res.concat(','+JSON.stringify(result[j].dbName));
//            status = status.concat(','+JSON.stringify(result[j].lifecycleState));
//            id = id.concat(','+JSON.stringify(result[j].id));
//        }
//        console.log(res);
//        console.log(status);
//        console.log(id);
//     //    conversation.variable("dblist", res);
//     //    conversation.transition();
//     //    done();
//    },
};

