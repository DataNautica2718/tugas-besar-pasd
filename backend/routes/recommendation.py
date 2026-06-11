from flask import Blueprint, request
from controllers.recommendation_controller import RecommendationController

recommendation_bp = Blueprint("recommendation", __name__)

@recommendation_bp.route("/recommend", methods=["POST"])
def get_recommendations():
    data = request.get_json()
    return RecommendationController.get_recommendations(data)
