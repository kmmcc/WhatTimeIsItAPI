var express = require('express');
var port = 3000;
var fs = require('fs');

//Resolve the path so relative paths don't cause issues
var resolve = require('path').resolve

var app = express();

app.listen(port, () => {
  console.log('App listening on port ' + port);
})

//Return the date as a string.
function dateString () {
  return new Date().toString();
}

//Log some information to a log file about our request.
function log (req) {

  var date = dateString();
  
  //Log the method, host, original url, user-agent and ip of the request
  var method = req.method;
  var host = req.hostname;
  var originalUrl = req.originalUrl;
  var userAgent = req.get('User-Agent')
  var ip = req.ip;

  var message = date + ' ' + method + ' ' + host + ' ' + originalUrl + ' ' + userAgent + ' ' + ip + '\n';

  var logPath = resolve('app/log/API.log');

  //Write to the log using Node fs
  fs.appendFile(logPath, message, function(err) {
    if(err) {
      console.log (err);
    }
  });

}

//Send the time to the client.
//Log the request.
app.get('/whattimeisit', (req, res) => {

  var date = dateString();

  log(req);

  res.send(date);

});


exports.app = app;