const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const mongoose = require('mongoose');
const crypto = require('crypto');
const User = mongoose.model('user', {
  firstname: String,
  lastname: String,
  patronymic: String,
  dirthday: Date,
  type: String,
  group_number: String,
  email: String,
  password: String,
  secure_code1: String,
  secure_code2: String,
  name: String,
  result:[],
}, 'user');


passport.serializeUser(function (user, done) {
  done(null, user._id);
});

passport.deserializeUser(function (id, done) {
  User.findById(id, function (err, user) {
    done(err, user);
  });
});

passport.use('login',
  new LocalStrategy(
    function (username, password, done) {
      mongoose.connect('mongodb://localhost:27017/users', {
        useNewUrlParser: true
      });
      User.findOne({
        email: username
      }, function (err, user) {
        if (err) return done(err);
        if (!user) {
          return done(null, false);
        }
        const hash = crypto.createHash('sha256').update(password).digest('hex');
        if (user.password !== hash) {
          return done(null, false);
        }
        if (user.allow == false) return done(null, false);
        return done(null, user);
      });
    }));


module.exports = User;