(function (controller) {

	controller.init = function (app) {
    var config = require('../../oauth.js'),
        mongoose = require('mongoose'),
        passport = require('passport'),
        FacebookStrategy = require('passport-facebook').Strategy;

    passport.serializeUser(function (user, next) {
    	console.log('serializeUser - user: ' + JSON.stringify(user))
      next(null, user);
    });

    passport.deserializeUser(function (obj, next) {
    	console.log('deserializeUser - obj: ' + JSON.stringify(obj));
      next(null, obj);
    })

    passport.use(new FacebookStrategy({
      clientID: config.facebook.clientID,
      clientSecret: config.facebook.clientSecret,
      callbackURL: config.facebook.callbackURL
    }, function (accessToken, refreshToken, profile, next) {
      console.log('Strategy - accessToken: ' + accessToken);
      console.log('Strategy - id: ' + profile.id);

      var user = {
      	id: profile.id,
      	displayName: profile.displayName,
      	accessToken: accessToken
      };
      process.nextTick(function () {
        next(null, user);  
      })      
    }));

    app.use(passport.initialize());
    app.use(passport.session());

    app.get('/auth/facebook', passport.authenticate('facebook'));
    app.get('/auth/facebook/callback', 
      passport.authenticate('facebook', { failureRedirect: "/#/loginfailed" }),
      function (req, res) {
        console.log('callback - login success, user: ' + JSON.stringify(req.user));
        res.cookie('user', req.user, { maxAge: 60 * 60 * 24 * 7 * 2});
        res.redirect('/#');
    });


	}

})(module.exports)