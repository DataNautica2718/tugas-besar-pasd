# FoodyMoody - AI Culinary Assistant

FoodyMoody adalah asisten kuliner berbasis kecerdasan buatan (AI) yang membantu Anda merekomendasikan resep masakan Nusantara terbaik berdasarkan bahan-bahan makanan yang Anda miliki di kulkas menggunakan algoritma **Weighted Jaccard Similarity**.

Aplikasi ini menggunakan arsitektur **Clean MVC (Model-View-Controller)** yang terpisah secara modular antara **React (Frontend)** dan **Flask (Backend)**.

---

## 📂 Struktur Direktori Project

```text
foodymoody/
│
├── backend/                  # Python Flask MVC API
│   ├── config/              # Konfigurasi server & dataset
│   ├── controllers/         # Logic controller request handler
│   ├── datasets/            # Parquet & Pickle preprocessed datasets
│   ├── models/              # Model representasi resep
│   ├── repositories/        # Abstraksi pemrosesan data (Pandas)
│   ├── routes/              # Blueprint router endpoint
│   ├── services/            # Logika utama (Similarity & Validation)
│   ├── tests/               # Unit testing & API integration testing
│   ├── utils/               # Helper & logger global
│   ├── app.py               # Entrypoint Flask
│   ├── Dockerfile           # Konfigurasi container backend
│   └── requirements.txt     # Dependency backend
│
├── frontend/                 # React Single Page App
│   ├── public/              # Aset statis public
│   ├── src/
│   │   ├── components/      # Modular reusable components
│   │   │   ├── common/      # Button, Input, Loader, Modal
│   │   │   ├── recipe/      # RecipeCard, RecipeGrid, RecipeDetail
│   │   │   └── search/      # SearchForm, CategorySelect, IngredientInput
│   │   ├── hooks/           # Custom React Query hooks
│   │   ├── layouts/         # Layout wrapper (MainLayout, AuthLayout)
│   │   ├── pages/           # Container page views
│   │   ├── routes/          # Client-side router mapping
│   │   ├── services/        # Service API client (Axios)
│   │   ├── store/           # Cache state manager
│   │   └── utils/           # Konstanta & helper frontend
│   ├── Dockerfile           # Konfigurasi container frontend
│   ├── nginx.conf           # Konfigurasi routing fallback Nginx
│   └── package.json         # Dependency frontend
│
├── docs/                     # Dokumentasi & research notebook (Jupyter)
├── deployment/               # Skrip/konfigurasi deployment
├── docker-compose.yml        # Orchestration multi-container
├── README.md                 # Dokumentasi ini
└── .env.example              # Template environment variables
```

---

## 🛠️ Persyaratan Sistem

Pastikan Anda memiliki tools berikut terinstall:
- **Python 3.8+**
- **Node.js 18+ & npm**
- **Docker & Docker Compose** (Opsional, untuk containerization)

---

## 🚀 Instalasi & Menjalankan Aplikasi

### Opsi 1: Menggunakan Docker Compose (Direkomendasikan)
Cara tercepat untuk menjalankan aplikasi secara terintegrasi (Frontend & Backend):

1. **Jalankan Docker Compose:**
   ```bash
   docker-compose up --build
   ```
2. **Akses Aplikasi:**
   - **Frontend:** [http://localhost:5173](http://localhost:5173)
   - **Backend API:** [http://localhost:8000](http://localhost:8000)

---

### Opsi 2: Menjalankan Secara Manual (Development Mode)

#### Langkah A: Persiapan Dataset & Backend
1. **Pindah ke direktori backend:**
   ```bash
   cd backend
   ```
2. **Buat Virtual Environment (Opsional):**
   ```bash
   python -m venv venv
   # Aktifkan venv:
   # Windows: .\venv\Scripts\activate
   # Linux/macOS: source venv/bin/activate
   ```
3. **Install dependencies:**
   ```bash
   pip install -r requirements.txt
   ```
4. **Jana Dataset Awal (Mock Data):**
   Kembali ke root lalu jalankan generator data untuk menghasilkan dataset bersih (`recipes.parquet` & `idf_dictionary.pkl`):
   ```bash
   cd ..
   python generate_mock_data.py
   ```
5. **Jalankan Server Backend:**
   ```bash
   cd backend
   python app.py
   ```
   *Server akan berjalan di [http://localhost:8000](http://localhost:8000)*

#### Langkah B: Persiapan & Menjalankan Frontend
1. **Pindah ke direktori frontend:**
   ```bash
   cd frontend
   ```
2. **Install dependencies:**
   ```bash
   npm install
   ```
3. **Jalankan Web Server:**
   ```bash
   npm run dev
   ```
   *Frontend akan berjalan di [http://localhost:5173](http://localhost:5173)*

---

## 🧪 Menjalankan Pengujian (Tests)

Backend telah dilengkapi dengan unit testing & integration testing menggunakan pustaka bawaan Python `unittest`.

1. **Menjalankan Unit Test (Weighted Jaccard Similarity):**
   ```bash
   python -m unittest backend/tests/test_similarity.py
   ```
2. **Menjalankan Integration Test (API Endpoints & Controllers):**
   ```bash
   python -m unittest backend/tests/test_api.py
   ```

---

## 🧠 Logika Rekomendasi (Weighted Jaccard)

Rekomendasi dihitung dengan membandingkan irisan (intersection) bahan dapur pengguna dengan resep masakan berdasarkan bobot **IDF (Inverse Document Frequency)** masing-masing bahan. Bahan-bahan yang umum (seperti garam, air) memiliki bobot lebih rendah dibanding bahan spesifik (seperti santan, buntut sapi), memberikan akurasi rekomendasi rasa yang lebih baik.

**Rumus:**
$$J_{\text{weighted}}(A, B) = \frac{\sum_{x \in A \cap B} \text{IDF}(x)}{\sum_{y \in A \cup B} \text{IDF}(y)}$$
