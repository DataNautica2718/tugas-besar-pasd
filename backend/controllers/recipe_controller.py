from flask import jsonify
from repositories.recipe_repository import RecipeRepository

class RecipeController:
    @staticmethod
    def get_recipes(q, category, sort, skip, limit):
        try:
            recipes = RecipeRepository.get_all(
                q=q,
                category=category,
                sort=sort,
                skip=skip,
                limit=limit
            )
            output = [r.to_dict() for r in recipes]
            return jsonify(output)
        except Exception as e:
            return jsonify({
                "success": False,
                "error": str(e)
            }), 500

    @staticmethod
    def get_recipes_count(q, category):
        try:
            total = RecipeRepository.count(q=q, category=category)
            return jsonify({"total": total})
        except Exception as e:
            return jsonify({
                "success": False,
                "error": str(e)
            }), 500
