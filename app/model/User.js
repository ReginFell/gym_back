let mongoose = require('mongoose');
let bcrypt = require('bcrypt');
let jwt = require('jsonwebtoken');

let config  = require('@environment/config')

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
    google_token: {
        type: String,
        required: false,
        trim: true
    }
});

UserSchema.pre('save', function(next) {
    let user = this;
    bcrypt.hash(user.password, 10, (err, hash) => {
        if (err) {
            return next(err);
        }
        user.password = hash;
        next();
    })
});

UserSchema.methods.verifyPassword = function(password) {
   return bcrypt.compareSync(password, this .password);
};

UserSchema.methods.generateJwt = function() {
  return jwt.sign({
    id: this._id,
    user: this
    }, config.auth_secret);
};

UserSchema.methods.toAuthJson = function() {
  return {
    email: this.email,
    token: this.generateJwt()
  };
};

let User = mongoose.model('User', UserSchema);
module.exports = User;