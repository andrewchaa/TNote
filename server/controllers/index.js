(function (controllers) {

	controllers.init = function (app, router) {
		require('./homeController').init(app);
		require('./authController').init(app);
		require('./apiController').init(router);
	};

})(module.exports)