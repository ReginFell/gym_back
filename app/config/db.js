const aws = require('aws-sdk');

let environment = new aws.S3({
    db_user: process.env.MONGO_DB_USER,
    db_password: process.env.MONGO_DB_PASSWORD
});

module.exports = {
    DB: "mongodb://" + environment.db_user + ":" + environment.db_password + "@ds259258.mlab.com:59258/heroku_ldtgb4dm"
};