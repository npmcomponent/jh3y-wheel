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
			wheelWidth: 210,
			wheelHeight: 140,
			size: 'medium',
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
			verticalAxis: false
		},
			$wheel = $(this.selector),
			rotationDegree,
			panelWidth,
			translation,
			currentRotation,
			currentIndex,
			$panels,
			_bindPanelClick = function (panel) {
				panel.addEventListener('click', function (event) {
					roll();
				});
			},
			createWheel = function ($DOMElement) {
				$DOMElement.addClass('_0-wheel')
					.css({'width': options.wheelWidth, 'height': options.wheelHeight});
				//in here we need to iterate over the panels or panel content and put it in I think.
				if (options.panelContainer) {
					//TODO: BUG WHEN USING DOM STRUCTURE AND PANEL CONTAINER DIV IS ALREADY IN PLACE. BREAKS SOMETHING IN JQUERY.
					var $panelContainer
					if ($wheel.children('div').length > 1) {
						if (options.verticalAxis) {
							$panelContainer = $('<div class="_0-wheel-panel-container" style="transform: translateZ( -' + translation + 'px ) rotateX( -0deg );"></div>');
						} else {
							$panelContainer = $('<div class="_0-wheel-panel-container" style="transform: translateZ( -' + translation + 'px ) rotateY( -0deg );"></div>');
						}
						$panels = $wheel.children('div');
						$wheel.append($panelContainer.append($panels));
					} else if ($wheel.children().length === 1) {
						$panelContainer = $wheel.children('div').first();
						$panelContainer.addClass('_0-wheel-panel-container');
						$panels = $panelContainer.children('div');
						if (options.verticalAxis) {
							$panelContainer.attr('style', 'transform: translateZ( -' + translation + 'px ) rotateX( -0deg ); -webkit-transform: translateZ( -' + translation + 'px ) rotateX( -0deg ); -o-transform: translateZ( -' + translation + 'px ) rotateX( -0deg );');
						} else {
							$panelContainer.attr('style', 'transform: translateZ( -' + translation + 'px ) rotateY( -0deg ); -webkit-transform: translateZ( -' + translation + 'px ) rotateY( -0deg ); -o-transform: translateZ( -' + translation + 'px ) rotateY( -0deg );');
						}
					} else {
						console.log('WHEELJS: No content to be displayed');
					}
					//by time we get here we have the DOM structure we just need to configure the panels and we are done.
					$.each($panels, function (key) {
							var degs = (360 / $panels.length) * key;
							var panelData = this,
								$panel;
							// debugger;
							if (typeof(panelData.content) === 'string') {
								$panel = $(panelData.content);
							} else if (typeof(panelData.content) === 'object') {
								$panel = panelData.content;
							} else {
								$panel = $(panelData);
							}
							if (panelData.value) {
								$panel.attr('data-wheel-value', panelData.value);
							} else if ($panel.attr('value')) {
								$panel.attr('data-wheel-value', $panel.attr('value'));
							}
							$panel.addClass('_0-wheel-panel');
							if (options.verticalAxis) {
								$panel.attr('style', 'transform: rotateX(' + degs + 'deg) translateZ(' + translation + 'px); -webkit-transform: rotateX(' + degs + 'deg) translateZ(' + translation + 'px); -o-transform: rotateX(' + degs + 'deg) translateZ(' + translation + 'px);');	
							} else {
								$panel.attr('style', 'transform: rotateY(' + degs + 'deg) translateZ(' + translation + 'px); -webkit-transform: rotateY(' + degs + 'deg) translateZ(' + translation + 'px); -o-transform: rotateY(' + degs + 'deg) translateZ(' + translation + 'px);');
							}
							if (options.click) {
								_bindPanelClick($panel);
							}
						});

				} else if (options.panels) {
					if (typeof(options.panels) === 'object' && options.panels.length > 0) {						
						var $panelContainer
						if (options.verticalAxis) {
							$panelContainer = $('<div class="_0-wheel-panel-container" style="transform: translateZ( -' + translation + 'px ) rotateX( -0deg ); -webkit-transform: translateZ( -' + translation + 'px ) rotateX( -0deg ); -o-transform: translateZ( -' + translation + 'px ) rotateX( -0deg );"></div>');
						} else {
							$panelContainer = $('<div class="_0-wheel-panel-container" style="transform: translateZ( -' + translation + 'px ) rotateY( -0deg ); -webkit-transform: translateZ( -' + translation + 'px ) rotateY( -0deg ); -o-transform: translateZ( -' + translation + 'px ) rotateY( -0deg );"></div>');
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
							$panel.addClass('_0-wheel-panel');
							if (options.verticalAxis) {
								$panel.attr('style', 'transform: rotateX(' + degs + 'deg) translateZ(' + translation + 'px); -webkit-transform: rotateX(' + degs + 'deg) translateZ(' + translation + 'px); -o-transform: rotateX(' + degs + 'deg) translateZ(' + translation + 'px);');	
							} else {
								$panel.attr('style', 'transform: rotateY(' + degs + 'deg) translateZ(' + translation + 'px); -webkit-transform: rotateY(' + degs + 'deg) translateZ(' + translation + 'px); -o-transform: rotateY(' + degs + 'deg) translateZ(' + translation + 'px);');
							}
							if (options.click) {
								_bindPanelClick($panel);
							}
							$panelContainer.append($panel);
						});
						$DOMElement.append($panelContainer);
					}
				} else {
					console.log('WHEELJS: ERROR, NO panels have been defined');
				}
			},
			roll = function () {
				currentRotation = currentRotation + rotationDegree;
				if (options.verticalAxis) {
					$wheel
						.find('._0-wheel-panel-container')
						.attr('style', 'transform: translateZ( -' + translation + 'px ) rotateX( -' + Math.abs(currentRotation) + 'deg ); -webkit-transform: translateZ( -' + translation + 'px ) rotateX( -' + Math.abs(currentRotation) + 'deg ); -o-transform: translateZ( -' + translation + 'px ) rotateX( -' + Math.abs(currentRotation) + 'deg );');
				} else {
					$wheel
						.find('._0-wheel-panel-container')
						.attr('style', 'transform: translateZ( -' + translation + 'px ) rotateY( -' + Math.abs(currentRotation) + 'deg ); -webkit-transform: translateZ( -' + translation + 'px ) rotateY( -' + Math.abs(currentRotation) + 'deg ); -o-transform: translateZ( -' + translation + 'px ) rotateY( -' + Math.abs(currentRotation) + 'deg );');
				}
			},
			rollTo = function (index) {
				if (currentIndex !== index) {
					var panelContainerStyle;
					var closingBracket = $wheel.find('[data-wheel-value=' + index + ']').attr('style').indexOf(')');
					//change this because it could be different dependant on browser
					var opener = $wheel.find('[data-wheel-value=' + index + ']').attr('style').indexOf('rotate') + 8;
					var rotationDegree = $wheel.find('[data-wheel-value=' + index + ']').attr('style').substr(opener, closingBracket - 19);
					if (options.verticalAxis) {
						panelContainerStyle = "transform: translateZ( -" + translation + "px ) rotateX( -" + rotationDegree + " ); -webkit-transform: translateZ( -" + translation + "px ) rotateX( -" + rotationDegree + " ); -o-transform: translateZ( -" + translation + "px ) rotateX( -" + rotationDegree + " );"
					} else {
						panelContainerStyle = "transform: translateZ( -" + translation + "px ) rotateY( -" + rotationDegree + " ); -webkit-transform: translateZ( -" + translation + "px ) rotateY( -" + rotationDegree + " ); -o-transform: translateZ( -" + translation + "px ) rotateY( -" + rotationDegree + " );"
					}
					$wheel.find('._0-wheel-panel-container')
						.attr('style', panelContainerStyle)
					currentIndex = index;
				}
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
			this.width = options.width;
			this.height = options.height;
			this.currentRotation = currentRotation = 0;
			this.currentIndex = currentIndex = 0;
			var panelLength = options.panels.length;
			if (options.panelContainer) {
				if (this.children('div').length > 1) {
					panelLength = this.children('div').length;
				} else if (this.children('div').length === 1) {
					if (this.children('div').first().children('div').length > 0) {
						panelLength = this.children('div').first().children('div').length;
					} else {
						panelLength = 1;
					}
				}
			} else if (options.panelLength) {
				panelLength = options.panelLength;
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