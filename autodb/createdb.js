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
        // Parse a number out of the incoming message
        // conversation.reply({text: conversation.properties().dbtype})
        // var age = 0;
        // if (text){
        //   const matches = text.match(/\d+/);
        //   if (matches) {
        //       age = matches[0];
        //   }
        // } else {
        //   var errText = "No age input provided";
        //   conversation.logger().error(errText);
        //   done(new Error(errText));
        //   return;
        // }

        // conversation.logger().info('AgeChecker: using age=' + age);

        // // Set action based on age check
        // let minAge = conversation.properties().minAge || 18;
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
