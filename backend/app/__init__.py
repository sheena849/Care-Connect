from flask import Flask
from flask_sqlalchemy import SQLAlchemy
from flask_migrate import Migrate

# Initialize the database and migration
db = SQLAlchemy()
migrate = Migrate()

def create_app():
    app = Flask(__name__)
    app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///careconnect.db'  # Use your preferred DB
    app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
    app.config['SECRET_KEY'] = 'your-secret-key'  # Replace with actual secret key for security
    
    db.init_app(app)
    migrate.init_app(app, db)

    # Register blueprints/routes
    from .routes import main
    app.register_blueprint(main)

    return app
