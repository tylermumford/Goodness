// This file is under copyright. See the COPYING.txt file for more information.

function StoreController() {
  this._emptyListValue = '[{ "empty": true }]'];
}

StoreController.prototype.getPhraseList = function() {
  return JSON.parse(localStorage.phrasesBlocked);
};

StoreController.prototype.getURLList = function() {
  return JSON.parse(localStorage.urlsBlocked);
};

StoreController.prototype.setPhraseList = function(phraseStringArray) {
  localStorage.phrasesBlocked = JSON.stringify(phraseStringArray);
};

StoreController.prototype.setURLList = function(urlStringArray) {
  localStorage.urlsBlocked = JSON.stringify(urlStringArray);
};
