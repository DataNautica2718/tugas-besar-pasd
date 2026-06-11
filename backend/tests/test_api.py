import unittest
import json
import sys
import os

# Ensure backend directory is in the path
sys.path.append(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))

from app import app
from services.dataset.dataset_loader import DatasetLoader

class TestAPI(unittest.TestCase):
    @classmethod
    def setUpClass(cls):
        # Set testing configuration
        app.config["TESTING"] = True
        cls.client = app.test_client()
        
        # Make sure datasets are loaded (they should be loaded in app.py, but do it here as well for safety)
        DatasetLoader.load_recipes()
        DatasetLoader.load_idf_dict()

    def test_root_endpoint(self):
        response = self.client.get("/")
        self.assertEqual(response.status_code, 200)
        data = json.loads(response.data)
        self.assertEqual(data["status"], "success")
        self.assertIn("FoodyMoody", data["message"])

    def test_health_endpoint(self):
        response = self.client.get("/health")
        self.assertEqual(response.status_code, 200)
        data = json.loads(response.data)
        self.assertEqual(data["status"], "active")

    def test_recipes_list_endpoint(self):
        response = self.client.get("/api/recipes")
        self.assertEqual(response.status_code, 200)
        data = json.loads(response.data)
        self.assertIsInstance(data, list)

    def test_recipes_count_endpoint(self):
        response = self.client.get("/api/recipes/count")
        self.assertEqual(response.status_code, 200)
        data = json.loads(response.data)
        self.assertIn("total", data)
        self.assertIsInstance(data["total"], int)

    def test_recommendation_success(self):
        payload = {
            "category": "ayam",
            "ingredients": ["bawang putih", "garam", "cabai"]
        }
        response = self.client.post(
            "/recommend",
            data=json.dumps(payload),
            content_type="application/json"
        )
        self.assertEqual(response.status_code, 200)
        data = json.loads(response.data)
        self.assertTrue(data["success"])
        self.assertIn("recommendations", data)
        self.assertGreater(len(data["recommendations"]), 0)

    def test_recommendation_validation_error(self):
        # Missing ingredients
        payload = {
            "category": "ayam"
        }
        response = self.client.post(
            "/recommend",
            data=json.dumps(payload),
            content_type="application/json"
        )
        self.assertEqual(response.status_code, 400)
        data = json.loads(response.data)
        self.assertIn("error", data)

        # Empty ingredients
        payload = {
            "category": "ayam",
            "ingredients": []
        }
        response = self.client.post(
            "/recommend",
            data=json.dumps(payload),
            content_type="application/json"
        )
        self.assertEqual(response.status_code, 400)
        data = json.loads(response.data)
        self.assertIn("error", data)

if __name__ == "__main__":
    unittest.main()
