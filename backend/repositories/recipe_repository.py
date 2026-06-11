import pandas as pd
from services.dataset.dataset_loader import DatasetLoader
from models.recipe_model import Recipe

class RecipeRepository:
    @staticmethod
    def get_dataframe():
        return DatasetLoader.load_recipes()

    @classmethod
    def get_all(cls, q="", category="", sort="popular", skip=0, limit=20):
        df = cls.get_dataframe().copy()

        if q:
            df = df[df["Title"].str.lower().str.contains(q.lower(), na=False)]
        
        if category:
            df = df[df["Category"].str.lower() == category.lower()]

        # Sorting
        if sort == "popular":
            df = df.sort_values("Loves", ascending=False)
        elif sort == "az":
            df = df.sort_values("Title", ascending=True)
        elif sort == "za":
            df = df.sort_values("Title", ascending=False)
        elif sort == "fastest":
            df = df.sort_values("Total Steps", ascending=True)

        # Pagination
        df = df.iloc[skip : skip + limit]

        recipes = []
        for _, row in df.iterrows():
            # Convert series row to dictionary
            recipes.append(Recipe.from_row(row.to_dict()))
        return recipes

    @classmethod
    def count(cls, q="", category=""):
        df = cls.get_dataframe()

        if q:
            df = df[df["Title"].str.lower().str.contains(q.lower(), na=False)]
        
        if category:
            df = df[df["Category"].str.lower() == category.lower()]

        return len(df)

    @classmethod
    def get_by_id(cls, id_url):
        df = cls.get_dataframe()
        row = df[df["URL"] == id_url]
        if row.empty:
            return None
        return Recipe.from_row(row.iloc[0].to_dict())
