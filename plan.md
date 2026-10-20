# Master Plan & Codex CLI Prompt: Mestiere Fiolet (`@mest.fiore`) — Revised with Full Brand & Price List Assets

Dokumen ini adalah **Master Blueprint & Instruksi Eksekusi Lengkap** untuk **Codex CLI** dalam membangun website *brand showcase*, *interactive lookbook*, dan *custom bouquet/charm WhatsApp order studio* untuk **Mestiere Fiolet (`@mest.fiore`)** di Jatinangor. Seluruh warna, tipografi, daftar produk, dan harga di dalam dokumen ini telah disesuaikan **100% akurat** dengan 4 gambar referensi resmi (`Logo Mest Fiolet`, `Open Order Bucket`, `Price List Gantungan`, dan `Price List Bunga`).

---

## Cara Menjalankan File Ini di Codex CLI

Simpan ke-4 gambar Anda di dalam folder `public/images/brand/` (opsional, karena *plan* ini juga menginstruksikan pemrosesan gambar otomatis), lalu jalankan perintah berikut di terminal:

```bash
codex "Baca seluruh isi file plan.md secara menyeluruh dan eksekusi Phase 1 hingga Phase 6 secara berurutan. Terapkan warna persis dari logo & poster Mestiere Fiolet, masukkan semua data harga Bucket (10K-25K), Bunga satuan (1K-8K), dan Gantungan (3K-8K), bangun fitur Mix & Match tangkai bunga ke WhatsApp, dan pastikan semua test Playwright lulus 100%."
```

---

## SYSTEM PROMPT UNTUK CODEX CLI (CORE INSTRUCTIONS)

> **PERAN & OBJEKTIF UTAMA:**
> Kamu adalah Principal Creative Technologist, Senior Frontend Architect, dan Art Director spesialis website *editorial lifestyle* & *Gen-Z handcrafted brand*. Tugasmu adalah membangun website *frontend-only* (tanpa backend, tanpa database) untuk brand **Mestiere Fiolet (`@mest.fiore`)** menggunakan **Astro, TypeScript, Tailwind CSS, shadcn/ui, GSAP (ScrollTrigger), dan Playwright**.
>
> **PRINSIP WAJIB (NON-NEGOTIABLE):**
> 1. **Zero AI-Slop**: Dilarang keras membuat layout template AI generik (grid 3 kartu dengan kotak border abu-abu kaku, ikon Lucide di dalam lingkaran warna, badge kapsul generik, atau bayangan kartu tebal).
> 2. **Polosan, Frameless, & Bertekstur Pastel Aura**: Gunakan latar belakang *dreamy pastel mesh aura* (perpaduan *soft lavender*, *cotton candy pink*, *icy periwinkle*, dan *pearl white* dengan *subtle film grain/noise* halus persis seperti poster asli `@mest.fiore`). Biarkan produk dan fotografi tampil *frameless* (menyatu dengan latar atau menggunakan *editorial cutout/floating depth*) tanpa terkurung kotak sempit.
> 3. **Mixed Alignment Rhythm (Posisi Konten Campuran)**: Ikuti ritme posisi konten secara ketat:
>    - **Section 1 (Hero)**: Rata Tengah (*Centered Editorial*)
>    - **Section 2 (Open Order Bucket & Idol Bucket Story)**: Rata Kiri (*Left-Aligned Editorial*)
>    - **Section 3 (Gantungan / Keychain Atelier)**: Rata Kanan (*Right-Aligned Editorial*)
>    - **Section 4 (Interactive Price List: Bucket, Bunga Satuan, & Gantungan)**: Campuran Asimetris (*Typographic Menu + Dynamic Background/Floating Preview*)
>    - **Section 5 (Make Your Own Desain — Mix & Match Calculator ke WA)**: Rata Tengah ke *Split-View* Bersih
>    - **Section 6 (Lokasi COD Jatinangor & FAQ)**: Rata Kiri & Kanan Seimbang
> 4. **Data 100% Akurat Sesuai Gambar Referensi**: Gunakan seluruh nama item dan harga asli (`1K` hingga `25K`) dari 4 gambar referensi tanpa mengubah atau mengosongkan satupun item.
> 5. **QA Otomatis dengan Playwright**: Seluruh komponen, kalkulator harga *custom*, tautan WhatsApp, animasi GSAP, dan tampilan *mobile* wajib lulus uji Playwright.

---

