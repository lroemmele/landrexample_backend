const express = require('express');
const bcrypt = require('bcrypt');
const router = express.Router();

const User = require('../../../models/user');

//List users
router.get('/', function(req, res) {
    User.find(function(err, users) {
        if(err)
            res.send(err);

        res.json(users);
    });
});

//New user
router.post('/', function(req, res) {
    bcrypt.hash(req.body.password, 13, function(error, hash) {
        if(error)
            throw new Error(`Unable to hash password for user: ${req.body.username}`);

        let user = new User();
        user.username = req.body.username;
        user.password = hash;
        user.create_date = Date.now();
        user.modify_date = Date.now();

        user.save(function(err) {
            if(err)
                res.send(err);
            else
                res.json({ message: 'User created!' });
        });
    });
});

//Get user by id
router.get('/:user_id', function(req, res) {
    User.findById(req.params.user_id, function(err, user) {
        if(err)
            res.send(err);

        res.json(user);
    });
});

//Update user by id (change password)
router.put('/:user_id', function(req, res) {
    bcrypt.hash(req.body.password, 13, function(error, hash) {
        if (error)
            throw new Error(`Unable to hash password for user: ${req.body.username}`);

        User.findById(req.params.user_id, function(err, user) {
            if(err)
                res.send(err);

            user.password = hash;
            user.modify_date = Date.now();

            user.save(function(err) {
                if(err)
                    res.send(err);
                else
                    res.json({ message: 'User updated!' });
            });
        });
    });
});

//Delete user by id
router.delete('/:user_id', function(req, res) {
    User.remove({
        _id: req.params.user_id
    }, function(err) {
        if(err)
            res.send(err);

        res.json({ message: 'Successfully deleted'});
    });
});

//Get all tasks for a user
router.get('/:user_id/tasks', function(req, res) {
    User.findById(req.params.user_id, function(err, user) {
        if(err)
            res.send(err);

        res.json(user.tasks);
    });
});

//Add task for user id
router.put('/:user_id/tasks/:task_id', function(req, res) {
    User.findById(req.params.user_id, function(err, user) {
        if(err)
            res.send(err);

        user.tasks.push(req.params.task_id);

        user.save(function(err) {
            if(err)
                res.send(err);
            else
                res.json({ message: 'Task added!' });
        });
    });
});

//Delete task for user id
router.delete('/:user_id/tasks/:task_id', function(req, res) {
    User.findById(req.params.user_id, function(err, user) {
        if(err)
            res.send(err);

        let idx = user.tasks.indexOf(req.params.task_id);

        if(idx !== -1) {
            user.tasks.splice(idx, 1);
        }

        user.save(function(err) {
            if(err)
                res.send(err);
            else
                res.json({ message: 'Task removed!' });
        });
    });
});

module.exports = router;