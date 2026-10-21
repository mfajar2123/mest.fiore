export interface ProductItem {
  id: string;
  name: string;
  priceDisplay: string;
  numericPrice: number;
  description: string;
  category: 'bucket' | 'bunga' | 'gantungan';
  colorTag?: string;
  accentColor?: string;
  badge?: string;
  image?: string;
  galleryImages?: string[];
}

export interface BouquetShowcaseItem {
  id: string;
  title: string;
  category: 'bunga' | 'idol-wisuda' | 'snack-uang';
  categoryLabel: string;
  priceDisplay: string;
  numericPrice: number;
  description: string;
  image: string;
  badge?: string;
  highlightTag?: string;
  orderItemId?: string;
}

export interface WrapOption {
  id: string;
  name: string;
  price: number;
  description: string;
}

export const BRAND_INFO = {
  name: "Mestiere Fiolet",
  handle: "@mest.fiore",
  whatsappNumber: "6285721345678",
  location: "Jatinangor, Kab. Sumedang (Unpad, ITB, IPDN, IKOPIN, Jatos, Ciseke, Cikuda)",
  tagline: "Make Your Own Desain : Free Custom Buket & Gantungan Gemas",
  operationalHours: "Open Order Setiap Hari",
  instagramUrl: "https://instagram.com/mest.fiore",
};

export const BUCKET_LIST: ProductItem[] = [
  {
    id: "bucket-single",
    name: "Single Flower Bucket",
    priceDisplay: "START FROM 10K",
    numericPrice: 10000,
    description: "Buket 1 tangkai bunga pilihan dengan wrapping holographic/iridescent berkilau dan pita satin ungu/pink manis. Simpel, manis, dan ramah kantong mahasiswa buat hadiah sempro atau apresiasi kecil.",
    category: "bucket",
    colorTag: "Lilac & Iridescent",
    accentColor: "#F27EB2",
    badge: "Best Seller Sempro",
    image: "/images/bouquets/single-sunflower.jpg",
    galleryImages: [
      "/images/bouquets/single-sunflower.jpg",
    ],
  },
  {
    id: "bucket-flower",
    name: "Flower Bucket",
    priceDisplay: "START FROM 15K",
    numericPrice: 15000,
    description: 'Rangkaian multi-flower kawat bulu kombinasi warna (ungu, biru, pink) dilengkapi aksen kupu-kupu cantik, topper hati bertuliskan "Congratulations", dan wrapping berlapis.',
    category: "bucket",
    colorTag: "Multi-Color Pastel",
    accentColor: "#7B1FA2",
    badge: "Favorite Wisuda",
    image: "/images/bouquets/flower-pastel-iridescent.jpg",
    galleryImages: [
      "/images/bouquets/flower-pastel-iridescent.jpg",
      "/images/bouquets/flower-pink-coquette.jpg",
      "/images/bouquets/flower-lilac-fairy.jpg",
      "/images/bouquets/sunflower-lily-duo.jpg",
    ],
  },
  {
    id: "bucket-idol",
    name: "Idol Bucket",
    priceDisplay: "START FROM 25K",
    numericPrice: 25000,
    description: "Buket K-Pop / Bias / Custom Photo favorit! Berisi beberapa cut-out foto idol, pacar, atau bestie yang dipadukan dengan rangkaian bunga holow & tulip warna senada serta wrapping putih-lilac mengembang.",
    category: "bucket",
    colorTag: "Custom Bias Theme",
    accentColor: "#1E56E8",
    badge: "Viral K-Popers",
    image: "/images/bouquets/idol-mingyu-photocard.jpg",
    galleryImages: [
      "/images/bouquets/idol-mingyu-photocard.jpg",
    ],
  },
];

