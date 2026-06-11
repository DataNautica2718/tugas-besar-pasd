def weighted_jaccard(user_ingredients, recipe_ingredients, idf_dict):
    """
    Menghitung kemiripan bahan menggunakan Weighted Jaccard Similarity.
    Formula: sum(weight intersection) / sum(weight union)
    """
    user_set = set(user_ingredients)
    recipe_set = set(recipe_ingredients)

    bahan_cocok = user_set.intersection(recipe_set)
    semua_bahan = user_set.union(recipe_set)

    total_bobot_cocok = 0
    for bahan in bahan_cocok:
        bobot = idf_dict.get(bahan, 1)
        total_bobot_cocok += bobot

    total_bobot_semua = 0
    for bahan in semua_bahan:
        bobot = idf_dict.get(bahan, 1)
        total_bobot_semua += bobot

    if total_bobot_semua == 0:
        return 0

    return total_bobot_cocok / total_bobot_semua

def calculate_similarity(recipes, category, user_ingredients, idf_dict):
    from .filtering import filter_by_category
    
    kandidat_resep = filter_by_category(recipes, category)
    
    daftar_similarity = []
    for index, row in kandidat_resep.iterrows():
        bahan_resep = row["ingredient_list"]
        similarity = weighted_jaccard(
            user_ingredients,
            bahan_resep,
            idf_dict
        )
        daftar_similarity.append(similarity)

    kandidat_resep["similarity_score"] = daftar_similarity
    return kandidat_resep
