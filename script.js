fetch("data.json")
    .then(response => response.json())
    .then(data => {
        const feed = document.getElementById("news-feed");
        feed.innerHTML = data.map(item => `
            <article>
                <h2>${item.title}</h2>
                <p>${item.summary}</p>
            </article>
        `).join("");
    })
    .catch(() => {
        document.getElementById("news-feed").innerHTML = "<p>Error loading news.</p>";
    });

