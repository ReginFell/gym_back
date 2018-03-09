let express = require('express');
let userRoutes = express.Router();

let User = require('../models/User');

userRoutes.route('/auth')
    .post(function (req, res) {
        let item = new User(req.body);
        item.save()
            .then(item => {
                res.status(200).json({'item': 'Item added successfully'});
            })
            .catch(err => {
                res.status(400).send("unable to save to database");
            });
    });

userRoutes.route('/register')
    .post(function (req, res) {
        let item = new User(req.body);
        item.save()
            .then(item => {
                res.status(200).json({'item': 'Item added successfully'});
            })
            .catch(err => {
                res.status(400).send("unable to save to database");
            });
    });

module.exports = userRoutes;