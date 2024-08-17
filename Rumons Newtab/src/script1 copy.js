document.addEventListener("DOMContentLoaded", function () {
    const buttons = document.querySelectorAll('.search-button');
    buttons.forEach(button => {
        button.addEventListener('click', function () {
            const engine = button.getAttribute('data-engine');
            if (engine === 'chatgpt' || engine === 'bingchat') {
                openAIEngine(engine);
            } else {
                search(engine);
            }
        });
    });
});

function search(engine) {
    const query = document.getElementById('search-query').value;
    let url = '';

    switch (engine) {
        case 'google':
            url = `https://www.google.com/search?q=${encodeURIComponent(query)}`;
            break;
        case 'bing':
            url = `https://www.bing.com/search?q=${encodeURIComponent(query)}`;
            
            break;
        case 'duckduckgo':
            url = `https://duckduckgo.com/?q=${encodeURIComponent(query)}`;
            break;
        case 'yts':
            url = `https://yts.mx/browse-movies/${encodeURIComponent(query)}`;
            break;
        case 'wikipedia':
            url = `https://en.wikipedia.org/wiki/Special:Search?search=${encodeURIComponent(query)}`;
            break;
        case 'commons':
            url = `https://commons.wikimedia.org/w/index.php?search=${encodeURIComponent(query)}`;
            break;
        case 'moviesjoy':
            const formattedQuery = query.toLowerCase().replace(/ /g, '-');
            url = `https://moviesjoy.is/search/${encodeURIComponent(formattedQuery)}`;
            break;
    }

    window.open(url, '_blank');
}

function openAIEngine(engine) {
    const query = document.getElementById('search-query').value;
    let url = '';

    switch (engine) {
        case 'chatgpt':
            url = `https://chat.openai.com/?q=${encodeURIComponent(query)}`;
            break;
        case 'bingchat':
            url = `https://www.bing.com/search?showconv=1&sendquery=1&q=${encodeURIComponent(query)}`; // Update with the correct URL for Bing Chat when available
            break;
    }

    window.open(url, '_blank');
}
