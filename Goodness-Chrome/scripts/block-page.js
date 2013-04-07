// This file is under copyright. See the COPYING.txt file for more information.

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