export const REAL_BOUQUET_SHOWCASE: BouquetShowcaseItem[] = [
  {
    id: "showcase-pastel-flower",
    title: "Pastel Dream Holographic Bucket",
    category: "bunga",
    categoryLabel: "Buket Bunga Kawat Bulu",
    priceDisplay: "START FROM 15K",
    numericPrice: 15000,
    description: "Rangkaian bunga kawat bulu kelopak pastel (daisy, lily, holow), aksen 2 kupu-kupu emas, spiral twister, dan wrap pelangi holographic berbalut pita satin lilac.",
    image: "/images/bouquets/flower-pastel-iridescent.jpg",
    badge: "Favorite Wisuda",
    highlightTag: "Best Seller",
    orderItemId: "bucket-flower",
  },
  {
    id: "showcase-single-sunflower",
    title: "Single Sunflower Iridescent",
    category: "bunga",
    categoryLabel: "Buket Bunga Kawat Bulu",
    priceDisplay: "START FROM 10K",
    numericPrice: 10000,
    description: "Satu tangkai bunga matahari gembul cerah dengan cone wrap kilau hologram iridescent. Pilihan simpel, manis, dan ramah kantong mahasiswa untuk sempro.",
    image: "/images/bouquets/single-sunflower.jpg",
    badge: "Best Seller Sempro",
    highlightTag: "Favorit Mahasiswa",
    orderItemId: "bucket-single",
  },
  {
    id: "showcase-idol-mingyu",
    title: "K-Pop Bias Photocard Bucket",
    category: "idol-wisuda",
    categoryLabel: "Idol & Custom Foto",
    priceDisplay: "START FROM 25K",
    numericPrice: 25000,
    description: "Buket custom photocards idol (contoh Mingyu SEVENTEEN) berpadu bunga kawat bulu hot pink & fuchsia, aksen spiral bulu, dan wrapping Korea pink mengembang.",
    image: "/images/bouquets/idol-mingyu-photocard.jpg",
    badge: "Viral K-Popers",
    highlightTag: "Bebas Request Idol / Foto",
    orderItemId: "bucket-idol",
  },
  {
    id: "showcase-grad-bear",
    title: "Graduation Teddy Bear & Snack Bucket",
    category: "idol-wisuda",
    categoryLabel: "Wisuda & Momen Spesial",
    priceDisplay: "START FROM 30K",
    numericPrice: 30000,
    description: "Boneka beruang mini berkalung medali & bertoga wisuda, dipadu aneka cokelat (Cadbury, Pocky strawberry, Lagie), wand love kawat bulu, dan kartu Happy Graduation.",
    image: "/images/bouquets/graduation-bear-snack.jpg",
    badge: "Wisuda Favorit",
    highlightTag: "Include Boneka & Kartu",
    orderItemId: "bucket-flower",
  },
  {
    id: "showcase-choco-iridescent",
    title: "Holographic Chocolate Bouquet",
    category: "snack-uang",
    categoryLabel: "Buket Cokelat & Snack",
    priceDisplay: "START FROM 20K",
    numericPrice: 20000,
    description: "Kombinasi Silverqueen Berry Yogurt & Cadbury Dairy Milk dengan 4 tangkai bunga kawat bulu pastel, kupu-kupu gold, dan kertas wrap kilau iridescent.",
    image: "/images/bouquets/chocolate-iridescent.jpg",
    badge: "Cokelat Premium",
    highlightTag: "Manis & Berkilau",
    orderItemId: "bucket-flower",
  },
  {
    id: "showcase-pink-coquette",
    title: "Pink Coquette Heart Bouquet",
    category: "bunga",
    categoryLabel: "Buket Bunga Kawat Bulu",
    priceDisplay: "START FROM 15K",
    numericPrice: 15000,
    description: "Buket kawat bulu tema coquette manis berbalut baby pink wrap dengan pinggiran hologram, heart wand kawat bulu biru, spiral twister, dan kupu-kupu pink.",
    image: "/images/bouquets/flower-pink-coquette.jpg",
    badge: "Coquette Aesthetic",
    highlightTag: "Aksen Heart Wand",
    orderItemId: "bucket-flower",
  },
  {
    id: "showcase-black-tower",
    title: "Midnight Black Bold Snack Tower",
    category: "snack-uang",
    categoryLabel: "Buket Snack",
    priceDisplay: "START FROM 20K",
    numericPrice: 20000,
    description: "Buket snack maskulin & bold dengan Chocopie marshmallow, Beng-Beng, Chocolatos, Sari Gandum, dipadu bunga velvet kawat bulu maroon dan wrapping hitam matte.",
    image: "/images/bouquets/snack-black-tower.jpg",
    badge: "Favorit Cowok",
    highlightTag: "Pilihan Snack Lengkap",
    orderItemId: "bucket-flower",
  },
  {
    id: "showcase-money-birthday",
    title: "Sweet Birthday Money & Snack Bucket",
    category: "snack-uang",
    categoryLabel: "Buket Uang & Ultah",
    priceDisplay: "START FROM 35K",
    numericPrice: 35000,
    description: "Rangkaian uang kertas rupiah asli dipadu susu Indomilk Kids, biskuit Pillows strawberry, Nabati, Pocky, kartu ucapan Happy Birthday, dan pita satin pink manis.",
    image: "/images/bouquets/money-snack-birthday.jpg",
    badge: "Buket Uang Ultah",
    highlightTag: "Bisa Request Nominal",
    orderItemId: "bucket-flower",
  },
  {
    id: "showcase-lilac-fairy",
    title: "Lilac Fairy Frosted Bouquet",
    category: "bunga",
    categoryLabel: "Buket Bunga Kawat Bulu",
    priceDisplay: "START FROM 15K",
    numericPrice: 15000,
    description: "Buket bunga kawat bulu loop putih, lilac, dan biru cerah dengan wrap frosted translucent berlapis hologram, pita satin lilac, dan stiker logo resmi @mest.fiore.",
    image: "/images/bouquets/flower-lilac-fairy.jpg",
    badge: "Signature Lilac",
    highlightTag: "Logo Stiker Asli",
    orderItemId: "bucket-flower",
  },
  {
    id: "showcase-sun-lily",
    title: "Sunshine Sunflower & Lily Duo",
    category: "bunga",
    categoryLabel: "Buket Bunga Kawat Bulu",
    priceDisplay: "START FROM 12K",
    numericPrice: 12000,
    description: "Kombinasi ceria bunga matahari kawat bulu kuning dan bunga lily putih anggun dengan kertas wrap kuning lemon lembut, aksen spiral, dan pita hitam elegan.",
    image: "/images/bouquets/sunflower-lily-duo.jpg",
    badge: "Duo Bunga Favorit",
    highlightTag: "Ceria & Hangat",
    orderItemId: "bucket-flower",
  },
  {
    id: "showcase-love-message",
    title: "Custom Heart Message Snack Bucket",
    category: "snack-uang",
    categoryLabel: "Buket Snack & Pesan",
    priceDisplay: "START FROM 20K",
    numericPrice: 20000,
    description: "Buket snack Beng-Beng & Dilan dengan topper hati kustom berisi tulisan pesan pribadi tulisan tangan manis, dipadukan bunga kawat bulu velvet maroon dan wrap krem elegan.",
    image: "/images/bouquets/snack-custom-heart-message.jpg",
    badge: "Free Custom Pesan",
    highlightTag: "Pesan Pribadi Tangan",
    orderItemId: "bucket-flower",
  },
];

