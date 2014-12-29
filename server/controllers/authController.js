(function (controller) {

	controller.init = function (app) {
    var config = require('../../config.js'),
        passport = require('passport'),
        FacebookStrategy = require('passport-facebook').Strategy
        jwt = require('jsonwebtoken');

    passport.serializeUser(function (profile, next) {
      next(null, profile);
    });

    passport.deserializeUser(function (obj, next) {
      next(null, obj);
    })

    passport.use(new FacebookStrategy({
      clientID: config.facebook.clientID,
      clientSecret: config.facebook.clientSecret,
      callbackURL: config.facebook.callbackURL
    }, function (accessToken, refreshToken, profile, next) {

      var profile = {
      	id: profile.id,
      	displayName: profile.displayName,
      	accessToken: accessToken
      };

      process.nextTick(function () {
        next(null, profile);  
      })      
    }));

    app.use(passport.initialize());
    app.use(passport.session());

    app.get('/auth', passport.authenticate('facebook'));
    app.get('/auth/callback', 
      passport.authenticate('facebook', { failureRedirect: "/#/loginfailed" }),
      function (req, res) {
        res.cookie('token', jwt.sign(req.user, config.auth.secret, {expireInMinutes: 60*24*7}));
        res.redirect('/');
    });


	}

})(module.exports)