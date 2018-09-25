"use strict";

var oci = require( './oci' );
var auth = require('./auth');

module.exports = {

    metadata: () => ({
        "name": "listAllDatabases",
        "properties": {
            "dbchkstatus": { "type": "string", "required": true }
        },
        "supportedActions": []
    }),

    invoke: (conversation, done) => {
         console.log('Calling List Status Method')
         var doneAsync = false;
         var result;
         var res="";
         var dbtype = conversation.properties().dbtype;
         if (dbtype == 'Autonomous Datawarehouse') {
                    oci.database.autonomousDataWarehouse.get( auth.authorization, {compartmentId: auth.compOCID }, function(response){result = response; doneAsync = true;});
                    require('deasync').loopWhile(function(){return !doneAsync;});
                } else if (dbtype == 'Autonomous Transaction Processing'){
                    oci.database.autonomousDatabase.get( auth.authorization, {compartmentId: auth.compOCID }, function(response){result = response; doneAsync = true;});
                    require('deasync').loopWhile(function(){return !doneAsync;});
                }else if (dbtype == 'Database on VM'){
                    oci.database.database.get(auth.authorization, {compartmentId: auth.compOCID }, function(response){result = response; doneAsync = true;});
                }else {
                    conversation.reply({text: 'Please select appropriate option'});
                }
        for(var j =0; j< result.length; j++){
            if(j == 0){
                res = res.concat(JSON.stringify(result[j].dbName));
            }
            res = res.concat(','+JSON.stringify(result[j].dbName));
        }
        conversation.variable("dblist", res);
        conversation.transition();
        done();
    },
};

