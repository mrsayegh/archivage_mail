const express = require('express')
const bodyParser = require('body-parser')
const app = express()
app.use(bodyParser.json())
app.set('port', (process.env.PORT || 5000))

const REQUIRE_AUTH = true
const AUTH_TOKEN = '34ff67fe8b9e4e61a4815b7ddbfc2af6'

app.get('/', function (req, res) {
  res.send('Use the /webhook endpoint.')
})
app.get('/webhook', function (req, res) {
  res.send('You must POST your request')
})

app.post('/webhook', function (req, res) {
  // we expect to receive JSON data from api.ai here.
  // the payload is stored on req.body
  console.log(req.body)

  // we have a simple authentication
  if (REQUIRE_AUTH) {
    if (req.headers['auth-token'] !== AUTH_TOKEN) {
      return res.status(401).send('Unauthorized')
    }
  }

  // and some validation too
  if (!req.body || !req.body.result || !req.body.result.parameters) {
    return res.status(400).send('Bad Request')
  }

  // the value of Action from api.ai is stored in req.body.result.action
  console.log('* Received action -- %s', req.body.result.action)

  // parameters are stored in req.body.result.parameters
  var userName = req.body.result.parameters['given-name']
  var webhookReply = 'haha ' + req.headers['given-name'] +'! Welcome from the webhook.'

  // the most basic response
  if (res.status == '200' && res.result.metadata.intentName === '2007-NON'){


    let http = require("https");
    
    let options = {
    "method": "POST",
    "hostname": "dev16424.service-now.com",
    "port": null,
    "path": "/api/now/table/incident",
    "headers": {
    "accept": "application/json",
    "content-type": "application/json",
    "authorization": "Basic YWRtaW46TW9oYW1hZCYyMw==",
    "cache-control": "no-cache",
    "postman-token": "2662f1ab-cc41-d4ed-f425-1cfa85287298"
    }
    };
    
    let req = http.request(options, function (res) {
    let chunks = [];
    
    res.on("data", function (chunk) {
    chunks.push(chunk);
    });
    
    res.on("end", function () {
    let body = Buffer.concat(chunks);
    console.log(body.toString());
    });
    });
    
    req.write(JSON.stringify({ caller_id: 'mohamad sayegh', short_description: 'TEST Mardi', active: 'true' }));
    req.end();
	
  }
	  
  
})
  
  /*.json({
    source: 'webhook',
    speech: webhookReply,
    displayText: webhookReply
  })*/
  

app.listen(app.get('port'), function () {
  console.log('* Webhook service is listening on port:' + app.get('port'));
})