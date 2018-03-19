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

app.use(require('@route/router')(express));

require('@route/default')(app);

require('@environment/passport')(config, passport);

require('@server')(app);