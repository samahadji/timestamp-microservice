// index.js
// where your node app starts
require('dotenv').config();
// init project
const express = require('express');
const app = express();


const moment = require('moment'); // for DateTime management

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC 
const cors = require('cors');
app.use(cors({optionsSuccessStatus: 200}));  // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (req, res) {
  res.sendFile(__dirname + '/views/index.html');
});


// your first API endpoint... 
app.get("/api/:date", function (req, res) {
  let inputDate = req.params.date;
  let m = moment.utc(inputDate)
  m = m.isValid() ? m : moment.utc(inputDate, "x") // x for unix milliseconds time 

  if (m.isValid()) {
    res.json({"unix": Number.parseInt(m.format("x")), "utc": m.format("ddd, DD MMM YYYY hh:mm:ss")+ " GMT"});
  } else {
     res.json({"error": "Invalid Date"});
  }
});



// listen for requests :)
var listener = app.listen(process.env.PORT, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
