import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import mongoose from 'mongoose';
import passport from 'passport';
import config from '@environment/config'

const app = express();

app.use(bodyParser.json());
app.use(passport.initialize());
app.use(cors());

require('@environment/database')(mongoose, config);

app.use(require('@route/router')(express));

require('@route/default')(app);

require('@environment/passport')(config, passport);

const port = process.env.PORT || 5000;
app.listen(port, () => {
    console.log('Listening on port ' + port);
});