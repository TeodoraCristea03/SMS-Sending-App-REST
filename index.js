const express = require("express");
const dotenv = require('dotenv');
const bodyParser = require("body-parser");
const cors = require('cors');
const smsesRouter = require("./routers/smsesRouter");

dotenv.config();

const app = express();
app.use(cors())

// for parsing application/json
app.use(bodyParser.json());

// for parsing application/xwww-
app.use(bodyParser.urlencoded({ extended: true }));

// routes
app.use('/smses', smsesRouter);

const port = process.env.PORT || 8080;

app.listen(port, '127.0.0.1', () => {
  console.log(`SMSes backend app listening on port ${port}!`);
});