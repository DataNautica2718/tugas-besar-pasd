import pandas as pd

from recommender import recommend


# =====================================================
# LOAD DATA
# =====================================================

print("Loading data...")

recipes = pd.read_parquet(
    "data/recipes_clean.parquet"
)

idf_df = pd.read_parquet(
    "data/ingredient_idf.parquet"
)

print("Data loaded successfully!")
print()

print(idf_df.head())
print(idf_df.shape)

idf_df.shape

print(
    recipes["ingredient_list"].iloc[0]
)

print(
    type(
        recipes["ingredient_list"].iloc[0]
    )
)


# =====================================================
# CONVERT IDF TO DICTIONARY
# =====================================================

idf_dict = dict(
    zip(
        idf_df["ingredient"],
        idf_df["idf"]
    )
)

from difflib import get_close_matches

# =====================================================
# VALID INGREDIENTS
# =====================================================

valid_ingredients = set(
    idf_df["ingredient"]
)

def validate_user_ingredients(
    ingredients,
    valid_ingredients
):
    valid = []
    invalid = []

    for ing in ingredients:

        ing = ing.lower().strip()

        if ing in valid_ingredients:
            valid.append(ing)

        else:
            invalid.append(ing)

    if invalid:

        print("\n⚠️ Bahan tidak dikenali:")

        for ing in invalid:

            suggestion = get_close_matches(
                ing,
                valid_ingredients,
                n=1,
                cutoff=0.7
            )

            if suggestion:

                print(
                    f"- '{ing}' -> mungkin maksudnya '{suggestion[0]}'"
                )

            else:

                print(
                    f"- '{ing}'"
                )

    if len(valid) == 0:

        raise ValueError(
            "Tidak ada bahan yang valid. Silakan masukkan bahan makanan yang dikenali sistem."
        )

    return valid

print(f"Jumlah resep : {len(recipes)}")
print(f"Jumlah bahan unik : {len(idf_dict)}")
print()


# =====================================================
# USER INPUT
# =====================================================

category = "udang"

ingredients = [
    "garam",
    "gula",
    "lada",
    "bawang putih",
    "cabai",
    "wajan"
]

ingredients = validate_user_ingredients(
    ingredients,
    valid_ingredients
)

print("=== USER INPUT ===")
print("Kategori :", category)
print("Bahan :", ingredients)
print()


# =====================================================
# RUN RECOMMENDER
# =====================================================

result = recommend(
    recipes=recipes,
    category=category,
    ingredients=ingredients,
    idf_dict=idf_dict,
    top_n=3
)

print("Recommendation generated!")
print()


# =====================================================
# SHOW TOP 3
# =====================================================

print("=== TOP 3 RECOMMENDATIONS ===")
print()

for index, row in result.iterrows():

    print(f"Title       : {row['Title']}")
    print(f"Category    : {row['Category']}")
    print(f"Similarity  : {row['similarity_score']:.4f}")
    print(f"Popularity  : {row['popularity_score']:.4f}")
    print(f"Final Score : {row['final_score']:.4f}")
    print(f"URL         : {row['URL']}")
    print("-" * 60)