// ... existing fetch code ...
data.news.forEach(article => {
    const articleDiv = document.createElement('article');
    articleDiv.innerHTML = `
        ${article.image && article.image !== 'None' ? `<img src="${article.image}" class="article-image">` : ''}
        <div class="content">
            <h2>${article.title}</h2>
            <p>${article.description || 'Click to read more details on the original site.'}</p>
            <a href="${article.url}" target="_blank" class="source-link">Read Full Story</a>
        </div>
    `;
    feed.appendChild(articleDiv);
});
// ...

