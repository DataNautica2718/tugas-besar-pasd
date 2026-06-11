import pandas as pd

# =====================================================
# FILTER KATEGORI
# =====================================================

def filter_by_category(recipes, category):
    """
    Memfilter resep berdasarkan kategori yang dipilih user.
    """
    return recipes[recipes["Category"] == category].copy()


# =====================================================
# WEIGHTED JACCARD SIMILARITY
# =====================================================

def weighted_jaccard(user_ingredients, recipe_ingredients, idf_dict):
    """
    Menghitung kemiripan bahan menggunakan Weighted Jaccard Similarity.

    Formula:
        sum(weight intersection) / sum(weight union)
    """
    # Ubah list menjadi set
    user_set = set(user_ingredients)
    recipe_set = set(recipe_ingredients)

    # Cari bahan yang sama
    bahan_cocok = user_set.intersection(recipe_set)

    # Gabungkan semua bahan unik
    semua_bahan = user_set.union(recipe_set)

    # Hitung total bobot bahan yang cocok
    total_bobot_cocok = 0

    for bahan in bahan_cocok:

        bobot = idf_dict.get(bahan, 1)

        total_bobot_cocok += bobot

    # Hitung total bobot semua bahan
    total_bobot_semua = 0

    for bahan in semua_bahan:

        bobot = idf_dict.get(bahan, 1)

        total_bobot_semua += bobot

    # Hindari pembagian 0
    if total_bobot_semua == 0:
        return 0

    similarity = (
        total_bobot_cocok /
        total_bobot_semua
    )

    return similarity


# =====================================================
# HITUNG SIMILARITY UNTUK SEMUA RESEP
# =====================================================

def calculate_similarity(recipes, category, user_ingredients, idf_dict):
    """Menghitung similarity score untuk seluruh resep dalam kategori tertentu."""
    kandidat_resep = filter_by_category(
        recipes,
        category
    )

    daftar_similarity = []

    for index, row in kandidat_resep.iterrows():

        bahan_resep = row["ingredient_list"]

        similarity = weighted_jaccard(
            user_ingredients,
            bahan_resep,
            idf_dict
        )

        daftar_similarity.append(similarity)

    kandidat_resep["similarity_score"] = (
        daftar_similarity
    )

    return kandidat_resep


# =====================================================
# POPULARITY SCORE
# =====================================================

def calculate_popularity(candidates):
    """Mengubah Loves menjadi skor 0-1."""
    max_loves = candidates["Loves"].max()
    candidates["popularity_score"] = 0 if max_loves == 0 else candidates["Loves"] / max_loves
    return candidates


# =====================================================
# HYBRID RANKING
# =====================================================

def hybrid_ranking(candidates, similarity_weight=0.95, popularity_weight=0.05):
    """Menggabungkan similarity score dan popularity score."""
    candidates["final_score"] = (
        similarity_weight * candidates["similarity_score"]
        + popularity_weight * candidates["popularity_score"]
    )
    return candidates


# =====================================================
# RECOMMENDATION EXPLANATION
# =====================================================

def explain_recommendation(user_ingredients, recipe_ingredients):
    """Menampilkan bahan yang cocok dan bahan yang masih kurang."""
    user_set = set(user_ingredients)
    recipe_set = set(recipe_ingredients)

    matched = sorted(user_set & recipe_set)
    missing = sorted(recipe_set - user_set)

    return matched, missing


# =====================================================
# MAIN RECOMMENDER
# =====================================================

def recommend(recipes, category, ingredients, idf_dict,
              top_n=10, similarity_weight=0.8, popularity_weight=0.2):
    """Pipeline utama sistem rekomendasi."""
    candidates = calculate_similarity(recipes, category, ingredients, idf_dict)
    candidates = calculate_popularity(candidates)
    candidates = hybrid_ranking(candidates, similarity_weight, popularity_weight)

    return (
        candidates
        .sort_values(by="final_score", ascending=False)
        .head(top_n)
        [["Title", "Category", "URL", "Steps", "ingredient_list",
          "similarity_score", "popularity_score", "final_score"]]
    )