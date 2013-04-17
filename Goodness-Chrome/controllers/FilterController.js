// This file is under copyright. See the COPYING.txt file for more information.

function FilterController () {
  this._domainWhitelist = Store.getDomainWhitelist();
  this._phraseList = Store.getPhraseList();
  this._urlList = Store.getURLList();
};

FilterController.prototype.checkTab = function(tab) {
  for (var eachDomain in this._domainWhitelist) {
    if (tab.url.indexOf(eachDomain) != -1) {
      return { 'block': false, 'reason': 'domain-whilisted' };
    }
  }

  for (var eachURL in this._urlList) {
    if (tab.url.indexOf(eachURL) != -1) {
      return { 'block': true, 'reason': 'url-matched', 'part': eachURL };
    }
  }

  for (var eachPhrase in this._phraseList) {
    if (tab.title.indexOf(eachPhrase) != -1) {
      return { 'block': true, 'reason': 'phrase-matched', 'part': eachPhrase };
    }
  }

  return { 'block': false, 'reason': 'not-matched' };
};

