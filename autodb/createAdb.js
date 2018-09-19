"use strict";

var cadw = require('./createAutonomousDatawarehouse');
var catp = require('./createAutonomousDatabase');
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
        //await cadw.createADW(adbname, adbpasswd, adbocpus, adbstorage, function (response){res = response;});
        if(adbtype == db){
            await cadw.createADW(adbdisplayname, adbname, adbpasswd, adbocpus, adbstorage, function (response){res = response;});
        }else {
            await catp.createATP(adbdisplayname, adbname, adbpasswd, adbocpus, adbstorage, function (response){res = response;});
        }
        console.log('RESULT>>>>>>>>>',res);
        conversation.reply(`done creating db : ${res.dbName}`);
        conversation.transition();

        done();
    },
    
};
