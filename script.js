const API_KEY = 'JglXegyTJYnnrBgaj8VvrGE3iGTrvYX7Hepu3LLDHT0kR8MX';

// Main function to fetch news
function fetchNews(category = 'latest', query = '') {
    const feed = document.getElementById("news-feed");
    feed.innerHTML = '<p>Loading ' + (query ? 'search results' : category) + '...</p>';

    let url = 'https://api.currentsapi.services/v1/latest-news?language=en';

    // Decide whether to search or filter by category
    if (query) {
        url = `https://api.currentsapi.services/v1/search?keywords=${query}&language=en`;
    } else if (category !== 'latest') {
        url = `https://api.currentsapi.services/v1/search?category=${category}&language=en`;
    }

    fetch(url, { 
        method: 'GET', 
        headers: { 'Authorization': `Bearer ${API_KEY}` } 
    })
    .then(response => response.json())
    .then(data => {
        feed.innerHTML = '';
        
        if (data.news && data.news.length > 0) {
            data.news.forEach(article => {
                // Calculate read time
                const wordCount = (article.description || '').split(' ').length;
                const readTime = Math.ceil(wordCount / 200);
                
                // Get category label
                const categoryLabel = (article.category && article.category.length > 0) ? article.category[0] : 'News';

                const articleDiv = document.createElement('article');
                articleDiv.innerHTML = `
                    ${article.image && article.image !== 'None' ? `<img src="${article.image}" class="article-image">` : ''}
                    <div class="content">
                        <span class="category-tag">${categoryLabel.toUpperCase()}</span>
                        <h2>${article.title}</h2>
                        <p>${article.description || 'Click to read more details on the original site.'}</p>
                        <div class="card-footer">
                            <span class="read-time">${readTime} min read</span>
                            <a href="${article.url}" target="_blank" class="source-link">Read Full Story</a>
                        </div>
                    </div>
                `;
                feed.appendChild(articleDiv);
            });
        } else {
            feed.innerHTML = "<p>No news found.</p>";
        }
    })
    .catch(error => {
        console.error('API Error:', error);
        feed.innerHTML = "<p>Error loading news.</p>";
    });
}

// Function to handle Search button
function performSearch() {
    const query = document.getElementById('search-input').value;
    if (!query) return;
    fetchNews('latest', query);
}

// Initial load
fetchNews('latest');