## 1. Ekstraksi Visual, Logo & Color Palette (Dari 4 Gambar Referensi)

### 1.1 Anatomi Logo `Mest FIOLET` (Gambar 4)
Berdasarkan gambar logo resmi yang diunggah:
* **Bentuk & Latar Logo**: Lingkaran bertekstur *watercolor pastel aura* dengan efek *fine grain/noise* lembut (gradasi ungu *lilac* muda, *blush pink*, dan putih mutiara).
* **Tipografi `"Mest"`**: Huruf skrip tulisan tangan (*hand-lettered monoline signature*) dengan huruf **`M`** yang menjulang tinggi dan tegas, diikuti `"est"` yang mengalir miring ke kanan menggunakan warna **Flamingo Rose Pink (`#F07BB0`)**.
* **Tipografi `"F I O L E T"`**: Terletak tepat di bawah kata `"est"`, menggunakan huruf kapital *geometric sans-serif* tipis dengan jarak antar-huruf sangat renggang (`letter-spacing: 0.38em`) berwarna **Deep Muted Plum Charcoal (`#493B4D`)**.
* **Instruksi Implementasi Logo**:
  1. Jika file gambar logo tersedia di `public/images/`, tampilkan sebagai aset utama pada *brand mark*.
  2. Buat juga komponen `MestLogo.astro` berbasis **SVG + Tipografi Presisi** yang mereplikasi proporsi `"Mest"` (pink script) dan `"F I O L E T"` (spaced sans-serif) agar tajam di semua ukuran layar dan bisa dianimasikan per goresan/huruf dengan GSAP.

### 1.2 Color Palette Resmi (Diekstrak Langsung dari Logo & Poster Price List)

Gunakan variabel CSS berikut di `src/styles/global.css` untuk menangkap nuansa *dreamy pastel grain* dari ke-4 gambar:

| Token CSS | Nama Warna | Hex Code | Sumber Ekstraksi pada Gambar |
| :--- | :--- | :--- | :--- |
| `--bg-aura-pearl` | Pearl Lavender Base | `#FAF3FC` | Warna dasar kanvas terang pada poster Price List |
| `--bg-aura-lilac` | Soft Lilac Cloud | `#E5D0F6` | Sapuan gradasi ungu pastel lembut di latar belakang poster & logo |
| `--bg-aura-blush` | Cotton Candy Pink | `#FAD9EC` | Sapuan gradasi pink lembut di bagian tengah logo & poster |
| `--bg-aura-ice` | Icy Periwinkle Mist | `#DCE5FA` | Sapuan gradasi biru-ungu dingin di sisi kanan logo & poster |
| `--text-royal-purple` | Mestiere Royal Purple | `#7B1FA2` | Warna judul utama `PRICE LIST`, `OPEN ORDER`, dan nama item (`LILY`, `TULIP`, dll.) |
| `--text-plum-ink` | Deep Plum Charcoal | `#3B2342` | Warna teks `F I O L E T` pada logo, sub-detail `START FROM`, dan teks bacaan utama |
| `--accent-mest-pink` | Signature Mest Pink | `#F27EB2` | Warna skrip `"Mest"` pada logo & subjudul miring (`BUNGA`, `GANTUNGAN`, `BUCKET`) |
| `--accent-starburst` | Sticker Badge Pink | `#F985B5` | Warna stiker bintang 16-sudut `NOTE HARGA BELUM TERMASUK WRAP` |
| `--accent-tulip-blue` | Cobalt Pipe Cleaner | `#1E56E8` | Aksen warna biru cerah dari item `TULIP (4K)` & `BUTTERFLY (5K)` |
| `--accent-sunflower` | Sunny Yellow | `#F5D118` | Aksen warna kuning cerah dari item `SUNFLOWER (8K)` |
| `--accent-poppy` | Deep Velvet Maroon | `#580F1E` | Aksen warna maroon pekat dari item `POPPY (6K)` |
| `--accent-leaf` | Pipe Cleaner Green | `#1C9C3E` | Aksen warna hijau segar dari item `DAUN (1,5K)` |

> **Efek Tekstur Khas (`Aura Grain Background`)**:
> Buat utilitas CSS `.bg-mest-aura` yang menggabungkan `radial-gradient` lembut dari `--bg-aura-pearl`, `--bg-aura-lilac`, `--bg-aura-blush`, dan `--bg-aura-ice` dengan lapisan `feTurbulence` SVG noise sangat halus (`opacity: 0.04`, `pointer-events: none`). Ini membuat seluruh halaman memiliki *vibes* kertas/kanvas pastel bertekstur persis seperti poster asli `@mest.fiore`, namun tetap bersih, modern, dan ringan.

