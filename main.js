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
	var alarmSet = false;
	var alarmTimeHours;
	var alarmTimeMinutes;
	function setClock() {
		var date = new Date();
		var hoursDisplay = date.getHours();
		if (hoursDisplay > 12) {
			hoursDisplay = hoursDisplay - 12;
		}
		if (hoursDisplay < 10) {
			hoursDisplay = '0' + hoursDisplay.toString();
		} else {
			hoursDisplay = hoursDisplay.toString();
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
		//this shouldn't really be in here but we will put it here anyway.
		if (alarmSet) {
			if (hoursDisplay === alarmTimeHours && minutesDisplay === alarmTimeMinutes) {
				alert('WAKE UP!!!');
				$('#hours_alarm, #minutes_alarm').val('');
				$('.alarm-status').addClass('hide');
				alarmSet = false;
			}
		}
		var time = setTimeout(function () { setClock(); }, 1000);	
	}
	function init (){
		setClock();
		$('#set').on('click', function () {
			//need to set alarm for time
			var hourSet = parseInt($('#hours_alarm').val(), 10);
			var minutesSet = parseInt($('#minutes_alarm').val(), 10);
			alarmSet = true;
			if (hourSet < 10) {
				alarmTimeHours = '0' + hourSet.toString();
			} else {
				alarmTimeHours = hourSet.toString();
			}
			if (minutesSet < 10) {
				alarmTimeMinutes = '0' + minutesSet.toString();
			} else {
				alarmTimeMinutes = minutesSet.toString();
			}
			$('.alarm-status').text('Alarm set for ' + alarmTimeHours + ':' + alarmTimeMinutes + '.').removeClass('hide');
		});
	}
	return {
		init: init,
	}
})();
$(document).ready(jheytompkins.wheel.init);