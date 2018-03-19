let passport = require("passport");

let User = require('@model/User');

module.exports = (router) => {

router.route('/login').post((req, res, next) => {
       if(!req.body.email){
           return res.status(422).json({message: "Email не может быть пустым"});
       }

       if(!req.body.password){
           return res.status(422).json({message: "Password не может быть пустым"});
       }

        passport.authenticate('json', {session: false}, (err, user, info) => {
          if(err){
          return next(err);
          }

          if(user){
            return res.json(user.toAuthJson());
          } else {
            return res.status(401).json({message: info});
          }
        })(req, res, next);
    });

router.route('/registration')
    .post((req, res, next) => {
        let user = new User();

        user.email = req.body.email;
        user.password = req.body.password;

        user.save().then(()=>{
          return res.json(user.toAuthJson());
        })
        .catch((err)=> {
        if(err.code != null) {
        return res.status(401).json({message: "Такой Email уже зарегистрирован с системе "});
        }else {
        next(err);
        }
        });
      });

router.post('/auth/google', passport.authenticate('google-id-token'), function (req, res) {
          res.send(req.user? 200 : 401);
        }
      );

return router;
}