(function (controller) {

	controller.init = function (app) {
    var config = require('../../config.js'),
        passport = require('passport'),
        FacebookStrategy = require('passport-facebook').Strategy
        jwt = require('jsonwebtoken');

    var authClientId = process.env.AUTH_CLIENT_ID || config.auth.AUTH_CLIENT_ID,
        authClientSecret = process.env.AUTH_CLIENT_SECRET || config.auth.AUTH_CLIENT_SECRET,
        authCallBackUrl = process.env.AUTH_CALLBACK_URL || config.auth.AUTH_CALLBACK_URL,
        authJwtSecret = process.env.AUTH_JWT_SECRET || config.auth.AUTH_JWT_SECRET;

    passport.serializeUser(function (profile, next) {
      next(null, profile);
    });

    passport.deserializeUser(function (obj, next) {
      next(null, obj);
    })

    passport.use(new FacebookStrategy({
      clientID: authClientId,
      clientSecret: authClientSecret,
      callbackURL: authCallBackUrl
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
        res.cookie('token', jwt.sign(req.user, authJwtSecret, {expireInMinutes: 60*24*7}));
        res.redirect('/');
    });


	}

})(module.exports)