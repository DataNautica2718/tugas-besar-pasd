import React from 'react';
import { useNavigate } from 'react-router-dom';

const AboutPage = () => {
  const navigate = useNavigate();

  const missions = [
    {
      icon: 'recommend',
      text: 'Memberikan rekomendasi resep yang relevan berdasarkan mood pengguna.',
    },
    {
      icon: 'lightbulb',
      text: 'Membantu pengguna menemukan ide masakan dengan cepat.',
    },
    {
      icon: 'restaurant',
      text: 'Menyediakan pengalaman memasak yang sederhana dan menyenangkan.',
    },
    {
      icon: 'favorite',
      text: 'Menghubungkan emosi, makanan, dan kreativitas dalam satu platform.',
    },
  ];

  return (
    <div className="pt-[72px] min-h-screen bg-white">

      {/* Hero Banner */}
      <section className="bg-[radial-gradient(circle_at_top_right,#e7eeff_0%,#f8fafc_100%)] border-b border-slate-100">
        <div className="max-w-[1200px] mx-auto px-8 md:px-12 py-16 md:py-24 w-full">
          <div className="max-w-[640px]">
            <div className="inline-flex items-center gap-2 bg-[#dbeafe] text-primary px-3 py-1.5 rounded-full font-semibold text-xs border border-blue-200 mb-6">
              <span className="material-symbols-outlined text-[16px]">info</span>
              Tentang Kami
            </div>
            <h1 className="font-extrabold text-[clamp(2rem,5vw,3rem)] text-slate-900 leading-tight mb-4">
              Tentang{' '}
              <span className="text-primary">FoodyMoody</span>
            </h1>
            <p className="text-slate-600 text-base md:text-lg leading-relaxed">
              FoodyMoody adalah platform rekomendasi resep berbasis suasana hati (mood) yang membantu pengguna menemukan makanan yang sesuai dengan kondisi emosional mereka.
            </p>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-14 md:py-20">
        <div className="max-w-[1200px] mx-auto px-8 md:px-12 w-full">

          {/* Description Card */}
          <div className="bg-slate-50 rounded-2xl p-8 md:p-10 border border-slate-100 mb-10">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 rounded-xl bg-primary/10 text-primary flex items-center justify-center shrink-0 mt-0.5">
                <span className="material-symbols-outlined text-2xl">mood</span>
              </div>
              <div>
                <h2 className="text-xl font-bold text-slate-900 mb-3">Apa itu FoodyMoody?</h2>
                <p className="text-slate-600 text-base leading-relaxed">
                  Pengguna dapat memilih mood yang sedang dirasakan, kemudian sistem akan memberikan rekomendasi resep yang relevan, mudah diikuti, dan sesuai dengan kebutuhan. Kami percaya bahwa makanan bukan hanya soal rasa — tetapi juga tentang perasaan dan momen yang ingin kamu ciptakan.
                </p>
              </div>
            </div>
          </div>

          {/* Vision & Mission Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">

            {/* Visi */}
            <div className="bg-white rounded-2xl border border-slate-100 p-8 shadow-sm hover:shadow-md transition-shadow">
              <div className="flex items-center gap-3 mb-5">
                <div className="w-10 h-10 rounded-lg bg-primary text-white flex items-center justify-center shrink-0">
                  <span className="material-symbols-outlined text-xl">visibility</span>
                </div>
                <h2 className="text-lg font-extrabold text-slate-900">Visi</h2>
              </div>
              <p className="text-slate-600 text-base leading-relaxed">
                Menjadi platform kuliner berbasis mood yang membantu masyarakat menemukan inspirasi makanan dengan cara yang lebih{' '}
                <span className="font-semibold text-primary">personal</span> dan{' '}
                <span className="font-semibold text-primary">menyenangkan</span>.
              </p>
            </div>

            {/* Misi */}
            <div className="bg-white rounded-2xl border border-slate-100 p-8 shadow-sm hover:shadow-md transition-shadow">
              <div className="flex items-center gap-3 mb-5">
                <div className="w-10 h-10 rounded-lg bg-primary text-white flex items-center justify-center shrink-0">
                  <span className="material-symbols-outlined text-xl">flag</span>
                </div>
                <h2 className="text-lg font-extrabold text-slate-900">Misi</h2>
              </div>
              <ul className="flex flex-col gap-3">
                {missions.map(({ icon, text }, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <div className="w-7 h-7 rounded-lg bg-[#dbeafe] text-primary flex items-center justify-center shrink-0 mt-0.5">
                      <span className="material-symbols-outlined text-[16px]">{icon}</span>
                    </div>
                    <p className="text-slate-600 text-sm leading-relaxed">{text}</p>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Value Tags */}
          <div className="mt-10 pt-10 border-t border-slate-100">
            <p className="text-xs font-semibold uppercase tracking-widest text-slate-400 mb-4">Nilai Utama Kami</p>
            <div className="flex flex-wrap gap-3">
              {['Inovatif', 'Empatik', 'Inklusif', 'Personal', 'Menyenangkan', 'Mudah Digunakan'].map((tag) => (
                <span
                  key={tag}
                  className="bg-[#dbeafe] text-primary px-4 py-1.5 rounded-full text-sm font-semibold border border-blue-200"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>

          {/* CTA */}
          <div className="mt-12 bg-[radial-gradient(circle_at_top_left,#e7eeff_0%,#f8fafc_100%)] rounded-2xl border border-blue-100 p-8 md:p-10 text-center">
            <span className="material-symbols-outlined text-4xl text-primary mb-3 block">restaurant_menu</span>
            <h3 className="text-xl font-extrabold text-slate-900 mb-2">Mulai Petualangan Kuliner Kamu</h3>
            <p className="text-slate-600 text-sm mb-6 max-w-[480px] mx-auto">
              Temukan resep yang sesuai dengan mood dan bahan yang kamu miliki sekarang.
            </p>
            <button
              id="about-cta-btn"
              onClick={() => navigate('/search')}
              className="bg-primary hover:bg-[#003594] text-white px-8 py-3 rounded-xl font-bold text-sm active:scale-95 transition-all shadow-lg shadow-primary/20 inline-flex items-center gap-2"
            >
              Cari Resep Sekarang
              <span className="material-symbols-outlined text-[18px]">arrow_forward</span>
            </button>
          </div>

        </div>
      </section>

    </div>
  );
};

export default AboutPage;
