CREATE DATABASE cc;

CREATE TABLE cc.smses (smsID int NOT NULL AUTO_INCREMENT, senderName varchar(255), receiverPhoneNumber varchar(255), smsContent varchar(255), sentAtTime DATETIME, PRIMARY KEY (smsID));

INSERT INTO smses (senderName, receiverPhoneNumber, smsContent, sentAtTime) values ("Teodora Cristea", "+40723222123", "salut", now());