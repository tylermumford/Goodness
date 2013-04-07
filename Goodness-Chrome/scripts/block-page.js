/*
This work is licensed under the Creative Commons Attribution-ShareAlike 3.0 Unported License.
To view a copy of this license, visit http://creativecommons.org/licenses/by-sa/3.0/ or send a letter to Creative Commons, 171 Second Street, Suite 300, San Francisco, California, 94105, USA.
*/

function bodyOnLoad() {
	var one = $id('light-one').style;
	var two = $id('light-two').style;
	
	function oneRed_twoBlue() {
		one.textShadow = 'red 0 0 8px';
		two.textShadow = 'blue 0 0 8px';
	};
	
	function oneBlue_twoRed() {
		one.textShadow = 'blue 0 0 8px';
		two.textShadow = 'red 0 0 8px';
	};
	
	function repeat() {
		if (String(one.textShadow).charAt(0) == 'r') {
			oneBlue_twoRed();
		} else {
			oneRed_twoBlue();
		}
	};
	
	var flashInterval = setInterval(function() {repeat();}, 400);
};
