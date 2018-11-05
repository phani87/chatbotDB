var oci = require( './OCI-Rest-APIs-nodejs/oci' );
var auth = require('./auth');
var path = require('path');
var uniqueFilename = require('unique-filename');
var mail = require('./sendEmail');
var fs = require('fs');
      
var doneAsync = false;
var result;
var res="";
var status="";
var id ="";
var adbocids = 'ocid1.autonomousdwdatabase.oc1.phx.abyhqljtasugjqg3kfqicmdjsbo27yj75ravyjuknubqxutwn2chedpxv7iq';
var dbtype = 'Autonomous Datawarehouse';
var parameters = {
    autonomousDataWarehouseId : adbocids,
    body : {
         password : 'WElCome12_34#'   
    }
}


oci.database.autonomousDataWarehouse.generateWallet( auth.authorization, parameters, function(response){
    doneAsync = true;
    var wallet_path = path.join(__dirname);
    var randomPrefixedTmpfile = uniqueFilename(wallet_path+'/Wallet/', 'Wallet') + '.zip';
    var file = fs.createWriteStream(randomPrefixedTmpfile);
    response.pipe(file); 
    mail.send('phani.turlapati@oracle.com', randomPrefixedTmpfile);
});
       //console.log(JSON.stringify(result) );
   
    