### 1.3 Sistem Tipografi (Sesuai Poster & Upgrade Editorial)
* **Heading Utama (`PRICE LIST`, `OPEN ORDER`, Judul Section)**: `'Cormorant Garamond'` atau `'Playfair Display'` (Weight: `600`/`700`, Warna: `--text-royal-purple` `#7B1FA2`).
* **Sub-Heading Miring (`BUNGA`, `GANTUNGAN`, `BUCKET`, `MAKE YOUR OWN DESAIN`)**: `'Cormorant Garamond'` *Italic* (Warna: `--accent-mest-pink` `#F27EB2`).
* **Logo Script (`Mest`)**: `'Sacramento'` atau `'Alex Brush'` / custom SVG path untuk menangkap lekukan huruf `M` yang tinggi.
* **Body & UI Controls**: `'Plus Jakarta Sans'` (bersih, modern, mudah dibaca oleh pasar Gen-Z di layar HP).
* **Angka Harga (`7K`, `1.5K`, `START FROM 10K`)**: `'Cormorant Garamond'` Bold Italic dipadukan dengan `'JetBrains Mono'` pada rincian kalkulator order.

---

## 2. Data Produk & Price List Lengkap (100% Sesuai 3 Gambar Poster)

Simpan seluruh data ini di dalam `src/data/mestFioreData.ts`. **Jangan ada satu pun item yang terlewat.**

### 2.1 Kategori 1: `OPEN ORDER BUCKET` (`🌷✨️`)
*Tagline Kategori*: `"MAKE YOUR OWN DESAIN • FREE CUSTOM • START FROM 10K"`
*Deskripsi*: Buket bunga kawat bulu (*pipe cleaner / fuzzy wire*) *handmade* yang awet selamanya, dibalut kertas *wrapping* *iridescent/holographic* atau *pastel layer* lengkap dengan pita satin manis.

| ID | Nama Produk | Harga Tampil | Harga Numerik (Min) | Deskripsi & Karakter Visual (Sesuai Gambar 3) |
| :--- | :--- | :--- | :--- | :--- |
| `bucket-single` | **Single Flower Bucket** | `START FROM 10K` | `10000` | Buket 1 tangkai bunga pilihan dengan *wrapping holographic/iridescent* berkilau dan pita satin ungu/pink manis. Simpel, manis, dan ramah kantong mahasiswa buat hadiah *sempro* atau apresiasi kecil. |
| `bucket-flower` | **Flower Bucket** | `START FROM 15K` | `15000` | Rangkaian *multi-flower* kawat bulu kombinasi warna (ungu, biru, pink) dilengkapi aksen kupu-kupu cantik, *topper* hati bertuliskan *"Congratulations"*, dan *wrapping* berlapis. |
| `bucket-idol` | **Idol Bucket** | `START FROM 25K` | `25000` | Buket K-Pop / *Bias* / *Custom Photo* favorit! Berisi beberapa *cut-out* foto idol, pacar, atau *bestie* yang dipadukan dengan rangkaian bunga *holow* & *tulip* warna senada serta *wrapping* putih-lilac mengembang. |

---

### 2.2 Kategori 2: `PRICE LIST BUNGA` (Satuan / Per Tangkai — Mix & Match) (`🌸✨️`)
*Catatan Penting (Wajib Ditampilkan dengan Elemen Stiker Bintang Pink)*: **`NOTE: HARGA BELUM TERMASUK WRAP`**
*Tagline Kategori*: `"MAKE YOUR OWN DESAIN • FREE CUSTOM • @MEST.FIORE"`
*Deskripsi*: Pengen ngerangkai isi buket sendiri tangkai demi tangkai sesuai *budget*? Pilih kombinasi bunga dan daun di bawah ini:

