let JwtStrategy = require('passport-jwt').Strategy;
let JsonStrategy = require('passport-json').Strategy;
let ExtractJwt = require('passport-jwt').ExtractJwt;
let User = require('@model/User');

module.exports = (config, passport) => {
    let opts = {
        jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
        session: false,
        secretOrKey: config.auth_secret
    };

    passport.use(new JwtStrategy(opts, (jwt_payload, done) => {
         User.findOne({_id: jwt_payload._id}, (err, user) => {
            if (err) {
                return done(err, false);
            }
            if (user) {
                done(null, user);
            } else {
                done(null, false);
            }
        });
    }));

    passport.use(new JsonStrategy( {usernameProp: 'email', passwordProp: 'password'}, (email, password, done) => {
        User.findOne({ email: email }, (err, user) => {
          if (err) {
          return done(err);
          }

          if (!user) {
          return done(null, false, 'Такой Email не найден, возможно вы не зарегистрированы?');
           }

          if (!user.verifyPassword(password)) {
          return done(null, false, 'Неверный логин или пароль');
          }

          return done(null, user);
        });
      }
    ));

    passport.serializeUser(function (user, done) {
        done(null, user);
    });

    passport.deserializeUser(function (user, done) {
        done(null, user);
    });
};