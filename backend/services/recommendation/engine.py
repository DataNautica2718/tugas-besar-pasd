from .similarity import calculate_similarity
from .popularity import calculate_popularity
from .ranking import hybrid_ranking
from .explanation import explain_recommendation

class RecommendationEngine:
    @staticmethod
    def recommend(recipes_df, category, user_ingredients, idf_dict, top_n=10):
        """
        Runs the recommendation pipeline:
        Filtering -> Similarity -> Popularity -> Ranking -> Explanation
        """
        # 1. Filter and calculate similarity
        candidates = calculate_similarity(recipes_df, category, user_ingredients, idf_dict)
        if candidates.empty:
            return []

        # 2. Calculate popularity score
        candidates = calculate_popularity(candidates)

        # 3. Apply hybrid ranking
        candidates = hybrid_ranking(candidates)

        # 4. Sort by final score and slice
        top_candidates = (
            candidates
            .sort_values(by="final_score", ascending=False)
            .head(top_n)
        )

        # 5. Explain and format matching results
        recommendations = []
        for _, row in top_candidates.iterrows():
            matched, missing = explain_recommendation(
                user_ingredients,
                row["ingredient_list"]
            )

            total_unique_recipe_ings = len(set(row["ingredient_list"]))
            match_percentage = 0.0
            if total_unique_recipe_ings > 0:
                match_percentage = round(
                    (len(matched) / total_unique_recipe_ings) * 100,
                    2
                )

            recommendations.append({
                "title": row["Title"],
                "category": row["Category"],
                "url": row["URL"],
                "Steps": row["Steps"],
                "Ingredients": row["Ingredients"],
                "similarity_score": float(row["similarity_score"]),
                "popularity_score": float(row["popularity_score"]),
                "final_score": float(row["final_score"]),
                "match_percentage": match_percentage,
                "matched_ingredients": matched,
                "missing_ingredients": missing
            })

        return recommendations
