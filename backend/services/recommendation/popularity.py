def calculate_popularity(candidates):
    """Mengubah Loves menjadi skor 0-1."""
    if candidates.empty:
        candidates["popularity_score"] = 0
        return candidates
        
    max_loves = candidates["Loves"].max()
    if max_loves == 0:
        candidates["popularity_score"] = 0.0
    else:
        candidates["popularity_score"] = candidates["Loves"] / max_loves
    return candidates
