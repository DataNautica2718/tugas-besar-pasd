import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import RecipeDetail from '../features/recipe/RecipeDetail';

const DetailPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { recipe } = location.state || {};

  if (!recipe) {
    return (
      <div className="pt-[72px] pb-12 max-w-[576px] mx-auto text-center px-4">
        <div className="mt-12 bg-slate-50 border border-slate-200 rounded-2xl p-6 space-y-4">
          <span className="material-symbols-outlined text-slate-400 text-5xl">receipt_long</span>
          <h2 className="text-xl font-bold text-slate-800">Resep Tidak Ditemukan</h2>
          <p className="text-sm text-slate-600">Silakan cari resep terlebih dahulu di halaman pencarian.</p>
          <button
            onClick={() => navigate('/search')}
            className="bg-primary hover:bg-[#003594] text-white px-6 py-2.5 rounded-xl font-semibold text-sm transition-colors"
          >
            Ke Pencarian
          </button>
        </div>
      </div>
    );
  }

  const handleNavigateSearch = () => {
    navigate('/search');
  };

  return (
    <main className="pt-[72px] pb-12 bg-[#F8FAFC] min-h-screen">
      <RecipeDetail
        recipe={recipe}
        onBack={() => navigate(-1)}
        onNavigateSearch={handleNavigateSearch}
      />
    </main>
  );
};

export default DetailPage;
