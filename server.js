var express = require('express');
var nodemailer = require("nodemailer");
var app = express();
var path = require("path");

// for external style sheet/path
app.use(express.static(path.join(__dirname, "/app")));

// configure our SMTP server detalis, which is for sending and recieving e-mails
var smtpTransport = nodemailer.createTransport("SMTP",
{
    service: "Gmail",
    auth: 
    {
        user: "user@gmail.com",
        pass: "password"
    }
});

// routing
app.get('/app/',function(req,res){
	res.sendfile('index.html');
});

app.get('/app/send',function(req,res){
	var mailOptions={
   		to : req.query.to,
   		subject : req.query.subject,
   		text : req.query.text
	}
	console.log(mailOptions);
	smtpTransport.sendMail(mailOptions, function(error, response){
		if(error) {
			console.log(error);
			res.end("error");
		} else {
			console.log("Message sent: " + response.message);
			res.end("sent");
		}
	});
});

// listen to port 3000
app.listen(3000,function(){
	console.log("Express Started on Port 3000");
});