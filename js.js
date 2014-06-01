$(window).resize(function() {
	$('.resrel').css('z-index', '0');
})

$('#bgo').on('click', function() {
	var files =
		$('#taurl').val().split('\n').
		filter(function(s) {return s.match(/^https?:\/\/.*/);}).
		map(function(line) {
			var a = line.match(/^([^ ]+)( (.*))?$/);
			var url = a[1];
			var name = a[3];

			if (name) {
				return {url: url, filename: name};
			} else {
				return {url: url};
			}
		});

	if (!files.length) 
		return;

	function setOutp (s) {
		$('#mprog').modal('show');
		$('#pprog').text(s);
	}

	var options = {
		files: files,

		// Success is called once all files have been successfully added to the user's
		// Dropbox, although they may not have synced to the user's devices yet.
		success: function () {
			setOutp("Transfer succeeded.");
			console.log('success');
		},

		// Progress is called periodically to update the application on the progress
		// of the user's downloads. The value passed to this callback is a float
		// between 0 and 1. The progress callback is guaranteed to be called at least
		// once with the value 1.
		progress: function (progress) {
			setOutp("Transfer: " + progress *100 + '%');
			console.log(progress);
		},

		// Cancel is called if the user presses the Cancel button or closes the Saver.
		cancel: function () {console.log('cancel');},

		// Error is called in the event of an unexpected response from the server
		// hosting the files, such as not being able to find a file. This callback is
		// also called if there is an error on Dropbox or if the user is over quota.
		error: function (errorMessage) {
			console.log(errorMessage);
			setOutp("Error: " + errorMessage);
		}
	};

	Dropbox.save(options);
});