def explain_recommendation(user_ingredients, recipe_ingredients):
    """Menampilkan bahan yang cocok dan bahan yang masih kurang."""
    user_set = set(user_ingredients)
    recipe_set = set(recipe_ingredients)

    matched = sorted(user_set & recipe_set)
    missing = sorted(recipe_set - user_set)

    return matched, missing
