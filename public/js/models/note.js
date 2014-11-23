var Note = Base.extend({
	constructor: function (title, content) {
		that = this;
		that.title = ko.observable(title);
		that.content = ko.observable(content);
		that.selfLink = ko.observable('');
		that.updateLink = ko.observable('');
		that.deleteLink = ko.observable('');
		that.saveBtnStatus = ko.computed(function () {
			return that.updateLink() !== '' ? 'btn btn-primary' : 'btn btn-default'; 
		});
	}, 

	add: function (note) {
		$.post('/api/notes', { title: note.title, note: note.content })
			.done(function (response) { 
				response.links.map(function (link) {
					if (link.rel === 'self') { 
						that.selfLink(link.link);
					} else if (link.rel === 'update') {
						that.updateLink(link.link);
					} else if (link.rel === 'delete') {
						that.deleteLink(link.link);
					}
					console.log(link);
				});
			})
			.fail(function (error) { console.log(error); });
	},

	update: function (note) {
		console.log(note);
		if (note.updateLink()) {
			$.ajax({
				type: 'PUT',
				url: note.updateLink(), 
				data: { title: note.title(), note: note.content() }
			})
			.done(function (response) {})
			.fail(function (error) { console.log(error); });	
		}
	},

	list: function () {
		$.getJSON('/api/notes', function(data) {
			console.log(data);

		})
	}
});
