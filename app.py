from flask import Flask, request , jsonify
from flask import render_template
from model.deployment import predict_sentiment
from database import db, SentimentResult

app = Flask(__name__)

# Configure database (Using SQLite)
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///sentiments.db'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

# Initialize the database with Flask app
db.init_app(app)

# Create database tables (only needed once)
with app.app_context():
    db.create_all()

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/search', methods=['POST'])
def search():
    search_query = request.form.get('query')
    results = predict_sentiment(search_query)

    new_result = SentimentResult(text=search_query, sentiment=results)
    db.session.add(new_result)
    db.session.commit()

    return jsonify({'results': results})

@app.route('/subscribe', methods=['POST'])
def subscribe():
    data = request.get_json()

    results = {}
    
    for key, value in data.items():
        sentiment = predict_sentiment(value)
        results[key] = sentiment

        new_result = SentimentResult(text=value, sentiment=sentiment)
        db.session.add(new_result)

    db.session.commit()

    return jsonify({'results': results})


if __name__ == '__main__':
    app.run(debug=True, port=5001)