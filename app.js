const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const config = require('./config');

mongoose.connect(config.db.conn);

const api = require('./routes/api/index');

app.use(bodyParser.urlencoded({ extended: true}));
app.use(bodyParser.json());

const port = config.port;

const router = express.Router();

router.get('/', function(req, res) {
  res.json({ message: 'Nothing to do here yet...'});
});

app.use('/api', api);

app.listen(port);
console.log(`Magic happens on port ${port}`);
