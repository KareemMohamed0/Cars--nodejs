var JwtStrategy = require('passport-jwt').Strategy,
    ExtractJwt = require('passport-jwt').ExtractJwt;

var User = require('../database/db').User;
var gb = require('../api/global-service').globalVariable;

module.exports = function (passport) {

    var opts = {}
    opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
    opts.secretOrKey = gb.secret;

    passport.use(new JwtStrategy(opts, function (jwt_payload, done) {
        User.findOne({ where: { id: jwt_payload.user.id } })
            .then((user) => {
                if (user)
                    return done(null, user);
                else
                    return done(null, false);
                // or you could create a new account
            }).catch((err) => {
                return done(err, false);
            })
    }));
}

