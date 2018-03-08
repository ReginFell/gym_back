const aws = require('aws-sdk');

let db_user = process.env.MONGO_DB_USER;
let db_password = process.env.MONGO_DB_PASSWORD;


module.exports = {
    DB: "mongodb://" + db_user + ":" + db_password + "@ds259258.mlab.com:59258/heroku_ldtgb4dm"
};