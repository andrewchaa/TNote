$(function() {

	// pen.focus();

	// $scope.toggleReadOnlyClass = 'btn-default';
	// $scope.toggleMarkdownClass = 'btn-default';
	// $scope.isReadOnly = false;
	// $scope.showMarkdown = false;

	var NoteViewModel = Base.extend({
		constructor: function() {
			this.notes = ko.observableArray();
			this.selectedNote = ko.observableArray();
			this.addNote = this.addNote.bind(this);
			this.editNote = this.editNote.bind(this);
		},

		addNote: function (note) {
			this.notes.push(note);
			this.selectedNote(note);
		},
		editNote: function (note) {
			this.selectedNote(note);
		}
	});

	var viewModel = new NoteViewModel();
	viewModel.addNote(new Note("title - test", "content - test"));


	// var viewModel = {
	// 	notes: ko.observableArray(),
	// 	selectedNote: ko.observable(),
	// 	title: ko.observable(''),
	// 	contentHtml: ko.observable('')
	// }

	// viewModel.save = function () {
	// 	console.log(viewModel.contentHtml());
	// 	noteModel.save(viewModel.contentHtml());
	// }

	// viewModel.list = function () {
	// 	noteModel.list();
	// }

	ko.applyBindings(viewModel);

	var options = {
	  editor: document.querySelector('[data-toggle="pen"]'),
	  debug: false
	};

	var pen = new Pen(options);



});
