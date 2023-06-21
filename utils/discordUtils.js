const dotenv = require('dotenv');
var request = require('request');

dotenv.config();

var sendSMSAuditToDiscord = function(senderName, receiverPhoneNumber, smsContent, callback) {
	var url = process.env.DISCORD_WEBHOOK_URL;
	var message = senderName + " has sent an SMS to " + receiverPhoneNumber + ". Message contents: " + smsContent;
	request.post(
		url,
		{json: {content: message}},
		function (error, response, body) {
			callback(error, {statusCode: response.statusCode});
		}
	);
}

module.exports.sendSMSAuditToDiscord = sendSMSAuditToDiscord;
