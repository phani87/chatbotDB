/*
    Version 1.1
    Module for tenant auth information

    Author: kris.bhanushali@oracle.com

    
*/

var fs = require('fs');
var os = require('os');
var path = require('path');


/* Begin ---- Tenant auth info */

var tenancyId=  "ocid1.tenancy.oc1..aaaaaaaaptwnys3mjo6k3ozgjz2blntvcx5gl42qxdyrjlutqbvnpmbiy7ma";
var authUserId= "ocid1.user.oc1..aaaaaaaacieat35rjky6afcoxwcmf3trgcuwhkxuxwj4qtpmzjq3kft6lrgq";
var keyFingerprint = "bc:0b:7c:85:0b:83:b9:33:ea:8a:f0:ee:be:b5:2d:12";
var compartmentId = "ocid1.compartment.oc1..aaaaaaaahnmqede4hg2sdom74lpljjwyu6nc6o2jr77rc5wagez3cwutu57a";
//var DBPMCompartment =  "ocid1.compartment.oc1..aaaaaaaay7gk2asvkdsvaldvdlasdvlddvplkz7s7qpeagfjuledsbb27hq";
var privateKeyPath = path.join(__dirname);

if(privateKeyPath.indexOf("~/") === 0) {
    privateKeyPath = privateKeyPath.replace("~", os.homedir())
}
var privateKey = fs.readFileSync(privateKeyPath+'/oci_api_key.pem', 'ascii');

/* End ---- Tenant auth info */

module.exports = {
tenancyId: tenancyId,
authUserId: authUserId,
keyFingerprint: keyFingerprint,
privateKey: privateKey,
compartmentId: compartmentId
//DBPMCompartment: DBPMCompartment

};


