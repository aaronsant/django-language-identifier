import joblib
import pandas as pd
import numpy as np

class LogisticRegressionClassifier:
    def __init__(self):
        path_to_artifacts = "research/"
        # self.values_fill_missing =  joblib.load(path_to_artifacts + "train_mode.joblib")
        # self.encoders = joblib.load(path_to_artifacts + "encoders.joblib")
        self.model = joblib.load(path_to_artifacts + "log_model.pkl")

    def preprocessing(self, input_data):
        # JSON to pandas DataFrame
        #input_data = pd.DataFrame(input_data, index=[0])
        return [input_data] # THE PARENTHESES [ ] ARE NECESSARY

    def predict(self, input_data):
        return self.model.predict_proba(input_data)

    def postprocessing(self, predicted_probabilities):
        #change this "label" to identify language with highest probability
        class_labels = self.model.classes_
        top3_indices = np.argsort(predicted_probabilities)[-3:][::-1]
        top3_probs = predicted_probabilities[top3_indices]
        top3_labels = class_labels[top3_indices]
        result = [ {'label': label, 'probability': float(prob)} for label, prob in zip(top3_labels, top3_probs) ]
        print(result)
        
        return {"probabilities": result, "label": top3_labels[0], "status": "OK"}

    def compute_prediction(self, input_data):
        try:
            input_data = self.preprocessing(input_data)
            prediction = self.predict(input_data)[0]  # only one sample
            prediction = self.postprocessing(prediction)
        except Exception as e:
            return {"status": "Error", "message": str(e)}

        return prediction