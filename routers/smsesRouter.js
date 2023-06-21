const express = require("express");
const dbUtils = require("../utils/dbUtils.js");
const SMSUtils = require("../utils/SMSUtils.js");
const discordUtils = require("../utils/discordUtils.js");
const async = require("async");

const router = express.Router();

router.get("/", (req, res) => {
    dbUtils.fetchAllSMSes(function (err, results) {
        if (err) {
            return res.json({error: err, smses: null});
        }

        return res.json({
            smses: results,
            error: null
        });
    });
});

router.post("/", (req, res) => {
    const { senderName, receiverPhoneNumber, smsContent } = req.body;
    if (!senderName || !receiverPhoneNumber || !smsContent) {
        // send bad request error
        return res.status(400).json({error: "Bad request. Missing parametres."});
    }

    async.series({
        // First, save the SMS to the Database
        "SaveSMSToDB": function (callback) {
            dbUtils.saveSMS(senderName, receiverPhoneNumber, smsContent, callback);
        },
        // Second, send the SMS using the Vonage API
        "SendSMS": function (callback) {
            SMSUtils.sendSMS(senderName, receiverPhoneNumber, smsContent, callback);
        },
        // Third, send an audit log to the Discord Administrator Channel
        "DiscordAuditLog": function (callback) {
            discordUtils.sendSMSAuditToDiscord(senderName, receiverPhoneNumber, smsContent, callback);
        }
    }, function (err, results) {
        if (err) {
            return res.json({error: err, results:null});
        }

        return res.json({
            results: results,
            error: null
        });
    })
})



module.exports = router;