| ID | Nama Bunga | Harga Tampil | Harga Numerik | Karakter Visual (Sesuai Gambar 1) |
| :--- | :--- | :--- | :--- | :--- |
| `bunga-lily` | **Lily** | `7K` | `7000` | Bunga lily putih bersih 5 kelopak dengan putik kuning-oranye yang anggun. |
| `bunga-sunflower` | **Sunflower** | `8K` | `8000` | Bunga matahari kelopak kuning cerah berlapis dengan bagian tengah coklat tua yang kontras dan ceria. |
| `bunga-poppy` | **Poppy** | `6K` | `6000` | Bunga poppy 5 kelopak tebal warna *deep maroon/burgundy* mewah dengan putik bulatan krem di tengah. |
| `bunga-holow` | **Holow** | `4K` | `4000` | Bunga kelopak *loop* (berongga) warna *soft pink* dengan pusat bunga pink tua beraksen bintik manis. |
| `bunga-holow-love` | **Holow Love** | `3K` | `3000` | Bunga dengan 4 kelopak berongga berbentuk hati (*love*) warna ungu *lilac*, putik kuning, dan tangkai hijau. |
| `bunga-tulip` | **Tulip** | `4K` | `4000` | Bunga tulip kawat bulu *gembul* 3D (contoh warna *royal blue* elektrik, bebas *request* warna lain). |
| `bunga-mini-holow` | **Mini Holow** | `1.5K` | `1500` | Versi mungil dari bunga *holow* 6 kelopak ungu *lilac* dengan tengah pink cerah. |
| `bunga-daun` | **Daun** | `1,5K` | `1500` | Helai daun panjang warna hijau segar untuk melengkapi tangkai bunga pilihanmu. |
| `bunga-twistlove` | **Twistlove** | `1K` | `1000` | Ornamen kawat bulu bentuk hati (*heart wand*) atau aksen ulir spiral (*twister*) pastel buat pemanis buket. |
| `bunga-mini-daisy` | **Mini Daisy** | `2K` | `2000` | Bunga *daisy* mungil warna *sage green / pastel mint* dengan putik kuning lembut. |

> **Opsi Tambahan Wrapping untuk Bunga Satuan**:
> Sediakan pilihan di kalkulator:
> * `Tanpa Wrap (Bunga Tangkai Saja)` (+Rp 0)
> * `Tambah Single / Mini Wrap Iridescent + Pita` (+Rp 5.000)
> * `Tambah Full Bouquet Wrap Korea Berlapis + Pita Satin` (+Rp 10.000)
> * `Tambah Custom Foto Idol / Bestie Cutout` (+Rp 8.000)

---

### 2.3 Kategori 3: `PRICE LIST GANTUNGAN` (Keychains & Bag Charms) (`🎀✨️`)
*Tagline Kategori*: `"MAKE YOUR OWN DESAIN • WITH CUSTOM • START FROM 3K"`
*Deskripsi*: Gantungan kunci & *bag charm* kawat bulu (*pipe cleaner*) super gemas buat *totebag* kuliah, *backpack*, kunci kosan, atau *freebies* acara kampus.

| ID | Nama Gantungan | Harga Tampil | Harga Numerik | Karakter Visual (Sesuai Gambar 2) |
| :--- | :--- | :--- | :--- | :--- |
| `gantungan-coquette` | **Coquette** | `3K` | `3000` | Gantungan pita *coquette bow* mungil nan manis (pilihan warna ungu lilac, merah coral, pink, dll.). |
| `gantungan-cerry` | **Cerry** | `8K` | `8000` | Gantungan buah ceri kembar gembul warna merah merona dengan tangkai pita hijau *mint* dan mutiara kecil. |
| `gantungan-butterfly` | **Butterfly** | `5K` | `5000` | Gantungan kupu-kupu cantik perpaduan dua warna sayap (*sky blue* & *cobalt blue*) dengan antena melengkung. |
| `gantungan-flower` | **Flower** | `5K` | `5000` | Gantungan bunga kelopak tebal warna merah maroon, putik kuning, daun hijau *mint*, lengkap dengan rantai *ball-chain*. |
| `gantungan-jellyfish` | **Jellyfish** | `8K` | `8000` | Gantungan ubur-ubur (*jellyfish*) pink *chubby* lengkap dengan mata gemas dan tentakel ulir. |

---

## 3. Tech Stack & Perintah Instalasi Skills (Phase 1)

Jalankan perintah berikut secara berurutan di terminal proyek:

