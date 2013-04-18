// This file is under copyright. See the COPYING.txt file for more information.

var Store = new StoreController();
var Filter = new FilterController();

// Makes sure neither of the lists are corrupted
if (!localStorage.phrasesBlocked)
  localStorage.phrasesBlocked = '[{"empty": true}]';
if (!localStorage.urlsBlocked)
  localStorage.urlsBlocked = '[{"empty": true}]';

chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
  Filter.refreshLists();
  sendResponse({});
});

chrome.tabs.onUpdated.addListener(function(tabId, changeInfo, tab) {
  var checkResults = Filter.checkTab(tab);
  if (checkResults.block) {
    Filter.redirectTab(tab, checkResults);
  }
});
