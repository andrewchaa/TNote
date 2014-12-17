(function (controller) {
  controller.init = function (app, passport) {
    app.get("/", function (req, res) {
        res.render("index", {});
    });

    app.post(
      '/login', 
      passport.authenticate('local', { 
        successRedirect: '/', 
        failureRedirect: '/login',
        successFlash: 'Welcome!',
        failureFlash: true
      }), 
      function (req, res) {
      
    });
  };
})(module.exports);