const express = require('express');
const router = express.Router();

const Task = require('../../../models/task');

//List all tasks
router.get('/', function(req, res) {
    Task.find(function(err, users) {
        if(err)
            res.send(err);

        res.json(users);
    });
});

//New task
router.post('/', function(req, res) {
    let task = new Task();
    task.title = req.body.title;
    task.details = req.body.details;
    task.completed = false;
    task.create_date = Date.now();
    task.modify_date = Date.now();

    task.save(function(err) {
        if(err)
            res.send(err);
        else
            res.json({ message: 'Task created!' });
    });
});

//Get task by ID
router.get('/:task_id', function(req, res) {
    Task.findById(req.params.task_id, function(err, task) {
        if(err)
            res.send(err);

        res.json(task);
    });
});

//Update task by ID
router.put('/:task_id', function(req, res) {
    Task.findById(req.params.task_id, function(err, task) {
        if(err)
            res.send(err);

        task.title = req.body.title || task.title;
        task.details = req.body.details || task.details;
        task.modify_date = Date.now();
        if(req.body.completed) {
            if(req.body.completed == "true") {
                task.complete_date = Date.now();
                task.completed = true;
            } else {
                task.complete_date = null;
                task.completed = false;
            }
        }

        task.save(function(err) {
            if(err)
                res.send(err);

            res.json({ message: 'Task updated!' });
        });
    });
});

//Delete task by ID
router.delete('/:task_id', function(req, res) {
    Task.remove({
        _id: req.params.task_id
    }, function(err) {
        if(err)
            res.send(err);

        res.json({ message: 'Successfully deleted'});
    });
});

module.exports = router;