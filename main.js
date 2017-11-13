var apiai = require('apiai');

var app = apiai("34ff67fe8b9e4e61a4815b7ddbfc2af6");

var request = app.textRequest('archivage', {
   sessionId: '7a53d3a7-178b-4b40-8bfd-ebc7dc00b016'
});

request.on('response', function(response) {
   console.log(response.result.fulfillment.speech);
});

request.on('error', function(error) {
   console.log(error);
});

request.end();

