class Recipe:
    def __init__(self, title, category, url, loves, total_ingredients, total_steps, ingredients_cleaned, ingredient_list, steps, ingredients_raw=""):
        self.title = title
        self.category = category
        self.url = url
        self.loves = loves
        self.total_ingredients = total_ingredients
        self.total_steps = total_steps
        self.ingredients_cleaned = ingredients_cleaned
        self.ingredient_list = ingredient_list
        self.steps = steps
        self.ingredients_raw = ingredients_raw

    @classmethod
    def from_row(cls, row):
        return cls(
            title=row.get("Title", ""),
            category=row.get("Category", ""),
            url=row.get("URL", ""),
            loves=int(row.get("Loves", 0)),
            total_ingredients=int(row.get("Total Ingredients", 0)),
            total_steps=int(row.get("Total Steps", 0)),
            ingredients_cleaned=row.get("Ingredients Cleaned", ""),
            ingredient_list=row.get("ingredient_list", []),
            steps=row.get("Steps", ""),
            ingredients_raw=row.get("Ingredients", "")
        )

    def to_dict(self):
        return {
            "id": self.url, # use URL as unique id
            "title": self.title,
            "category": self.category,
            "url": self.url,
            "loves": self.loves,
            "total_ingredients": self.total_ingredients,
            "total_steps": self.total_steps,
            "ingredients": self.ingredients_cleaned,
            "steps": self.steps,
            "Ingredients": self.ingredients_raw
        }
