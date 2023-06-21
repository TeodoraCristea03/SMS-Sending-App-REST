const connection = require("../db/db.js");
const mysql = require("mysql");

var fetchAllSMSes = function (cb) {
	connection.query("SELECT smsID, senderName, receiverPhoneNumber, sentAtTime FROM smses", cb);
}

var saveSMS = function(senderName, receiverPhoneNumber, smsContent, callback) {
	const queryString = `INSERT INTO smses (senderName, receiverPhoneNumber, smsContent, sentAtTime) VALUES (${mysql.escape(senderName)}, ${mysql.escape(receiverPhoneNumber)}, ${mysql.escape(smsContent)}, now())`;

	connection.query(queryString, callback);
}


module.exports.fetchAllSMSes = fetchAllSMSes;
module.exports.saveSMS = saveSMS;

