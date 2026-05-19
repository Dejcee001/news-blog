const API_KEY = 'JglXegyTJYnnrBgaj8VvrGE3iGTrvYX7Hepu3LLDHT0kR8MX';
const url = 'https://api.currentsapi.services/v1/latest-news?language=en';

console.log("Fetching news...");

fetch(url, {
    method: 'GET',
    headers: {
        'Authorization': `Bearer ${API_KEY}`
    }
})
.then(response => {
    console.log("Response status:", response.status);
    return response.json();
})
.then(data => {
    console.log("Data received:", data);
    const feed = document.getElementById("news-feed");
    feed.innerHTML = ''; // Clear loading
    
    if (data.news && data.news.length > 0) {
        data.news.forEach(article => {
            const articleDiv = document.createElement('article');
            articleDiv.innerHTML = `
                ${article.image && article.image !== 'None' ? `<img src="${article.image}" class="article-image">` : ''}
                <div class="content">
                    <h2>${article.title}</h2>
                    <p>${article.description || 'No summary available.'}</p>
                    <a href="${article.url}" target="_blank" class="source-link">Read Full Story</a>
                </div>
            `;
            feed.appendChild(articleDiv);
        });
    } else {
        feed.innerHTML = "<p>No news found. Check console for details.</p>";
    }
})
.catch(error => {
    console.error('API Error:', error);
    document.getElementById("news-feed").innerHTML = "<p>Error loading. Check browser console.</p>";
});

