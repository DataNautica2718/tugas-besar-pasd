import sys
import os
from flask import Flask, jsonify
from flask_cors import CORS

# Add parent directory to path so import paths resolve correctly
sys.path.append(os.path.dirname(os.path.abspath(__file__)))

from config.config import settings
from utils.logger import logger
from services.dataset.dataset_loader import DatasetLoader

# Blueprints
from routes.health import health_bp
from routes.recipes import recipes_bp
from routes.recommendation import recommendation_bp

app = Flask(__name__)
CORS(app)

# Pre-load datasets on startup
try:
    logger.info("Initializing datasets...")
    DatasetLoader.load_recipes()
    DatasetLoader.load_idf_dict()
    logger.info("Datasets loaded successfully!")
except Exception as e:
    logger.error(f"Failed to load datasets: {str(e)}")

# Register Blueprints
app.register_blueprint(health_bp)
app.register_blueprint(recipes_bp)
app.register_blueprint(recommendation_bp)

@app.route("/")
def home():
    return jsonify({
        "status": "success",
        "message": "FoodyMoody Recommendation API (Clean MVC Architecture)"
    })

if __name__ == "__main__":
    app.run(
        host=settings.HOST,
        port=settings.PORT,
        debug=settings.DEBUG
    )
