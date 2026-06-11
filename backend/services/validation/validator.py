def validate_recommendation_request(data):
    if not data:
        return False, "Request body empty"
    
    category = data.get("category")
    ingredients = data.get("ingredients")
    
    if not category:
        return False, "Category wajib diisi"
        
    if not ingredients:
        return False, "Ingredients wajib diisi"
        
    if not isinstance(ingredients, list):
        return False, "Ingredients harus berupa array/list"
        
    return True, None
