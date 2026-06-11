import re
import math
import os
import pickle
from collections import Counter
import pandas as pd
import numpy as np

# Create storage directory inside backend/ if it doesn't exist
os.makedirs("backend/storage", exist_ok=True)

# 1. Define raw recipes
raw_recipes = [
    # Category: ayam
    {
        "Title": "Ayam Woku Manado",
        "Ingredients": "1 ekor ayam kampung--2 buah jeruk nipis--1 sdt garam--1 lembar daun kunyit--2 batang serai--4 lembar daun jeruk--1 ikat kemangi--8 siung bawang merah--4 siung bawang putih--5 buah cabai merah--3 cm jahe--3 cm kunyit--4 butir kemiri",
        "Steps": "1) Cuci bersih ayam dan potong-potong. Lumuri dengan jeruk nipis and garam.\n2) Tumis bumbu halus (bawang merah, bawang putih, cabai, jahe, kunyit, kemiri), serai, daun jeruk, dan daun kunyit hingga harum.\n3) Masukkan ayam, aduk rata hingga berubah warna.\n4) Tambahkan sedikit air, masak hingga ayam empuk dan bumbu meresap.\n5) Sesaat sebelum diangkat, masukkan daun kemangi, aduk rata. Sajikan.",
        "Loves": 45,
        "URL": "https://cookpad.com/id/resep/4473027-ayam-woku-manado",
        "Category": "ayam",
        "Ingredients Cleaned": "ayam, jeruk nipis, garam, kunyit, bawang merah, bawang putih, cabai, jahe, kunyit, kemiri, daun jeruk, serai, kemangi"
    },
    {
        "Title": "Ayam Goreng Lengkuas",
        "Ingredients": "1 kg ayam potong--2 batang serai--3 lembar daun salam--200 g lengkuas parut--2 gelas air--1 sdm garam--8 siung bawang merah--5 siung bawang putih--3 cm kunyit--2 cm jahe--1 sdm ketumbar",
        "Steps": "1) Haluskan bawang merah, bawang putih, kunyit, jahe, dan ketumbar.\n2) Masukkan ayam, bumbu halus, lengkuas parut, serai, daun salam, garam, dan air ke dalam wajan.\n3) Ungkep ayam dengan api sedang hingga air menyusut dan bumbu meresap.\n4) Panaskan minyak goreng, lalu goreng ayam beserta remahan lengkuasnya hingga berwarna cokelat keemasan. Angkat dan tiriskan.",
        "Loves": 120,
        "URL": "https://cookpad.com/id/resep/4471956-ayam-goreng-lengkuas",
        "Category": "ayam",
        "Ingredients Cleaned": "ayam, serai, daun salam, lengkuas, garam, bawang merah, bawang putih, kunyit, jahe, ketumbar, minyak goreng"
    },
    {
        "Title": "Ayam Geprek Sambal Korek",
        "Ingredients": "500 gr daging ayam fillet--1 butir telur kocok--5 sdm tepung terigu--2 sdm tepung maizena--1 sdt lada bubuk--1 sdt garam--15 buah cabai rawit merah--4 siung bawang putih--3 sdm minyak panas",
        "Steps": "1) Baluri fillet ayam dengan lada dan garam, lalu celupkan ke telur kocok dan gulingkan ke campuran tepung terigu dan maizena.\n2) Goreng ayam hingga krispi dan matang. Sisihkan.\n3) Ulek cabai rawit merah, bawang putih, dan sedikit garam. Siram dengan minyak panas.\n4) Geprek ayam goreng krispi di atas cobek sambal korek hingga rata. Sajikan hangat.",
        "Loves": 88,
        "URL": "https://cookpad.com/id/resep/4473023-ayam-geprek",
        "Category": "ayam",
        "Ingredients Cleaned": "ayam, telur, tepung terigu, tepung maizena, lada, garam, cabai rawit merah, bawang putih, minyak goreng"
    },
    {
        "Title": "Sate Ayam Madura",
        "Ingredients": "500 gr dada ayam fillet potong dadu--tusuk sate--150 gr kacang tanah goreng--3 siung bawang putih--4 siung bawang merah--3 butir kemiri--5 sdm kecap manis--1 sdt garam--2 sdm minyak goreng--air secukupnya",
        "Steps": "1) Tusuk potongan daging ayam ke tusuk sate. Sisihkan.\n2) Haluskan kacang tanah, bawang putih, bawang merah, dan kemiri. Tumis dengan sedikit minyak, beri air, kecap manis, dan garam. Masak hingga mengental dan mengeluarkan minyak.\n3) Ambil sedikit bumbu kacang, lumuri ke sate ayam sebagai bumbu olesan.\n4) Bakar sate ayam hingga matang kecokelatan.\n5) Sajikan sate ayam dengan siraman bumbu kacang sisa dan tambahan kecap manis.",
        "Loves": 210,
        "URL": "https://cookpad.com/id/resep/4427438-sate-ayam-madura",
        "Category": "ayam",
        "Ingredients Cleaned": "ayam, kacang tanah, bawang putih, bawang merah, kemiri, kecap manis, garam, minyak goreng, air"
    },
    
    # Category: sapi
    {
        "Title": "Rendang Daging Sapi Minang",
        "Ingredients": "1 kg daging sapi potong tebal--1000 ml santan kental--2 batang serai--4 lembar daun jeruk--2 lembar daun salam--1 lembar daun kunyit--12 siung bawang merah--8 siung bawang putih--150 gr cabai merah keriting--5 butir kemiri--3 cm jahe--3 cm kunyit--3 cm lengkuas--1 sdm ketumbar--1 sdt pala bubuk--2 sdt garam",
        "Steps": "1) Haluskan bawang merah, bawang putih, cabai, kemiri, jahe, kunyit, lengkuas, ketumbar, pala, dan garam.\n2) Rebus santan bersama bumbu halus, serai, daun jeruk, daun salam, dan daun kunyit. Aduk terus agar santan tidak pecah.\n3) Masukkan daging sapi saat santan sudah mulai mengeluarkan minyak. Masak dengan api kecil.\n4) Masak terus hingga kuah menyusut, berwarna cokelat gelap, dan mengeluarkan minyak kelapa kelam (rendang kering). Butuh sekitar 4-5 jam.",
        "Loves": 350,
        "URL": "https://cookpad.com/id/resep/4473011-rendang-sapi",
        "Category": "sapi",
        "Ingredients Cleaned": "daging sapi, santan, serai, daun jeruk, daun salam, daun kunyit, bawang merah, bawang putih, cabai, kemiri, jahe, kunyit, lengkuas, ketumbar, pala, garam"
    },
    {
        "Title": "Sop Buntut Sapi",
        "Ingredients": "1 kg buntut sapi cuci bersih--2 buah wortel potong bulat--2 buah kentang potong dadu--1 batang daun bawang iris kasar--1 batang seledri--1 buah bawang bombai iris--3 butir cengkeh--2 cm kayu manis--1 sdt pala bubuk--1 sdm garam--1 sdt merica bubuk--5 siung bawang putih goreng haluskan",
        "Steps": "1) Rebus buntut sapi dengan air bersih hingga empuk (buang kotoran yang mengapung).\n2) Masukkan cengkeh, kayu manis, pala bubuk, lada, garam, dan bawang putih goreng halus.\n3) Masukkan wortel dan kentang, masak hingga empuk.\n4) Sesaat sebelum matang masukkan irisan bawang bombai, daun bawang, dan seledri. Angkat dan sajikan hangat.",
        "Loves": 145,
        "URL": "https://cookpad.com/id/resep/4473012-sop-buntut",
        "Category": "sapi",
        "Ingredients Cleaned": "buntut sapi, wortel, kentang, daun bawang, seledri, bawang bombai, cengkeh, kayu manis, pala, garam, merica, bawang putih"
    },
    {
        "Title": "Semur Daging Sapi Pedas",
        "Ingredients": "500 gr daging sapi potong dadu--1 buah kentang potong dadu goreng--5 sdm kecap manis--1 sdt lada bubuk--1 sdt pala bubuk--2 lembar daun salam--1 batang serai--1 sdm garam--6 siung bawang merah--4 siung bawang putih--5 buah cabai rawit merah--3 butir kemiri",
        "Steps": "1) Haluskan bawang merah, bawang putih, cabai rawit, dan kemiri.\n2) Tumis bumbu halus bersama daun salam dan serai hingga harum.\n3) Masukkan potongan daging sapi, aduk hingga berubah warna. Tambahkan kecap manis, lada, pala, dan garam.\n4) Tuang air secukupnya, masak hingga daging empuk.\n5) Masukkan kentang goreng, masak hingga kuah mengental dan bumbu meresap.",
        "Loves": 74,
        "URL": "https://cookpad.com/id/resep/4473013-semur-daging",
        "Category": "sapi",
        "Ingredients Cleaned": "daging sapi, kentang, kecap manis, lada, pala, daun salam, serai, garam, bawang merah, bawang putih, cabai rawit merah, kemiri, air"
    },

    # Category: kambing
    {
        "Title": "Gulai Kambing Khas Solo",
        "Ingredients": "500 gr daging kambing potong dadu--500 ml santan encer--250 ml santan kental--2 cm lengkuas geprek--1 batang serai--2 lembar daun jeruk--2 butir cengkeh--2 butir kapulaga--8 siung bawang merah--4 siung bawang putih--3 cm kunyit--2 cm jahe--3 butir kemiri--1 sdm ketumbar--1 sdt lada bubuk--1 sdm garam",
        "Steps": "1) Haluskan bawang merah, bawang putih, kunyit, jahe, kemiri, ketumbar, lada, dan garam.\n2) Tumis bumbu halus, serai, daun jeruk, lengkuas, cengkeh, dan kapulaga hingga wangi.\n3) Masukkan daging kambing, aduk rata hingga kaku.\n4) Tuang santan encer, masak hingga daging setengah empuk.\n5) Tuang santan kental, aduk perlahan agar tidak pecah, masak dengan api kecil hingga daging empuk sempurna.",
        "Loves": 92,
        "URL": "https://cookpad.com/id/resep/4473014-gulai-kambing",
        "Category": "kambing",
        "Ingredients Cleaned": "daging kambing, santan, lengkuas, serai, daun jeruk, cengkeh, kapulaga, bawang merah, bawang putih, kunyit, jahe, kemiri, ketumbar, lada, garam"
    },
    {
        "Title": "Tongseng Kambing Pedas",
        "Ingredients": "400 gr daging kambing potong dadu--1/4 buah kol iris kasar--2 buah tomat merah potong--1 batang daun bawang--5 sdm kecap manis--2 lembar daun salam--1 batang serai--6 siung bawang merah--4 siung bawang putih--5 buah cabai rawit merah--3 cm jahe--2 cm kunyit--1 sdt ketumbar--1 sdm garam--air secukupnya",
        "Steps": "1) Haluskan bawang merah, bawang putih, jahe, kunyit, ketumbar, dan garam.\n2) Tumis bumbu halus, daun salam, dan serai. Masukkan daging kambing, tumis hingga berubah warna.\n3) Masukkan air and kecap manis, masak dengan api sedang hingga daging empuk.\n4) Masukkan irisan kol, cabai rawit utuh, dan potongan tomat. Aduk rata hingga kol layu.\n5) Tambahkan daun bawang, masak sebentar, angkat dan sajikan panas.",
        "Loves": 105,
        "URL": "https://cookpad.com/id/resep/4473015-tongseng-kambing",
        "Category": "kambing",
        "Ingredients Cleaned": "daging kambing, kol, tomat, daun bawang, kecap manis, daun salam, serai, bawang merah, bawang putih, cabai rawit merah, jahe, kunyit, ketumbar, garam, air"
    },

    # Category: ikan
    {
        "Title": "Ikan Bakar Bumbu Cianjur",
        "Ingredients": "2 ekor ikan nila/gurame--1 buah jeruk nipis--1 sdt garam--4 sdm kecap manis--2 sdm margarin cair--6 siung bawang merah--3 siung bawang putih--2 cm jahe--1 sdt ketumbar bubuk--3 butir kemiri--3 buah cabai merah",
        "Steps": "1) Bersihkan ikan, lumuri dengan perasan jeruk nipis dan garam. Diamkan 15 menit.\n2) Haluskan bawang merah, bawang putih, jahe, ketumbar, kemiri, and cabai merah.\n3) Campurkan bumbu halus dengan kecap manis and margarin cair sebagai bumbu olesan.\n4) Bakar ikan di atas panggangan sambil dioles bumbu bolak-balik hingga matang kecokelatan.\n5) Sajikan ikan bakar dengan sambal kecap dan lalapan segar.",
        "Loves": 115,
        "URL": "https://cookpad.com/id/resep/4473016-ikan-bakar",
        "Category": "ikan",
        "Ingredients Cleaned": "ikan, jeruk nipis, garam, kecap manis, margarin, bawang merah, bawang putih, jahe, ketumbar, kemiri, cabai"
    },
    {
        "Title": "Ikan Gurame Asam Manis",
        "Ingredients": "1 ekor gurame fillet potong-potong--1 buah jeruk nipis--1 sachet tepung bumbu serbaguna--1 buah wortel potong korek api--1/2 buah bawang bombai iris--2 siung bawang putih cincang--4 sdm saus tomat--2 sdm saus sambal--1 sdm gula pasir--1 sdt maizena larutkan--minyak goreng secukupnya",
        "Steps": "1) Lumuri gurame dengan jeruk nipis. Balurkan ke tepung bumbu basah lalu kering, goreng hingga krispi keemasan. Tata di piring saji.\n2) Tumis bawang putih cincang dan bawang bombai hingga harum.\n3) Masukkan wortel, air secukupnya, saus tomat, saus sambal, gula, dan garam. Masak hingga wortel empuk.\n4) Masukkan larutan maizena untuk mengentalkan saus.\n5) Siram saus asam manis di atas gurame krispi. Sajikan segera.",
        "Loves": 158,
        "URL": "https://cookpad.com/id/resep/4473017-gurame-asam-manis",
        "Category": "ikan",
        "Ingredients Cleaned": "ikan gurame, jeruk nipis, tepung bumbu, wortel, bawang bombai, bawang putih, saus tomat, saus sambal, gula, maizena, minyak goreng"
    },

    # Category: tahu
    {
        "Title": "Tahu Goreng Crispy Penyet",
        "Ingredients": "10 buah tahu putih kecil--1 bungkus tepung bumbu crispy--10 buah cabai rawit merah--3 siung bawang putih--1 sdt garam--3 sdm minyak panas--air secukupnya",
        "Steps": "1) Larutkan sebagian tepung bumbu dengan air. Rendam tahu.\n2) Lumuri tahu ke tepung kering, lalu goreng dalam minyak panas hingga sangat krispi. Tiriskan.\n3) Ulek cabai rawit, bawang putih, dan garam kasar. Siram dengan minyak goreng panas bekas menggoreng tahu.\n4) Penyet tahu krispi di atas sambal korek. Sajikan dengan nasi hangat.",
        "Loves": 52,
        "URL": "https://cookpad.com/id/resep/4473018-tahu-crispy-penyet",
        "Category": "tahu",
        "Ingredients Cleaned": "tahu putih, tepung bumbu, cabai rawit merah, bawang putih, garam, minyak goreng"
    },
    {
        "Title": "Tahu Tempe Bacem Legit",
        "Ingredients": "1 papan tempe potong tebal--5 buah tahu putih--500 ml air kelapa--2 sdm gula merah sisir--3 sdm kecap manis--2 lembar daun salam--2 cm lengkuas geprek--1 sdt garam--6 siung bawang merah--3 siung bawang putih--1 sdt ketumbar",
        "Steps": "1) Haluskan bawang merah, bawang putih, ketumbar, dan garam.\n2) Rebus air kelapa bersama bumbu halus, daun salam, lengkuas, gula merah, kecap manis, tahu, dan tempe.\n3) Masak dengan api kecil hingga air menyusut habis dan bumbu meresap kecokelatan.\n4) Goreng tahu dan tempe bacem sebentar dalam minyak panas (jangan terlalu kering). Angkat dan sajikan.",
        "Loves": 134,
        "URL": "https://cookpad.com/id/resep/4473019-tahu-tempe-bacem",
        "Category": "tahu",
        "Ingredients Cleaned": "tempe, tahu putih, air kelapa, gula merah, kecap manis, daun salam, lengkuas, garam, bawang merah, bawang putih, ketumbar, minyak goreng"
    },

    # Category: tempe
    {
        "Title": "Tempe Mendoan Khas Purwokerto",
        "Ingredients": "1 papan tempe iris tipis lebar--150 gr tepung terigu--2 sdm tepung beras--2 batang daun bawang iris halus--300 ml air--1 sdt ketumbar--2 siung bawang putih--1 cm kencur--1 sdt garam--minyak goreng secukupnya",
        "Steps": "1) Haluskan bawang putih, ketumbar, kencur, dan garam.\n2) Campur tepung terigu, tepung beras, bumbu halus, irisan daun bawang, dan air hingga menjadi adonan kental.\n3) Celupkan tempe tipis ke dalam adonan tepung.\n4) Goreng dalam minyak banyak yang sudah sangat panas sebentar saja (jangan sampai kering/garing). Mendoan harus layu dan lembut. Tiriskan.",
        "Loves": 167,
        "URL": "https://cookpad.com/id/resep/4473020-tempe-mendoan",
        "Category": "tempe",
        "Ingredients Cleaned": "tempe, tepung terigu, tepung beras, daun bawang, air, ketumbar, bawang putih, kencur, garam, minyak goreng"
    },
    {
        "Title": "Orek Tempe Kering Manis",
        "Ingredients": "1 papan tempe potong korek api goreng kering--3 siung bawang merah iris--2 siung bawang putih iris--2 buah cabai merah iris serong--1 lembar daun salam--1 cm lengkuas geprek--3 sdm kecap manis--1 sdm air asam jawa--1 sdt garam--1 sdm gula merah",
        "Steps": "1) Tumis irisan bawang merah, bawang putih, cabai, daun salam, dan lengkuas hingga harum.\n2) Tambahkan kecap manis, air asam jawa, garam, gula merah, dan sedikit air. Masak hingga berserat/berkaramel.\n3) Masukkan tempe yang sudah digoreng kering.\n4) Aduk cepat dengan api kecil hingga bumbu karamel menyelimuti tempe secara merata. Angkat dan dinginkan agar renyah.",
        "Loves": 95,
        "URL": "https://cookpad.com/id/resep/4473021-orek-tempe",
        "Category": "tempe",
        "Ingredients Cleaned": "tempe, bawang merah, bawang putih, cabai, daun salam, lengkuas, kecap manis, air asam jawa, garam, gula merah"
    },

    # Category: telur
    {
        "Title": "Telur Balado Padang",
        "Ingredients": "6 butir telur rebus kupas kulit dan goreng sebentar--2 lembar daun jeruk--1 buah tomat merah potong--1 sdt garam--1 sdt gula pasir--minyak goreng secukupnya--8 siung bawang merah--3 siung bawang putih--10 buah cabai merah keriting--5 buah cabai rawit merah",
        "Steps": "1) Ulek kasar bawang merah, bawang putih, cabai merah keriting, dan cabai rawit.\n2) Tumis bumbu ulek kasar bersama daun jeruk hingga matang dan harum.\n3) Masukkan potongan tomat, garam, dan gula. Masak hingga tomat layu.\n4) Masukkan telur rebus yang sudah digoreng sebentar, aduk rata hingga terlumuri bumbu balado.\n5) Angkat dan siap disajikan.",
        "Loves": 182,
        "URL": "https://cookpad.com/id/resep/4473022-telur-balado",
        "Category": "telur",
        "Ingredients Cleaned": "telur, daun jeruk, tomat, garam, gula, minyak goreng, bawang merah, bawang putih, cabai, cabai rawit merah"
    },
    {
        "Title": "Telur Dadar Bumbu Padang",
        "Ingredients": "3 butir telur bebek/ayam--2 sdm tepung beras--2 batang daun bawang iris--2 lembar daun jeruk iris halus--1/2 lembar daun kunyit iris halus--1 sdt garam--1/2 sdt merica--3 siung bawang merah iris--2 siung bawang putih halus--3 buah cabai merah halus",
        "Steps": "1) Kocok telur bersama tepung beras, irisan daun bawang, daun jeruk, daun kunyit, garam, merica, dan cabai merah halus.\n2) Masukkan irisan bawang merah dan bawang putih halus. Aduk rata.\n3) Panaskan minyak agak banyak di wajan cekung. Tuang adonan telur.\n4) Goreng dengan api sedang-kecil, siram-siram atasnya dengan minyak panas. Balik telur sekali saat bagian bawah sudah kokoh dan kecokelatan.\n5) Masak hingga matang tebal dan harum. Tiriskan dan potong-potong.",
        "Loves": 142,
        "URL": "https://cookpad.com/id/resep/4473024-telur-dadar-padang",
        "Category": "telur",
        "Ingredients Cleaned": "telur, tepung beras, daun bawang, daun jeruk, daun kunyit, garam, merica, bawang merah, bawang putih, cabai"
    },

    # Category: udang
    {
        "Title": "Udang Saus Padang",
        "Ingredients": "500 gr udang buang kepala kerat punggung--1/2 buah bawang bombai iris--1 batang daun bawang iris serong--2 sdm saus tomat--2 sdm saus sambal--1 sdm saus tiram--1 sdt garam--1 sdt gula pasir--1/2 gelas air--6 siung bawang merah--3 siung bawang putih--5 buah cabai merah keriting--2 cm jahe",
        "Steps": "1) Haluskan bawang merah, bawang putih, cabai merah, dan jahe.\n2) Tumis bawang bombai iris hingga harum, lalu masukkan bumbu halus dan tumis kembali hingga matang.\n3) Masukkan udang, tumis hingga berubah warna menjadi kemerahan.\n4) Tambahkan saus tomat, saus sambal, saus tiram, garam, gula, dan air. Aduk rata dan masak hingga kuah mengental.\n5) Masukkan daun bawang, aduk sebentar, angkat dan sajikan.",
        "Loves": 156,
        "URL": "https://cookpad.com/id/resep/4473025-udang-saus-padang",
        "Category": "udang",
        "Ingredients Cleaned": "udang, bawang bombai, daun bawang, saus tomat, saus sambal, saus tiram, garam, gula, air, bawang merah, bawang putih, cabai, jahe"
    },
    {
        "Title": "Udang Goreng Mentega",
        "Ingredients": "500 gr udang bersihkan belah punggung--2 sdm mentega--1/2 buah bawang bombai iris--2 siung bawang putih geprek cincang--2 sdm kecap inggris--1 sdm kecap manis--1 sdm saus tiram--1 sdt jeruk nipis--1/2 sdt garam--1/2 sdt lada bubuk",
        "Steps": "1) Goreng udang sebentar dalam minyak panas hingga berubah warna kaku. Angkat dan tiriskan.\n2) Panaskan mentega, tumis bawang putih dan bawang bombai hingga harum layu.\n3) Masukkan kecap inggris, kecap manis, saus tiram, garam, lada, dan air jeruk nipis. Aduk rata.\n4) Masukkan udang goreng, aduk cepat dengan saus mentega hingga meresap dan mengental.\n5) Angkat dan sajikan hangat.",
        "Loves": 109,
        "URL": "https://cookpad.com/id/resep/4473026-udang-goreng-mentega",
        "Category": "udang",
        "Ingredients Cleaned": "udang, mentega, bawang bombai, bawang putih, kecap inggris, kecap manis, saus tiram, jeruk nipis, garam, lada"
    }
]

