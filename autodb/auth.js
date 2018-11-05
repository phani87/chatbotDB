var fs = require('fs');
var os = require('os');
var path = require('path');


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