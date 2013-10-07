# wheel

  A simple wheel/carousel component compatible with [component](http://component.io) package manager.

## Demo

A simple demo of wheel can be seen [here](http://jsfiddle.net/BDJmq/).

## Installation

  Install with [component(1)](http://component.io):

    $ component install jheytompkins/wheel


## Use

Include necessary script and style files and simply do as in the [example.html](https://github.com/jheytompkins/wheel/master/example.html) page:

		//pull in wheel component code. This could be named anything in this case wheel.
		var wheel = require('wheel');
		//grab an element
		var element = document.querySelector('.myWheel');
		//create a wheel with whatever options you desire.
		var newwheel = new wheel(element, {
			panels: panels,
			width: '100%',
			height: 140,
			clip: false,
			click: true
		}); 

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
		panels: JSON structure as below / jQuery object
			[
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
		verticalAxis: true / false (sets orientation)

The following methods are also available:

	roll() : roll the wheel.
	rollTo() : roll the wheel to a particular index.

## License

  MIT
