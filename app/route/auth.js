let jwt = require('jsonwebtoken');
let passport = require("passport");

let config = require('@environment/config');

let User = require('@model/User');

module.exports = (app) => {
let router = app.Router();

router.route('/login')
    .post((req, res) => {
        User.authenticate(req.body.email, req.body.password)
            .then(user => {
                let token = jwt.sign(user.toJSON(), config.auth_secret);
                res.status(200)
                    .send({
                        token,
                        email: user.email
                    })
            })
            .catch(err => {
                console.log(err);
                res.status(err.error_code).send(err);
            });
    });

router.route('/registration')
    .post((req, res) => {
        let user = new User(req.body);
        user.save()
            .then(user => {
                console.log(user);
                let token = jwt.sign(user.toJSON(), config.auth_secret);
                console.log(token);
                res.status(200)
                    .send({
                        token,
                        email: user.email
                    });
            })
            .catch(err => {
                console.log(err);
                res.status(400).send({
                    code: 400,
                    error_message: err.errmsg
                });
            });
    });

return router;
}