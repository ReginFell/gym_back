let express = require('express');
let bodyParser = require('body-parser');
let cors = require('cors');
let mongoose = require('mongoose');
let passport = require("passport");
require('module-alias/register');

let config = require('@environment/config');

const app = express();
app.use(bodyParser.json());
app.use(passport.initialize());
app.use(cors());

require('@environment/database')(mongoose, config);
require('@environment/passport')(config, passport);

app.use('/auth', require('@route/auth'));

require('@route/default')(app);