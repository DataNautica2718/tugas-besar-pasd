import React, { useState, useEffect, useRef } from 'react';
import { INDONESIAN_INGREDIENTS, SUGGESTIONS } from '../../utils/constants';

const IngredientInput = ({ ingredients, onAddIngredient, onRemoveIngredient }) => {
  const [inputValue, setInputValue] = useState('');
  const [autocompleteList, setAutocompleteList] = useState([]);
  const [showAutocomplete, setShowAutocomplete] = useState(false);
  const autocompleteRef = useRef(null);

  useEffect(() => {
    if (inputValue.trim() === '') {
      setAutocompleteList([]);
      return;
    }
    const filtered = INDONESIAN_INGREDIENTS.filter(
      (ing) =>
        ing.toLowerCase().includes(inputValue.toLowerCase()) &&
        !ingredients.includes(ing)
    );
    setAutocompleteList(filtered.slice(0, 5));
  }, [inputValue, ingredients]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (autocompleteRef.current && !autocompleteRef.current.contains(event.target)) {
        setShowAutocomplete(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleAdd = (name) => {
    const cleanName = name.trim().toLowerCase();
    if (cleanName && !ingredients.includes(cleanName)) {
      onAddIngredient(cleanName);
    }
    setInputValue('');
    setShowAutocomplete(false);
  };

  return (
    <div className="w-full flex flex-col gap-xs">
      <label className="block font-bold text-sm text-slate-700">
        Bahan-bahan yang kamu miliki
      </label>
      
      <div className="relative flex flex-wrap gap-xs p-2 min-h-[56px] bg-white border border-slate-200 rounded-xl focus-within:border-primary focus-within:ring-1 focus-within:ring-primary transition-all">
        {ingredients.map((item) => (
          <div
            key={item}
            className="chip-enter bg-[#e7eeff] text-primary px-3 py-1 rounded-full flex items-center gap-xs font-semibold text-xs border border-[#b8c8ff]/25 animate-in fade-in zoom-in-90 duration-200"
          >
            <span>{item}</span>
            <button
              onClick={() => onRemoveIngredient(item)}
              className="hover:text-red-600 transition-colors flex items-center justify-center"
            >
              <span className="material-symbols-outlined text-[14px] font-bold">close</span>
            </button>
          </div>
        ))}

        <div className="flex-grow relative" ref={autocompleteRef}>
          <input
            type="text"
            value={inputValue}
            onChange={(e) => {
              setInputValue(e.target.value);
              setShowAutocomplete(true);
            }}
            onFocus={() => setShowAutocomplete(true)}
            onKeyDown={(e) => {
              if (e.key === 'Enter') {
                e.preventDefault();
                if (inputValue.trim()) handleAdd(inputValue);
              }
            }}
            className="w-full h-10 px-2 border-none focus:outline-none focus:ring-0 text-sm placeholder-slate-400 bg-transparent"
            placeholder={ingredients.length === 0 ? "Ketik bahan (contoh: bawang merah)" : "Tambah bahan..."}
          />

          {/* Autocomplete dropdown */}
          {showAutocomplete && autocompleteList.length > 0 && (
            <div className="absolute left-0 right-0 mt-2 bg-white border border-slate-200 rounded-xl shadow-lg z-30 max-h-60 overflow-y-auto">
              {autocompleteList.map((item) => (
                <div
                  key={item}
                  onClick={() => handleAdd(item)}
                  className="px-md py-2.5 hover:bg-slate-50 cursor-pointer text-sm text-slate-700 font-medium transition-colors"
                >
                  {item}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Suggestions */}
      <div className="mt-sm flex flex-wrap gap-xs items-center">
        <span className="text-xs text-slate-400 font-medium">Saran bahan:</span>
        {SUGGESTIONS.filter((s) => !ingredients.includes(s)).map((sug) => (
          <button
            key={sug}
            onClick={() => handleAdd(sug)}
            className="text-xs bg-slate-100 hover:bg-primary/10 hover:text-primary px-3 py-1 rounded-full text-slate-600 font-semibold transition-colors border border-transparent hover:border-primary/20"
          >
            + {sug}
          </button>
        ))}
      </div>
    </div>
  );
};

export default IngredientInput;
