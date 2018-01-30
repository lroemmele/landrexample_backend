const config = {};

config.port = process.env.PORT || 8080;
config.db = {};
config.db.conn = 'mongodb://127.0.0.1/taskboard';

module.exports = config;
