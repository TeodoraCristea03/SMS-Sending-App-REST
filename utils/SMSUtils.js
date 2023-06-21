const dotenv = require('dotenv');
const Vonage = require('@vonage/server-sdk');

dotenv.config();

const vonage = new Vonage({
  apiKey: process.env.VONAGE_API_KEY,
  apiSecret: process.env.VONAGE_API_SECRET
});

var sendSMS = function(senderName, receiverPhoneNumber, smsContent, callback) {
	if (process.env.KEEP_SMS_CREDIT == 1) {
		return callback(null, "0");
	}
	var message = senderName + " sent you the following message: " + smsContent + " -- ";
	vonage.message.sendSms(senderName, receiverPhoneNumber, message, (err, responseData) => {
	    if (err) {
	        callback(err, null);
	    } else {
	        if(responseData.messages[0]['status'] === "0") {
	            callback(null, responseData.messages[0]['status']);
	        } else {
	        	callback(responseData.messages[0]['error-text'], null);
	        }
	    }
	})
}

module.exports.sendSMS = sendSMS;