# Create DataFrame
df = pd.DataFrame(raw_recipes)

# Standardize Columns
df["Title Cleaned"] = df["Title"].str.lower().str.strip()
df["Total Ingredients"] = df["Ingredients"].apply(lambda x: len(x.split("--")))
df["Total Steps"] = df["Steps"].apply(lambda x: len(x.split("\n")))

# Write mock raw dataset CSV directly to backend/storage/ directory
df.to_csv("backend/storage/Indonesian_Food_Recipes.csv", index=False)
print("Generated backend/storage/Indonesian_Food_Recipes.csv!")

# =====================================================
# 2. RUN PREPROCESSING PIPELINE
# =====================================================
recipes = df[[
    "Title",
    "Title Cleaned",
    "Category",
    "Ingredients",
    "Ingredients Cleaned",
    "Steps",
    "Loves",
    "URL",
    "Total Ingredients",
    "Total Steps"
]].copy()

recipes["ingredient_list"] = (
    recipes["Ingredients Cleaned"]
    .astype(str)
    .str.split(",")
)

# Constants & Cleaners
STOPWORDS_INGREDIENT = {
    "haluskan", "dihaluskan", "halus", "iris", "diiris", "potong", "dipotong",
    "cincang", "dicincang", "geprek", "digeprek", "rebus", "direbus", "merebus",
    "goreng", "digoreng", "kukus", "dikukus", "blender", "diblender", "tumis",
    "campur", "dicampur", "larutkan", "dilarutkan", "ungkep", "mengungkep",
    "panggang", "dipanggang", "tipis", "tebal", "kasar", "dadu", "kotak", "memanjang",
    "ambil", "buang", "pisahkan", "bersihkan", "dibersihkan", "sisa", "utk", "untuk",
    "tuk", "secukupnya", "sesuai", "selera", "kuah", "bumbu", "dirajang", "baluran",
    "olesan", "cocolan", "dg", "dgn", "nya", "ny", "me", "pake", "pke", "menumis",
    "untuk menumis", "untuk tumisan", "pelengkap", "hiasan", "taburan", "garnish",
    "sesendok", "sedikit", "agak", "kurang"
}

