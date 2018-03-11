let express = require('express');
let session = require('express-session');
let bodyParser = require('body-parser');
let cors = require('cors');

let mongoose = require('mongoose');
let MongoStore = require('connect-mongo')(session);

let config = require('./app/config/db');
let userRoutes = require('./app/route/userRoutes');

mongoose.connect(config.DB)
    .then(() => {
        console.log('Database is connected')
    })
    .catch((err) => {
        console.log('Can not connect to the database' + err)
    });

const app = express();

app.use(bodyParser.json());

app.use(session({
    secret: 'First Rule of Gym',
    resave: true,
    saveUninitialized: false,
    store: new MongoStore({mongooseConnection: mongoose.connection})
}));

app.use(cors());
app.use('/user', userRoutes);

const port = process.env.PORT || 5000;

app.listen(port, function () {
    console.log('Listening on port ' + port);
});

