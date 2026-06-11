from flask import Flask, request, jsonify
from flask_cors import CORS

import pandas as pd

from recommender import (
    recommend,
    explain_recommendation
)

# =====================================================
# INIT APP
# =====================================================

app = Flask(__name__)
CORS(app)

print("Loading data...")

recipes = pd.read_parquet(
    "data/recipes_clean.parquet"
)

idf_df = pd.read_parquet(
    "data/ingredient_idf.parquet"
)

idf_dict = dict(
    zip(
        idf_df["ingredient"],
        idf_df["idf"]
    )
)

print("Data loaded successfully!")
print(f"Jumlah resep : {len(recipes)}")
print(f"Jumlah bahan unik : {len(idf_dict)}")


# =====================================================
# HOME
# =====================================================

@app.route("/")
def home():

    return jsonify({
        "status": "success",
        "message": "FoodyMoody Recommendation API"
    })


# =====================================================
# EXPLORE API
# =====================================================

def filter_recipes(q="", category=""):
    """Helper: filter DataFrame by search query and category."""
    result = recipes.copy()

    if q:
        result = result[
            result["Title"].str.lower().str.contains(q.lower(), na=False)
        ]

    if category:
        result = result[
            result["Category"].str.lower() == category.lower()
        ]

    return result


@app.route("/api/recipes", methods=["GET"])
def get_recipes():

    try:

        q        = request.args.get("q", "")
        category = request.args.get("category", "")
        sort     = request.args.get("sort", "popular")
        skip     = int(request.args.get("skip", 0))
        limit    = int(request.args.get("limit", 20))

        result = filter_recipes(q, category)

        # ---- Sorting ----
        if sort == "popular":
            result = result.sort_values("Loves", ascending=False)
        elif sort == "az":
            result = result.sort_values("Title", ascending=True)
        elif sort == "za":
            result = result.sort_values("Title", ascending=False)
        elif sort == "fastest":
            result = result.sort_values("Total Steps", ascending=True)
        # "newest" — no date column, fallback ke urutan asli

        # ---- Pagination ----
        result = result.iloc[skip : skip + limit]

        output = []
        for _, row in result.iterrows():
            output.append({
                "id":                str(row["URL"]),   # pakai URL sebagai unique id
                "title":             row["Title"],
                "category":          row["Category"],
                "url":               row["URL"],
                "loves":             int(row["Loves"]),
                "total_ingredients": int(row["Total Ingredients"]),
                "total_steps":       int(row["Total Steps"]),
                "ingredients":       row["Ingredients Cleaned"],
            })

        return jsonify(output)

    except Exception as e:

        return jsonify({
            "success": False,
            "error": str(e)
        }), 500


@app.route("/api/recipes/count", methods=["GET"])
def get_recipes_count():

    try:

        q        = request.args.get("q", "")
        category = request.args.get("category", "")

        result = filter_recipes(q, category)

        return jsonify({"total": len(result)})

    except Exception as e:

        return jsonify({
            "success": False,
            "error": str(e)
        }), 500


@app.route("/api/search/history", methods=["POST"])
def log_search_history():
    # Endpoint stub — bisa dikembangkan ke DB nanti
    return jsonify({"success": True})


# =====================================================
# RECOMMENDATION API
# =====================================================

@app.route("/recommend", methods=["POST"])
def get_recommendation():

    try:

        data = request.get_json()

        category = data.get("category")
        ingredients = data.get("ingredients")

        if not category:

            return jsonify({
                "error": "Category wajib diisi"
            }), 400

        if not ingredients:

            return jsonify({
                "error": "Ingredients wajib diisi"
            }), 400

        result = recommend(
            recipes=recipes,
            category=category,
            ingredients=ingredients,
            idf_dict=idf_dict,
            top_n=10
        )

        recommendations = []

        for _, row in result.iterrows():

            matched, missing = explain_recommendation(
                ingredients,
                row["ingredient_list"]
            )

            match_percentage = round(
                (
                    len(matched)
                    /
                    len(set(row["ingredient_list"]))
                ) * 100,
                2
            )

            recommendations.append({

                "title": row["Title"],

                "category": row["Category"],

                "url": row["URL"],

                "similarity_score":
                    float(row["similarity_score"]),

                "popularity_score":
                    float(row["popularity_score"]),

                "final_score":
                    float(row["final_score"]),

                "match_percentage":
                    match_percentage,

                "matched_ingredients":
                    matched,

                "missing_ingredients":
                    missing

            })

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


# =====================================================
# RUN APP
# =====================================================

if __name__ == "__main__":
    app.run(
        host="0.0.0.0",
        port=8000,
        debug=True
    )