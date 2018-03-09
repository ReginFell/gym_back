let mongoose = require('mongoose');
let Schema = mongoose.Schema;

let User = new Schema({
    email: {
        type: String
    },
    password: {
        type: Number
    }
}, {
    collection: 'items'
});

module.exports = mongoose.model('User', User);