```bash
# 1. Inisialisasi proyek Astro + TypeScript (jika folder masih kosong)
pnpm create astro@latest . --template minimal --typescript strict --install --no-git

# 2. Integrasi React (untuk Interactive Price List & Mix-and-Match Calculator) dan Tailwind CSS
pnpm astro add react tailwind --yes

# 3. Install Skills Wajib sesuai instruksi pengguna
pnpm dlx skills add shadcn/ui
pnpm dlx skills add miqdadbadjuber/anti-slop
npx impeccable install

# 4. Install GSAP (ScrollTrigger) & utility pendukung
pnpm add gsap @gsap/react lenis lucide-react clsx tailwind-merge

# 5. Install Playwright untuk Automated QA
pnpm add -D @playwright/test
npx playwright install chromium
```

---

## 4. Arsitektur Section & Ritme Posisi Konten Campuran (Anti-AI-Slop)

Pastikan setiap *section* tampil **polosan, tidak penuh elemen kecil yang berantakan, tidak dibatasi bingkai kartu kaku**, dan mengandalkan **interaksi gambar *background* / *floating cutout* serta tipografi GSAP**.

### SECTION 1: HERO SECTION — *Posisi Konten: RATA TENGAH (Centered Editorial)*
* **Visual & Latar**:
  * Latar belakang `.bg-mest-aura` (gradasi hidup *lavender-pink-periwinkle* yang bergerak halus mengikuti kursor/scroll).
  * Di bagian tengah atas, tampilkan **Emblem Logo Bulat `Mest FIOLET`** yang autentik, diikuti elemen visual bunga *Lily, Sunflower, Tulip,* dan pita *Coquette* yang mengambang *frameless* di sisi ruang kosong (dengan efek *parallax* mendalam saat di-*scroll*).
* **Animasi GSAP**:
  * Judul utama keluar **huruf demi huruf satu per satu dengan delay (`stagger: 0.035s`, `ease: "expo.out"`)**.
  * Sub-judul miring bergaya poster `@mest.fiore` muncul halus setelah huruf selesai.
* **Copywriting (Gen-Z Gaul & Sopan)**:
  * **Top Tag**: `📍 JATINANGOR • OPEN ORDER SETIAP HARI`
  * **Main Title**: `𝐌𝐞𝐬𝐭𝐢𝐞𝐫𝐞 𝐟𝐢𝐨𝐥𝐞𝐭 🎀🌷`
  * **Editorial Subtitle**: *Make Your Own Desain — Free Custom Buket & Gantungan Gemas Mulai dari 1K – 10K Aja!*
  * **Body Text**: `Lagi cari buket sempro, wisuda, atau Idol Bucket buat bestie di Jatinangor? Atau pengen gantungan jellyfish & coquette ribbon buat nemenin tas kuliah? Bebas request warna dan rangkai tangkai bungamu sendiri sesuai budget!`
  * **Interactive Trigger**: Tombol elegan `Mulai Rangkai Buketmu (Mulai 10K) ↗` & `Lihat Price List Lengkap ↓`.

---

### SECTION 2: OPEN ORDER BUCKET & IDOL BUCKET — *Posisi Konten: RATA KIRI (Left-Aligned Editorial)*
* **Layout**:
  * Teks dan tipografi besar berada di **rata kiri** (50% area kiri).
  * Area kanan hingga latar belakang menampilkan transisi gambar besar *frameless* dari ke-3 produk andalan: **`Single Flower (Start From 10K)`**, **`Flower Bucket (Start From 15K)`**, dan **`Idol Bucket (Start From 25K)`**.
* **Interaksi GSAP**:
  * Saat pengguna menggerakkan *scroll* atau mengarahkan kursor ke nama ketiga paket buket di sebelah kiri, visual buket di latar belakang berganti secara *smooth crossfade + scale* dan menampilkan detail *wrapping holographic* serta pita ungu khas Mestiere Fiolet.
* **Copywriting (Rata Kiri)**:
  * **Kicker**: `OPEN ORDER • BUCKET 🌷✨️`
  * **Headline**: `Dari Single Flower 10K Sampai Idol Bucket Bias Favoritmu.`
  * **Narasi**: `Siapa bilang buket cantik harus mahal? Mulai dari 10K aja kamu udah bisa dapetin Single Flower Bucket dengan wrapping iridescent yang super dreamy. Pengen kasih kejutan unik buat temen K-Popers atau wisudaan? Pesan Idol Bucket mulai 25K—lengkap sama foto cut-out dan bunga kawat bulu yang awet dipajang di kosan selamanya!`
  * **Daftar Interaktif Rata Kiri (Tanpa Kotak Kaku)**:
    * `01 — Single Flower Bucket` • *Start From 10K*
    * `02 — Flower Bucket (Multi-Stem & Topper)` • *Start From 15K*
    * `03 — Idol Bucket (Custom Photo + Bouquet)` • *Start From 25K*

