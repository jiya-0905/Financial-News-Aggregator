const apiKey = '555c19f9f1914ac297fc64709e86b46a';
const newsContainer = document.getElementById("news-container");
const searchButton = document.getElementById("searchButton");
const stockInput = document.getElementById("stockInput");

// Fetch financial news
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

// Function to analyze sentiment for each article
function analyzeSentiment(articles) {
    newsContainer.innerHTML = ""; // Clear old news

    articles.slice(0, 10).forEach(article => {
        const sentimentApiUrl = "http://127.0.0.1:5000/analyze"; // Flask API endpoint
        
        fetch(sentimentApiUrl, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ text: article.title }) // Sending only the title for sentiment analysis
        })
        .then(response => response.json())
        .then(sentimentData => {
            displayNews(article, sentimentData.sentiment);
        })
        .catch(error => {
            console.error("Error analyzing sentiment:", error);
            displayNews(article, "Unknown"); // Fallback if API fails
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

// Search news by stock symbol
searchButton.addEventListener("click", () => {
    const query = stockInput.value.trim();
    if (query) fetchNews(query);
});
