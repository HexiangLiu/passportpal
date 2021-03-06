const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const passportJWT = require('passport-jwt');
const bcrypt = require('bcryptjs');
const JWTStrategy = passportJWT.Strategy;
const ExtractJWT = passportJWT.ExtractJwt;
const db = require('../models');

// local strategy
passport.use(
  new LocalStrategy(
    {
      usernameField: 'email',
      passwordField: 'password',
    },
    function (email, password, cb) {
      //this one is typically a DB call. Assume that the returned user object is pre-formatted and ready for storing in JWT
      return db.User.findOne({ email })
        .then((user) => {
          if (!user) {
            return cb(null, false, { message: 'User not found' });
          }

          bcrypt.compare(password, user.password).then((res) => {
            if (res) {
              return cb(null, user, { message: 'Logged In Successfully' });
            } else {
              return cb(null, false, { message: 'Invalid password' });
            }
          });
        })
        .catch((err) => cb(err));
    }
  )
);

// token strategy
passport.use(
  new JWTStrategy(
    {
      // {Authorization : "Bearer (the code in 3 parts separated by ."}
      jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken(),
      secretOrKey: 'secret',
    },
    function (jwtPayload, cb) {
      //find the user in db if needed. This functionality may be omitted if you store everything you'll need in JWT payload.
      return db.User.find({ _id: jwtPayload.id })
        .then((user) => {
          return cb(null, user);
        })
        .catch((err) => {
          return cb(err);
        });
    }
  )
);

module.exports = passport;
