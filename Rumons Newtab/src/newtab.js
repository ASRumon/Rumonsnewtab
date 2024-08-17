document.addEventListener('DOMContentLoaded', function() {
    const bookmarksContainer = document.getElementById('bookmarks-container');
  
    function createBookmarkElement(bookmark) {
      const item = document.createElement('div');
      item.className = 'bookmark-item';
  
      const favicon = document.createElement('img');
      favicon.src = `https://www.google.com/s2/favicons?sz=64&domain_url=${bookmark.url}` || 'favicon_placeholder.png';
      item.appendChild(favicon);
  
      const title = document.createElement('a');
      title.href = bookmark.url;
      title.textContent = bookmark.title;
      item.appendChild(title);
  
      return item;
    }
  
    function fetchBookmarks() {
      chrome.bookmarks.getTree(function(bookmarkTreeNodes) {
        bookmarkTreeNodes.forEach(function(node) {
          processNode(node);
        });
      });
    }
  
    function processNode(node) {
      if (node.url) {
        bookmarksContainer.appendChild(createBookmarkElement(node));
      }
      if (node.children) {
        node.children.forEach(function(child) {
          processNode(child);
        });
      }
    }
  
    fetchBookmarks();
  });
  