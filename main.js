var jheytompkins = {};
jheytompkins.wheel = (function (){
	var $wheel = $('#wheel').wheel({
		panelContainer: true
	});
	var $wheelDOM = $('#hours').wheel({
		panelContainer: true,
		verticalAxis: true
	});
	var minutes = [];
	for (var i = 0; i < 60; i++) {
		minutes.push({
			value: i,
			content: $('<div>' + i + '</div>')
		})
	};
	var $minutes = $('#minutes').wheel({
		verticalAxis: true,
		panels: minutes
	});
	function init (){
		console.log('Wheel demo initialised.');
		$('#roller').on('click', function () {
			$wheel.roll('right');
		});
		// $('[type=radio]').on('change', function(){
		// 	$flipboard.setSpeed(this.value);
		// });
	}
	return {
		init: init,
	}
})();
$(document).ready(jheytompkins.wheel.init);