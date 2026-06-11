def clean_string(val):
    if not isinstance(val, str):
        return ""
    return val.strip().lower()