export const BUNGA_LIST: ProductItem[] = [
  {
    id: "bunga-lily",
    name: "Lily",
    priceDisplay: "7K",
    numericPrice: 7000,
    description: "Bunga lily putih bersih 5 kelopak dengan putik kuning-oranye yang anggun.",
    category: "bunga",
    accentColor: "#FAF3FC",
  },
  {
    id: "bunga-sunflower",
    name: "Sunflower",
    priceDisplay: "8K",
    numericPrice: 8000,
    description: "Bunga matahari kelopak kuning cerah berlapis dengan bagian tengah coklat tua yang kontras dan ceria.",
    category: "bunga",
    accentColor: "#F5D118",
  },
  {
    id: "bunga-poppy",
    name: "Poppy",
    priceDisplay: "6K",
    numericPrice: 6000,
    description: "Bunga poppy 5 kelopak tebal warna deep maroon/burgundy mewah dengan putik bulatan krem di tengah.",
    category: "bunga",
    accentColor: "#580F1E",
  },
  {
    id: "bunga-holow",
    name: "Holow",
    priceDisplay: "4K",
    numericPrice: 4000,
    description: "Bunga kelopak loop (berongga) warna soft pink dengan pusat bunga pink tua beraksen bintik manis.",
    category: "bunga",
    accentColor: "#F27EB2",
  },
  {
    id: "bunga-holow-love",
    name: "Holow Love",
    priceDisplay: "3K",
    numericPrice: 3000,
    description: "Bunga dengan 4 kelopak berongga berbentuk hati (love) warna ungu lilac, putik kuning, dan tangkai hijau.",
    category: "bunga",
    accentColor: "#E5D0F6",
  },
  {
    id: "bunga-tulip",
    name: "Tulip",
    priceDisplay: "4K",
    numericPrice: 4000,
    description: "Bunga tulip kawat bulu gembul 3D (contoh warna royal blue elektrik, bebas request warna lain).",
    category: "bunga",
    accentColor: "#1E56E8",
  },
  {
    id: "bunga-mini-holow",
    name: "Mini Holow",
    priceDisplay: "1.5K",
    numericPrice: 1500,
    description: "Versi mungil dari bunga holow 6 kelopak ungu lilac dengan tengah pink cerah.",
    category: "bunga",
    accentColor: "#DCE5FA",
  },
  {
    id: "bunga-daun",
    name: "Daun",
    priceDisplay: "1,5K",
    numericPrice: 1500,
    description: "Helai daun panjang warna hijau segar untuk melengkapi tangkai bunga pilihanmu.",
    category: "bunga",
    accentColor: "#1C9C3E",
  },
  {
    id: "bunga-twistlove",
    name: "Twistlove",
    priceDisplay: "1K",
    numericPrice: 1000,
    description: "Ornamen kawat bulu bentuk hati (heart wand) atau aksen ulir spiral (twister) pastel buat pemanis buket.",
    category: "bunga",
    accentColor: "#F985B5",
  },
  {
    id: "bunga-mini-daisy",
    name: "Mini Daisy",
    priceDisplay: "2K",
    numericPrice: 2000,
    description: "Bunga daisy mungil warna sage green / pastel mint dengan putik kuning lembut.",
    category: "bunga",
    accentColor: "#93C572",
  },
];

