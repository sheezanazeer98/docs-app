from flask import Flask
from flask_sqlalchemy import SQLAlchemy
from flask_migrate import Migrate
from flask_cors import CORS 
import os
from dotenv import load_dotenv

# Load environment variables from .env
load_dotenv()


db = SQLAlchemy()
migrate = Migrate()

def create_app():
    app = Flask(__name__)
    app.config["SQLALCHEMY_DATABASE_URI"] =  os.getenv("DATABASE_URI", "postgresql://postgres:postgres@localhost:5432/documents") 
    app.config["SQLALCHEMY_TRACK_MODIFICATIONS"] = False

    db.init_app(app)
    migrate.init_app(app, db)

    # Enable CORS for all routes
    CORS(app, resources={r"/api/*": {"origins": "*"}}, supports_credentials=True)

    from app.routes.document_routes import document_blueprint
    app.register_blueprint(document_blueprint, url_prefix="/api/documents")

    return app
