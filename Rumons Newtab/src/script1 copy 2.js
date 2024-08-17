
			document.addEventListener("DOMContentLoaded", function () {
				chrome.runtime.sendMessage({
					action: "getData"
				}, function (response) {
					displayBookmarks(response.bookmarks);
					displayFavorites(response.favorites);
				});
			});

			function displayBookmarks(bookmarks) {
				var bookmarksContainer = document.getElementById("bookmarks-container");

				bookmarks.forEach(function (bookmark) {
					var bookmarkItem = document.createElement("div");
					bookmarkItem.textContent = bookmark.title;
					bookmarksContainer.appendChild(bookmarkItem);
				});
			}

			function displayFavorites(favorites) {
				var favoritesContainer = document.getElementById("favorites-container");

				favorites.forEach(function (favorite) {
					var favoriteItem = document.createElement("div");
					favoriteItem.textContent = favorite.title;
					favoritesContainer.appendChild(favoriteItem);
				});
			}
	