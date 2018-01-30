const express = require('express');
const router = express.Router();

const users = require('./users/index');
const tasks = require('./tasks/index');

router.get('/', function(req, res) {
    res.json({ message: 'No route to /api.'});
});

router.use('/users', users);
router.use('/tasks', tasks);

module.exports = router;