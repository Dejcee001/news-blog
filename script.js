const API_KEY = 'JglXegyTJYnnrBgaj8VvrGE3iGTrvYX7Hepu3LLDHT0kR8MX';

function fetchNews(category) {
    const feed = document.getElementById("news-feed");
    feed.innerHTML = '<p>Loading ' + category + '...</p>';

    // Change the URL based on the category
    let url = 'https://api.currentsapi.services/v1/latest-news?language=en';
    if (category !== 'latest') {
        url = `https://api.currentsapi.services/v1/search?category=${category}&language=en`;
    }

    fetch(url, { method: 'GET', headers: { 'Authorization': `Bearer ${API_KEY}` } })
    .then(response => response.json())
    .then(data => {
        feed.innerHTML = '';
        data.news.forEach(article => {
            const articleDiv = document.createElement('article');
            articleDiv.innerHTML = `
                ${article.image && article.image !== 'None' ? `<img src="${article.image}" class="article-image">` : ''}
                <div class="content">
                    <h2>${article.title}</h2>
                    <p>${article.description || ''}</p>
                    <a href="${article.url}" target="_blank" class="source-link">Read Full Story</a>
                </div>
            `;
            feed.appendChild(articleDiv);
        });
    });
}

// Load default news on startup
fetchNews('latest');
function performSearch() {
    const query = document.getElementById('search-input').value;
    if (!query) return;

    const feed = document.getElementById("news-feed");
    feed.innerHTML = '<p>Searching for "' + query + '"...</p>';

    // The Currents API search endpoint
    const url = `https://api.currentsapi.services/v1/search?keywords=${query}&language=en`;

    fetch(url, { method: 'GET', headers: { 'Authorization': `Bearer ${API_KEY}` } })
    .then(response => response.json())
    .then(data => {
        feed.innerHTML = '';
        data.news.forEach(article => {
            const articleDiv = document.createElement('article');
            articleDiv.innerHTML = `
                ${article.image && article.image !== 'None' ? `<img src="${article.image}" class="article-image">` : ''}
                <div class="content">
                    <h2>${article.title}</h2>
                    <p>${article.description || ''}</p>
                    <a href="${article.url}" target="_blank" class="source-link">Read Full Story</a>
                </div>
            `;
            feed.appendChild(articleDiv);
        });
    });
}

