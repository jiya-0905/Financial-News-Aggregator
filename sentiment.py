from flask import Flask, request, jsonify
from vaderSentiment.vaderSentiment import SentimentIntensityAnalyzer
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

analyzer = SentimentIntensityAnalyzer()

@app.route("/")
def home():
    return "Sentiment analysis API is running!"

@app.route('/analyze', methods=['POST'])
def analyze():
    data = request.get_json()
    text = data.get("text", "")

    if not text:
        return jsonify({"error": "No text provided"}), 400

    scores = analyzer.polarity_scores(text)
    
    if scores["compound"] >= 0.05:
        sentiment = "Bullish"  # Positive sentiment
    elif scores["compound"] <= -0.05:
        sentiment = "Bearish"  # Negative sentiment
    else:
        sentiment = "Neutral"

    return jsonify({
        "sentiment": sentiment,
        "scores": scores  
    })

if __name__ == '__main__':
    app.run(debug=True)
