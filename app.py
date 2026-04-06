from flask import Flask, request, jsonify
from flask_cors import CORS
import requests

app = Flask(__name__)
CORS(app)

API_KEY = "YOUR_OPENROUTER_KEY"

@app.route("/ask", methods=["POST"])
def ask():
    data = request.json
    question = data["question"]
    text = data["text"]

    response = requests.post(
        "https://openrouter.ai/api/v1/chat/completions",
        headers={
            "Authorization": f"Bearer {API_KEY}",
            "Content-Type": "application/json"
        },
        json={
            "model": "mistralai/mistral-7b-instruct",
            "messages": [
                {"role": "user", "content": text + question}
            ]
        }
    )

    return jsonify(response.json())

app.run(debug=True)
