// This file is under copyright. See the COPYING.txt file for more information.

function ascertainSituation() {
  if (!localStorage.runBefore) {
    // Actions to run on first launch
    localStorage.phrasesBlocked = '[{"empty": true}]';
    localStorage.urlsBlocked = '[{"empty": true}]';
    localStorage.runBefore = true;
    
    
    // get the prompt page to open here
    // Prompt page?
  }
}

// Makes sure neither of the filters are corrupted
if (!localStorage.phrasesBlocked)
  localStorage.phrasesBlocked = '[{"empty": true}]';
if (!localStorage.urlsBlocked)
  localStorage.urlsBlocked = '[{"empty": true}]';

// Creates the global objects 'phrasesBlocked' and 'urlsBlocked'
var phrasesBlocked = JSON.parse(localStorage.phrasesBlocked);
var urlsBlocked = JSON.parse(localStorage.urlsBlocked);

// Updates those global objects
function updatePhrases() {
  phrasesBlocked = JSON.parse(localStorage.phrasesBlocked);
  return;
}
function updateUrls() {
  urlsBlocked = JSON.parse(localStorage.urlsBlocked);
  return;
}

function checkTabUrl(tab) {
  console.log('Now checking \"' + String(tab.url) + '\"');
  updatePhrases(); updateUrls();
  if (tab.url != chrome.extension.getURL('options.html') && tab.url != 'chrome://newtab') {
    if (!urlsBlocked[0].empty) {
      var applicableData = (urlsBlocked.length == 1 ? urlsBlocked[0] : urlsBlocked.join('|', 'ig'));
      if (tab.url.match(new RegExp(applicableData))) {
        console.log('Tab matches URL.');
        chrome.tabs.update(tab.id, {url: chrome.extension.getURL('pages/block-page.html')}, null);
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
        chrome.tabs.update(tab.id, {url: chrome.extension.getURL('pages/block-page.html')}, null);
      }
    }
  }
};

chrome.extension.onRequest.addListener(function(request, sender, sendResponse) {
  if (request.message == 'Phrases Updated')
    updatePhrases();
  else if (request.message == 'URLs Updated')
    updateUrls();
  
  sendResponse({});
});

// URL filtering
chrome.tabs.onCreated.addListener(function(tab) {
  checkTabUrl(tab);
  checkTabTitle(tab);
});
chrome.tabs.onUpdated.addListener(function(tabId, changeInfo, tab) {
  checkTabUrl(tab);
  checkTabTitle(tab);
});
