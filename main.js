var jheytompkins = {};
jheytompkins.wheel = (function (){
	var $wheel = $('#wheel').wheel({});
	var $wheelDOM = $('#wheel-container').wheel({
		panelContainer: true
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