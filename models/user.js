const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserSchema = new Schema({
    username: { type: String, unique: true, required: true, dropDups: true },
    password: String,
    create_date: Date,
    modify_date: Date,
    last_login: Date,
    tasks: [
        {type: Schema.Types.ObjectId, ref: 'Task'}
    ]
});

module.exports = mongoose.model('User', UserSchema);