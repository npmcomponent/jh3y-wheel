var jheytompkins = {};
jheytompkins.wheel = (function (){
	var $wheel = $('#wheel').wheel({});
	function init (){
		console.log('Wheel demo initialised.');
		// $('#flipper').on('click', function () {
		// 	$flipboard.flip();
		// });
		// $('[type=radio]').on('change', function(){
		// 	$flipboard.setSpeed(this.value);
		// });
	}
	return {
		init: init,
	}
})();
$(document).ready(jheytompkins.wheel.init);