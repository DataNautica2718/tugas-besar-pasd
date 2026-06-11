import os

class Settings:
    PORT = int(os.environ.get("PORT", 8000))
    HOST = os.environ.get("HOST", "0.0.0.0")
    DEBUG = os.environ.get("DEBUG", "True").lower() == "true"
    
    # Path to dataset relative to backend directory
    BASE_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
    STORAGE_DIR = os.path.join(BASE_DIR, "storage")
    
    RECIPES_PATH = os.path.join(STORAGE_DIR, "recipes.parquet")
    IDF_DICT_PATH = os.path.join(STORAGE_DIR, "idf_dictionary.pkl")
