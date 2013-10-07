
# wheel

  A simple wheel/carousel component.

## Installation

  Install with [component(1)](http://component.io):

    $ component install jheytompkins/wheel

## Use without component package manager

 If you want to use wheel without the component package manager you can by simply using [jheytompkins-wheel.js](https://github.com/jheytompkins/wheel) in your script files and by using in the same way.

## Use

Simply do as in the example.html page:

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

## API



## License

  MIT
