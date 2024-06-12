const express = require("express");
const cors = require('cors')
const serverless = require("serverless-http");
const AWS = require('aws-sdk');
const config = require('./config.js');
const request = require('request');

const app = express();
const port = 8080

AWS.config.update(config.aws_remote_config);

const docClient = new AWS.DynamoDB.DocumentClient();

app.use(cors())
app.use(express.json());

app.get("/callback", async function (req, res) {
  const code = req.query.code;
  const token = btoa(`${config.clientId}:${config.clientSecret}`);

  request.post(
    'https://oauth.pipedrive.com/oauth/token',
    { 
      form: { 
        "grant_type": 'authorization_code',
        "code": code,
        "redirect_uri": "https://32d2-95-135-188-151.ngrok-free.app/callback"
      },
      headers: {
        Authorization: `Basic ${token}`,
        'Content-Type': 'application/x-www-form-urlencoded'
      },
    },
    function (error, response, body) {
        if (!error && response.statusCode == 200) {
            console.log(body);
        }
    }
);
});

app.get("/contact/:telegram_id", async function (req, res) {
  try {
    const params = {
        TableName: config.aws_table_name,
        Key: {
          telegram_id: req.params.telegram_id,
        },
    };

    docClient.get(params, function (err, data) {
      if (err) {
          res.send({
              success: false,
              message: err
          });
      } else {
          res.send({
              success: true,
              message: 'Get contact',
              data
          });
      }
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Could not retreive user" });
  }
});

app.post("/contact", async function (req, res) {
  const { telegram_id, pipeDrive_id } = req.body;

  const params = {
    TableName: config.aws_table_name,
    Item: {
      pu: '4',
      telegram_id,
      pipeDrive_id,
    },
  };

  try {
    await docClient.put(params, function (err, data) {
      if (err) {
          res.send({
              success: false,
              message: err
          });
      } else {
          res.send({
              success: true,
              message: 'Added contact',
              data
          });
      }
    });

  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Could not create user" });
  }
});

app.use((req, res, next) => {
  return res.status(404).json({
    error: "Not Found",
  });
});

app.listen(port, () => {
  
  console.log(`Example app listening on port ${port}`)
})

module.exports.handler = serverless(app);