---

### SECTION 3: GANTUNGAN / KEYCHAIN ATELIER — *Posisi Konten: RATA KANAN (Right-Aligned Editorial)*
* **Layout**:
  * Seluruh teks, judul, dan daftar harga gantungan berada di **rata kanan**.
  * Sisi kiri layar menampilkan komposisi visual *floating* tanpa bingkai dari ke-5 gantungan: **`Coquette (3K)`**, **`Cerry (8K)`**, **`Butterfly (5K)`**, **`Flower (5K)`**, dan **`Jellyfish (8K)`** yang bergerak mengikuti *scroll* (GSAP *scrubbing*).
* **Copywriting (Rata Kanan)**:
  * **Kicker**: `PRICE LIST • GANTUNGAN 🎀✨️`
  * **Headline**: `Gantungan Gemas Mulai 3K Buat Totebag & Kunci Kosan Kamu.`
  * **Narasi**: `Bikin tas kuliah kamu makin standout dengan koleksi gantungan handmade dari @mest.fiore. Mau pita Coquette 3K yang simpel, Butterfly 5K, Flower 5K, sampai Cerry & Jellyfish 8K yang super chubby—semuanya bebas kamu custom warna bareng bestie!`
  * **Quick Action (Rata Kanan)**: `Pesan Gantungan Custom Sekarang →`

---

### SECTION 4: INTERACTIVE PRICE LIST BUNGA (SATUAN) & LOOKBOOK — *Posisi Konten: CAMPURAN / EDITORIAL MENU*
* **Konsep Visual (Anti-Slop & Sesuai Poster `PRICE LIST BUNGA`)**:
  * Tampilkan judul besar **`PRICE LIST`** berwarna ungu *royal* (`#7B1FA2`) dan sub-judul miring **`BUNGA`** berwarna pink (`#F27EB2`), ditemani elemen **Stiker Bintang 16-Sudut (`Starburst Badge`)** berwarna pink (`#F985B5`) yang berputar pelan saat *scroll* bertuliskan: **`NOTE: HARGA BELUM TERMASUK WRAP`**.
  * Alih-alih kartu kotak biasa, tampilkan ke-10 jenis bunga satuan (`Lily 7K`, `Sunflower 8K`, `Poppy 6K`, `Holow 4K`, `Holow Love 3K`, `Tulip 4K`, `Mini Holow 1.5K`, `Daun 1,5K`, `Twistlove 1K`, `Mini Daisy 2K`) dalam tata letak **Editorial Botanical Index** yang bersih.
  * Setiap kali pengguna menyentuh/mengarahkan kursor ke nama bunga (misal `Sunflower — 8K` atau `Tulip — 4K`), visual bunga *pipe cleaner* yang bersangkutan muncul besar secara interaktif di latar belakang dan pengguna bisa langsung menekan tombol `+ Tambah ke Rangkaian Buketku`.

---

