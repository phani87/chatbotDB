"use strict";

//var cadb = require('./createAutonomousDatawarehouse');
var cadb = require('./createAutonomousDatabase');
var res = '';

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

    invoke: async (conversation, done) => {
     
        var adbtype = conversation.properties().adbtype;
        var adbdisplayname = conversation.properties().adbdisplayname; 
        var adbname = conversation.properties().adbname;
        var adbocpus = conversation.properties().adbocpus;
        var adbstorage = conversation.properties().adbstorage;
        var adbusername = conversation.properties().adbusername;
        var adbpasswd = conversation.properties().adbpasswd;
        var db = 'Autonomous Datawarehouse';
        console.log('ADB TYep>>>>>>>' , adbtype);
        //cadb.createADW(adbname, adbpasswd, adbocpus, adbstorage, function (response){res = response;});

        cadb.createADB(adbtype,adbname, adbpasswd, adbocpus, adbstorage, function (response){ 
            result = [];
            //conversation.reply(`List of databases : ${JSON.stringify(response.)}`);
           // console.log('<<Im here>>'+JSON.stringify(response));
           for(var i=0; i<response.length; i++){
            result.push(response[i].dbName); 
            doneAsync = true;   
            }
        });
        require('deasync').loopWhile(function(){return !doneAsync;});

        // if(adbtype == db){
        //     await cadw.createADW(adbdisplayname, adbname, adbpasswd, adbocpus, adbstorage, function (response){res = response;});
        // }else {
        //     await catp.createATP(adbdisplayname, adbname, adbpasswd, adbocpus, adbstorage, function (response){res = response;});
        // }
        console.log('RESULT>>>>>>>>>',res);
        conversation.reply(`done creating db : ${res.dbName}`);
        conversation.transition();

        done();
    },
    
};
