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
			panelWidth: 186,
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
			],
			verticalAxis: true
		},
			$wheel = $(this.selector),
			rotationDegree,
			panelWidth,
			translation,
			currentRotation,
			createWheel = function ($DOMElement) {
				$DOMElement.addClass('wheel')
					.css({'width': options.width, 'height': options.height});
				//in here we need to iterate over the panels or panel content and put it in I think.
				if (options.panelsContainer) {
					//this becomes quite difficult because we can make it so the user doesn't have to do much but then we have to maybe iterate through the child elements or something
					//and use the dom elements which are assigned panel class? maybe just find all div underneath
					//investigate the container for divs and assign them as the panels and take any data-wheel-value attributes into consideration possibly.
					console.log('TODO: you havent implemented this technique yet');
				} else if (options.panels) {
					if (typeof(options.panels) === 'object' && options.panels.length > 0) {						
						var $panelContainer
						if (options.verticalAxis) {
							$panelContainer = $('<div class="panel-container" style="transform: translateZ( -' + translation + 'px ) rotateX( -0deg );"></div>');
						} else {
							$panelContainer = $('<div class="panel-container" style="transform: translateZ( -' + translation + 'px ) rotateY( -0deg );"></div>');
						}
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
							$panel.addClass('panel');
							if (options.verticalAxis) {
								$panel.attr('style', 'transform: rotateX(' + degs + 'deg) translateZ(' + translation + 'px)');	
							} else {
								$panel.attr('style', 'transform: rotateY(' + degs + 'deg) translateZ(' + translation + 'px)');
							}
							if (options.click) {
								if (options.verticalAxis) {
									// top and bottom click functionality
									var $top = $('<div class="panel-top"></div>').on('click', function () {
										roll('top');
									});
									var $bottom = $('<div class="panel-bottom"></div>').on('click', function () {
										roll('bottom');
									});
									$panel.append($top, $bottom);
								} else {
									var $left = $('<div class="panel-left"></div>').on('click', function () {
										roll('left');
									});
									var $right = $('<div class="panel-right"></div>').on('click', function () {
										roll('right');
									});
									$panel.append($left, $right);
								}
							}
							$panelContainer.append($panel);
						});
						$DOMElement.append($panelContainer);
					}
				} else {
					console.log('WHEELJS: ERROR, NO panels have been defined');
				}
			},
			roll = function (direction) {
				if (direction) {
					switch(direction) {
						case "top":
							currentRotation = currentRotation + rotationDegree;
							break;
						case "bottom":
							currentRotation = currentRotation - rotationDegree;
							break;
						case "left":
							currentRotation = currentRotation - rotationDegree;
							break;
						case "right":
							currentRotation = currentRotation + rotationDegree;
							break;
						default:
							console.log('WHEELJS: NO direction defined');
					}
				}
				if (options.verticalAxis) {
					$wheel
						.find('.panel-container')
						.attr('style', 'transform: translateZ( -' + translation + 'px ) rotateX( -' + Math.abs(currentRotation) + 'deg );');
				} else {
					$wheel
						.find('.panel-container')
						.attr('style', 'transform: translateZ( -' + translation + 'px ) rotateY( -' + Math.abs(currentRotation) + 'deg );');
				}
			},
			rollTo = function (index) {
				//TODO: rolls to a fixed value if that value is specified.
				console.log('keep rolling rolling rolling');
			};
		options = $.extend(defaults, options);
		this.roll = function (direction) {
			roll(direction);
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
			this.width = options.width;
			this.height = options.height;
			this.currentRotation = currentRotation = 0;
			var panelLength = options.panels.length;
			if (options.panelContainer) {
				this.find('div').length;
			}
			this.rotationDegree = rotationDegree = 360 / panelLength;
			this.translation = translation = Math.round( ( options.panelWidth / 2 ) / 
							Math.tan( Math.PI / panelLength ) );
			createWheel($wheel);
			if (options.mouseOver) {
				console.log('WHEELJS: Maybe mouseover in the next version buddy.');
			}
			return this;
		};
		return this.init();
	}
}($));