### SECTION 5: "MAKE YOUR OWN DESAIN" — INTERACTIVE CUSTOM BUILDER & WHATSAPP GENERATOR — *Posisi Konten: RATA TENGAH KE SPLIT-VIEW*
* **Fitur Unggulan (Membedakan dari Website Lain)**:
  Karena `@mest.fiore` memiliki sistem **Paket Bucket (`10K–25K`)**, **Bunga Satuan (`1K–8K`)**, dan **Gantungan (`3K–8K`)**, sediakan peracik pesanan interaktif (*Frontend-Only*) yang langsung menghitung estimasi harga dan menyusun chat WhatsApp otomatis:
  1. **Tab / Mode Pilihan**:
     * **Mode 1: Paket Bucket Jadi** (`Single Flower 10K`, `Flower Bucket 15K`, `Idol Bucket 25K`).
     * **Mode 2: Rangkai Bunga Sendiri (Mix & Match Per Tangkai)** — Pengguna bisa memilih jumlah tangkai (`Lily 7K`, `Sunflower 8K`, `Poppy 6K`, `Holow 4K`, `Holow Love 3K`, `Tulip 4K`, `Mini Holow 1.5K`, `Daun 1.5K`, `Twistlove 1K`, `Mini Daisy 2K`) + memilih opsi tambahan *Wrapping* (`Tanpa Wrap`, `Mini Wrap +5K`, `Full Korea Wrap +10K`).
     * **Mode 3: Gantungan Custom** — Pilih jumlah `Coquette (3K)`, `Cerry (8K)`, `Butterfly (5K)`, `Flower (5K)`, atau `Jellyfish (8K)`.
  2. **Kustomisasi Warna & Request Bebas**:
     * Input warna bunga/pita/wrapping yang diinginkan (misal: *"Tulip warna biru elektrik kayak di katalog, wrap hologram, pita ungu"* atau *"Idol bucket foto member NCT/Seventeen"*).
  3. **Jadwal & Titik COD Jatinangor**:
     * Pilihan titik temu: `COD Kampus Unpad Jatinangor`, `COD ITB Jatinangor`, `COD Jatos (Jatinangor Town Square)`, `COD Ciseke / Cikuda`, atau `Ambil / Gosend`.
  4. **Live Summary & Tombol WhatsApp**:
     * Menampilkan total estimasi harga secara *real-time* (misal: `2x Tulip (8K) + 1x Lily (7K) + 1x Daun (1.5K) + Wrap (5K) = Estimasi Rp 21.500`).
     * Tombol: **`Pesan Rangkaian Ini via WhatsApp (@mest.fiore) ↗`** yang langsung mengarahkan ke nomor WhatsApp dengan format rincian pesanan yang rapi dan sopan.

---

### SECTION 6: LOKASI JATINANGOR, FAQ & SIGNATURE FOOTER — *Posisi Konten: RATA KIRI & RATA KANAN*
* **Sisi Kiri (Rata Kiri — Info Studio & Lokasi)**:
  * **Brand**: `𝐌𝐞𝐬𝐭𝐢𝐞𝐫𝐞 𝐟𝐢𝐨𝐥𝐞𝐭 🎀🌷` (`@mest.fiore`)
  * **Status**: `Open Order Setiap Hari (Bebas Request & Free Custom Desain)`
  * **Lokasi**: `📍 Jatinangor, Kab. Sumedang` (Area Unpad, ITB, IPDN, IKOPIN, Jatos, Ciseke, Cikuda).
  * **Instagram**: `@mest.fiore`
* **Sisi Kanan (Rata Kanan — Pertanyaan Populer Mahasiswa Jatinangor)**:
  * *Harga bunga satuan (1K–8K) itu sudah sama bungkus/wrap belum kak?* — Belum yaa bestie! Sesuai stiker di katalog kita, harga per tangkai (`Lily 7K`, `Tulip 4K`, dll.) belum termasuk *wrap*. Kalau mau langsung sudah dibungkus cantik, kamu bisa pilih paket **Single Flower (mulai 10K)**, **Flower Bucket (mulai 15K)**, atau tambah opsi *wrap* pas *custom*.
  * *Kalau mau pesan Idol Bucket (25K) fotonya dari siapa?* — Fotonya bebas dari kamu! Kirim aja foto *bias*, pacar, atau *bestie* kamu lewat WhatsApp, nanti kita yang cetak dan rangkai bareng bunganya.
  * *Bisa request warna bunga selain yang di foto?* — Bisa banget! Mau tulip warna pink, ungu fiolet, biru, atau kuning, semuanya *free custom design*.
* **Footer Penutup**:
  * Tipografi raksasa `MESTIERE FIOLET` dengan animasi GSAP *scroll reveal* di atas latar belakang *pastel aura*.

---

## 5. Penanganan Asset Gambar Referensi & Visual Cutout

1. **Integrasi 4 Gambar Asli Pengguna**:
   * Instruksikan kode untuk menyalin atau membaca ke-4 gambar yang diunggah pengguna (jika ada di direktori proyek) ke dalam `public/images/reference/`:
     * `logo-mest-fiolet.jpg` (Gambar 4 — Logo `Mest FIOLET`)
     * `open-order-bucket.jpeg` (Gambar 3 — `Single Flower 10K`, `Flower Bucket 15K`, `Idol Bucket 25K`)
     * `pricelist-gantungan.jpeg` (Gambar 2 — `Coquette 3K`, `Cerry 8K`, `Butterfly 5K`, `Flower 5K`, `Jellyfish 8K`)
     * `pricelist-bunga.jpeg` (Gambar 1 — 10 item bunga kawat bulu `1K` – `8K`)
