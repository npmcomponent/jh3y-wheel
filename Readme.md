# wheel

  A simple wheel/carousel component compatible with [component](https://github.com/component/component) package manager.

## Demo

A simple demo of wheel can be seen [here](http://jsfiddle.net/BDJmq/2/).

## Installation

  Install with [component(1)](https://github.com/component/component):

    $ component install jheytompkins/wheel


## Use

Include necessary script and style files and simply do as in the [example.html](https://github.com/jheytompkins/wheel/master/example.html) page:

		//here we are simply just creating some mock panels but these could already be in the DOM
		var panels = [],
			panel,
			panelElement;
		for (var i = 0; i < 3; i++) {
			panel = {};
			panel.value = i + 1;
			panelElement = document.createElement('div');
			panelElement.innerHTML = (i + 1);
			panels.push(panel);
			panel.content = panelElement;
		};
		// pull in wheel
		var wheel = require('wheel');
		//grab the element we want to turn into a wheel
		var element = document.querySelector('.myWheel');
		//create our wheel using the defined panels.
		var newwheel = new wheel(element, {
			panels: panels,
			width: '100%',
			height: 140,
			clip: false,
			click: true
		});

Alternatively with a different DOM structure such as the following example:

	<div class="myWheel">
		<div>1</div>
		<div>2</div>
		<div>3</div>
	</div>

We can create a wheel by passing in the `panelsContainer` option as `true` instead and leaving out the `panels` option.

## Use without component package manager

 If you want to use wheel without the component package manager you can by simply adding [jheytompkins_wheel.js](https://github.com/jheytompkins/wheel/master/jheytompkins_wheel.js) to your script files and using in the following way:

	 		var wheel = new jheytompkins_wheel(element, {
	 			panels: panels,
				width: '100%',
				height: 140,
				clip: false,
				click: true
	 		});

## API

The following options can be used with wheel:

		click: true / false
		width: string px / number
		height: string px / number
		clip: true / false (sets an overflow hidden so that nothing is seen outside the panel container)
		perspective: string px (experimental for setting different perspectives)
		mouseOver: true / false (not currently supported)
		panelsContainer: true /false (can be used for a DOM element that already exists containing the right structure.)
		panels: JSON structure as below 
			[
				{
					value: 1,
					content: DOMElement
				},
				{
					value: 2,
					content: DOMElement
				},
				{
					value: 3,
					content: DOMElement
				}
			]
		verticalAxis: true / false (sets orientation)

The following methods are also available:

	roll() : roll the wheel.
	rollTo() : roll the wheel to a particular index.

## Contributions and Suggestions

Are always welcome of course :)

## License

  MIT
