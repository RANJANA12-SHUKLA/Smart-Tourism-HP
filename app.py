from flask import Flask, request, jsonify
import pandas as pd
import numpy as np
from sklearn.linear_model import LinearRegression
from sklearn.preprocessing import StandardScaler
from sklearn.model_selection import train_test_split
import joblib

app = Flask(__name__)

# Load and prepare data
df = pd.read_csv('crowd_data.csv')
X = df[['hour', 'temperature', 'humidity']]
y = df['footfall']

X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)

scaler = StandardScaler()
X_train_scaled = scaler.fit_transform(X_train)

model = LinearRegression()
model.fit(X_train_scaled, y_train)

from flask import Flask, request, jsonify
from flask_cors import CORS  # Import CORS to handle Cross-Origin requests

app = Flask(__name__)
CORS(app)  # Enable CORS for all routes to allow requests from different origins

@app.route('/predict', methods=['POST'])
def predict():
    # Parse the incoming JSON data and convert to numeric
    data = request.get_json()
    hour = int(data['hour'])  # Convert to int
    temperature = float(data['temperature'])  # Convert to float
    humidity = float(data['humidity'])  # Convert to float

    # Predict the crowd footfall using your ML model
    prediction = model.predict([[hour, temperature, humidity]])

    # Return the prediction as a JSON response
    
    return jsonify({'predicted_footfall': round(prediction[0], 2)})



if __name__ == '__main__':
    app.run(debug=True)
