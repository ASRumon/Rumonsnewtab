document.addEventListener('DOMContentLoaded', () => {
	const shortcutsContainer = document.getElementById('shortcuts');
	const addShortcutBtn = document.querySelector('.add-shortcut-btn');
	const saveShortcutBtn = document.getElementById('save-shortcut-btn');
	const shortcutNameInput = document.getElementById('shortcut-name');
	const shortcutUrlInput = document.getElementById('shortcut-url');
	const shortcutIconInput = document.getElementById('shortcut-icon');
	const popup = document.querySelector('.popup');
	const overlay = document.getElementById('overlay');

	// Default icon if favicon cannot be loaded
	const defaultIcon = 'icons/icons8_web.svg';

	// Load existing shortcuts from localStorage
	const loadShortcuts = () => {
		const shortcuts = JSON.parse(localStorage.getItem('shortcuts')) || [];
		shortcutsContainer.innerHTML = '';
		shortcuts.forEach(shortcut => createShortcutElement(shortcut.name, shortcut.url, shortcut.icon));
	};

	// Save shortcuts to localStorage
	const saveShortcuts = (shortcuts) => {
		localStorage.setItem('shortcuts', JSON.stringify(shortcuts));
	};

	// Create a shortcut element
	const createShortcutElement = (name, url, icon) => {
		const shortcutDiv = document.createElement('div');
		shortcutDiv.className = 'shortcut';
		shortcutDiv.innerHTML = `
			<img src="${icon}" alt="${name}" >
			<a href="${url}" target="_blank" style="text-decoration: none; color: darkwood; font-size: 0.5em; margin: 10px;">${name}</a>
			<button class="remove-shortcut-btn" style="position: absolute; top: 0; right: 0; border: none; background-color: rgba(255, 255, 255, 0); display: flex; align-items: center;">
				<img src="./icons/icons8_delete_bin.svg" height="20px" style="margin-right: 5px;">
			</button>
		`;
		shortcutsContainer.appendChild(shortcutDiv);

		// Add event listener to remove shortcut
		shortcutDiv.querySelector('.remove-shortcut-btn').addEventListener('click', () => {
			removeShortcut(name);
		});
	};

	// Remove a shortcut
	const removeShortcut = (name) => {
		const shortcuts = JSON.parse(localStorage.getItem('shortcuts')) || [];
		const updatedShortcuts = shortcuts.filter(shortcut => shortcut.name !== name);
		saveShortcuts(updatedShortcuts);
		loadShortcuts(); // Reload shortcuts
	};

	// Open popup
	addShortcutBtn.addEventListener('click', () => {
		popup.style.display = 'block';
		overlay.style.display = 'block';
	});

	// Close popup
	const closePopup = () => {
		popup.style.display = 'none';
		overlay.style.display = 'none';
		shortcutNameInput.value = '';
		shortcutUrlInput.value = '';
		shortcutIconInput.value = '';
	};

	// Add a new shortcut
	saveShortcutBtn.addEventListener('click', async () => {
		const name = shortcutNameInput.value.trim();
		const url = shortcutUrlInput.value.trim();
		const file = shortcutIconInput.files[0];
		let icon = '';

		if (name && url) {
			if (file) {
				const reader = new FileReader();
				reader.onload = (e) => {
					icon = e.target.result;
					saveShortcut(name, url, icon);
				};
				reader.readAsDataURL(file);
			} else {
				icon = await fetchFavicon(new URL(url).hostname);
				saveShortcut(name, url, icon);
			}
		}
	});

	const saveShortcut = (name, url, icon) => {
		const shortcuts = JSON.parse(localStorage.getItem('shortcuts')) || [];
		shortcuts.push({ name, url, icon });
		saveShortcuts(shortcuts);
		createShortcutElement(name, url, icon);
		closePopup();
	};

	// Fetch favicon from URL
	const fetchFavicon = async (url) => {
		try {
			const response = await fetch(`https://www.google.com/s2/favicons?domain=${url}`);
			if (response.ok) {
				return response.url;
			} else {
				throw new Error('Favicon not found');
			}
		} catch (error) {
			console.error(error);
			return defaultIcon; // Fallback to a default icon
		}
	};

	// Initial load
	loadShortcuts();
});

document.addEventListener('DOMContentLoaded', () => {
	const closeButton = document.querySelector('.popup-close');
	closeButton.addEventListener('click', () => {
		const popup = document.querySelector('.popup');
		const overlay = document.getElementById('overlay');
		const shortcutNameInput = document.getElementById('shortcut-name');
		const shortcutUrlInput = document.getElementById('shortcut-url');
		const shortcutIconInput = document.getElementById('shortcut-icon');

		if (popup) {
			popup.style.display = 'none';
			overlay.style.display = 'none';
			shortcutNameInput.value = '';
			shortcutUrlInput.value = '';
			shortcutIconInput.value = '';
		}
	});
});
