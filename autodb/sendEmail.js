var nodemailer = require('nodemailer');
var validator = require('validator');
var path = require('path');
var pathName = path.join(__dirname);
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
  var doneAsync = false;
  var doneAsyncFile = false;
      var attachmentName =  conversation.properties().attachmentName;
      var mailId = conversation.properties().mailId;
      var filePath = pathName + '/Wallet/' + attachmentName;
      conversation.reply('starting mail module')
      console.info('starting');
      if(validator.isEmail(mailId)) {
        var data = fs.readFile(filePath, 'utf8');
        console.info(data);
        conversation.reply(data);
        //require('deasync').loopWhile(function(){return !doneAsyncFile;});       
          var mailOptions = {
            from: '',
            to: mailId,
            subject: 'Wallet',
            text: 'Please find your Wallet attached !',
            attachments: [{'filename': attachmentName, 'content': data}]   
          };
          //require('deasync').loopWhile(function(){return !doneAsyncFile;});
          transporter.sendMail(mailOptions, function(error){
            if (error) {
              // conversation.reply('error found:')
              // conversation.reply(error);
              console.error(error);
              converasation.reply(error);
              doneAsync = true;
            } else {
              doneAsync = true;
              conversation.reply(`Mail Sent ${mailId}`); 
            }
          });
          require('deasync').loopWhile(function(){return !doneAsync;});   
          conversation.transition();
          conversation.keepTurn(true);
          done();
      }    
},
  
      // inv
        
      // var doneAsync = false;
      // var doneAsyncFile = false;
      //     var attachmentName =  'Wallet-959b8f36.zip';
      //     var mailId = 'phani.turlapati@oracle.com';
      //     var filePath = pathName + '/Wallet/' + attachmentName;
      //     logger.info('Starting mail module');
      //       if(validator.isEmail(mailId)) {
      //       //   var data = fs.createReadStream(filePath).on('close', function(){
      //       //     doneAsyncFile = true;
      //       //   });
      //       // require('deasync').loopWhile(function(){return !doneAsyncFile;})
              
      //       logger.info(`Setting Mail Parameters`);


      //         var mailOptions = {
      //           from: '',
      //           to: mailId,
      //           subject: 'Wallet',
      //           text: 'Please find your Wallet attached !',
      //           attachments: [{'filename': attachmentName, 'path': filePath }]};
      //         transporter.sendMail(mailOptions, function(error){
      //           if (error) {
      //             // conversation.reply('error found:')
      //             // conversation.reply(error);
      //             console.log(error);
      //             doneAsync = true;
      //           } else {
      //             doneAsync = true;
      //             logger.info(`Mail Sent...`); 
      //           }
      //         });
      //         require('deasync').loopWhile(function(){return !doneAsync;});   

      //         // conversation.transition();
      //         // conversation.keepTurn(true);
      //         // done();
      //       }
      // },
  };
  
  