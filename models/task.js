const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const TaskSchema = new Schema({
    title: String,
    details: String,
    completed: Boolean,
    create_date: Date,
    modify_date: Date,
    complete_date: Date
});

module.exports = mongoose.model('Task', TaskSchema);