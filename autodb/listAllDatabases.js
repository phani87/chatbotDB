"use strict";

var status = require('./listAutonomousDatabases');



module.exports = {

    metadata: () => ({
        "name": "listAllDatabases",
        "properties": {
            "dbtype": { "type": "string", "required": true },
        },
        "supportedActions": []
    }),

    invoke:(conversation, done) => {
        var doneAsync = false;
        var result;
        var res=null;
        var dbtype = conversation.properties().dbtype;
        console.log('Calling List Status Method')
        console.log('ADB TYep>>>>>>>' , dbtype);
        status.listStatus(dbtype, function (response){ 
            result = [];
            //conversation.reply(`List of databases : ${JSON.stringify(response.)}`);
           // console.log('<<Im here>>'+JSON.stringify(response));
           for(var i=0; i<response.length; i++){
            result.push(response[i].dbName); 
            doneAsync = true;   
            }
        });
        require('deasync').loopWhile(function(){return !doneAsync;});

        conversation.reply({text: result});
        console.log('RESULT>>>>>>>>>',JSON.stringify(result));
        
        //conversation.reply(`List of databases : ${JSON.stringify(result)}`);
        conversation.transition();

        done();
    },
    
};