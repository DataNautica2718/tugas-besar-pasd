from flask import Blueprint, request
from controllers.recipe_controller import RecipeController

recipes_bp = Blueprint("recipes", __name__)

@recipes_bp.route("/api/recipes", methods=["GET"])
def get_recipes():
    q = request.args.get("q", "")
    category = request.args.get("category", "")
    sort = request.args.get("sort", "popular")
    
    try:
        skip = int(request.args.get("skip", 0))
        limit = int(request.args.get("limit", 20))
    except ValueError:
        skip = 0
        limit = 20

    return RecipeController.get_recipes(
        q=q,
        category=category,
        sort=sort,
        skip=skip,
        limit=limit
    )

@recipes_bp.route("/api/recipes/count", methods=["GET"])
def get_recipes_count():
    q = request.args.get("q", "")
    category = request.args.get("category", "")
    return RecipeController.get_recipes_count(q=q, category=category)
