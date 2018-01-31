const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const path = require('path');

const config = require('./config');

mongoose.connect(config.db.conn);

const api = require('./routes/api/index');

app.use(bodyParser.urlencoded({ extended: true}));
app.use(bodyParser.json());

const port = config.port;

app.use(function(req, res, next) {
   res.header("Access-Control-Allow-Origin", "*");
   res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
   res.header("Access-Control-Allow-Methods", "POST, GET, PUT, DELETE");
   next();
});

app.use('/public', express.static(path.join(__dirname + '/public')));

app.use('/api', api);

app.use('/', function(req, res) {
    res.sendFile(path.join(__dirname+ '/public/index.html'));
});

app.listen(port);
console.log(`Magic happens on port ${port}`);
