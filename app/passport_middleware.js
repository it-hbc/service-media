var models = require('./models'),
    passport = require('passport');

var ensureAuthenticated = function ensureAuthenticated(req, res, next) {
    if (!req.user) {
        res.redirect("/login")
    } else {
        next()
    }
};
var serializeUser = function (user, done) {
    done(null, user.uid)
};
var deserializeUser = function (username, done) {
    models.Account.findOne({ username: username }).exec()
        .then(user => {
            if (!user) {
                done(new Error(`Cannot find user with username=${username}`))
            } else {
                done(null, user)
            }
        })
};
var mylogin = myLogin = function (req, res, next) {
    passport.authenticate('ldapauth', function (err, user, info) {
        if (err) {
            return next(err)
        }
        if (!user) {
            res.status(401).json({ success: false, message: 'authentication failed' })
        } else {
            req.login(user, loginErr => {
                if (loginErr) {
                    return next(loginErr);
                }
                console.dir(user);
                var newUser = new models.Account({
                    username: user.uid
                });
                models.Account.findOne({username: user.uid}, function(err, user){
                    if (user) {
                        return res.redirect('/');
                    } else {
                       newUser.save(function(err){
                           if (err) throw err;
                           return res.redirect('/');
                       })
                    }
                });
            });
        }
    })(req, res, next)
};
module.exports = {
    ensureAuthenticated: ensureAuthenticated,
    serializeUser: serializeUser,
    deserializeUser: deserializeUser,
    mylogin: mylogin
};