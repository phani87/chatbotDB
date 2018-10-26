/*
    Version 1.1
    Module for tenant auth information

    Author: kris.bhanushali@oracle.com

    
*/

var fs = require('fs');
var os = require('os');
var path = require('path');


/* Begin ---- Tenant auth info */

// var tenancyId=  "ocid1.tenancy.oc1..aaaaaaaarqie5glixw7jos76ufzdeytaiqyjkrdcmrwfdf3zrgzvtzmog6hq";
// var authUserId= "ocid1.user.oc1..aaaaaaaakwubpukvyc7zzbleoxx6gmi6b3hxdnbhda77at62jo4xaagbqiua";
// var keyFingerprint = "bc:0b:7c:85:0b:83:b9:33:ea:8a:f0:ee:be:b5:2d:12";
// var compartmentId = "ocid1.tenancy.oc1..aaaaaaaarqie5glixw7jos76ufzdeytaiqyjkrdcmrwfdf3zrgzvtzmog6hq";
// //var DBPMCompartment =  "ocid1.compartment.oc1..aaaaaaaay7gk2asvkdsvaldvdlasdvlddvplkz7s7qpeagfjuledsbb27hq";
// var privateKeyPath = path.join(__dirname);

// if(privateKeyPath.indexOf("~/") === 0) {
//     privateKeyPath = privateKeyPath.replace("~", os.homedir())
// }
// var privateKey = fs.readFileSync(privateKeyPath+'/oci_api_key.pem', 'ascii');

/* End ---- Tenant auth info */

// module.exports = {
// tenancyId: tenancyId,
// authUserId: authUserId,
// keyFingerprint: keyFingerprint,
// privateKey: privateKey,
// compartmentId: compartmentId
// //DBPMCompartment: DBPMCompartment

// };



var authorization={
    tenancyId : 'ocid1.tenancy.oc1..aaaaaaaaidrlitpg67butnd2mdyhaccin5dontmnl27gq2il6nkqrxagk6sq',
    userId : 'ocid1.user.oc1..aaaaaaaazb5whfq2tykmhjjsbzlthbpkc6ido2zat7vkkn2g7eo2xcdozcua',
    keyFingerprint : 'bc:0b:7c:85:0b:83:b9:33:ea:8a:f0:ee:be:b5:2d:12',
    RESTversion : '/20160918',
    region: 'us-phoenix-1',
    privateKeyPath : path.join(__dirname)
};

if(authorization.privateKeyPath.indexOf("~/") === 0) {
    authorization.privateKeyPath = authorization.privateKeyPath.replace("~", os.homedir())
}
authorization.privateKey = fs.readFileSync(authorization.privateKeyPath+'/oci_api_key.pem', 'ascii');

var compOCID = 'ocid1.compartment.oc1..aaaaaaaawscrvpqvafn427jsfx4ygiqlrnnpju5yediapkls26vkssb5xg6q';

module.exports = {
    authorization: authorization,
    compOCID : compOCID
}