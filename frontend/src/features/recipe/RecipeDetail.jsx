import React, { useState } from 'react';

const RecipeDetail = ({ recipe, onBack, onNavigateSearch }) => {
  const [checkedSteps, setCheckedSteps] = useState(new Set());
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [showCongratsModal, setShowCongratsModal] = useState(false);

  // Parse cooking steps
  const steps = recipe.Steps ? recipe.Steps.split('\n').filter(Boolean) : [];

  // Parse raw ingredients
  const rawIngredients = recipe.Ingredients
    ? recipe.Ingredients.split('--').map((s) => s.trim()).filter(Boolean)
    : [];

  const handleToggleStep = (index) => {
    const newChecked = new Set(checkedSteps);
    if (newChecked.has(index)) {
      newChecked.delete(index);
    } else {
      newChecked.add(index);
    }
    setCheckedSteps(newChecked);
  };

  const progress = steps.length === 0 ? 0 : Math.round((checkedSteps.size / steps.length) * 100);
  const allStepsCompleted = checkedSteps.size === steps.length && steps.length > 0;

  const handleFinishClick = () => {
    if (allStepsCompleted) {
      setShowConfirmModal(true);
    }
  };

  const handleConfirmYes = () => {
    setShowConfirmModal(false);
    setShowCongratsModal(true);
  };

  const handleConfirmNo = () => {
    setShowConfirmModal(false);
  };

  const handleReturnSearch = () => {
    setCheckedSteps(new Set());
    setShowCongratsModal(false);
    if (onNavigateSearch) onNavigateSearch();
  };

  const heroPhoto = `https://images.unsplash.com/photo-${
    recipe.category === 'ayam' ? '1562967914-608f82629a7a' :
    recipe.category === 'sapi' ? '1544025162-d76694265947' :
    recipe.category === 'kambing' ? '1603048588665-791ca8aea617' :
    recipe.category === 'ikan' ? '1519708227418-c8fd9a32b7a2' :
    recipe.category === 'udang' ? '1559742811-822873691df0' : '1546069901-ba9599a7e63c'
  }?auto=format&fit=crop&q=80&w=1200`;

  return (
    <div className="bg-[#F8FAFC]">
      {/* Hero Banner */}
      <section className="relative w-full overflow-hidden" style={{ maxHeight: '400px' }}>
        <div className="aspect-[16/6] md:aspect-[16/5] w-full overflow-hidden">
          <img
            className="w-full h-full object-cover"
            src={heroPhoto}
            alt={recipe.title}
          />
        </div>
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-slate-900/30 to-transparent" />

        <div className="absolute bottom-0 left-0 right-0 p-4 sm:p-6 md:p-10">
          <div className="max-w-[1200px] mx-auto">
            <button
              onClick={onBack}
              className="flex items-center gap-1.5 bg-white/20 hover:bg-white/35 backdrop-blur-md text-white px-3 py-1.5 rounded-full transition-all active:scale-95 mb-3 border border-white/20 text-xs font-semibold"
            >
              <span className="material-symbols-outlined text-[16px]">arrow_back</span>
              <span>Kembali</span>
            </button>
            <h1 className="font-extrabold text-[clamp(1.2rem,3.5vw,2.2rem)] text-white mb-2 drop-shadow-md leading-tight">
              {recipe.title}
            </h1>
            <span className="bg-primary text-white text-[11px] font-bold px-3 py-1 rounded-full uppercase tracking-wider">
              Kategori {recipe.category}
            </span>
          </div>
        </div>
      </section>

      {/* Main Content Area */}
      <div className="max-w-[1200px] mx-auto px-4 md:px-10 mt-6 md:mt-8 w-full pb-10">
        <div className="grid grid-cols-1 lg:grid-cols-[40%_60%] gap-6 lg:gap-8 items-start">
          
          {/* ── LEFT COLUMN (40%) ── */}
          <div className="flex flex-col gap-5">
            
            {/* Match Score */}
            <div className="bg-primary text-white p-5 rounded-2xl shadow-sm">
              <div className="flex items-center justify-between mb-2">
                <span className="font-semibold text-sm text-[#b8c8ff]">Skor Kecocokan</span>
                <span className="font-extrabold text-3xl">{recipe.match_percentage}%</span>
              </div>
              <div className="w-full bg-white/20 h-2 rounded-full overflow-hidden mb-3">
                <div
                  className="bg-white h-full rounded-full transition-all duration-700"
                  style={{ width: `${recipe.match_percentage}%` }}
                />
              </div>
              <p className="text-xs text-[#dbe1ff] leading-relaxed">
                {recipe.match_percentage === 100
                  ? 'Bahan Anda sangat sempurna untuk membuat masakan ini!'
                  : `Hampir sempurna! Anda perlu ${recipe.missing_ingredients.length} bahan lagi.`}
              </p>
            </div>

            {/* Compact AI Evaluation Cards */}
            <div className="bg-white p-5 rounded-2xl shadow-sm border border-slate-100">
              <h3 className="font-bold text-slate-800 text-sm mb-4 flex items-center gap-2">
                <span className="material-symbols-outlined text-primary text-[18px]">analytics</span>
                Detail Evaluasi AI
              </h3>
              <div className="grid grid-cols-3 gap-3">
                <div className="bg-slate-50 p-3 rounded-xl border border-slate-100 text-center">
                  <div className="text-[10px] text-slate-500 font-semibold mb-1 uppercase tracking-wider">Jaccard Sim</div>
                  <div className="text-sm font-extrabold text-slate-800">{recipe.similarity_score.toFixed(4)}</div>
                </div>
                <div className="bg-slate-50 p-3 rounded-xl border border-slate-100 text-center">
                  <div className="text-[10px] text-slate-500 font-semibold mb-1 uppercase tracking-wider">Popularity</div>
                  <div className="text-sm font-extrabold text-slate-800">{recipe.popularity_score.toFixed(4)}</div>
                </div>
                <div className="bg-blue-50 p-3 rounded-xl border border-blue-100 text-center">
                  <div className="text-[10px] text-primary font-semibold mb-1 uppercase tracking-wider">Hybrid Rank</div>
                  <div className="text-sm font-extrabold text-primary">{recipe.final_score.toFixed(4)}</div>
                </div>
              </div>
            </div>

            {/* Available Ingredients */}
            <div className="bg-white p-5 rounded-2xl shadow-sm border border-emerald-100">
              <h3 className="font-bold mb-3 flex items-center gap-2 text-emerald-600 text-sm">
                <span className="material-symbols-outlined text-[18px]">check_circle</span>
                Bahan Tersedia
                <span className="ml-auto text-xs font-medium text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full">
                  {recipe.matched_ingredients.length}
                </span>
              </h3>
              <div className="flex flex-wrap gap-2">
                {recipe.matched_ingredients.map((ing) => (
                  <span
                    key={ing}
                    className="inline-flex items-center gap-1.5 text-slate-600 text-[13px] capitalize bg-emerald-50/60 px-3 py-1.5 rounded-lg border border-emerald-100/50"
                  >
                    <span className="material-symbols-outlined text-[14px] text-emerald-600">check</span>
                    {ing}
                  </span>
                ))}
              </div>
            </div>

            {/* Missing Ingredients */}
            {recipe.missing_ingredients.length > 0 && (
              <div className="bg-white p-5 rounded-2xl shadow-sm border border-red-100">
                <h3 className="font-bold mb-3 flex items-center gap-2 text-red-600 text-sm">
                  <span className="material-symbols-outlined text-[18px]">add_shopping_cart</span>
                  Perlu Dibeli
                  <span className="ml-auto text-xs font-medium text-red-700 bg-red-50 px-2 py-0.5 rounded-full">
                    {recipe.missing_ingredients.length}
                  </span>
                </h3>
                <div className="flex flex-wrap gap-2">
                  {recipe.missing_ingredients.map((ing) => (
                    <span
                      key={ing}
                      className="inline-flex items-center gap-1.5 text-slate-600 text-[13px] capitalize bg-red-50/60 px-3 py-1.5 rounded-lg border border-red-100/50"
                    >
                      <span className="w-1.5 h-1.5 rounded-full bg-red-500 shrink-0" />
                      {ing}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* Complete Ingredients List */}
            {rawIngredients.length > 0 && (
              <div className="bg-white p-5 rounded-2xl shadow-sm border border-slate-100">
                <h3 className="font-bold text-slate-800 text-sm mb-4 flex items-center gap-2">
                  <span className="material-symbols-outlined text-primary text-[18px]">grocery</span>
                  Bahan Lengkap Resep
                  <span className="ml-auto text-xs font-medium text-slate-400 bg-slate-100 px-2 py-0.5 rounded-full">
                    {rawIngredients.length} bahan
                  </span>
                </h3>
                <ul className="space-y-2.5">
                  {rawIngredients.map((ing, i) => (
                    <li key={i} className="flex items-start gap-2.5 text-[14px] text-slate-700">
                      <span className="text-slate-400 font-bold mt-[-1px]">•</span>
                      <span className="leading-snug">{ing}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

          </div>

          {/* ── RIGHT COLUMN (60%) ── */}
          <div className="flex flex-col gap-5">
            <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-6 md:p-8">
              
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6 pb-6 border-b border-slate-100">
                <h2 className="text-lg font-bold text-slate-800 flex items-center gap-2">
                  <span className="material-symbols-outlined text-primary text-2xl">soup_kitchen</span>
                  Langkah Memasak
                  <span className="ml-2 text-xs font-medium text-slate-500 bg-slate-100 px-2.5 py-1 rounded-full">
                    {steps.length} Langkah
                  </span>
                </h2>
                
                <div className="flex items-center gap-3">
                  <div className="text-sm font-semibold text-slate-600">Progress:</div>
                  <div className="flex items-center gap-2 bg-slate-50 px-3 py-1.5 rounded-full border border-slate-100">
                    <div className="w-16 bg-slate-200 h-1.5 rounded-full overflow-hidden">
                      <div 
                        className="bg-primary h-full transition-all duration-300"
                        style={{ width: `${progress}%` }}
                      />
                    </div>
                    <span className="text-xs font-bold text-primary">{progress}%</span>
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                {steps.map((step, idx) => {
                  const cleanStep = step.replace(/^\d+[\)\.]\s*/, '');
                  const isChecked = checkedSteps.has(idx);
                  
                  return (
                    <div 
                      key={idx} 
                      onClick={() => handleToggleStep(idx)}
                      className={`flex gap-4 p-4 rounded-xl border transition-all cursor-pointer ${
                        isChecked 
                          ? 'bg-blue-50/50 border-blue-200' 
                          : 'bg-white border-slate-100 hover:border-slate-300 hover:shadow-sm'
                      }`}
                    >
                      <div className="pt-0.5">
                        <div className={`w-6 h-6 rounded-md border flex items-center justify-center transition-colors ${
                          isChecked 
                            ? 'bg-primary border-primary text-white' 
                            : 'bg-white border-slate-300 text-transparent'
                        }`}>
                          <span className="material-symbols-outlined text-[16px] font-bold">check</span>
                        </div>
                      </div>
                      <div className="flex-1">
                        <div className={`font-bold text-sm mb-1 ${isChecked ? 'text-primary' : 'text-slate-800'}`}>
                          Langkah {idx + 1}
                        </div>
                        <p className={`text-[15px] leading-relaxed transition-colors ${
                          isChecked ? 'text-slate-500' : 'text-slate-700'
                        }`}>
                          {cleanStep}
                        </p>
                      </div>
                    </div>
                  );
                })}
              </div>

              <div className="mt-8 relative group">
                <button
                  onClick={handleFinishClick}
                  disabled={!allStepsCompleted}
                  className={`w-full py-3.5 rounded-xl font-bold text-sm transition-all duration-200 flex items-center justify-center gap-2 shadow-sm
                    ${allStepsCompleted 
                      ? 'bg-[#004AC6] hover:bg-[#003594] text-white active:scale-[0.98]' 
                      : 'bg-slate-100 text-slate-400 cursor-not-allowed border border-slate-200'
                    }
                  `}
                >
                  <span className="material-symbols-outlined text-[20px]">task_alt</span>
                  Selesai Memasak
                </button>
                
                {!allStepsCompleted && (
                  <div className="absolute -top-10 left-1/2 -translate-x-1/2 bg-slate-800 text-white text-xs py-1.5 px-3 rounded-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all whitespace-nowrap pointer-events-none">
                    Selesaikan seluruh langkah terlebih dahulu
                    <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 border-4 border-transparent border-t-slate-800" />
                  </div>
                )}
              </div>
            </div>
          </div>

        </div>
      </div>

      {/* Confirmation Modal */}
      {showConfirmModal && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-sm">
          <div className="bg-white rounded-2xl shadow-2xl w-[90%] max-w-[440px] p-8 md:p-10 transform scale-100 transition-all duration-300 border border-slate-100">
            <div className="w-14 h-14 bg-amber-100 text-amber-600 rounded-full flex items-center justify-center mx-auto mb-5 shadow-sm">
              <span className="material-symbols-outlined text-3xl">help_outline</span>
            </div>
            <h3 className="text-xl font-extrabold text-slate-800 text-center mb-2 tracking-tight">Selesai Memasak?</h3>
            <p className="text-slate-500 text-sm text-center mb-8 leading-relaxed">
              Apakah Anda yakin sudah menyelesaikan seluruh langkah memasak untuk resep ini?
            </p>
            <div className="flex gap-4">
              <button
                onClick={handleConfirmNo}
                className="flex-1 py-3 rounded-xl font-bold text-sm bg-slate-100 hover:bg-slate-200 text-slate-700 transition-all active:scale-[0.98]"
              >
                Belum
              </button>
              <button
                onClick={handleConfirmYes}
                className="flex-1 py-3 rounded-xl font-bold text-sm bg-primary hover:bg-[#003594] text-white shadow-md shadow-blue-500/20 transition-all active:scale-[0.98]"
              >
                Sudah
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Congratulations Modal */}
      {showCongratsModal && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-sm">
          <div className="bg-white rounded-2xl shadow-2xl w-[90%] max-w-[460px] p-8 md:p-12 transform scale-100 transition-all duration-300 text-center border border-slate-100">
            <div className="w-20 h-20 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto mb-6 shadow-sm">
              <span className="material-symbols-outlined text-5xl">celebration</span>
            </div>
            <h3 className="text-2xl md:text-3xl font-black text-slate-800 mb-3 tracking-tight">🎉 Selamat!</h3>
            <p className="text-slate-500 text-[15px] mb-8 leading-relaxed">
              Anda berhasil menyelesaikan resep ini. Semoga hidangan buatan Anda lezat dan sesuai dengan mood hari ini!
            </p>
            <button
              onClick={handleReturnSearch}
              className="w-full py-3.5 rounded-xl font-bold text-sm bg-[#004AC6] hover:bg-[#003594] text-white shadow-lg shadow-blue-500/25 transition-all active:scale-[0.98] flex items-center justify-center gap-2"
            >
              <span className="material-symbols-outlined text-[18px]">search</span>
              Kembali Cari Resep
            </button>
          </div>
        </div>
      )}

    </div>
  );
};

export default RecipeDetail;
