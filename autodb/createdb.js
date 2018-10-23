"use strict";

var oci = require( './oci' );
var auth = require('./auth');
var os = require('os');
var path = require('path');


module.exports = {

    metadata: () => ({
        "name": "createDb",
        "properties": {
            "selectedabltydomains": { "type": "string", "required": true },
            "seleteddbedition": { "type": "string", "required": true },
            "dbpasswd": { "type": "string", "required": true },
            "dbname": { "type": "string", "required": true },
            "dbbackup": { "type": "string", "required": true },
            "selecteddbversion": { "type": "string", "required": true },
            "dbdisplayname": { "type": "string", "required": true },
            "dbhostname": { "type": "string", "required": true },
            "selecteddbshape": { "type": "string", "required": true },
            "selectedsubnets": { "type": "string", "required": true },
            "dbssh":{"type": "string", "required": true },
            "dbInitialStorage":{"type": "string", "required": true }
        },
        "supportedActions": []
    }),

    invoke: (conversation, done) => {
        
        var doneAsync = false;
        var res = '';
        var result;
        
        var selectedabltydomains = conversation.properties().selectedabltydomains;
        var seleteddbedition = conversation.properties().seleteddbedition;
        var dbpasswd = conversation.properties().dbpasswd;
        var dbname = conversation.properties().dbname;
        var dbbackup = conversation.properties().dbbackup;
        var selecteddbversion = conversation.properties().selecteddbversion;
        var dbdisplayname = conversation.properties().dbdisplayname;
        var dbhostname = conversation.properties().dbhostname;
        var selecteddbshape = conversation.properties().selecteddbshape;
        var selectedsubnets = conversation.properties().selectedsubnets;
        //var dbssh = conversation.properties().dbssh;
        var dbInitialStorage = conversation.properties().dbInitialStorage;
       

        var publicKeyPath =  path.join(__dirname);
        var publicKeyPath =  path.join(__dirname);
        if(publicKeyPath.indexOf("~/") === 0) {
            publicKeyPath = publicKeyPath.replace("~", os.homedir())
        }

        var ssh = fs.readFileSync(publicKeyPath + "/id_rsa.pub", "utf-8");
        var subnet = selectedsubnets.split('-')[4];
        var autoBackUp = ( dbbackup == "Yes" ? true : false ) ;   
        var dbBody = {
            availabilityDomain : selectedabltydomains,
            compartmentId : auth.compOCID,
            cpuCoreCount : 1,
            databaseEdition : seleteddbedition,
            dbHome : {
              database : {
                adminPassword : dbpasswd,
                dbName : dbname,
                dbBackupConfig : {
                 autoBackupEnabled : autoBackUp
                }
              },
              dbVersion : selecteddbversion,
              displayName : null
            },
            //diskRedundancy : null,
            displayName : dbdisplayname,
            //domain : '',
            hostname : dbhostname,
            shape : selecteddbshape,
            source : "NONE",
            nodeCount : 1,
            initialDataStorageSizeInGB : dbInitialStorage,
            sshPublicKeys : [ ssh ],
            subnetId : subnet 
        }

        var parameters = {
            body : dbBody
        } 

        oci.database.dbSystem.launch( auth.authorization, parameters , function(response){result = response; doneAsync = true;});
                    require('deasync').loopWhile(function(){return !doneAsync;});
        //res = result[0].displayName;
        console.log(JSON.stringify(result));
        res = JSON.stringify(result);
        conversation.reply(`done creating db : ${res}`);
        conversation.transition();

        done();
    },

    // invoke: () => {
    //     var doneAsync = false;
    //     var res = '';
    //     var result;

    //     var selectedabltydomains = 'rHzG:US-ASHBURN-AD-1';
    //     var seleteddbedition = 'ENTERPRISE_EDITION';
    //     var dbpasswd = 'WElCome12_34#';
    //     var dbname = 'ORCL';
    //     var dbbackup = 'No';
    //     var selecteddbversion = '12.2.0.1';
    //     var dbdisplayname = 'phani1';
    //     var dbhostname = 'alpha';
    //     var selecteddbshape = 'VM.Standard1.1';

    //     var selectedsubnets = 'Public Subnet rHzG:US-ASHBURN-AD-1| Subnet ID -ocid1.subnet.oc1.iad.aaaaaaaauspgeusd5cipnliqkaoh7bjpmht6arusy4hwi44rkdqs6gdznk5a'
       
    //     var subnet = selectedsubnets.split('-')[4];
    //     var autoBackUp = ( dbbackup == "Yes" ? true : false ) ;   
    //     var publicKeyPath =  path.join(__dirname);
    //     if(publicKeyPath.indexOf("~/") === 0) {
    //         publicKeyPath = publicKeyPath.replace("~", os.homedir())
    //     }

    //     var ssh = fs.readFileSync(publicKeyPath + "/id_rsa.pub", "utf-8");
    //     console.log(ssh);
    //     var dbBody = {
    //         availabilityDomain : selectedabltydomains,
    //         compartmentId : auth.compOCID,
    //         cpuCoreCount : 1,
    //         databaseEdition : seleteddbedition,
    //         dbHome : {
    //           database : {
    //             adminPassword : dbpasswd,
    //             dbName : dbname,
    //             dbBackupConfig : {
    //              autoBackupEnabled : autoBackUp
    //             }
    //           },
    //           dbVersion : selecteddbversion,
    //           displayName : null
    //         },
    //         //diskRedundancy : null,
    //         displayName : dbdisplayname,
    //         //domain : '',
    //         hostname : dbhostname,
    //         shape : selecteddbshape,
    //         source : "NONE",
    //         nodeCount : 1,
    //         initialDataStorageSizeInGB : 256,
    //         sshPublicKeys : [ ssh ],
    //         subnetId : subnet
       
    //     }

    //     var parameters = {
    //         body : dbBody
    //     } 

    //     oci.database.dbSystem.launch( auth.authorization, parameters , function(response){result = response; doneAsync = true;});
    //                 require('deasync').loopWhile(function(){return !doneAsync;});

    //                 console.log(result);

    // },
    
};
