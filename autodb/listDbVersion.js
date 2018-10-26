"use strict";

var oci = require( './OCI-Rest-APIs-nodejs/oci' );
var auth = require('./auth');

module.exports = {

    // metadata: () => ({
    //     "name": "listDbShapes",
    //     "properties": {
    //         "abltydomains": { "type": "string", "required": true },
    //     },
    //     "supportedActions": []
    // }),

    metadata: () => ({
        "name": "listDbVersion",
        "properties": {
            "selecteddbshape": { "type": "string", "required": true }
        },
        "supportedActions": []
    }),

    invoke: (conversation, done) => {
        var doneAsync = false;
        var res="";
        var selecteddbshape = conversation.properties().selecteddbshape;
        var result;

        var parameters = {
            compartmentId: auth.compOCID,
            dbSystemShape: selecteddbshape
        }
        
        oci.database.dbVersionSummary.list( auth.authorization, parameters, function(response){result = response; doneAsync = true;});
                   require('deasync').loopWhile(function(){return !doneAsync;}); 
                   
        
        for(var j =0; j< result.length; j++){
            res = res + ( res == "" ? '' : ',' ) + result[j].version;   
        }

        conversation.variable("dbversion", res);
        conversation.transition('showDbVersions');
        done();
    },

    // invoke: (dbshape) => {
    //     var doneAsync = false;
    //     var res="";
    //     var selecteddbshape = dbshape;
    //     var result;

    //     var parameters = {
    //         compartmentId: auth.compOCID,
    //         dbSystemShape: selecteddbshape
    //     }
        
    //     oci.database.dbVersionSummary.list( auth.authorization, parameters, function(response){result = response; doneAsync = true;});
    //                require('deasync').loopWhile(function(){return !doneAsync;}); 
                   
    //     console.log(result);
    //     for(var j =0; j< result.length; j++){
    //         res = res + ( res == "" ? '' : ',' ) + result[j].version;   
    //     }

    //     console.log(res);
    //     // conversation.variable("dbversion", res);
    //     // conversation.transition('showDbVersions');
    //     // done();
    //  },
 };