NOISE_WORDS = {
    "hehe", "hehehe", "wkwk", "wkwkwk", "suka", "ga", "gak", "ngga", "nggak",
    "kalo", "kalau", "aja", "aj", "banget", "loh", "nih", "bisa", "anak", "ikutan",
    "sesuka", "sesukanya"
}

ingredient_mapping = {
    "cabe": "cabai", "cabe rawit": "cabai", "cabe rawit merah": "cabai",
    "cabai merah": "cabai", "cabai keriting": "cabai", "cabai rawit": "cabai",
    "ayam kampung": "ayam", "ayam kampung potong": "ayam", "ayam broiler": "ayam",
    "ayam fillet": "ayam", "ayam dada fillet": "ayam", "dada ayam": "ayam",
    "paha ayam": "ayam", "bawang merah iris": "bawang merah",
    "bawang putih cincang": "bawang putih", "air jeruk nipis": "jeruk nipis",
    "santan kelapa": "santan", "santan kara": "santan", "royco": "penyedap",
    "masako": "penyedap", "kaldu ayam": "penyedap"
}

def normalize_common_variants(ingredient):
    ingredient = ingredient.lower()
    ingredient = re.sub(r"\d+", "", ingredient)
    ingredient = ingredient.replace("cabe", "cabai")
    if "minyak wijen" in ingredient: return "minyak wijen"
    if "minyak zaitun" in ingredient: return "minyak zaitun"
    if ingredient.startswith("minyak"): return "minyak goreng"
    if ingredient.startswith("air "): return "air"
    if "garam" in ingredient: return "garam"
    if "gula pasir" in ingredient: return "gula"
    if any(k in ingredient for k in ["royco", "masako", "kaldu bubuk", "penyedap"]): return "penyedap"
    if "bawang putih" in ingredient: return "bawang putih"
    if "bawang merah" in ingredient: return "bawang merah"
    if "telur ayam" in ingredient: return "telur"
    if "telur" in ingredient: return "telur"
    if "ayam" in ingredient: return "ayam"
    return ingredient

