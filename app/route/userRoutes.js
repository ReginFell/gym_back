let express = require('express');
let userRoutes = express.Router();
let hat = require('hat');

let User = require('../model/User');
let Session = require('../model/Session');

userRoutes.route('/login')
    .post((req, res) => {
        User.authenticate(req.body.email, req.body.password)
            .then(user => {
                req.session.user_id = user._id;
                req.session.token = hat();
                res.status(200)
                    .send({
                        token: req.session.token,
                        email: user.email
                    });
            })
            .catch(err => {
                res.status(err.error_code).send(err);
            })
    });

userRoutes.route('/registration')
    .post((req, res) => {
        let user = new User(req.body);
        user.save()
            .then(user => {
                req.session.user_id = user._id;
                req.session.token = hat();

                res.status(200)
                    .send({
                        token: req.session.token,
                        email: user.email
                    });
            })
            .catch(err => {
                res.status(400).send({
                    code: 400,
                    error_message: err.errmsg
                });
            });
    });

userRoutes.get('/logout', (req, res, next) => {
    if (req.session) {

        req.session.destroy((err) => {
            if (err) {
                return next(err);
            } else {
                return res.redirect('/');
            }
        });
    }
});

userRoutes.get('/my', (req, res, next) => {
    Session.findOne({token: req.body.token})
        .then(session => {
            console.log(session);
        })
});

module.exports = userRoutes;