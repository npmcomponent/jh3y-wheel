(function($){
	'use strict';
	$.fn.wheel = function(options) {
		if (this.length > 1) {
			this.each(function() {$(this).wheel(options)});
			return this;
		}
		var defaults = {
			// speed: 'normal', : SPEED COULD BE INTRODUCED IF WE DO A JUMP TO VALUES
			click: true,
			mouseOver: false,
			panelsContainer: false, //can be used for a DOM element that already exists containing the right structure.
			//could be a number of ways to push content for this really, could do string or object or existing DOM element, it's a tough one.
			panels: [
				{
					value: 1,
					content: $('<div>1</div>')
				},
				{
					value: 2,
					content: $('<div>2</div>')
				},
				{
					value: 3,
					content: $('<div>3</div>')
				}
			]
		},
			$wheel = $(this.selector),
			createWheel = function ($DOMElement) {
				$DOMElement.addClass('wheel')
					.css({'width': options.width, 'height': options.height});
				//in here we need to iterate over the panels or panel content and put it in I think.
				if (options.panelsContainer) {
					//investigate the container for divs and assign them as the panels and take any data-wheel-value attributes into consideration possibly.
					console.log('TODO: you havent implemented this technique yet');
				} else if (options.panels) {
					if (typeof(options.panels) === 'object' && options.panels.length > 0) {
						console.log('were in business');
						var tz = Math.round( ( 120 / 2 ) / 
  							Math.tan( Math.PI / options.panels.length ) );
						var $panelContainer = $('<div class="panel-container" style="transform: translateZ( -' + 61 + 'px ) rotateY( -0deg );"></div>');
						$.each(options.panels, function (key) {
							var degs = (360 / options.panels.length) * key;
							var panelData = this,
								$panel;
							if (typeof(panelData.content) === 'string') {
								$panel = $(panelData.content);
							} else if (typeof(panelData.content) === 'object') {
								$panel = panelData.content;
							} else {
								console.log('WHEELJS: ERROR, incorrect panel declaration');
							}
							if (panelData.value) {
								$panel.attr('data-wheel-value', panelData.value);
							}
							$panel.attr('style', 'transform: rotateY(' + degs + 'deg) translateZ(' + 61 + 'px)');
							$panelContainer.append($panel);
						});
						$DOMElement.append($panelContainer);
					}
				} else {
					console.log('WHEELJS: ERROR, NO panels have been defined');
				}
			},
			roll = function () {
				//TODO: add functionality which basically just rolls it on around once.
				console.log('rolling rolling rolling');
			},
			rollTo = function (index) {
				//TODO: rolls to a fixed value if that value is specified.
				console.log('keep rolling rolling rolling');
			};
		options = $.extend(defaults, options);
		this.roll = function () {
			roll();
		};
		this.rollTo = function (index) {
			rollTo(index);
		};
		this.setSpeed = function (value) {
			if (value === 'normal' || value === 'slow' || value === 'fast') {
				var classes = $(this).attr('class');				
				$(this).attr('class', classes.replace(this.speed, value));
				this.speed = value;
			} else {
				console.log('WHEELJS: Invalid speed ' + value + '.');
			}
		};
		this.init = function() {
			// this.speed = options.speed; MAY BE INTRODUCED LATER ON
			this.width = options.width;
			this.height = options.height;
			createWheel($wheel);
			if (options.click) {
					$wheel.on('click', function () {
						roll();
					});
				}
			if (options.mouseOver) {
				console.log('WHEELJS: Maybe in the next version buddy.');
			}
			return this;
		};
		return this.init();
	}
}($));