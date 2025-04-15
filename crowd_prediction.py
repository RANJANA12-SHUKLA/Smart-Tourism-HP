
import pandas as pd
import numpy as np
from sklearn.model_selection import train_test_split
from sklearn.preprocessing import StandardScaler

# -------------------------------
# Step 1: Generate Synthetic Data
# -------------------------------
np.random.seed(42)

data = {
    'hour': np.random.randint(8, 20, size=100),         # Hours between 8 AM - 8 PM
    'temperature': np.random.uniform(15, 30, size=100), # Temperature in °C
    'humidity': np.random.uniform(40, 80, size=100),    # Humidity in %
    'footfall': np.random.randint(50, 300, size=100)    # Footfall (crowd size)
}

# Create and save the DataFrame
df = pd.DataFrame(data)
df.to_csv('crowd_data.csv', index=False)
print("✅ Synthetic crowd data saved to 'crowd_data.csv'\n")

# -------------------------------
# Step 2: Load and Preprocess Data
# -------------------------------
# Load the data
df = pd.read_csv('crowd_data.csv')
print("📊 Data preview:")
print(df.head())

# Define features (X) and target (y)
X = df[['hour', 'temperature', 'humidity']]
y = df['footfall']

# Split into training and testing sets
X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)

# Standardize (scale) the features
scaler = StandardScaler()
X_train_scaled = scaler.fit_transform(X_train)
X_test_scaled = scaler.transform(X_test)

print("\n✅ Data preprocessing completed. Ready for model training.")

from sklearn.linear_model import LinearRegression
from sklearn.metrics import mean_absolute_error, r2_score

# -------------------------------
# Step 3: Train ML Model
# -------------------------------
model = LinearRegression()
model.fit(X_train_scaled, y_train)

# -------------------------------
# Step 4: Evaluate the Model
# -------------------------------
y_pred = model.predict(X_test_scaled)

mae = mean_absolute_error(y_test, y_pred)
r2 = r2_score(y_test, y_pred)

print(f"\n📈 Model Evaluation:")
print(f"Mean Absolute Error: {mae:.2f}")
print(f"R^2 Score: {r2:.2f}")


# -------------------------------
# Step 5: Predict Crowd for Custom Input
# -------------------------------
def predict_crowd(hour, temperature, humidity):
    input_data = pd.DataFrame([[hour, temperature, humidity]],
                              columns=['hour', 'temperature', 'humidity'])
    input_scaled = scaler.transform(input_data)
    predicted_footfall = model.predict(input_scaled)[0]
    return int(predicted_footfall)

# Example prediction
example_prediction = predict_crowd(12, 22.5, 60)
print(f"\n🔮 Predicted Crowd Footfall (hour=12, temp=22.5°C, humidity=60%): {example_prediction} people")


