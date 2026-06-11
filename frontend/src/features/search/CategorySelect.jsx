import React from 'react';

const CATEGORIES = [
  { value: 'ayam', label: 'Daging Ayam' },
  { value: 'sapi', label: 'Daging Sapi' },
  { value: 'kambing', label: 'Daging Kambing' },
  { value: 'ikan', label: 'Ikan & Seafood' },
  { value: 'tahu', label: 'Tahu' },
  { value: 'tempe', label: 'Tempe' },
  { value: 'telur', label: 'Telur' },
  { value: 'udang', label: 'Udang' },
];

const CategorySelect = ({ value, onChange }) => {
  return (
    <div className="w-full flex flex-col gap-xs">
      <label className="block font-bold text-sm text-slate-700">
        Kategori Masakan
      </label>
      <div className="relative">
        <select
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="w-full h-12 px-md bg-white border border-slate-200 rounded-xl appearance-none outline-none focus:border-primary focus:ring-1 focus:ring-primary text-sm font-medium transition-all"
        >
          {CATEGORIES.map((cat) => (
            <option key={cat.value} value={cat.value}>
              {cat.label}
            </option>
          ))}
        </select>
        <span className="material-symbols-outlined absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-slate-400">
          expand_more
        </span>
      </div>
    </div>
  );
};

export default CategorySelect;
