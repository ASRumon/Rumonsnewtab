document.addEventListener('DOMContentLoaded', function () {
    const actions = {
        'google': 'https://www.google.com',
        'office': 'https://www.office.com',
        'chatgpt': 'https://chat.openai.com',
        'bard': 'https://gemini.google.com/app',
        'chromeWebStore': 'https://chrome.google.com/webstore',
        'bookmarks': 'chrome://bookmarks',
        'downloads': 'chrome://downloads',
        'history': 'chrome://history',
        'extensions': 'chrome://extensions',
        'flags': 'chrome://flags'
    };

    document.querySelectorAll('.btn').forEach(function (button) {
        button.addEventListener('click', function () {
            const action = this.dataset.action;
            const url = actions[action];
            switch (action) {
                case 'google':
                case 'office':
                case 'chatgpt':
                case 'bard':
                case 'chromeWebStore':
                    window.open(url, '_blank');
                    break;
                case 'newTab':
                    chrome.tabs.create({});
                    break;
                case 'newWindow':
                    chrome.windows.create({});
                    break;
                case 'incognitoWindow':
                    chrome.windows.create({incognito: true});
                    break;
                case 'bookmarks':
                case 'downloads':
                case 'history':
                case 'extensions':
                case 'flags':
                    chrome.tabs.update({url: url});
                    break;
            }
        });
    });
});
