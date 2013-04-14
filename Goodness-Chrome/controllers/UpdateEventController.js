chrome.runtime.onInstalled.addListener(function(details) {
  if (details.reason == 'update') {
    alert("Goodness updated.")
  }
})
