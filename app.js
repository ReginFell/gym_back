let express = require('express');
let bodyParser = require('body-parser');
let cors = require('cors');
let mongoose = require('mongoose');
let passport = require("passport");

let config = require('./app/config/config');
let userRoutes = require('./app/route/userRoutes');

mongoose.connect(config.db)
    .then(() => {
        console.log('Database is connected')
    })
    .catch((err) => {
        console.log('Can not connect to the database' + err)
    });

const app = express();

app.use(bodyParser.json());
app.use(passport.initialize());
require('./app/config/passport')(passport);

app.use(cors());
app.use('/user', userRoutes);

const port = process.env.PORT || 5000;

app.listen(port, function () {
    console.log('Listening on port ' + port);
});

app.use((req, res) => {
    let error = new Error();
    error.error_code = 404;
    error.name = "Не найдено";
    res.status(404).send(error);
});