"use strict";

var cadw = require('./createAutonomousDatawarehouse');
var res = '';

module.exports = {

    metadata: () => ({
        "name": "startdbprovision",
        "properties": {
            "dbtype": { "type": "string", "required": true },
            "dbname": { "type": "string", "required": true },
            "dbshape":{ "type": "string", "required": true },
            "dbstorage":{ "type": "string", "required": true },
            "dbusername":{ "type": "string", "required": true },
            "dbpasswd" :{ "type": "string", "required": true }
        },
        "supportedActions": []
    }),

    invoke: async (conversation, done) => {
        
        var dbname = conversation.properties().dbname;
        var dbocpus = conversation.properties().dbocpus;
        var dbstorage = conversation.properties().dbstorage;
        //var dbusername = conversation.properties().dbusername;
        var dbpasswd = conversation.properties().dbpasswd;

        //await cadw.createADW(dbname, dbpasswd, dbocpus, dbstorage, function (response){res = response;});

        console.log(res);
        conversation.reply(`done creating db : ${res}`);
        conversation.transition();

        done();
    },
    
};
