require('dotenv').config();
const express = require('express');
const cors = require('cors');

const app = express();

// some legacy browsers choke on 204
app.use(cors({ optionsSuccessStatus: 200 }));
app.use(express.static(process.cwd() + '/src/public'));

/**
 * Middleware function to log request information
 */
app.use((req, res, next) => {
  console.log(`${req.method} ${req.path} -${req.ip}`);
  next();
});


app.get('/', function (req, res) {
  res.sendFile(__dirname + '/views/index.html');
});

app.get('/api/whoami', function (req, res) {
  const responseObj = { 
    ipaddress: req.ip, 
    language: req.headers["accept-language"], 
    software: req.headers["user-agent"] 
  };
  return res.json(responseObj);
});

// listen for requests
const listener = app.listen(process.env.PORT || 3000, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
