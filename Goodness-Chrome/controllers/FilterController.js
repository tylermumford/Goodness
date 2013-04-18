// This file is under copyright. See the COPYING.txt file for more information.

function FilterController () {
  this._domainWhitelist = Store.getDomainWhitelist();
  this._phraseList = Store.getPhraseList();
  this._urlList = Store.getURLList();
};

FilterController.prototype.checkTab = function(tab) {
  var nextCheck;

  for (var eachDomain in this._domainWhitelist) {
    nextCheck = this._domainWhitelist[eachDomain];
    if (tab.url.indexOf(nextCheck) != -1) {
      return { 'block': false, 'reason': 'domain-whilisted', 'data': nextCheck };
    }
  }

  for (var eachURL in this._urlList) {
    nextCheck = this._urlList[eachURL];
    if (tab.url.indexOf(nextCheck) != -1) {
      return { 'block': true, 'reason': 'url-matched', 'data': nextCheck };
    }
  }

  for (var eachPhrase in this._phraseList) {
    nextCheck = this._phraseList[eachPhrase];
    if (tab.title.indexOf(nextCheck) != -1) {
      return { 'block': true, 'reason': 'phrase-matched', 'data': nextCheck };
    }
  }

  return { 'block': false, 'reason': 'not-matched' };
};

FilterController.prototype.redirectTab = function(tab, checkResults) {
  chrome.tabs.update(tab.id, {url: chrome.extension.getURL('views/block-page.html')}, null);
};

