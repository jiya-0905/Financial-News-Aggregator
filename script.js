require('dotenv').config();
const apiKey = process.env.NEWS_API_KEY;
const newsContainer = document.getElementById("news-container");
const searchButton = document.getElementById("searchButton");
const stockInput = document.getElementById("stockInput");

defaultNews();

function defaultNews() {
    fetchNews("stocks");
}

function fetchNews(query) {
    const url = `https://newsapi.org/v2/everything?q=${query}&apiKey=${apiKey}`;
    
    fetch(url)
        .then(response => response.json())
        .then(data => analyzeSentiment(data.articles))
        .catch(error => console.error("Error fetching news:", error));
}

function analyzeSentiment(articles) {
    newsContainer.innerHTML = ""; 
    articles.slice(0, 10).forEach(article => {
        const sentimentApiUrl = "http://127.0.0.1:5000/analyze"; 
        
        fetch(sentimentApiUrl, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ text: article.title }) 
        })
        .then(response => response.json())
        .then(sentimentData => {
            displayNews(article, sentimentData.sentiment);
        })
        .catch(error => {
            console.error("Error analyzing sentiment:", error);
            displayNews(article, "Unknown"); 
        });
    });
}

function displayNews(article, sentiment) {
    const newsCard = document.createElement("div");
    newsCard.classList.add("news-card");
    
    newsCard.innerHTML = `
        <h2>${article.title}</h2>
        <p>${article.description || "No description available."}</p>
        <p><strong>Sentiment:</strong> ${sentiment}</p>
        <a href="${article.url}" target="_blank">Read More</a>
    `;
    
    newsContainer.appendChild(newsCard);
}

searchButton.addEventListener("click", () => {
    const query = stockInput.value.trim();
    if (query) fetchNews(query);
});
