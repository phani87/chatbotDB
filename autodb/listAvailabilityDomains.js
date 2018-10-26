"use strict";

var oci = require( './OCI-Rest-APIs-nodejs/oci' );
var auth = require('./auth');

module.exports = {

    metadata: () => ({
        "name": "listAvailabilityDomains",
        "properties": {
        },
        "supportedActions": []
    }),

    invoke: (conversation, done) => {
        var doneAsync = false;
        
        var res="";
        var result;
        
        oci.iam.availabilityDomain.list( auth.authorization, {compartmentId: auth.compOCID }, function(response){result = response; doneAsync = true;});
                   require('deasync').loopWhile(function(){return !doneAsync;}); 
                   
        
        for(var j =0; j< result.length; j++){
            res = res + ( res == "" ? '' : ',' ) + result[j].name;   
        }

        conversation.variable("abltydomainslist", res);
        conversation.transition('showAvailablityDomains');
        done();
    },

//     invoke: () => {

//         var doneAsync = false;
        
//         var res="";
//         var result;
        
//         oci.iam.availabilityDomain.list( auth.authorization, {compartmentId: auth.compOCID }, function(response){result = response; doneAsync = true;});
//                    require('deasync').loopWhile(function(){return !doneAsync;}); 
                   
        
//         for(var j =0; j< result.length; j++){
//             res = res + ( res == "" ? '' : ',' ) + result[j].name;   
//         }

//         console.log('res>>', res);
//         // conversation.variable("abltydomainslist", res);
//         // conversation.transition('showAvailablityDomains');
//         // done();
//    },
};

