var jheytompkins = {};
jheytompkins.wheel = (function (){
	var $hours = $('#hours').wheel({
		panelContainer: true,
		verticalAxis: true,
		click: false
	});
	var minutes = [];
	for (var i = 0; i < 60; i++) {
		var display = i;
		if (i < 10) {
			display = '0' + i.toString();
		}
		minutes.push({
			value: display,
			content: $('<div>' + display + '</div>')
		})
	};
	var $minutes = $('#minutes').wheel({
		verticalAxis: true,
		panels: minutes,
		click: false
	});
	var seconds = [];
	for (var i = 0; i < 60; i++) {
		var display = i;
		if (i < 10) {
			display = '0' + i.toString();
		}
		seconds.push({
			value: display,
			content: $('<div>' + display + '</div>')
		})
	};
	var $seconds = $('#seconds').wheel({
		verticalAxis: true,
		panels: seconds,
		click: false
	});
	function setClock() {
		var date = new Date();
		var hoursDisplay;
		if (date.getHours() < 10) {
			hoursDisplay = '0' + date.getHours().toString();
		} else {
			hoursDisplay = date.getHours().toString();
		}
		var minutesDisplay;
		if (date.getMinutes() < 10) {
			minutesDisplay = '0' + date.getMinutes().toString();
		} else {
			minutesDisplay = date.getMinutes().toString();
		}
		var secondsDisplay;
		if (date.getSeconds() < 10) {
			secondsDisplay = '0' + date.getSeconds().toString();
		} else {
			secondsDisplay = date.getSeconds().toString();
		}
		if ($hours.currentIndex !== hoursDisplay) {
			$hours.rollTo(hoursDisplay);
		}
		if ($minutes.currentIndex !== minutesDisplay) {
			$minutes.rollTo(minutesDisplay);
		}
		if ($seconds.currentIndex !== secondsDisplay) {
			$seconds.rollTo(secondsDisplay);
		}
		var time = setTimeout(function () { setClock(); }, 1000);	
	}
	function init (){
		setClock();
	}
	return {
		init: init,
	}
})();
$(document).ready(jheytompkins.wheel.init);