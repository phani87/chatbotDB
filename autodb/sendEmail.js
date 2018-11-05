var nodemailer = require('nodemailer');
var validator = require('validator');
var path = require('path');
var pathName = path.join(__dirname);
var fs = require('fs');

var transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'traininghubteam1@gmail.com',
    pass: 'dodger123$'
  }
});
  
module.exports = {
      metadata: () => ({
          "name": "sendEmail",
          "properties": {
              "attachmentName": { "type": "string", "required": true },
              "mailId":{ "type": "string", "required": true }
          },
          "supportedActions": []
      }),
  
invoke: (conversation, done) => {
  var doneAsync = false;
  var doneAsyncFile = false;
      var attachmentName =  conversation.properties().attachmentName;
      var mailId = conversation.properties().mailId;
      var filePath = pathName + '/Wallet/' + attachmentName;
        if(validator.isEmail(mailId)) {
          var data = fs.readFile(filePath, function(callback){
            doneAsyncFile = true;
          });
          require('deasync').loopWhile(function(){return !doneAsyncFile;});  
          conversation.reply(`Setting Mail Parameters`);
          var mailOptions = {
            from: '',
            to: mailId,
            subject: 'Wallet',
            text: 'Please find your Wallet attached !',
            attachments: [{'filename': attachmentName, 'content': data}]
          };
          transporter.sendMail(mailOptions, function(error){
            if (error) {
              // conversation.reply('error found:')
              // conversation.reply(error);
              console.log(error);
              doneAsync = true;
            } else {
              doneAsync = true;
              conversation.reply(`Mail Sent...`); 
            }
          });
          require('deasync').loopWhile(function(){return !doneAsync;});   
          conversation.transition();
          done();
      }    
}
  
      // invoke(){
      //     logger.info('starting');
      //     var attachmentName =  'Wallet-959b8f36.zip';
      //      var mailId = 'phani.turlapati@oracle.com';

                 
      //       if(validator.isEmail(mailId)) {
      //         var filePath = pathName + '/Wallet/' + attachmentName
      //         var data = fs.createReadStream(filePath);
      //         var mailOptions = {
      //           from: '',
      //           to: mailId,
      //           subject: 'Wallet',
      //           text: 'Please find your Wallet attached !',
      //           attachments: [{'filename': attachmentName, 'content': data}]
      //         };
      //         transporter.sendMail(mailOptions, function(error, info){
                
      //           if (error) {
      //             console.log(error);
      //           } else {
      //             logger.info('Email sent: ' + patientEmail);
      //           }
      //         });
      // }    
  
      //     logger.info('ending');
      
      // },
  };
  
  