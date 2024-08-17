document.addEventListener("DOMContentLoaded", function() {
    document.querySelector('.button-google').addEventListener('click', function() {
        window.open('https://www.google.com', '_blank');
    });

    document.querySelector('.button-office').addEventListener('click', function() {
        window.open('https://www.office.com', '_blank');
    });

    document.querySelector('.button-chatgpt').addEventListener('click', function() {
        window.open('https://chat.openai.com', '_blank');
    });

    document.querySelector('.button-bard').addEventListener('click', function() {
        window.open('https://gemini.google.com/app', '_blank');
    });

    document.querySelector('.button-new-tab').addEventListener('click', function() {
        chrome.tabs.create({});
    });

    document.querySelector('.button-new-window').addEventListener('click', function() {
        chrome.windows.create({});
    });

    document.querySelector('.button-incognito-window').addEventListener('click', function() {
        chrome.windows.create({incognito: true});
    });

    document.querySelector('.button-webstore').addEventListener('click', function() {
        window.open('https://chrome.google.com/webstore', '_blank');
    });

    document.querySelector('.button-bookmarks').addEventListener('click', function() {
        chrome.tabs.update({url: 'chrome://bookmarks'});
    });

    document.querySelector('.button-downloads').addEventListener('click', function() {
        chrome.tabs.update({url: 'chrome://downloads'});
    });

    document.querySelector('.button-history').addEventListener('click', function() {
        chrome.tabs.update({url: 'chrome://history'});
    });

    document.querySelector('.button-extensions').addEventListener('click', function() {
        chrome.tabs.update({url: 'chrome://extensions'});
    });

    document.querySelector('.button-flags').addEventListener('click', function() {
        chrome.tabs.update({url: 'chrome://flags'});
    });
});
