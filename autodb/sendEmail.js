var nodemailer = require('nodemailer');
var validator = require('validator');
var path = require('path');
var pathName = path.join(__dirname);
var fs = require('fs');
var logger = require('./log');
var path = require('path');
var fs = require('fs');
var logger = require('./log');

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
  conversation.reply('starting mail module');
      var attachmentName =  conversation.properties().attachmentName;
      var mailId = conversation.properties().mailId;
      var filePath = pathName + '/Wallet/' + attachmentName;
      conversation.reply(`Filepath : ${filePath}`);
        if(validator.isEmail(mailId)) {
          var data = fs.createReadStream(filePath);
          var mailOptions = {
            from: '',
            to: mailId,
            subject: 'Wallet',
            text: 'Please find your Wallet attached !',
            attachments: [{'filename': attachmentName, 'content': data}]
          };
          transporter.sendMail(mailOptions, function(error, info){
            if (error) {
              console.log(error);
            } else {
              logger.info('Email sent: ' + patientEmail);
            }
          });   
      }    
      conversation.reply(`Mail Sent...`)    
      conversation.transition();
      done();
},
  
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
  
  