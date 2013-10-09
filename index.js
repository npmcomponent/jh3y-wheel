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
 		swipe: false,
		panelsContainer: false, //can be used for a DOM element that already exists containing the right structure.
		//could be a number of ways to push content for this really, could do string or object or existing DOM element, it's a tough one.
		// panels is no longer used as we are going to pass in variables of DOM elements and just use document.createElement and pass them in
		//TODO: make sure we document this as it will certainly be unclear
		panels: [
		{
			content: document.createElement('div')
		},
		{
			content: document.createElement('div')
		},
		{
			content: document.createElement('div')
		}
		],
		verticalAxis: true
	};
	this.options = options;
	this.initialize();
}
wheel.prototype._getPanels = function (container) {
	var panels = [];
	[].forEach.call(container.children, function (prospectivePanel){
		if(prospectivePanel.tagName.toLowerCase() === 'div') {
			var panel = {};
			panel.content = prospectivePanel;
			panels.push(panel);
		}
	});
	return panels;
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
	this.currentRotation = 0;
	this.currentIndex = 0;
	if (this.options.panels) {
		this.panelLength = this.options.panels.length;
	}
	if (this.options.panelsContainer) {
		if (this._getPanels(this.element).length > 1) {
			this.panelLength = this._getPanels(this.element).length;
		}
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
	if (this.options.swipe) {
		console.log('wheel: swipe is not fully supported for the wheel component yet.');
	}
	return this;	
}
wheel.prototype.create = function () {
	var panelContainer,
		panels,
		degs,
		newwheel = this;
	if (newwheel.options.panelsContainer) {
		newwheel.options.panels = newwheel._getPanels(newwheel.element);
	} 
	if (newwheel.options.panels) {
		if (typeof(newwheel.options.panels) === 'object' && newwheel.options.panels.length > 0) {						
			panelContainer = document.createElement('div');
			panelContainer.className = 'wheel-panel-container';
			if (newwheel.options.verticalAxis) {
				panelContainer.setAttribute('style', 'transform: translateZ( -' + newwheel.translation + 'px ) rotateX( -0deg ); -webkit-transform: translateZ( -' + newwheel.translation + 'px ) rotateX( -0deg ); -o-transform: translateZ( -' + newwheel.translation + 'px ) rotateX( -0deg );');
			} else {
				panelContainer.setAttribute('style', 'transform: translateZ( -' + newwheel.translation + 'px ) rotateY( -0deg ); -webkit-transform: translateZ( -' + newwheel.translation + 'px ) rotateY( -0deg ); -o-transform: translateZ( -' + newwheel.translation + 'px ) rotateY( -0deg );');
			}
			[].forEach.call(newwheel.options.panels, function (panelData, key) {
				var panel;
				degs = (360 / newwheel.options.panels.length) * key;
				if (typeof(panelData.content) === 'object') {
					panel = panelData.content;
				} else {
					console.log('wheel: ERROR, incorrect panel declaration');
				}
				panel.setAttribute('data-wheel-value', key + 1);
				panel.className = panel.className + ' wheel-panel';
				if (newwheel.options.verticalAxis) {
					panel.setAttribute('style', 'transform: rotateX(' + degs + 'deg) translateZ(' + newwheel.translation + 'px); -webkit-transform: rotateX(' + degs + 'deg) translateZ(' + newwheel.translation + 'px); -o-transform: rotateX(' + degs + 'deg) translateZ(' + newwheel.translation + 'px);');
				} else {
					panel.setAttribute('style', 'transform: rotateY(' + degs + 'deg) translateZ(' + newwheel.translation + 'px); -webkit-transform: rotateY(' + degs + 'deg) translateZ(' + newwheel.translation + 'px); -o-transform: rotateY(' + degs + 'deg) translateZ(' + newwheel.translation + 'px);');
				}
				panelContainer.appendChild(panel);
			});
			newwheel.element.appendChild(panelContainer);
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