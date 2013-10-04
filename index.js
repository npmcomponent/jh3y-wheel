module.exports = wheel;

function wheel(element, options) {
	if (!(this instanceof wheel)) return new wheel(element, options);
	this.element = element;
	this.defaults = {
 		click: true,
 		width: 210,
 		height: 140,
 		size: 'medium',
 		clip:false,
 		perspective: '100px',
 		mouseOver: false,
		panelsContainer: false, //can be used for a DOM element that already exists containing the right structure.
		//could be a number of ways to push content for this really, could do string or object or existing DOM element, it's a tough one.
		// panels is no longer used as we are going to pass in variables of DOM elements and just use document.createElement and pass them in
		//TODO: make sure we document this as it will certainly be unclear
		panels: [
		{
			value: 1,
			content: document.createElement('div')
		},
		{
			value: 2,
			content: document.createElement('div')
		},
		{
			value: 3,
			content: document.createElement('div')
		}
		],
		verticalAxis: true
	};
	this.options = options;
	this.initialize();
}
wheel.prototype.initialize = function () {
	function extend(a, b){
		for(var key in b) {
			if(b.hasOwnProperty(key)) {
				a[key] = b[key];
			}
		}
		return a;
	}
	this.options = extend(this.defaults, this.options);

	this.width = this.options.width;
	this.height = this.options.height;
	this.currentRotation = 0;
	this.currentIndex = 0;
	if (this.options.panels) {
		this.panelLength = this.options.panels.length;
	}
	if (this.options.panelsContainer) {
		if (this.element.querySelectorAll('div').length > 1) {
			this.panelLength = this.element.querySelectorAll('div').length;
		} else if (this.element.querySelectorAll('div').length === 1) {
			if (this.element.querySelectorAll('div')[0].querySelectorAll('div').length > 0) {
				this.panelLength = this.element.querySelectorAll('div')[0].querySelectorAll('div').length;
			} else {
				this.panelLength = 1;
			}
		}
	} else if (this.options.panelLength) {
		this.panelLength = this.options.panelLength;
	}
	this.rotationDegree = 360 / this.panelLength;
	this.element.className = this.element.className + ' wheel';
	if (this.options.perspective) {
		this.element.setAttribute('style', 'perspective: ' + this.options.perspective + '; -webkit-perspective: ' + this.options.perspective + '; -moz-perspective: ' + this.options.perspective + '; -o-perspective: ' + this.options.perspective + ';');
	}
	if (typeof(this.options.width) === 'string') {
		this.element.style.width = this.options.width;
	} else if (typeof(this.options.width) === 'number') {
		this.element.style.width = this.options.width.toString() + 'px';
	}
	if (typeof(this.options.height) === 'string') {
		this.element.style.height === this.options.height;
	} else if (typeof(this.options.height) === 'number') {
		this.element.style.height = this.options.height.toString() + 'px';
	}
	if (this.options.clip) {
		this.element.style.overflow = 'hidden';
	}
	this.translation = Math.round( ( (this.element.offsetWidth * 0.9) / 2 ) / 
		Math.tan( Math.PI / this.panelLength ) );
	this.create();
	if (this.options.mouseOver) {
		console.log('wheel: mouseover is not fully supported for the wheel component yet.');
	}
	return this;	
}
wheel.prototype.create = function () {
	var panelContainer,
		panels,
		degs,
		newwheel = this;
	if (newwheel.options.panelsContainer) {
		panelContainer = document.createElement('div');
		panelContainer.className = 'wheel-panel-container';
		if (newwheel.element.querySelectorAll('div').length > 1) {
			if (newwheel.options.verticalAxis) {
				panelContainer.setAttribute('style', "transform: translateZ( -" + newwheel.translation + "px ) rotateX( -0deg );");
			} else {
				panelContainer.setAttribute('style', "transform: translateZ( -" + newwheel.translation + "px ) rotateY( -0deg );");
			}
			panels = newwheel.element.querySelectorAll('div');
			[].forEach.call(panels, function(panel) {
				panelContainer.appendChild(panel);
			});
			newwheel.element.appendChild(panelContainer);
		} else if (newwheel.element.childNodes.length === 1) {
			panelContainer = newwheel.element.querySelector('div')[0];
			panelContainer.className = 'wheel-panel-container';
			panels = panelContainer.querySelectorAll('div');
			if (newwheel.options.verticalAxis) {
				panelContainer.setAttribute('style', 'transform: translateZ( -' + newwheel.translation + 'px ) rotateX( -0deg ); -webkit-transform: translateZ( -' + newwheel.translation + 'px ) rotateX( -0deg ); -o-transform: translateZ( -' + newwheel.translation + 'px ) rotateX( -0deg );');
			} else {
				panelContainer.setAttribute('style', 'transform: translateZ( -' + newwheel.translation + 'px ) rotateY( -0deg ); -webkit-transform: translateZ( -' + newwheel.translation + 'px ) rotateY( -0deg ); -o-transform: translateZ( -' + newwheel.translation + 'px ) rotateY( -0deg );');
			}
		} else {
			console.log('wheel: No content to be displayed');
		}
		[].forEach.call(panels, function (panel, key) {
			degs = (360 / panels.length) * key;
			if (panel.getAttribute('value')) {
				panel.setAttribute('data-wheel-value', panel.getAttribute('value'));
			} else {
				panel.setAttribute('data-wheel-value', key);
			}
			panel.className = panel.className + ' wheel-panel';
			if (newwheel.options.verticalAxis) {
				panel.setAttribute('style', 'transform: rotateX(' + degs + 'deg) translateZ(' + newwheel.translation + 'px); -webkit-transform: rotateX(' + degs + 'deg) translateZ(' + newwheel.translation + 'px); -o-transform: rotateX(' + degs + 'deg) translateZ(' + newwheel.translation + 'px);');	
			} else {
				panel.setAttribute('style', 'transform: rotateY(' + degs + 'deg) translateZ(' + newwheel.translation + 'px); -webkit-transform: rotateY(' + degs + 'deg) translateZ(' + newwheel.translation + 'px); -o-transform: rotateY(' + degs + 'deg) translateZ(' + newwheel.translation + 'px);');
			}
			if (newwheel.options.click) {
				newwheel._bindPanelClick(panel);
			}
		});
	} else if (newwheel.options.panels) {
		if (typeof(newwheel.options.panels) === 'object' && newwheel.options.panels.length > 0) {						
			panelContainer = document.createElement('div');
			panelContainer.className = 'wheel-panel-container';
			if (newwheel.options.verticalAxis) {
				panelContainer.setAttribute('style', 'transform: translateZ( -' + newwheel.translation + 'px ) rotateX( -0deg ); -webkit-transform: translateZ( -' + newwheel.translation + 'px ) rotateX( -0deg ); -o-transform: translateZ( -' + newwheel.translation + 'px ) rotateX( -0deg );');
			} else {
				panelContainer.setAttribute('style', 'transform: translateZ( -' + newwheel.translation + 'px ) rotateY( -0deg ); -webkit-transform: translateZ( -' + newwheel.translation + 'px ) rotateY( -0deg ); -o-transform: translateZ( -' + newwheel.translation + 'px ) rotateY( -0deg );');
			}
			var panels = newwheel.options.panels;
			[].forEach.call(panels, function (panel, key) {
				degs = (360 / panels.length) * key;
				panelData = panel;
				if (typeof(panelData.content) === 'object') {
					$panel = panelData.content;
				} else {
					console.log('wheel: ERROR, incorrect panel declaration');
				}
				if (panelData.value) {
					$panel.setAttribute('data-wheel-value', panelData.value);
				}
				$panel.className = $panel.className + ' wheel-panel';
				if (newwheel.options.verticalAxis) {
					$panel.setAttribute('style', 'transform: rotateX(' + degs + 'deg) translateZ(' + newwheel.translation + 'px); -webkit-transform: rotateX(' + degs + 'deg) translateZ(' + newwheel.translation + 'px); -o-transform: rotateX(' + degs + 'deg) translateZ(' + newwheel.translation + 'px);');
				} else {
					$panel.setAttribute('style', 'transform: rotateY(' + degs + 'deg) translateZ(' + newwheel.translation + 'px); -webkit-transform: rotateY(' + degs + 'deg) translateZ(' + newwheel.translation + 'px); -o-transform: rotateY(' + degs + 'deg) translateZ(' + newwheel.translation + 'px);');
				}
				panelContainer.appendChild($panel);
			});
			newwheel.element.appendChild(panelContainer);
			//try and do the behaviour binding after the DOM has been changed. newwheel doesn't seem to matter in Firefox but kicks up a fuss in Chrome.
			if (newwheel.options.click) {
				panels = panelContainer.querySelectorAll('.wheel-panel');
				[].forEach.call(panels, function (clickPanel) {
					newwheel._bindPanelClick(clickPanel);
				});
			}
		}
	} else {
		console.log('wheel: ERROR, NO panels have been defined');
	}
}
wheel.prototype._bindPanelClick = function (panel) {
	var wheel = this;
	panel.addEventListener('click', function (event) {
		wheel.roll();
	});
}
wheel.prototype.roll = function () {
	this.currentRotation = this.currentRotation + this.rotationDegree;
	if (this.options.verticalAxis) {
		this.element.querySelector('.wheel-panel-container').setAttribute('style', 'transform: translateZ( -' + this.translation + 'px ) rotateX( -' + Math.abs(this.currentRotation) + 'deg ); -webkit-transform: translateZ( -' + this.translation + 'px ) rotateX( -' + Math.abs(this.currentRotation) + 'deg ); -o-transform: translateZ( -' + this.translation + 'px ) rotateX( -' + Math.abs(this.currentRotation) + 'deg );');						
	} else {
		this.element.querySelector('.wheel-panel-container').setAttribute('style', 'transform: translateZ( -' + this.translation + 'px ) rotateY( -' + Math.abs(this.currentRotation) + 'deg ); -webkit-transform: translateZ( -' + this.translation + 'px ) rotateY( -' + Math.abs(this.currentRotation) + 'deg ); -o-transform: translateZ( -' + this.translation + 'px ) rotateY( -' + Math.abs(this.currentRotation) + 'deg );');
	}
},
wheel.prototype.rollTo = function (index) {
	if (this.currentIndex !== index) {
		this.closingBracket = this.element.querySelector('[data-wheel-value="' + index + '"]').getAttribute('style').indexOf(')');
		this.opener = this.element.querySelector('[data-wheel-value="' + index + '"]').getAttribute('style').indexOf('rotate') + 8;
		this.rotationDegree = this.element.querySelector('[data-wheel-value="' + index + '"]').getAttribute('style').substr(this.opener, this.closingBracket - 19);
		if (this.options.verticalAxis) {
			this.panelContainerStyle = "transform: translateZ( -" + this.translation + "px ) rotateX( -" + this.rotationDegree + " ); -webkit-transform: translateZ( -" + this.translation + "px ) rotateX( -" + this.rotationDegree + " ); -o-transform: translateZ( -" + this.translation + "px ) rotateX( -" + this.rotationDegree + " );"
		} else {
			this.panelContainerStyle = "transform: translateZ( -" + this.translation + "px ) rotateY( -" + this.rotationDegree + " ); -webkit-transform: translateZ( -" + this.translation + "px ) rotateY( -" + this.rotationDegree + " ); -o-transform: translateZ( -" + this.translation + "px ) rotateY( -" + this.rotationDegree + " );"
		}
		this.element.querySelector('.wheel-panel-container')
			.setAttribute('style', this.panelContainerStyle);
		this.currentIndex = index;
	}
};