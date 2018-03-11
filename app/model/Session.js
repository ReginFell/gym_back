let mongoose = require('mongoose');

let SessionSchema = new mongoose.Schema({
    user_id: {
        type: String,
        unique: true,
        required: true,
        trim: true
    },
    token: {
        type: String,
        unique: true,
        required: true,
        trim: true
    },
});

let Session = mongoose.model('Session', SessionSchema);
module.exports = Session;