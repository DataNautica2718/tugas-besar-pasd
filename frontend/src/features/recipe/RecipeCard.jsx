import React from 'react';

const RecipeCard = ({ recipe, onViewDetail }) => {
  // Approximate star rating based on loves
  const starRating = recipe.popularity_score > 0.8 ? '4.9' : recipe.popularity_score > 0.5 ? '4.7' : '4.5';
  
  return (
    <div className="bg-white rounded-2xl overflow-hidden border border-slate-100 hover:border-primary/20 shadow-sm hover:shadow-md transition-all flex flex-col h-full group">
      {/* Image & Popularity Badge */}
      <div className="aspect-video relative overflow-hidden bg-slate-100">
        <img
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          src={`https://images.unsplash.com/photo-${
            recipe.category === 'ayam' ? '1562967914-608f82629a7a' :
            recipe.category === 'sapi' ? '1544025162-d76694265947' :
            recipe.category === 'kambing' ? '1603048588665-791ca8aea617' :
            recipe.category === 'ikan' ? '1519708227418-c8fd9a32b7a2' :
            recipe.category === 'udang' ? '1559742811-822873691df0' : '1546069901-ba9599a7e63c'
          }?auto=format&fit=crop&q=80&w=400`}
          alt={recipe.title}
        />
        
        <div className="absolute top-4 right-4 bg-white/95 px-sm py-1 rounded-full shadow-sm flex items-center gap-1 text-xs font-bold text-primary">
          <span className="material-symbols-outlined text-[14px] fill-1 text-amber-500">star</span>
          {starRating}
        </div>
      </div>

      {/* Card Body */}
      <div className="p-5 flex flex-col flex-grow">
        <div className="flex justify-between items-start gap-xs mb-sm">
          <h3 className="font-bold text-slate-800 text-lg group-hover:text-primary transition-colors line-clamp-1">
            {recipe.title}
          </h3>
          <span className="bg-[#e7eeff] text-primary px-2.5 py-0.5 rounded-full text-xs font-extrabold whitespace-nowrap">
            {recipe.match_percentage}% Cocok
          </span>
        </div>

        {/* Score indicators */}
        <div className="grid grid-cols-2 gap-sm bg-slate-50 p-sm rounded-xl mb-md text-xs font-semibold text-slate-500">
          <div>
            <span className="block text-[10px] text-slate-400">JACCARD SIMILARITY</span>
            <span>{recipe.similarity_score.toFixed(3)}</span>
          </div>
          <div>
            <span className="block text-[10px] text-slate-400">HYBRID SCORE</span>
            <span className="text-primary">{recipe.final_score.toFixed(3)}</span>
          </div>
        </div>

        {/* Ingredients status lists */}
        <div className="space-y-sm flex-grow mb-lg">
          <div>
            <h4 className="text-[11px] font-bold text-emerald-600 mb-xs">BAHAN COCOK ({recipe.matched_ingredients.length})</h4>
            <div className="flex flex-wrap gap-xs">
              {recipe.matched_ingredients.slice(0, 4).map((ing) => (
                <span key={ing} className="bg-emerald-50 text-emerald-700 border border-emerald-100 text-[10px] font-bold px-2 py-0.5 rounded-full capitalize">
                  {ing}
                </span>
              ))}
              {recipe.matched_ingredients.length > 4 && (
                <span className="bg-emerald-50 text-emerald-600 text-[10px] font-bold px-2 py-0.5 rounded-full">
                  +{recipe.matched_ingredients.length - 4}
                </span>
              )}
            </div>
          </div>

          <div>
            <h4 className="text-[11px] font-bold text-red-500 mb-xs">BELUM TERSEDIA ({recipe.missing_ingredients.length})</h4>
            <div className="flex flex-wrap gap-xs">
              {recipe.missing_ingredients.slice(0, 3).map((ing) => (
                <span key={ing} className="bg-red-50 text-red-600 border border-red-100 text-[10px] font-bold px-2 py-0.5 rounded-full capitalize">
                  {ing}
                </span>
              ))}
              {recipe.missing_ingredients.length > 3 && (
                <span className="bg-red-50 text-red-500 text-[10px] font-bold px-2 py-0.5 rounded-full">
                  +{recipe.missing_ingredients.length - 3}
                </span>
              )}
            </div>
          </div>
        </div>

        {/* Card Button */}
        <button
          onClick={() => onViewDetail(recipe)}
          className="w-full h-11 bg-primary hover:bg-[#003594] text-white rounded-xl font-bold text-xs flex items-center justify-center gap-1.5 active:scale-95 transition-all shadow-sm"
        >
          Lihat Detail Resep
          <span className="material-symbols-outlined text-[16px]">arrow_forward</span>
        </button>
      </div>
    </div>
  );
};

export default RecipeCard;
