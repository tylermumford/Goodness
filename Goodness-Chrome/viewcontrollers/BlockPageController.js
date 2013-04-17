// This file is under copyright. See the COPYING.txt file for more information.

// Requires FlashingTextController.

(function() {
  var redThenBlue = [ 'red', 'blue' ];
  var blueThenRed = [ 'blue', 'red' ];

  var redLight = new FlashingTextController('light-one', 400, redThenBlue);
  var blueLight = new FlashingTextController('light-two', 400, blueThenRed);

  redLight.startFlashing();
  blueLight.startFlashing();

  return;
}())
