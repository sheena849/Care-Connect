from flask import Flask
from flask_sqlalchemy import SQLAlchemy
from flask_migrate import Migrate
from flask_jwt_extended import JWTManager

# Initialize the database, migration, and JWT manager
db = SQLAlchemy()
migrate = Migrate()
jwt = JWTManager()

def create_app():
    app = Flask(__name__)
    app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///careconnect.db'  # Use your preferred DB
    app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
    app.config['SECRET_KEY'] = 'your-secret-key'  # Replace with actual secret key for security
    app.config['JWT_SECRET_KEY'] = 'your-jwt-secret-key'  # Secret key for JWT token generation, change it to a secure one

    # Initialize extensions
    db.init_app(app)
    migrate.init_app(app, db)
    jwt.init_app(app)  # Initialize JWTManager with the Flask app

    # Register blueprints/routes
    from .routes import main
    app.register_blueprint(main)

    return app

