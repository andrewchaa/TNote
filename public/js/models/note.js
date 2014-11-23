var Note = Base.extend({
	constructor: function (title, content) {
		that = this;
		that.title = ko.observable(title);
		that.content = ko.observable(content);
		that.links = ko.observableArray();
	}, 

	add: function (note) {
		$.post('/api/notes', { title: note.title, note: note.content })
			.done(function (response) { 
				response.links.map(function (link) {
					that.links.push(link);
				});
			})
			.fail(function (error) { console.log(error); });
	},

	update: function (note) {
		$.post('/api/notes/');
	},

	list: function () {
		$.getJSON('/api/notes', function(data) {
			console.log(data);

		})
	}
});
