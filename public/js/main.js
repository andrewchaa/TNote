require.config({
	paths: {
		"knockout": "/vendor/knockout/dist/knockout",
		"knockout-amd-helpers": "/vendor/knockout-amd-helpers/build/knockout-amd-helpers.min",
		"knockout.ext": "/js/knockout.ext",
		"page": "/js/page"

	}
});

require(['knockout', 'knockout-amd-helpers', 'knockout.ext'], function(ko) {
	ko.bindingHandlers.module.baseDir = "modules";
});

// require([
// 	"/vendor/knockout/dist/knockout", 
// 	"/vendor/knockout-amd-helpers/build/knockout-amd-helpers"
// 	], function (ko) {
// 	ko.bindingHandlers.module.baseDir = "modules";
// 	ko.bindingHandlers.module.templateProperty = "embeddedTemplate";
// });


