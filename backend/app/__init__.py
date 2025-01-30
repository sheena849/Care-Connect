# app/__init__.py
from flask import Flask
from flask_sqlalchemy import SQLAlchemy
from flask_marshmallow import Marshmallow
from flask_cors import CORS
from flask_jwt_extended import JWTManager
from flask_migrate import Migrate

import os

# Initialize app
app = Flask(__name__)

# Setup CORS
CORS(app)

# Setup database
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///careconnect.db'  # Or use any other database URI
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
app.config['SECRET_KEY'] = 'your-secret-key'  # Make sure this is a strong secret key
app.config['JWT_SECRET_KEY'] = 'your-jwt-secret-key'  # JWT secret key

# Initialize database and marshmallow
db = SQLAlchemy(app)
ma = Marshmallow(app)
migrate = Migrate(app, db)
jwt = JWTManager(app)

# Import the routes after initializing the app and db
from .routes import user_bp, patient_bp, appointment_bp, hospital_bp,userhospital_bp

# Register Blueprints
app.register_blueprint(user_bp)
app.register_blueprint(patient_bp)
app.register_blueprint(appointment_bp)
app.register_blueprint(hospital_bp)
app.register_blueprint(userhospital_bp)