def clean_ingredient(ingredient):
    ingredient = str(ingredient).lower().strip()
    ingredient = re.sub(r"\d+", "", ingredient)
    ingredient = re.sub(r"\(.*?\)", "", ingredient)
    ingredient = re.sub(r"[^a-zA-Z\s]", " ", ingredient)
    ingredient = re.sub(r"\s+", " ", ingredient)
    return ingredient.strip()

def remove_stopwords(ingredient):
    words = ingredient.split()
    words = [w for w in words if w not in STOPWORDS_INGREDIENT]
    return " ".join(words)

def normalize_ingredient(ingredient):
    ingredient = clean_ingredient(ingredient)
    ingredient = remove_stopwords(ingredient)
    ingredient = normalize_common_variants(ingredient)
    ingredient = ingredient.strip()
    if ingredient in ingredient_mapping:
        ingredient = ingredient_mapping[ingredient]
    words = ingredient.split()
    if len(words) > 5: return ""
    if any(w in NOISE_WORDS for w in words): return ""
    return ingredient

def standardize_ingredients(ingredient_list):
    return [
        ingredient_mapping.get(ing.strip(), ing.strip())
        for ing in ingredient_list
    ]

def process_ingredients(ingredients):
    result = []
    for i in ingredients:
        ing = normalize_ingredient(i)
        if ing != "":
            result.append(ing)
    return result

