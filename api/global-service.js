const passport = require('passport');
let globalVariable = {
    secret: 'this is my secert key !!!!!!',
    authGuard: passport.authenticate('jwt', { session: false }),
};


module.exports = { globalVariable };