document.addEventListener('DOMContentLoaded', function() {
    const searchButtons = document.querySelectorAll('.buttons button');
    const queryInput = document.getElementById('search-query');

    searchButtons.forEach(button => {
        button.addEventListener('click', function() {
            search(button.id);
        });
    });

    queryInput.addEventListener('input', function() {
        showSuggestions(queryInput.value);
    });
});

function search(engine) {
    const query = document.getElementById('search-query').value;
    let url = '';

    switch(engine) {
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
            url = `https://yts.mx/search?q=${encodeURIComponent(query)}`;
            break;
        case 'torrentgalaxy':
            url = `https://torrentgalaxy.to/torrents.php?search=${encodeURIComponent(query)}`;
            break;
        case 'diakov':
            url = `https://diakov.net/index.php?do=search&subaction=search&story=${encodeURIComponent(query)}`;
            break;
        case 'lrepacks':
            url = `https://lrepacks.net/index.php?do=search&subaction=search&story=${encodeURIComponent(query)}`;
            break;
        case 'fcportables':
            url = `https://www.fcportables.com/?s=${encodeURIComponent(query)}`;
            break;
        case '1337x':
            url = `https://1337x.to/search/${encodeURIComponent(query)}/1/`;
            break;
        case 'thepiratebay':
            url = `https://thepiratebay.org/search/${encodeURIComponent(query)}`;
            break;
        case 'rargb':
            url = `https://rargb.to/search/?search=${encodeURIComponent(query)}`;
            break;
        case 'archive':
            url = `https://archive.org/search.php?query=${encodeURIComponent(query)}`;
            break;
        case 'aniwave':
            url = `https://aniwave.to/search?keyword=${encodeURIComponent(query)}`;
            break;
        case 'ftuapps':
            url = `https://ftuapps.dev/?s=${encodeURIComponent(query)}`;
            break;
        case 'kickasstorrents':
            url = `https://kickasstorrents.to/usearch/${encodeURIComponent(query)}`;
            break;
        default:
            break;
    }

    if (url) {
        window.open(url, '_blank');
    }
}


document.getElementById('searchForm').addEventListener('submit', function(event) {
    event.preventDefault();
    var query = document.getElementById('query').value;
    var site = document.getElementById('site').value;
    var filter = document.getElementById('filter').value;
    var filterValue = document.getElementById('filterValue').value;
    var engine = document.querySelector('input[name="engine"]:checked').value;
    var url = '';

    if (site) {
        query += ' site:' + site;
    }

    if (filter && filterValue) {
        if (filter === 'exclude') {
            query += ' -' + filterValue;
        } else if (filter === 'exact') {
            query += ' "' + filterValue + '"';
        } else {
            query += ' ' + filter + filterValue;
        }
    }

    if (engine === 'duckduckgo') {
        url = 'https://duckduckgo.com/?q=' + encodeURIComponent(query);
    } else if (engine === 'bing') {
        url = 'https://www.bing.com/search?q=' + encodeURIComponent(query);
    } else if (engine === 'google') {
        url = 'https://www.google.com/search?q=' + encodeURIComponent(query);
    }

    window.open(url, '_blank');
});


document.addEventListener('DOMContentLoaded', function() {
    const button = document.querySelector('.roll-down-button');
    const content = document.getElementById('rollDownContent');

    button.addEventListener('click', function() {
        content.classList.toggle('show');
    });
});