# Apply cleaning
recipes["ingredient_list"] = recipes["ingredient_list"].apply(
    lambda ingredients: [
        normalize_ingredient(i)
        for i in ingredients
        if normalize_ingredient(i) != ""
    ]
)
recipes["ingredient_list"] = recipes["ingredient_list"].apply(
    lambda ingredients: [i for i in ingredients if len(i) > 0]
)
recipes["ingredient_list"] = recipes["ingredient_list"].apply(standardize_ingredients)
recipes["ingredient_list"] = recipes["ingredient_list"].apply(process_ingredients)
recipes = recipes[recipes["ingredient_list"].apply(len) > 0]

# Calculate IDF
ingredient_df = Counter()
for ingredients in recipes["ingredient_list"]:
    for ingredient in set(ingredients):
        ingredient_df[ingredient] += 1

N = len(recipes)
idf_dict = {
    ingredient: math.log(N / df_count)
    for ingredient, df_count in ingredient_df.items()
}

idf_df = pd.DataFrame({
    "ingredient": list(idf_dict.keys()),
    "idf": list(idf_dict.values()),
})

# Save Outputs to backend/storage/
recipes.to_parquet("backend/storage/recipes.parquet", index=False)
with open("backend/storage/idf_dictionary.pkl", "wb") as f:
    pickle.dump(idf_dict, f)

print("Preprocessed files generated successfully in backend/datasets/!")
print(f"Total recipes: {len(recipes)}")
print(f"Total unique ingredients: {len(idf_dict)}")
