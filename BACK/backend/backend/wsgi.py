"""
WSGI config for backend project.

It exposes the WSGI callable as a module-level variable named ``application``.

For more information on this file, see
https://docs.djangoproject.com/en/5.1/howto/deployment/wsgi/
"""

import os
from django.core.wsgi import get_wsgi_application

os.environ.setdefault("DJANGO_SETTINGS_MODULE", "backend.settings") #changed backend.settings to settings
application = get_wsgi_application()

# ML Registry

import inspect
from apps.ml.registry import MLRegistry
from apps.ml.language_classifier.random_forest import RandomForestClassifier
from apps.ml.language_classifier.logistic_regression import LogisticRegressionClassifier
from apps.ml.language_classifier.multinomial_nb import MultinomialNBClassifier
from apps.ml.language_classifier.bernoulli_nb import BernoulliNBClassifier
from apps.ml.language_classifier.linear_svc import LinearClassifier

try:
    registry = MLRegistry() # create ML registry
    # Random Forest classifier
    rf = RandomForestClassifier()
    # add to ML registry
    registry.add_algorithm(endpoint_name="random_forest",
                            algorithm_object=rf,
                            algorithm_name="random forest",
                            algorithm_status="production",
                            algorithm_version="0.0.1",
                            owner="Admin",
                            algorithm_description="Random Forest with simple pre- and post-processing",
                            algorithm_code=inspect.getsource(RandomForestClassifier))
    
    
    # Logistic Regress classifier
    log = LogisticRegressionClassifier()
    # add to ML registry
    registry.add_algorithm(endpoint_name="logistic_regression",
                            algorithm_object=log,
                            algorithm_name="logistic regression",
                            algorithm_status="production",
                            algorithm_version="0.0.1",
                            owner="Admin",
                            algorithm_description="logistic regression classifier with simple pre- and post-processing",
                            algorithm_code=inspect.getsource(LogisticRegressionClassifier))
    
    # Bernoulli Naive Bayes Forest classifier
    bnb = BernoulliNBClassifier()
    # add to ML registry
    registry.add_algorithm(endpoint_name="bernoulli_nb",
                            algorithm_object=bnb,
                            algorithm_name="bernoulli naive-bayes",
                            algorithm_status="production",
                            algorithm_version="0.0.1",
                            owner="Admin",
                            algorithm_description="bernoulli naive-bayes classifier with simple pre- and post-processing",
                            algorithm_code=inspect.getsource(BernoulliNBClassifier))
    
    
    # Multinomial Naive Bayes classifier
    mnb = MultinomialNBClassifier()
    # add to ML registry
    registry.add_algorithm(endpoint_name="multinomial_nb",
                            algorithm_object=mnb,
                            algorithm_name="multinomial naive-bayes",
                            algorithm_status="production",
                            algorithm_version="0.0.1",
                            owner="Admin",
                            algorithm_description="multinomial naive-bayes classifier with simple pre- and post-processing",
                            algorithm_code=inspect.getsource(MultinomialNBClassifier))
    
    
    # Linear SVM classifier
    lin = LinearClassifier()
    # add to ML registry
    registry.add_algorithm(endpoint_name="linear_svc",
                            algorithm_object=lin,
                            algorithm_name="linear svc",
                            algorithm_status="production",
                            algorithm_version="0.0.1",
                            owner="Admin",
                            algorithm_description="linear svc with simple pre- and post-processing",
                            algorithm_code=inspect.getsource(LinearClassifier))
    
except Exception as e:
    print("Exception while loading the algorithms to the registry,", str(e))

