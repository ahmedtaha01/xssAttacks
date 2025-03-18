import numpy as np
import pickle
import nltk
from tensorflow.keras.models import load_model
from tensorflow.keras.preprocessing.sequence import pad_sequences
from nltk.corpus import stopwords
from nltk.tokenize import word_tokenize
import os

# Download NLTK stopwords if not already present
nltk.download('stopwords')
nltk.download('punkt')
nltk.download('punkt_tab')

# Load trained model
model_path = os.path.join(os.getcwd(), "model", "model.h5")
model = load_model(model_path)

# Load tokenizer
with open(os.path.join("model", "tokenizer.pkl"), "rb") as f:
    tokenizer = pickle.load(f)

# Load encoder
with open(os.path.join("model", "encoder.pkl"), "rb") as f:
    encoder = pickle.load(f)

def preprocess_text(text):
    text = text.lower()
    tokens = word_tokenize(text)
    tokens = [word for word in tokens if word.isalnum()]  # Remove punctuation
    tokens = [word for word in tokens if word not in stopwords.words('english')]
    return " ".join(tokens)

def predict_sentiment(text):
    processed_text = preprocess_text(text)
    sequence = tokenizer.texts_to_sequences([processed_text])
    padded_sequence = pad_sequences(sequence, maxlen=10, padding='post')
    prediction = model.predict(padded_sequence)
    sentiment = encoder.inverse_transform([np.argmax(prediction)])
    return sentiment[0]


# task : Enter a text and the model will predict the sentiment
# input : Text
# output: ['Positive', 'Neutral', 'Negative', 'Irrelevant'] 

# print(predict_sentiment("I am good"))  # Expected: Positive
# print(predict_sentiment("I am sad"))   # Expected: Negative
# print(predict_sentiment("My name is mohamed"))   # Expected: Irrelevant
# print(predict_sentiment("Hi"))   # Expected: Neutral
