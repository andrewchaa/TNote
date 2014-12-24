(function (controller) {

	controller.init = function (app) {
    var config = require('../../oauth.js'),
        mongoose = require('mongoose'),
        passport = require('passport'),
        FacebookStrategy = require('passport-facebook').Strategy;

    passport.serializeUser(function (user, next) {
      next(null, user);
    });

    passport.deserializeUser(function (obj, next) {
      next(null, obj);
    })

    passport.use(new FacebookStrategy({
      clientID: config.facebook.clientID,
      clientSecret: config.facebook.clientSecret,
      callbackURL: config.facebook.callbackURL
    }, function (accessToken, refreshToken, profile, next) {
      console.log('accessToken: ' + accessToken);
      console.log('id: ' + profile.id);
      process.nextTick(function () {
        next(null, profile);  
      })      
    }));

    app.use(passport.initialize());
    app.use(passport.session());

    app.get('/auth/facebook', passport.authenticate('facebook'));
    app.get('/auth/facebook/callback', 
      passport.authenticate('facebook', { failureRedirect: "/#/loginfailed" }),
      function (req, res) {
        console.log('login success, user: ' + JSON.stringify(req.user));

        res.redirect('/#');
    });


	}

})(module.exports)