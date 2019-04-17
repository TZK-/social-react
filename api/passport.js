const config = require('./config');
const passport = require("passport");
const passportJWT = require("passport-jwt");
const {userService} = require("./services/user.service");

const ExtractJwt = passportJWT.ExtractJwt;
const JwtStrategy = passportJWT.Strategy;
const jwtOptions = {
    jwtFromRequest:  ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: config.jwt.secret
};

const strategy = new JwtStrategy(jwtOptions, async (payload, next)  =>{
    let user;
    try {
        user = await userService.getById(payload.id);
    } catch (e) {
        next(e, false);
    }

    if (user) {
        next(null, user);
    } else {
        next(null, false);
    }
});

passport.use('jwt', strategy);

const gate = passport.authenticate('jwt', {
    session: false,
    failWithError: true
});

module.exports = {
    passport,
    gate
};
