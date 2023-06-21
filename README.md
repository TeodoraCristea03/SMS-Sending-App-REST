### Introduction
The project consists of a web application that allows users to send SMS messages to other individuals, including personalized messages. Additionally, users can view recent activity related to the service usage, but only the application administrator can access the content of the sent messages. The application is divided into two components:

A REST API called "backend" that exposes routes called by the frontend for sending new SMS messages or listing recent service usage activity:

    - For sending SMS messages, the [Vonage API](https://www.vonage.com/ "Vonage") is used, which offers a free 2 Euro credit upon registration.
    - [Discord Webhooks](https://support.discord.com/hc/en-us/articles/228383668-Intro-to-Webhooks "Discord Webhooks") are used to notify the administrator about service usage activity.
    - A frontend application written in React that calls the backend API and displays the information received from it.

### Problem description
The project started from the need for a web application that allows:

    - Sending SMS messages to a phone number with a personalized message, without the need for a mobile phone.
    - Publicly viewing the service usage activity (without including the content of the messages) to increase trust and provide transparency.
    - Access to an Audit Log for the Administrator to prevent abuses.

### API description
The implemented API, named "backend," exposes the following 2 routes:

    - `GET /smses` -> Returns all SMS messages sent using the application, excluding the content of personalized messages. As a response, an array of SMS messages is received, where each SMS contains:
        - Date and time of sending
        - Sender's name
        - Recipient's phone number
    - `POST /smses` -> A method that sends an SMS to the recipient using the **Vonage API**, saves the SMS in the database and sends an audit message to the Administrator using the **Discord Webhook API**. It receives the following parameters:
        - Sender's name
        - Recipient's phone number
        - Content of the personalized message to be included in the SMS

## Exemples of API Requests/ Responses 
1. `GET /smses`:
Request:
```
GET /smses HTTP/1.1
Host: 161.35.92.116:9090
```
Response:
```
{
    "smses": [
        {
            "smsID": 1,
            "senderName": "Teodora",
            "receiverPhoneNumber": "+40123456789",
            "sentAtTime": "2022-05-08T16:55:48.000Z"
        }
],
    "error": null
}
```
2. `POST /smses`:
Request:
```
POST /smses HTTP/1.1
Host: 161.35.92.116:9090
Content-Type: application/json
Content-Length: 97
{
    "senderName": "Teo",
    "receiverPhoneNumber": "+40123456789",
    "smsContent": "Hello"
}
```
Response:
```
{
    "results": {
        "SaveSMSToDB": [
            {
                "fieldCount": 0,
                "affectedRows": 1,
                "insertId": 5,
                "serverStatus": 2,
                "warningCount": 0,
                "message": "",
                "protocol41": true,
                "changedRows": 0
            },
            null
        ],
        "SendSMS": "0",
        "DiscordAuditLog": {
            "statusCode": 204
        }
    },
    "error": null
}
```

### References
- Discord Webhooks: https://support.discord.com/hc/en-us/articles/228383668-Intro-to-Webhooks
- Vonage SMS API: https://www.vonage.co.uk/
- NodeJS Express: https://expressjs.com/
- ReactJS: https://reactjs.org/
