chrome.runtime.onInstalled.addListener(function(details) {
  if (details.reason == 'update') {
    /*if (localStorage.filterMode) {
      localStorage.optionsPageEntryMode = localStorage.filterMode;
      localStorage.filterMode = undefined;
    }*/
  }
})
