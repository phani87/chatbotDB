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
var nodemailer = require('nodemailer');


var transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'traininghubteam1@gmail.com',
    pass: 'dodger123$'
  }
});


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
       // var result;
       // var res="";
       // var status="";
       // var id ="";
        var adbocids = conversation.properties().adbocids;
        var adbtype = conversation.properties().adbtype;
        var mailId = conversation.properties().mailId; 
        //var mailId = conversation.properties().mailId;
        var parameters = {
            autonomousDataWarehouseId : adbocids,
            body : {}
        };
        parameters.body.password = conversation.properties().adbpasswd;
        
        if (adbtype == 'Autonomous Datawarehouse') {
            oci.database.autonomousDataWarehouse.generateWallet( auth.authorization, parameters, function(response){    
                var buf = Buffer.from(response, 'utf8');
                conversation.reply('starting mail and wallet gen...');
                var mailOptions = {
                    from: '',
                    to: mailId,
                    subject: 'Wallet',
                    text: 'Please find your Wallet attached !',
                    attachments: [{'filename': 'File.zip', 'content': buf}]   
                  };
                  //require('deasync').loopWhile(function(){return !doneAsyncFile;});
                  transporter.sendMail(mailOptions, function(error){
                    if (error) {
                      // conversation.reply('error found:')
                      // conversation.reply(error);
                      console.error(error);
                      converasation.reply(error);
                      doneAsync = true;
                    } else {
                      doneAsync = true;
                      conversation.reply(`Mail Sent ${mailId}`); 
                    }
                  });

                //response.pipe(file); 
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
    }

    // invoke(){
    //     {
    //         logger.info('starting get wallet');
    //         var doneAsync = false;
    //         //var result;
    //         //var res="";
    //         //var status="";
    //         //var id ="";
    //         var adbocids = 'ocid1.autonomousdwdatabase.oc1.phx.abyhqljrzxfmmlkp43cssqe2etvgenmt534jjl4dtdimig75buh72jkawrxa';
    //         var adbtype = 'Autonomous Datawarehouse';
    //         var mailId = 'phani.turlapati@oracle.com';
    //         //var mailId = conversation.properties().mailId;
    //         var parameters = {
    //             autonomousDataWarehouseId : adbocids,
    //             body : {}
    //         };
    //         parameters.body.password = 'WElCome12_34#';
            
    //         if (adbtype == 'Autonomous Datawarehouse') {
    //             oci.database.autonomousDataWarehouse.generateWallet( auth.authorization, parameters, function(response){    
    //                 var buf = Buffer.from(response, 'utf8');
    //                 console.log('starting mail and wallet gen...');
    //                 var mailOptions = {
    //                     from: '',
    //                     to: mailId,
    //                     subject: 'Wallet',
    //                     text: 'Please find your Wallet attached !',
    //                     attachments: [{'filename': 'File.zip', 'content': buf}]   
    //                   };
    //                   //require('deasync').loopWhile(function(){return !doneAsyncFile;});
    //                   transporter.sendMail(mailOptions, function(error){
    //                     if (error) {
    //                       // conversation.reply('error found:')
    //                       // conversation.reply(error);
    //                       console.error(error);
    //                       console.log(error);
    //                       doneAsync = true;
    //                     } else {
    //                       doneAsync = true;
    //                       console.log(`Mail Sent ${mailId}`); 
    //                     }
    //                   });
    
    //                 //response.pipe(file); 
    //                 doneAsync = true;
    //             });
    //             require('deasync').loopWhile(function(){return !doneAsync;});
    //         } else if (adbtype == 'Autonomous Transaction Processing'){
    //             oci.database.autonomousDatabase.generateWallet( auth.authorization, parameters, function(response){
    //                 randomPrefixedTmpfile = uniqueFilename(wallet_path+'/Wallet/', 'Wallet') + '.zip';
    //                 var file = fs.createWriteStream(randomPrefixedTmpfile);
    //                 response.pipe(file); 
    //                 doneAsync = true;
    //             });
                
    //             require('deasync').loopWhile(function(){return !doneAsync;});
    //         // }else if (dbtype == 'Database on VM'){
    //         //     oci.database.database.list(auth.authorization, {compartmentId: auth.compOCID }, function(response){result = response; doneAsync = true;});
    //         }else {
    //             console.log({text: 'Please select appropriate option'});
    //         }
    //         //mail.send(mailId, randomPrefixedTmpfile);
    //         //var walletname =  path.basename(randomPrefixedTmpfile); 
    //     }
    // }
};

