// This file is under copyright. See the COPYING.txt file for more information.

var Store = new StoreController();
var Filter = new FilterController();

// Makes sure neither of the lists are corrupted
if (!localStorage.phrasesBlocked)
  localStorage.phrasesBlocked = '[{"empty": true}]';
if (!localStorage.urlsBlocked)
  localStorage.urlsBlocked = '[{"empty": true}]';

// Creates the global objects 'phrasesBlocked' and 'urlsBlocked'
var phrasesBlocked = Store.getPhraseList();
var urlsBlocked = Store.getURLList();

// Updates those global objects
function updatePhrases() {
  phrasesBlocked = Store.getPhraseList();
}
function updateUrls() {
  urlsBlocked = Store.getURLList();
}

function checkTabUrl(tab) {
  console.log('Now checking \"' + String(tab.url) + '\"');
  updatePhrases(); updateUrls();
  if (tab.url != chrome.extension.getURL('options.html') && tab.url != 'chrome://newtab') {
    if (!urlsBlocked[0].empty) {
      var applicableData = (urlsBlocked.length == 1 ? urlsBlocked[0] : urlsBlocked.join('|', 'ig'));
      if (tab.url.match(new RegExp(applicableData))) {
        console.log('Tab matches URL.');
        chrome.tabs.update(tab.id, {url: chrome.extension.getURL('views/block-page.html')}, null);
      }
    }
  }
};
function checkTabTitle(tab) {
  console.log('Now checking \"' + tab.title + '\"');
  updatePhrases(); updateUrls();
  if (tab.url != chrome.extension.getURL('options.html') && tab.url != 'chrome://newtab') {
    if (!phrasesBlocked[0].empty) {
      var applicableData = (phrasesBlocked.length == 1 ? phrasesBlocked[0] : phrasesBlocked.join('|', 'ig'));
      if (tab.title.match(new RegExp(applicableData, 'gi'))) {
        console.log('Tab matches phrase.');
        chrome.tabs.update(tab.id, {url: chrome.extension.getURL('views/block-page.html')}, null);
      }
    }
  }
};

chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
  if (request.message == 'Phrases Updated')
    updatePhrases();
  else if (request.message == 'URLs Updated')
    updateUrls();
  
  sendResponse({});
});

// Page filtering
chrome.tabs.onUpdated.addListener(function(tabId, changeInfo, tab) {
  checkTabUrl(tab);
  checkTabTitle(tab);
});
