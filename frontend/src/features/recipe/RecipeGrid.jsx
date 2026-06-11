import React from 'react';
import RecipeCard from './RecipeCard';

const RecipeGrid = ({ recipes, onViewDetail }) => {
  if (!recipes || recipes.length === 0) {
    return (
      <div className="text-center py-2xl bg-white border border-slate-100 rounded-2xl shadow-sm">
        <span className="material-symbols-outlined text-slate-300 text-5xl mb-xs">
          restaurant_menu
        </span>
        <p className="text-slate-500 font-semibold">Tidak ada resep yang ditemukan.</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
      {recipes.map((recipe, index) => (
        <RecipeCard
          key={`${recipe.title}-${index}`}
          recipe={recipe}
          onViewDetail={onViewDetail}
        />
      ))}
    </div>
  );
};

export default RecipeGrid;
