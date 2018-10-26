"use strict";

var oci = require( './OCI-Rest-APIs-nodejs/oci' );
var auth = require('./auth');

module.exports = {

    metadata: () => ({
        "name": "getAdbWallet",
        "properties": {
            "adbocids": { "type": "string", "required": true },
            "adbpasswd":{ "type": "string", "required": true }
        },
        "supportedActions": []
    }),

    invoke: (conversation, done) => {
        var doneAsync = false;
        var result;
        var res="";
        var status="";
        var id ="";
        var adbocids = conversation.properties().adbocids;
        var dbtype = conversation.properties().adbtype;
        var parameters = {
            autonomousDataWarehouseId : adbocids,
            body : {}
        };

        parameters.body.password = conversation.properties().adbpasswd;
        if (adbtype == 'Autonomous Datawarehouse') {
            oci.database.autonomousDataWarehouse.getWallet( auth.authorization, parameters, function(response){result = response; doneAsync = true;});
            require('deasync').loopWhile(function(){return !doneAsync;});
        } else if (adbtype == 'Autonomous Transaction Processing'){
            oci.database.autonomousDatabase.getWallet( auth.authorization, parameters, function(response){result = response; doneAsync = true;});
            require('deasync').loopWhile(function(){return !doneAsync;});
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

    invoke: () => {

        var doneAsync = false;
        var result;
        var res="";
        var status="";
        var id ="";
        var adbocids = 'ocid1.autonomousdwdatabase.oc1.phx.abyhqljtci3mvji5yd4vcfnebdtlk32exv6z5osboler5ijejxjl4nqg7sza';
        var dbtype = 'Autonomous Datawarehouse';
        var parameters = {
            autonomousDataWarehouseId : adbocids,
            body : {}
        }

        parameters.body.password = 'WElCome12_34#';

         
         if (dbtype == 'Autonomous Datawarehouse') {
            oci.database.autonomousDataWarehouse.getWallet( auth.authorization, parameters, function(response){result = response; doneAsync = true;});
            require('deasync').loopWhile(function(){return !doneAsync;});
        } else if (dbtype == 'Autonomous Transaction Processing'){
            oci.database.autonomousDatabase.drop( auth.authorization, parameters, function(response){result = response; doneAsync = true;});
            require('deasync').loopWhile(function(){return !doneAsync;});
        }else {
            console.log({text: 'Please select appropriate option'});
        }
         
       console.log(result)
   
    },
};

