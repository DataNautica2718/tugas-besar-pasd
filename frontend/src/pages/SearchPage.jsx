import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import SearchForm from '../features/search/SearchForm';
import { getSearchState, setSearchState } from '../store/recommendationStore';

const SearchPage = () => {
  const navigate = useNavigate();
  const cachedSearch = getSearchState();
  const [category, setCategory] = useState(cachedSearch.category);
  const [ingredients, setIngredients] = useState(cachedSearch.ingredients);

  const handleAddIngredient = (name) => {
    if (name && !ingredients.includes(name)) {
      setIngredients([...ingredients, name]);
    }
  };

  const handleRemoveIngredient = (name) => {
    setIngredients(ingredients.filter((i) => i !== name));
  };

  const handleSearch = () => {
    if (ingredients.length === 0) {
      alert('Masukkan minimal satu bahan masakan!');
      return;
    }
    setSearchState({ category, ingredients });
    navigate('/recommendations', {
      state: { category, ingredients },
    });
  };

  return (
    <div className="pt-[72px] pb-12 min-h-screen">
      {/* Page Header */}
      <div className="bg-[radial-gradient(circle_at_top_right,#e7eeff_0%,#f8fafc_100%)] border-b border-slate-100 py-8 md:py-12">
        <div className="max-w-[1200px] mx-auto px-4 md:px-10 w-full">
          <h1 className="font-extrabold text-[clamp(1.5rem,4vw,2.75rem)] text-primary mb-2">
            Temukan Inspirasi Masakan
          </h1>
          <p className="text-slate-500 max-w-[576px] text-sm md:text-base">
            Pilih kategori masakan dan masukkan bumbu atau bahan yang kamu punya. AI kami akan memadukan resep terbaik untuk kamu.
          </p>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-[1200px] mx-auto px-4 md:px-10 w-full mt-6 md:mt-8">
        <div className="grid grid-cols-1 lg:[grid-template-columns:8fr_4fr] gap-6">
          {/* Left: Search Form */}
          <section className="bg-white rounded-2xl p-5 md:p-7 shadow-sm border border-slate-100 h-fit">
            <SearchForm
              category={category}
              setCategory={setCategory}
              ingredients={ingredients}
              onAddIngredient={handleAddIngredient}
              onRemoveIngredient={handleRemoveIngredient}
              onSubmit={handleSearch}
            />
          </section>

          {/* Right: Tips */}
          <aside className="space-y-4">
            <div className="bg-white rounded-2xl p-5 shadow-sm border border-slate-100">
              <h2 className="text-base font-bold text-slate-900 mb-3">💡 Tips Memasak</h2>
              <ul className="space-y-2.5 text-sm text-slate-600 list-disc list-inside">
                <li>Pilih kategori utama bahan protein Anda (Ayam, Sapi, dll).</li>
                <li>Makin banyak bumbu dapur yang Anda masukkan, hasil pencocokan kemiripan resep makin tinggi.</li>
                <li>Jangan khawatir jika ada bumbu yang kurang. Di halaman hasil, kami akan mencantumkan bahan belanjaan tambahan.</li>
              </ul>
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
};

export default SearchPage;
