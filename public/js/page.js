$(function() {

	var options = {
	  editor: document.querySelector('[data-toggle="pen"]'),
	  debug: false
	};

	var pen = new Pen(options);
	// pen.focus();

	// $scope.toggleReadOnlyClass = 'btn-default';
	// $scope.toggleMarkdownClass = 'btn-default';
	// $scope.isReadOnly = false;
	// $scope.showMarkdown = false;

	var viewModel = {
		title: ko.observable(''),
		contentHtml: ko.observable('')
	}

	viewModel.save = function (contentElement) {
		console.log(viewModel.contentHtml());
		$.post('/api/notes', {
			title: viewModel.title, 
			note: viewModel.contentHtml 
		}).done(function (data) {
			console.log(data);
		}).fail(function (error) {
			console.log(error);
		});

	}

	ko.applyBindings(viewModel);


});
