import React from 'react';
import { useNavigate } from 'react-router-dom';

const HomePage = () => {
  const navigate = useNavigate();

  return (
    <div className="pt-[72px]">
      {/* Hero Section */}
      <section className="bg-[radial-gradient(circle_at_top_right,#e7eeff_0%,#f8fafc_100%)] relative overflow-hidden">
        <div className="max-w-[1200px] mx-auto px-4 md:px-10 grid grid-cols-1 lg:[grid-template-columns:7fr_5fr] gap-8 items-center py-12 md:py-16 lg:py-24 w-full">

          {/* Left: Copy */}
          <div className="flex flex-col items-start gap-5 z-10">
            <div className="inline-flex items-center gap-1.5 bg-[#dbeafe] text-primary px-3 py-1.5 rounded-full font-semibold text-xs border border-[#b8c8ff]/30">
              <span className="material-symbols-outlined text-[16px]">auto_awesome</span>
              AI-Powered Culinary Assistant
            </div>

            <h1 className="font-extrabold text-[clamp(1.75rem,5vw,3.5rem)] text-slate-900 leading-tight">
              Masak Lebih Mudah Dengan{' '}
              <span className="text-primary">Bahan yang Kamu Punya.</span>
            </h1>

            <p className="text-base md:text-lg text-slate-600 max-w-[576px]">
              Jangan bingung menatap kulkas yang setengah kosong. Masukkan bahan-bahan yang kamu miliki, dan biarkan AI kami mengkurasi resep masakan Nusantara terbaik yang cocok untuk kamu.
            </p>

            <div className="flex flex-col sm:flex-row gap-3 w-full sm:w-auto">
              <button
                id="hero-search-btn"
                onClick={() => navigate('/search')}
                className="bg-primary hover:bg-[#003594] text-white px-8 py-3.5 rounded-xl font-bold text-sm active:scale-95 transition-all shadow-lg shadow-primary/20 flex items-center justify-center gap-2"
              >
                Mulai Cari Resep
                <span className="material-symbols-outlined text-[18px]">arrow_forward</span>
              </button>
              <a
                href="#cara-kerja"
                className="bg-slate-100 hover:bg-slate-200 text-slate-800 px-8 py-3.5 rounded-xl font-bold text-sm active:scale-95 transition-all flex items-center justify-center"
              >
                Cara Kerja
              </a>
            </div>
          </div>

          {/* Right: Recipe Preview Card */}
          <div className="relative mt-6 lg:mt-0">
            <div className="relative z-10 bg-white/80 backdrop-blur-md p-4 rounded-2xl shadow-xl border border-slate-100 hover:scale-[1.02] transition-transform duration-500">
              <div className="aspect-[4/3] rounded-xl overflow-hidden mb-3 relative">
                <img
                  className="w-full h-full object-cover"
                  src="https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&q=80&w=600"
                  alt="Recipe Preview"
                />
                <div className="absolute top-3 right-3 bg-white/90 px-3 py-1 rounded-full shadow-sm text-xs font-bold text-primary">
                  Premium Quality
                </div>
              </div>
              <div className="flex justify-between items-start mb-2">
                <h3 className="font-bold text-base text-slate-800">Fresh Nordic Salmon Salad</h3>
                <span className="bg-emerald-100 text-emerald-800 px-2 py-0.5 rounded-full text-xs font-bold shrink-0 ml-2">
                  98% Match
                </span>
              </div>
              <div className="flex gap-2 flex-wrap">
                <span className="bg-slate-100 text-slate-600 px-3 py-0.5 rounded-full text-xs">Salmon</span>
                <span className="bg-slate-100 text-slate-600 px-3 py-0.5 rounded-full text-xs">Avocado</span>
              </div>
            </div>
            {/* Ambient Glow */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] bg-primary/10 rounded-full blur-3xl -z-10" />
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-12 md:py-20 bg-white border-t border-slate-100">
        <div className="max-w-[1200px] mx-auto px-4 md:px-10 w-full">
          <div className="text-center max-w-[672px] mx-auto mb-10 md:mb-14">
            <h2 className="text-[clamp(1.5rem,3vw,2rem)] font-extrabold text-slate-900 mb-2">
              Mengapa Memakai FoodyMoody?
            </h2>
            <p className="text-slate-600 text-sm md:text-base">
              Teknologi rekomendasi yang dibuat untuk kenyamanan dapur kamu.
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {[
              {
                icon: 'auto_awesome',
                title: 'Rekomendasi Cerdas (AI)',
                desc: 'Menggunakan pembobotan Weighted Jaccard Similarity yang akurat untuk merekomendasikan masakan berdasarkan bahan Anda.',
              },
              {
                icon: 'search',
                title: 'Pencarian Kilat',
                desc: 'Dapatkan puluhan ide masakan dalam hitungan detik tanpa harus mengetik manual seluruh nama resep.',
              },
              {
                icon: 'restaurant_menu',
                title: 'Pencocokan Bahan Kulkas',
                desc: 'Menghitung persentase kecocokan bahan sehingga Anda tahu apa saja bahan yang kurang dan harus dibeli.',
              },
            ].map(({ icon, title, desc }) => (
              <div key={title} className="p-6 bg-slate-50 rounded-2xl border border-slate-100 flex flex-col gap-3">
                <div className="w-12 h-12 rounded-xl bg-primary/10 text-primary flex items-center justify-center shrink-0">
                  <span className="material-symbols-outlined text-2xl">{icon}</span>
                </div>
                <h3 className="text-base font-bold text-slate-900">{title}</h3>
                <p className="text-slate-600 text-sm leading-relaxed">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How it Works Section */}
      <section id="cara-kerja" className="py-12 md:py-20 bg-slate-50 border-t border-slate-100">
        <div className="max-w-[1200px] mx-auto px-4 md:px-10 w-full">
          <div className="text-center max-w-[672px] mx-auto mb-10 md:mb-14">
            <h2 className="text-[clamp(1.5rem,3vw,2rem)] font-extrabold text-slate-900 mb-2">
              3 Langkah Mudah
            </h2>
            <p className="text-slate-600 text-sm md:text-base">
              Proses pencarian resep yang dirancang sangat praktis.
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 relative">
            {[
              {
                step: '1',
                title: 'Pilih Kategori Makanan',
                desc: 'Pilih kategori utama masakan seperti ayam, sapi, kambing, ikan, tahu, tempe, telur, atau udang.',
              },
              {
                step: '2',
                title: 'Masukkan Bahan-Bahan',
                desc: 'Ketikkan bumbu atau bahan yang sedang ada di dapur Anda (misalnya bawang merah, bawang putih, cabai, telur).',
              },
              {
                step: '3',
                title: 'Dapatkan Rekomendasi',
                desc: 'Sistem kami menghitung kemiripan dan menampilkan resep dengan tingkat kecocokan paling tinggi beserta detail langkah memasak.',
              },
            ].map(({ step, title, desc }) => (
              <div key={step} className="flex flex-col items-center text-center gap-3">
                <div className="w-14 h-14 rounded-full bg-primary text-white flex items-center justify-center text-xl font-bold shrink-0">
                  {step}
                </div>
                <h3 className="text-base font-bold text-slate-900">{title}</h3>
                <p className="text-slate-600 text-sm max-w-[280px] leading-relaxed">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;
