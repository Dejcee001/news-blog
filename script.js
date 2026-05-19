const API_KEY = '6ad038ba0a464a80a415ddc99207bf4c';
const url = `https://newsapi.org/v2/top-headlines?country=us&apiKey=${API_KEY}`;

fetch(url)
    .then(response => response.json())
    .then(data => {
        const feed = document.getElementById("news-feed");
        // Clear the loading text
        feed.innerHTML = '';
        
        // Loop through the articles
        data.articles.forEach(article => {
            if (article.title && article.urlToImage) {
                const articleDiv = document.createElement('article');
                articleDiv.innerHTML = `
                    <img src="${article.urlToImage}" alt="News Image" style="width:100%; max-height:200px; object-fit:cover;">
                    <h2>${article.title}</h2>
                    <p>${article.description || 'No summary available.'}</p>
                    <a href="${article.url}" target="_blank">Read Full Story</a>
                `;
                feed.appendChild(articleDiv);
            }
        });
    })
    .catch(error => {
        console.error('Error fetching news:', error);
        document.getElementById("news-feed").innerHTML = "<p>Unable to load live news.</p>";
    });

