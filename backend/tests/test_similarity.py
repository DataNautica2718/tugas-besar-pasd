import unittest
import sys
import os

# Ensure backend directory is in the path
sys.path.append(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))

from services.recommendation.similarity import weighted_jaccard

class TestSimilarity(unittest.TestCase):
    def setUp(self):
        self.idf_dict = {
            "garam": 0.5,
            "bawang putih": 1.2,
            "cabai": 1.8,
            "ayam": 2.5
        }

    def test_weighted_jaccard_all_match(self):
        # All user ingredients match the recipe ingredients
        user_ing = ["garam", "bawang putih"]
        recipe_ing = ["garam", "bawang putih"]
        score = weighted_jaccard(user_ing, recipe_ing, self.idf_dict)
        self.assertAlmostEqual(score, 1.0)

    def test_weighted_jaccard_partial_match(self):
        # User has ["garam", "bawang putih"], recipe has ["bawang putih", "cabai"]
        # Match/Intersection: ["bawang putih"] -> weight = 1.2
        # Union: ["garam", "bawang putih", "cabai"] -> weight = 0.5 + 1.2 + 1.8 = 3.5
        # Expected score: 1.2 / 3.5 = 0.342857
        user_ing = ["garam", "bawang putih"]
        recipe_ing = ["bawang putih", "cabai"]
        score = weighted_jaccard(user_ing, recipe_ing, self.idf_dict)
        self.assertAlmostEqual(score, 1.2 / 3.5)

    def test_weighted_jaccard_no_match(self):
        # No matching ingredients
        user_ing = ["garam"]
        recipe_ing = ["ayam"]
        score = weighted_jaccard(user_ing, recipe_ing, self.idf_dict)
        self.assertEqual(score, 0.0)

    def test_weighted_jaccard_empty(self):
        # Both empty
        user_ing = []
        recipe_ing = []
        score = weighted_jaccard(user_ing, recipe_ing, self.idf_dict)
        self.assertEqual(score, 0.0)

    def test_weighted_jaccard_default_weight(self):
        # Ingredient not in idf_dict should fall back to weight 1
        user_ing = ["minyak"]
        recipe_ing = ["minyak"]
        score = weighted_jaccard(user_ing, recipe_ing, self.idf_dict)
        self.assertAlmostEqual(score, 1.0)

if __name__ == "__main__":
    unittest.main()
