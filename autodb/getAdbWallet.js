"use strict";

var oci = require( './OCI-Rest-APIs-nodejs/oci' );
var auth = require('./auth');
var path = require('path');
var uniqueFilename = require('unique-filename');
var mail = require('./sendEmail');
var fs = require('fs');
var wallet_path = path.join(__dirname);
var randomPrefixedTmpfile;
var logger = require('./log');

module.exports = {

    metadata: () => ({
        "name": "getAdbWallet",
        "properties": {
            "adbocids": { "type": "string", "required": true },
            "adbpasswd":{ "type": "string", "required": true },
            "adbtype": { "type": "string", "required": true },
            "mailId" : {"type": "string", "required": true}
        },
        "supportedActions": []
    }),

    invoke: (conversation, done) => {
        logger.info('starting get wallet');
        var doneAsync = false;
        var result;
        var res="";
        var status="";
        var id ="";
        var adbocids = conversation.properties().adbocids;
        var adbtype = conversation.properties().adbtype;
        //var mailId = conversation.properties().mailId;
        var parameters = {
            autonomousDataWarehouseId : adbocids,
            body : {}
        };
        parameters.body.password = conversation.properties().adbpasswd;
        
        if (adbtype == 'Autonomous Datawarehouse') {
            oci.database.autonomousDataWarehouse.generateWallet( auth.authorization, parameters, function(response){    
                randomPrefixedTmpfile = uniqueFilename(wallet_path+'/Wallet/', 'Wallet') + '.zip';
                var file = fs.createWriteStream(randomPrefixedTmpfile);
                response.pipe(file); 
                doneAsync = true;
            });
            require('deasync').loopWhile(function(){return !doneAsync;});
            
        } else if (adbtype == 'Autonomous Transaction Processing'){
            oci.database.autonomousDatabase.generateWallet( auth.authorization, parameters, function(response){
                randomPrefixedTmpfile = uniqueFilename(wallet_path+'/Wallet/', 'Wallet') + '.zip';
                var file = fs.createWriteStream(randomPrefixedTmpfile);
                response.pipe(file); 
                doneAsync = true;
            });
            require('deasync').loopWhile(function(){return !doneAsync;});
        // }else if (dbtype == 'Database on VM'){
        //     oci.database.database.list(auth.authorization, {compartmentId: auth.compOCID }, function(response){result = response; doneAsync = true;});
        }else {
            conversation.reply({text: 'Please select appropriate option'});
        }
        //mail.send(mailId, randomPrefixedTmpfile);
        var walletname =  path.basename(randomPrefixedTmpfile);
        conversation.variable("walletname" , walletname);        
        conversation.transition('checkMailAction');
        done();
    },

    // invoke(){
    //     logger.info('starting');
    //     var doneAsync = false;
    //     var result;
    //     var res="";
    //     var status="";
    //     var id ="";
    //     var adbocids = 'ocid1.autonomousdwdatabase.oc1.phx.abyhqljtasugjqg3kfqicmdjsbo27yj75ravyjuknubqxutwn2chedpxv7iq';
    //     var adbtype = 'Autonomous Datawarehouse';
    //     var mailId = 'phani.turlapati@oracle.com';
    //     var parameters = {
    //         autonomousDataWarehouseId : adbocids,
    //         body : {}
    //     };
    //     parameters.body.password = 'WElCome12_34#';
    //     console.log('Getting Wallet...');
    //     if (adbtype == 'Autonomous Datawarehouse') {
    //         oci.database.autonomousDataWarehouse.generateWallet( auth.authorization, parameters, function(response){    
    //             randomPrefixedTmpfile = uniqueFilename(wallet_path+'/Wallet/', 'Wallet') + '.zip';
    //             var file = fs.createWriteStream(randomPrefixedTmpfile);
    //             response.pipe(file); 
    //             doneAsync = true;
    //         });
    //         require('deasync').loopWhile(function(){return !doneAsync;});
            
    //     } else if (adbtype == 'Autonomous Transaction Processing'){
    //         oci.database.autonomousDatabase.generateWallet( auth.authorization, parameters, function(response){
    //             randomPrefixedTmpfile = uniqueFilename(wallet_path+'/Wallet/', 'Wallet') + '.zip';
    //             var file = fs.createWriteStream(randomPrefixedTmpfile);
    //             response.pipe(file); 
    //             doneAsync = true;
    //         });
    //         require('deasync').loopWhile(function(){return !doneAsync;});
    //     // }else if (dbtype == 'Database on VM'){
    //     //     oci.database.database.list(auth.authorization, {compartmentId: auth.compOCID }, function(response){result = response; doneAsync = true;});
    //     }else {
    //         console.log({text: 'Please select appropriate option'});
    //     }
    //     mail.send(mailId, randomPrefixedTmpfile);      
    //     // conversation.keepTurn(true);
    //     // conversation.transition();
    //     // done();

    //     logger.info('ending');
    
    // },
};

