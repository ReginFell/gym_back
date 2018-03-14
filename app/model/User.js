let mongoose = require('mongoose');
let bcrypt = require('bcrypt');

let UserSchema = new mongoose.Schema({
    email: {
        type: String,
        unique: true,
        required: true,
        trim: true
    },
    password: {
        type: String,
        required: true,
        unique: false
    },
    social_token_type: {
        type: String,
        required: false,
        trim: true
    },
    social_token: {
        type: String,
        required: false,
        trim: true
    }
});

UserSchema.pre('save', function (next) {
    let user = this;
    bcrypt.hash(user.password, 10, (err, hash) => {
        if (err) {
            return next(err);
        }
        user.password = hash;
        next();
    })
});

UserSchema.statics.authenticate = (email, password) => {
    return User.findOne({email: email})
        .then((user) => {
            if (user != null && bcrypt.compareSync(password, user.password)) {
                return user;
            } else {
                let error = new Error();
                error.error_code = 401;
                error.name = "Введены неверный логин или пароль.";
                throw error;
            }
        });
};

let User = mongoose.model('User', UserSchema);
module.exports = User;