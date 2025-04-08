# 📈 Financial News & Sentiment Analysis Web App

A web application that fetches real-time financial news using the **NewsAPI**, and analyzes the sentiment (Bullish, Bearish, Neutral) of each headline using **VADER Sentiment Analysis** powered by a Flask backend.

---

## 🔍 Features

- 📰 Displays top financial news articles.
- 🔎 Allows stock/news keyword search.
- 📊 Performs sentiment analysis on each headline.
- 🎯 Classifies sentiment as Bullish 🟢, Bearish 🔴, or Neutral ⚪.
- 🔗 Clickable links to original news sources.

---

##  Tech Stack

### Frontend:
- HTML5, CSS3
- JavaScript (Vanilla)
- NewsAPI for news articles

### Backend:
- Flask (Python)
- VADER SentimentIntensityAnalyzer
- Flask-CORS for API communication

---

## 🚀 How It Works

1. Frontend fetches financial news using NewsAPI.
2. Each news headline is sent to Flask backend via `/analyze` API.
3. Backend returns sentiment based on `compound` score.
4. Frontend displays news with respective sentiment indicator.

