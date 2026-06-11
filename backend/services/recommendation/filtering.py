def filter_by_category(recipes, category):
    """
    Memfilter resep berdasarkan kategori yang dipilih user.
    """
    return recipes[recipes["Category"].str.lower() == category.lower()].copy()
