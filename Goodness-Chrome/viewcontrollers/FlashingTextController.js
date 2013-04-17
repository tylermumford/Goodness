// This file is under copyright. See the COPYING.txt file for more information.

function FlashingTextController(_id, _interval, _colorArray) {
	if (_id === undefined || _id === null) {
		throw new Error('An element id is required.')
	}
	else {
		this._element = document.getElementById(_id);
		this._interval = _interval;
		this._colorArray = _colorArray;
		this._currentColorIndex = 0;
		this._timer = null;
	}
}

FlashingTextController.prototype.incrementColorIndex = function() {
	var prev = this._currentColorIndex;
	this._currentColorIndex = ++this._currentColorIndex % this._colorArray.length;
	var next = this._currentColorIndex;
};

FlashingTextController.prototype.getColor = function() {
	return this._colorArray[this._currentColorIndex].toString();
};

FlashingTextController.prototype.startFlashing = function() {
	var context = this;
	this._timer = setInterval(
		function () {
			flash.call(context);
		},
		this._interval
	);

	var flash = function() {
		this._element.style.textShadow = this.getColor() + ' 0 0 8px';
		this.incrementColorIndex();
	};
};

FlashingTextController.prototype.stopFlashing = function() {
	clearInterval(this._timer)
};
