chrome.runtime.onInstalled.addListener(function(details) {
  if (details.reason == 'install') {
    alert("Goodness installed.")
  }
})
