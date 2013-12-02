# wheel

  A simple wheel/carousel component compatible with [component](https://github.com/component/component) package manager.

## demo

A simple demo of wheel can be seen [here](http://jsfiddle.net/BDJmq/4/).

## installation

  Install with [component(1)](https://github.com/component/component):

    $ component install jh3y/wheel


## use
Use with or without [component package manager](https://github.com/component/component).
###element structure
If using the `panelsContainer` option, __wheel__ will operate on an already present DOM structure where the element passed in is the parent and the structure is as follows;

	<div class="myWheel">
		<div>A</div>
		<div>B</div>
		<div>C</div>
	</div>

###use with [component package manager](https://github.com/component/component)
Include necessary script and style files and simply do something similar to in the [example](https://github.com/jh3y/wheel/blob/master/example.html) page:

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

Alternatively with an already DOM structure such as the following example:

	<div class="myWheel">
		<div>A</div>
		<div>B</div>
		<div>C</div>
	</div>

We can create a wheel by passing in the `panelsContainer` option as `true` instead and leaving out the `panels` option.

###use without component package manager

 If you want to use __wheel__ without the component package manager you can by simply adding [wheel.js](https://github.com/jh3y/wheel/blob/master/wheel.js) to your script files and using in the following way:

	 		var wheel = new wheel(element, {
	 			panels: panels,
				width: '100%',
				height: 140,
				clip: false,
				click: true
	 		});

Of course remembering to include [wheel.css](https://github.com/jh3y/wheel/blob/master/wheel.css).

## api
###options
The following options can be used with wheel:
####click: true/false
click navigation.
####width: string px / number
define width.
####height: string px / number
define height.
####clip: true / false
sets overflow hidden so nothing is visible outside of the panel container.
####perspective: string px
sets the css perspective for the wheel animation effect.
####panelsContainer: true / false
defines whether the necessary DOM structure is already in place.
####panels
when defined, supplies the content for the wheel panels, here is an example;
	
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

####verticalAxis: true / false
sets vertical orientation for the wheel
###functions
The following functions are also available
####roll
roll the wheel.
####rollTo(index)
roll the wheel to a particular index.

## contributions 

and suggestions are always welcome of course :)

## License

  MIT
