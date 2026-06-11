import React from 'react';
import { useNavigate } from 'react-router-dom';

const NotFoundPage = () => {
  const navigate = useNavigate();

  return (
    <main className="pt-32 pb-2xl px-margin-mobile flex flex-col items-center justify-center min-h-[calc(100vh-160px)] bg-[#F8FAFC]">
      <div className="max-w-[600px] w-full text-center space-y-xl bg-white p-xl rounded-2xl border border-slate-100 shadow-sm">
        {/* Floating Empty Kitchen Icon */}
        <div className="relative w-full aspect-video flex items-center justify-center overflow-hidden rounded-2xl bg-[#e7eeff] border border-[#b8c8ff]/20">
          <div className="relative z-10 animate-float flex flex-col items-center">
            <div className="w-28 h-28 bg-white rounded-full flex items-center justify-center shadow-md border border-slate-50">
              <span className="material-symbols-outlined text-primary text-5xl font-light">
                kitchen
              </span>
            </div>
          </div>
        </div>

        {/* Text Details */}
        <div className="space-y-md">
          <h1 className="font-extrabold text-2xl md:text-3xl text-slate-800">
            Resep Tidak Ditemukan
          </h1>
          <p className="text-slate-500 text-sm md:text-base leading-relaxed max-w-[450px] mx-auto">
            Maaf, kami tidak dapat menemukan resep yang cocok dengan kombinasi bahan masakan yang Anda masukkan. Mari kita coba dengan bumbu lain!
          </p>
        </div>

        {/* Action Button */}
        <div className="pt-xl">
          <button
            onClick={() => navigate('/search')}
            className="inline-flex items-center gap-sm bg-primary hover:bg-[#003594] text-white px-2xl py-md rounded-xl font-bold text-sm hover:shadow-lg active:scale-95 transition-all"
          >
            <span className="material-symbols-outlined font-bold text-base">search</span>
            Cari Lagi dengan Bahan Lain
          </button>
        </div>
      </div>
    </main>
  );
};

export default NotFoundPage;
