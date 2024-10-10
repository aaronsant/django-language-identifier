# django-language-identifier

This is a full-stack web application that detects the language of a given text using various machine learning models. The backend is built with Django and PostgreSQL, and the frontend is built with React. Users can enter text for language identification right from the home screen, or can register to make an account and save their submissions.

## Table of Contents

- [Features](#features)
- [Technologies Used](#technologies-used)
- [Getting Started](#getting-started)

## Features

- User authentication and authorization (JWT-based)
- Language detection using machine learning text classification models including the following: Linear Support Vector classification, Mutinomial Naive Bayes, Bernoulli Naive Bayes, Random Forest, Logisitic Classification.
- API endpoints to submit text and retrieve results, register and login users, and access user profile to retrieve previous submissions. There are also API Endpoints for the machine learning algorithms pertaining to algorithm endpoints, descriptions, status and requests based on the deployment strategy described at https://www.deploymachinelearning.com/

## Technologies Used

### Backend
- Django
- Django REST Framework
- PostgreSQL
- Machine Learning models using scikit-learn

### Frontend
- React
- Axios (for HTTP requests)

### Other Tools
- Docker (for containerization)
- Gunicorn (for serving the app)
- JWT (JSON Web Token) for authentication

## Getting Started

To get a local copy up and running, follow these steps:

### Prerequisites

- Python 3.9+
- Node.js and npm
- PostgreSQL
- Docker

### Installation

1. Clone the repo:
   
   git clone https://github.com/your-username/project-name.git
   cd project-name

2. Backend Setup:
   
   - Create Virtual Environment
     
     cd BACK/backend
     python -m venv env
     source env/bin/activate
     
   - Install python dependencies
     
     pip install -r requirements.txt
     
   - Set up PostgreSQL database, create .env file and add database credentials using naming shown in settings.py
   - run migrations
     
     python manage.py migrate
     
3. Create and Save Machine Learning Models in Backend:
   
   Access the file modelTraining.ipynb found in the Back/backend/research directory. Run the first 3 cells to load the training data. Run the last 5 cells to save the classification models as .pkl files in that directory.
   
4. Frontend Setup:

   - Navigate to frontend directory (from root directory)

     cd FRONT/frontend

   - Install Node dependencies
  
     npm install
     
5. Running the project:

   - Run the backend

     cd BACK/backend
     python manage.py runserver

   - Run the frontend (in a seperate terminal)

     cd FRONT/ frontend
     npm run dev

    To stop running the frontend or the backend use ctrl+c
    
6. Containerization with Docker:

   - Build and run the backend with Docker

     cd BACK/backend
     docker-compose up --build

### USAGE

Once the project is up and running, you can:

 - Access the frontend at http://localhost:3000.
 - Access the API at http://localhost:8000/api/.
You can register as a new user, log in, and submit text for language detection. The selected classification algorithm is used to detect the language, and you can view the results along with past submissions.



