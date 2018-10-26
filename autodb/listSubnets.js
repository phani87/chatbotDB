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
        "name": "listSubnets",
        "properties": {
        },
        "supportedActions": []
    }),

    invoke: (conversation, done) => {
        var doneAsync = false;
        var res="";
        var result;
        var result1;

        var parameters = {
            compartmentId: auth.compOCID
        }
        
        oci.core.vcn.list( auth.authorization, parameters, function(response){result1 = response; doneAsync = true;});
        require('deasync').loopWhile(function(){return !doneAsync;});

        parameters.vcnId = result1[0].id; 
        doneAsync = false;

        oci.core.subnet.list( auth.authorization, parameters, function(response){result = response; doneAsync = true;});
                   require('deasync').loopWhile(function(){return !doneAsync;}); 
                   
        
        for(var j =0; j< result.length; j++){
            res = res + ( res == "" ? '' : ',' ) + result[j].displayName +'| Subnet ID -'+ result[j].id;   
        }

        conversation.variable("subnets", res);
        conversation.transition('showSubnets');
        done();
    },

    // invoke: () => {
    //     var doneAsync = false;
    //     var res="";
    //     var result;
    //     var result1;

    //     var parameters = {
    //         compartmentId: auth.compOCID
    //     }
        
    //     oci.core.vcn.list( auth.authorization, parameters, function(response){result1 = response; doneAsync = true;});
    //     require('deasync').loopWhile(function(){return !doneAsync;});

    //     parameters.vcnId = result1[0].id; 
    //     doneAsync = false;

    //     oci.core.subnet.list( auth.authorization, parameters, function(response){result = response; doneAsync = true;});
    //                require('deasync').loopWhile(function(){return !doneAsync;}); 
                   
        
    //     for(var j =0; j< result.length; j++){
    //         res = res + ( res == "" ? '' : ',' ) + result[j].displayName +'| Subnet ID -'+ result[j].id;   
    //     }
    //     console.log(res);
    //  },
 };

