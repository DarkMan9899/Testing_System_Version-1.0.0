$(document).ready(function () {
	//------------------------------------------------------------------------
	if ($('body')) $('input').css('background', 'border-box');

	$('input').keypress(function (e) {
		if (e.charCode === 32) e.preventDefault();
	}).on("cut copy paste drop", function (e) {
		e.preventDefault();
	});



	//-----------------------------------------------------------------------
	$('#log').click(function () {
		$('#registration').hide();
		$('#login').show();
	});


	$('#reg').click(function () {
		$('#login').hide();
		$('#registration').show();
	})
});