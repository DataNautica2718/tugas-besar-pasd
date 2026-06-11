import os
import pickle
import pandas as pd
from config.config import settings
from utils.logger import logger

class DatasetLoader:
    _recipes = None
    _idf_dict = None

    @classmethod
    def load_recipes(cls):
        if cls._recipes is None:
            path = settings.RECIPES_PATH
            logger.info(f"Loading recipes dataset from {path}")
            if not os.path.exists(path):
                raise FileNotFoundError(f"Recipes file not found at {path}. Please run dataset generator first.")
            cls._recipes = pd.read_parquet(path)
        return cls._recipes

    @classmethod
    def load_idf_dict(cls):
        if cls._idf_dict is None:
            path = settings.IDF_DICT_PATH
            logger.info(f"Loading IDF dictionary from {path}")
            if not os.path.exists(path):
                raise FileNotFoundError(f"IDF dictionary file not found at {path}. Please run dataset generator first.")
            with open(path, "rb") as f:
                cls._idf_dict = pickle.load(f)
        return cls._idf_dict

    @classmethod
    def reload(cls):
        cls._recipes = None
        cls._idf_dict = None
        return cls.load_recipes(), cls.load_idf_dict()
