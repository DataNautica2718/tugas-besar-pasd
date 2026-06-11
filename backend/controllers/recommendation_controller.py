from flask import jsonify
from services.validation.validator import validate_recommendation_request
from repositories.recipe_repository import RecipeRepository
from services.dataset.dataset_loader import DatasetLoader
from services.recommendation.engine import RecommendationEngine

class RecommendationController:
    @staticmethod
    def get_recommendations(data):
        # 1. Validate input
        is_valid, err_msg = validate_recommendation_request(data)
        if not is_valid:
            return jsonify({"error": err_msg}), 400

        try:
            category = data.get("category").lower().strip()
            user_ingredients = [ing.lower().strip() for ing in data.get("ingredients", [])]

            # 2. Get datasets
            recipes_df = RecipeRepository.get_dataframe()
            idf_dict = DatasetLoader.load_idf_dict()

            # 3. Coordinate pipeline via RecommendationEngine
            recommendations = RecommendationEngine.recommend(
                recipes_df=recipes_df,
                category=category,
                user_ingredients=user_ingredients,
                idf_dict=idf_dict,
                top_n=10
            )

            return jsonify({
                "success": True,
                "total": len(recommendations),
                "recommendations": recommendations
            })

        except Exception as e:
            return jsonify({
                "success": False,
                "error": str(e)
            }), 500
