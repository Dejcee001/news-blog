const API_KEY = 'JglXegyTJYnnrBgaj8VvrGE3iGTrvYX7Hepu3LLDHT0kR8MX';
const url = 'https://api.currentsapi.services/v1/latest-news?language=en';

fetch(url, {
    method: 'GET',
    headers: {
        'Authorization': `Bearer ${API_KEY}`
    }
})
.then(response => response.json())
.then(data => {
    const feed = document.getElementById("news-feed");
    feed.innerHTML = ''; // Clear loading text
    
    // Check if news exists
    if (data.news && data.news.length > 0) {
        data.news.forEach(article => {
            const articleDiv = document.createElement('article');
            articleDiv.innerHTML = `
                ${article.image && article.image !== 'None' ? `<img src="${article.image}" style="width:100%; height:200px; object-fit:cover;">` : ''}
                <h2>${article.title}</h2>
                <p>${article.description || ''}</p>
                <a href="${article.url}" target="_blank">Read Full Story</a>
            `;
            feed.appendChild(articleDiv);
        });
    } else {
        feed.innerHTML = "<p>No news found at the moment.</p>";
    }
})
.catch(error => {
    console.error('API Error:', error);
    document.getElementById("news-feed").innerHTML = "<p>Error loading live news.</p>";
});


