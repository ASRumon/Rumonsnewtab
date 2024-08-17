document.addEventListener('DOMContentLoaded', function() {
    const historyContainer = document.getElementById('history-container');
  
    function createHistoryElement(historyItem) {
      const item = document.createElement('div');
      item.className = 'history-item';
  
      const favicon = document.createElement('img');
      favicon.src = `https://www.google.com/s2/favicons?sz=64&domain_url=${historyItem.url}` || 'favicon_placeholder.png';
      item.appendChild(favicon);
  
      const title = document.createElement('a');
      title.href = historyItem.url;
      title.textContent = historyItem.title || historyItem.url;
      item.appendChild(title);
  
      return item;
    }
  
    function fetchHistory() {
      chrome.history.search({ text: '', maxResults: 20 }, function(data) {
        data.forEach(function(historyItem) {
          historyContainer.appendChild(createHistoryElement(historyItem));
        });
      });
    }
  
    fetchHistory();
  });
  