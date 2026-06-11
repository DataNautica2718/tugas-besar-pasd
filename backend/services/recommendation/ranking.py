def hybrid_ranking(candidates, similarity_weight=0.8, popularity_weight=0.2):
    """Menggabungkan similarity score dan popularity score."""
    if candidates.empty:
        candidates["final_score"] = 0.0
        return candidates
        
    candidates["final_score"] = (
        similarity_weight * candidates["similarity_score"]
        + popularity_weight * candidates["popularity_score"]
    )
    return candidates
