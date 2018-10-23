"use strict";

var oci = require( './oci' );
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
        "name": "listDbShapes",
        "properties": {
            "selectedabltydomains": { "type": "string", "required": true }
        },
        "supportedActions": []
    }),

    invoke: (conversation, done) => {
        var doneAsync = false;
        var selectedabltydomains = conversation.properties().selectedabltydomains;
        var res="";
        var result;

        var parameters = {
            availabilityDomain: selectedabltydomains, 
            compartmentId: auth.compOCID 
        }
        
        oci.database.dbSystemShapeSummary.list( auth.authorization, parameters, function(response){result = response; doneAsync = true;});
                   require('deasync').loopWhile(function(){return !doneAsync;}); 
                   
        
        for(var j =0; j< result.length; j++){
            res = res + ( res == "" ? '' : ',' ) + result[j].shape;   
        }

        conversation.variable("dbshape", res);
        conversation.transition('showDbShapes');
        done();
    },

//     invoke: (abltydomains) => {
       
//         var doneAsync = false;
//         //var abltydomains = conversation.properties().abltydomains;
//         var res="";
//         var result;
//         console.log(abltydomains);
//         var parameters = {
//             availabilityDomain: abltydomains, 
//             compartmentId: auth.compOCID 
//         }
        
//         oci.database.dbSystemShapeSummary.list( auth.authorization, parameters, function(response){result = response; doneAsync = true;});
//                    require('deasync').loopWhile(function(){return !doneAsync;}); 
                   
//         console.log(result);
//         for(var j =0; j< result.length; j++){
//             res = res + ( res == "" ? '' : ',' ) + JSON.stringify(result[j].shape);   
//         }
//         console.log(res);
//     //    conversation.variable("abltydomains", res);
//     //    conversation.transition();
//     //    done();
//    },
 };