2. **Interactive Original Poster Drawer / Lightbox (Tanpa Bingkai Kaku)**:
   * Sediakan juga tombol interaktif *"Lihat Lembar Katalog Asli @mest.fiore"* di mana pengunjung bisa mengintip ke-3 lembar *poster price list* asli dengan transisi halus, selain menjelajahi katalog interaktif di halaman web.
3. **Ilustrasi SVG / Visual Cutout Presisi untuk Setiap Item**:
   * Agar tidak pernah terjadi *broken image* dan setiap bunga/gantungan bisa melayang secara *frameless* di atas latar belakang *pastel aura*, buat representasi visual *high-craft* (kombinasi foto editorial & *custom botanical pipe-cleaner SVG art* yang merepresentasikan bentuk unik *Lily, Sunflower, Poppy, Holow, Holow Love, Tulip Biru, Mini Holow, Daun, Twistlove, Mini Daisy, Coquette Bow, Cerry, Butterfly, Flower Keychain,* dan *Jellyfish*).

---

## 6. Spesifikasi Pengujian Otomatis Playwright (`tests/mest-fiore.spec.ts`)

Codex CLI **wajib** membuat dan menjalankan pengujian Playwright berikut hingga semuanya **PASS 100%**:

1. **Zero Console & Page Error**: Tidak boleh ada error JavaScript atau gambar yang gagal dimuat (`naturalWidth > 0`).
2. **Verifikasi Akurasi Data Harga Sesuai 4 Gambar**:
   * Memastikan teks `Single Flower` (`10K`), `Flower Bucket` (`15K`), dan `Idol Bucket` (`25K`) tampil di halaman.
   * Memastikan ke-10 item `PRICE LIST BUNGA` (`Lily` `7K`, `Sunflower` `8K`, `Poppy` `6K`, `Holow` `4K`, `Holow Love` `3K`, `Tulip` `4K`, `Mini Holow` `1.5K`, `Daun` `1,5K`, `Twistlove` `1K`, `Mini Daisy` `2K`) dan catatan `NOTE HARGA BELUM TERMASUK WRAP` tampil lengkap.
   * Memastikan ke-5 item `PRICE LIST GANTUNGAN` (`Coquette` `3K`, `Cerry` `8K`, `Butterfly` `5K`, `Flower` `5K`, `Jellyfish` `8K`) tampil lengkap.
3. **Verifikasi Posisi Konten Campuran (Mixed Alignment)**:
   * Hero Section rata tengah, Bucket Section rata kiri, dan Gantungan Section rata kanan.
4. **Verifikasi Kalkulator Mix & Match & Redirect WhatsApp**:
   * Menguji klik tambah tangkai bunga (misal: `1x Lily 7K` + `1x Tulip 4K` + `1x Jellyfish 8K`), memverifikasi perhitungan total harga otomatis, dan memastikan link tombol WhatsApp (`https://wa.me/...`) berisi pesan rincian pesanan yang ter-*encode* dengan benar.
5. **Responsivitas Mobile & Desktop**:
   * Tidak ada *horizontal overflow* pada layar HP (`390x844`) maupun Desktop (`1440x900`).

---

## 7. Checklist Penyelesaian Akhir (Definition of Done)

- [x] Skills `shadcn/ui`, `miqdadbadjuber/anti-slop`, dan `impeccable` telah dipasang dan diterapkan.
- [x] Logo `Mest FIOLET` (skrip pink `"Mest"` + sans-serif renggang `"F I O L E T"`) serta palet warna *Pastel Lavender-Pink Grainy Aura* (`#FAF3FC`, `#E5D0F6`, `#FAD9EC`, `#7B1FA2`, `#F27EB2`) telah diterapkan dengan akurat.
- [x] Seluruh harga dari ke-3 poster (`Bucket 10K–25K`, `Bunga 1K–8K + Note Belum Termasuk Wrap`, `Gantungan 3K–8K`) sudah masuk tanpa ada yang terlewat.
- [x] Posisi konten bervariasi: **Rata Tengah (Hero) → Rata Kiri (Bucket) → Rata Kanan (Gantungan) → Campuran (Price List & Custom Calculator)**.
- [x] Animasi GSAP (huruf keluar satu per satu dengan delay + *scroll parallax*) berjalan mulus.
- [x] `pnpm build` dan `pnpm playwright test` lulus 100% tanpa error.