from flask import Flask, request, jsonify
import pandas as pd
import pickle

app = Flask(__name__)
model = pickle.load(open("energy_model.pkl","rb"))

@app.route('/predict', methods=['POST'])
def predict():
    data = request.json
    df = pd.DataFrame([data])
    pred = model.predict(df)[0]
    return jsonify({"predicted_energy": float(pred)})

@app.route('/optimize', methods=['POST'])
def optimize():
    load = request.json['equipment_load']
    if load > 600:
        suggestion = "High load detected. Shift 20% usage to nighttime to reduce cost."
    elif load > 300:
        suggestion = "Moderate load. Consider using smart scheduling."
    else:
        suggestion = "Load optimal."
    return jsonify({"suggestion": suggestion})

if __name__ == "__main__":
    app.run(debug=True)
