chrome.webNavigation.onCompleted.addListener(function(details) {
  if (details.url.startsWith('https://www.ecosia.org/search')) {
    chrome.storage.sync.get('searchCount', function(data) {
      const searchCount = data.searchCount || 0;
      chrome.storage.sync.set({ searchCount: searchCount + 1 });
    });
  }
}, { url: [{ urlMatches: 'https://www.ecosia.org/search' }] });
