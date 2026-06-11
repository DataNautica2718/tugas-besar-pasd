import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import useRecommendation from '../hooks/useRecommendation';
import RecipeGrid from '../features/recipe/RecipeGrid';

const LOADING_STATUSES = [
  "Menganalisis profil rasa...",
  "Mencocokkan bahan-bahan...",
  "Menghitung kemiripan Weighted Jaccard...",
  "Menggabungkan skor popularitas...",
  "Menyusun langkah memasak...",
  "Hampir siap!"
];

const RecommendationPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { category, ingredients } = location.state || {};

  const [progress, setProgress] = useState(0);
  const [loadingStatus, setLoadingStatus] = useState(LOADING_STATUSES[0]);
  const [isLoading, setIsLoading] = useState(true);
  const [recommendations, setRecommendations] = useState([]);
  const [error, setError] = useState(null);

  // Redirect if criteria missing
  useEffect(() => {
    if (!category || !ingredients || ingredients.length === 0) {
      navigate('/search');
    }
  }, [category, ingredients, navigate]);

  // Fetch recommendations via React Query
  const { data: apiData, isLoading: isApiLoading, error: apiError } = useRecommendation(category, ingredients);

  // Progress bar simulation
  useEffect(() => {
    if (!category || !ingredients || ingredients.length === 0) return;

    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          if (apiError) {
            setError(apiError.message || 'Terjadi kesalahan saat memuat data');
            setIsLoading(false);
          } else if (apiData) {
            if (!apiData.success || !apiData.recommendations || apiData.recommendations.length === 0) {
              navigate('/not-found');
            } else {
              setRecommendations(apiData.recommendations);
              setIsLoading(false);
            }
          } else {
            return 100;
          }
          return 100;
        }
        const next = prev + Math.random() * 20;
        const statusIdx = Math.floor((next / 100) * LOADING_STATUSES.length);
        setLoadingStatus(LOADING_STATUSES[Math.min(statusIdx, LOADING_STATUSES.length - 1)]);
        return next > 100 ? 100 : next;
      });
    }, 300);

    return () => clearInterval(interval);
  }, [category, ingredients, apiData, apiError, navigate]);

  const handleViewDetail = (recipe) => {
    navigate('/detail', { state: { recipe } });
  };

  // Loading Screen
  if (isLoading) {
    return (
      <div className="pt-[72px] min-h-screen flex flex-col items-center justify-center bg-[#F8FAFC] px-4">
        <div className="w-full max-w-[384px] md:max-w-[512px] text-center space-y-7">
          <div className="relative w-36 h-36 md:w-52 md:h-52 mx-auto flex items-center justify-center">
            {/* Dashed outer spinner */}
            <div className="absolute inset-0 border-4 border-dashed border-primary/20 rounded-full animate-[spin_20s_linear_infinite]" />
            {/* Main floating icon */}
            <div className="bg-white p-6 rounded-[2rem] shadow-lg animate-float flex items-center justify-center relative z-10 border border-slate-100">
              <span className="material-symbols-outlined text-primary text-5xl md:text-7xl">
                restaurant_menu
              </span>
            </div>
          </div>
          <div className="space-y-2">
            <h1 className="font-extrabold text-xl md:text-3xl text-slate-800">
              Mencari Resep Terbaik...
            </h1>
            <p className="text-slate-500 text-sm md:text-base">
              Kami membandingkan bahan Anda dengan ratusan kombinasi resep.
            </p>
          </div>
          <div className="w-full max-w-[384px] mx-auto space-y-2">
            <div className="w-full h-3 bg-slate-100 rounded-full overflow-hidden border border-slate-200/50">
              <div
                className="progress-bar h-full bg-primary rounded-full"
                style={{ width: `${progress}%` }}
              />
            </div>
            <div className="flex justify-between items-center text-xs font-semibold text-slate-400">
              <span>{Math.floor(progress)}%</span>
              <span className="text-primary">{loadingStatus}</span>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="pt-[72px] pb-12 max-w-[576px] mx-auto text-center px-4">
        <div className="mt-12 bg-red-50 border border-red-200 rounded-2xl p-6 space-y-4">
          <span className="material-symbols-outlined text-red-500 text-5xl">error</span>
          <h2 className="text-xl font-bold text-slate-800">Gagal Memuat Resep</h2>
          <p className="text-sm text-slate-600">{error}</p>
          <button
            onClick={() => navigate('/search')}
            className="bg-primary hover:bg-[#003594] text-white px-6 py-2.5 rounded-xl font-semibold text-sm transition-colors"
          >
            Cari Ulang
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="pt-[72px] pb-12 min-h-screen">
      {/* Page Header */}
      <div className="bg-white border-b border-slate-100 py-6 md:py-8">
        <div className="max-w-[1200px] mx-auto px-4 md:px-10 w-full">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
            <div>
              <h1 className="font-extrabold text-[clamp(1.4rem,3.5vw,2.25rem)] text-slate-900">
                Rekomendasi Resep Untukmu
              </h1>
              <p className="text-slate-500 mt-1 text-sm md:text-base">
                Daftar resep berbasis kategori{' '}
                <span className="font-bold text-primary capitalize">{category}</span>{' '}
                yang paling cocok dengan bahan Anda.
              </p>
            </div>
            <button
              onClick={() => navigate('/search')}
              className="bg-slate-100 hover:bg-slate-200 text-slate-700 px-5 py-2.5 rounded-xl font-semibold text-sm active:scale-95 transition-all border border-slate-200 flex items-center justify-center gap-2 self-start sm:self-auto shrink-0"
            >
              <span className="material-symbols-outlined text-base">arrow_back</span>
              Ubah Bahan
            </button>
          </div>
        </div>
      </div>

      {/* Grid */}
      <div className="max-w-[1200px] mx-auto px-4 md:px-10 w-full mt-6 md:mt-8">
        <RecipeGrid recipes={recommendations} onViewDetail={handleViewDetail} />
      </div>
    </div>
  );
};

export default RecommendationPage;