export const GANTUNGAN_LIST: ProductItem[] = [
  {
    id: "gantungan-coquette",
    name: "Coquette",
    priceDisplay: "3K",
    numericPrice: 3000,
    description: "Gantungan pita coquette bow mungil nan manis (pilihan warna ungu lilac, merah coral, pink, dll.).",
    category: "gantungan",
    accentColor: "#F27EB2",
  },
  {
    id: "gantungan-cerry",
    name: "Cerry",
    priceDisplay: "8K",
    numericPrice: 8000,
    description: "Gantungan buah ceri kembar gembul warna merah merona dengan tangkai pita hijau mint dan mutiara kecil.",
    category: "gantungan",
    accentColor: "#E11D48",
  },
  {
    id: "gantungan-butterfly",
    name: "Butterfly",
    priceDisplay: "5K",
    numericPrice: 5000,
    description: "Gantungan kupu-kupu cantik perpaduan dua warna sayap (sky blue & cobalt blue) dengan antena melengkung.",
    category: "gantungan",
    accentColor: "#1E56E8",
  },
  {
    id: "gantungan-flower",
    name: "Flower",
    priceDisplay: "5K",
    numericPrice: 5000,
    description: "Gantungan bunga kelopak tebal warna merah maroon, putik kuning, daun hijau mint, lengkap dengan rantai ball-chain.",
    category: "gantungan",
    accentColor: "#580F1E",
  },
  {
    id: "gantungan-jellyfish",
    name: "Jellyfish",
    priceDisplay: "8K",
    numericPrice: 8000,
    description: "Gantungan ubur-ubur (jellyfish) pink chubby lengkap dengan mata gemas dan tentakel ulir.",
    category: "gantungan",
    accentColor: "#FAD9EC",
  },
];

export const WRAP_OPTIONS: WrapOption[] = [
  {
    id: "wrap-none",
    name: "Tanpa Wrap (Bunga Tangkai Saja)",
    price: 0,
    description: "Tangkai bunga siap kamu rangkai sendiri atau untuk dekor vas kaca di kosan.",
  },
  {
    id: "wrap-mini",
    name: "Tambah Single / Mini Wrap Iridescent + Pita",
    price: 5000,
    description: "Kertas wrap kilau pelangi iridescent ditambah pita satin manis, cocok untuk 1-3 tangkai.",
  },
  {
    id: "wrap-full",
    name: "Tambah Full Bouquet Wrap Korea Berlapis + Pita Satin",
    price: 10000,
    description: "Gaya buket Korea bervolume mengembang dengan perpaduan warna kertas pastel dan pita satin ganda.",
  },
  {
    id: "wrap-idol",
    name: "Tambah Custom Foto Idol / Bestie Cutout",
    price: 8000,
    description: "Cetak foto idol K-Pop atau bestie favoritmu dengan cut-out rapi tertancap di tengah buket.",
  },
];

export const COD_LOCATIONS = [
  "COD Kampus Unpad Jatinangor",
  "COD ITB Jatinangor",
  "COD Jatos (Jatinangor Town Square)",
  "COD Ciseke / Cikuda",
  "Ambil / Gosend (Area Jatinangor)",
];

export const FAQ_ITEMS = [
  {
    question: "Harga bunga satuan (1K-8K) itu sudah sama bungkus/wrap belum kak?",
    answer: "Belum yaa bestie! Sesuai stiker di katalog kita, harga per tangkai (Lily 7K, Tulip 4K, dll.) belum termasuk wrap. Kalau mau langsung sudah dibungkus cantik, kamu bisa pilih paket Single Flower (mulai 10K), Flower Bucket (mulai 15K), atau tambah opsi wrap pas custom.",
  },
  {
    question: "Kalau mau pesan Idol Bucket (25K) fotonya dari siapa?",
    answer: "Fotonya bebas dari kamu! Kirim aja foto bias, pacar, atau bestie kamu lewat WhatsApp, nanti kita yang cetak dan rangkai bareng bunganya.",
  },
  {
    question: "Bisa request warna bunga selain yang di foto?",
    answer: "Bisa banget! Mau tulip warna pink, ungu fiolet, biru, atau kuning, semuanya free custom design.",
  },
  {
    question: "Berapa lama proses pengerjaannya kak?",
    answer: "Untuk buket satuan dan gantungan ready/custom biasanya 1-2 hari kerja. Kalau butuh mendesak buat hari H sidang atau sempro di Jatinangor, chat admin langsung yaa biar dicek slot tercepat!",
  },
];
