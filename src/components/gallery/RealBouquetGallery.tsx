import { useState, useId, useEffect } from 'react';
import { Camera, ZoomIn, X, MessageCircle, ArrowRight, Sparkles } from 'lucide-react';
import { REAL_BOUQUET_SHOWCASE, BRAND_INFO, type BouquetShowcaseItem } from '@/data/mestFioreData';

type FilterCategory = 'semua' | 'bunga' | 'idol-wisuda' | 'snack-uang';

export function RealBouquetGallery() {
  const [activeFilter, setActiveFilter] = useState<FilterCategory>('semua');
  const [activeModalItem, setActiveModalItem] = useState<BouquetShowcaseItem | null>(null);
  const titleId = useId();

  // Close modal on escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && activeModalItem) {
        setActiveModalItem(null);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [activeModalItem]);

  // Lock body scroll when modal is open
  useEffect(() => {
    if (activeModalItem) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [activeModalItem]);

  const filteredItems = activeFilter === 'semua'
    ? REAL_BOUQUET_SHOWCASE
    : REAL_BOUQUET_SHOWCASE.filter((item) => item.category === activeFilter);

  const getWhatsAppLink = (item: BouquetShowcaseItem) => {
    const message = encodeURIComponent(
      `Halo Kak Admin @mest.fiore! Saya tertarik pesan buket seperti di galeri web: "${item.title}" (${item.priceDisplay}). Apakah bisa custom warna/detailnya?`
    );
    return `https://wa.me/${BRAND_INFO.whatsappNumber}?text=${message}`;
  };

  return (
    <section className="home-section gallery-section" aria-labelledby={titleId}>
      <div className="shell">
        <div className="gallery-header text-center max-w-2xl mx-auto mb-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-100 text-purple-900 text-xs font-bold mb-3 border border-purple-200">
            <Camera className="w-3.5 h-3.5 text-pink-600" aria-hidden="true" />
            <span>PORTFOLIO & FOTO ASLI @MEST.FIORE</span>
          </div>
          <h2 id={titleId} className="font-serif text-3xl sm:text-4xl font-bold text-[#7B1FA2] mb-3">
            Koleksi Buket Nyata Buatan Tangan
          </h2>
          <p className="text-muted text-sm sm:text-base leading-relaxed">
            Semua foto di bawah ini adalah 100% pesanan asli yang kami rangkai untuk sempro, wisuda, kado bias, dan ulang tahun teman-teman di Jatinangor.
          </p>

          {/* Filter Categories */}
          <div className="gallery-filters flex flex-wrap items-center justify-center gap-2 mt-6" role="tablist" aria-label="Filter galeri buket">
            <button
              type="button"
              role="tab"
              aria-selected={activeFilter === 'semua'}
              onClick={() => setActiveFilter('semua')}
              className={`min-h-[44px] px-5 py-2 rounded-full text-xs sm:text-sm font-semibold transition-all border ${
                activeFilter === 'semua'
                  ? 'bg-[#7B1FA2] text-white border-[#7B1FA2] shadow-sm'
                  : 'bg-white text-muted hover:text-[#7B1FA2] border-line'
              }`}
            >
              Semua Koleksi ({REAL_BOUQUET_SHOWCASE.length})
            </button>
            <button
              type="button"
              role="tab"
              aria-selected={activeFilter === 'bunga'}
              onClick={() => setActiveFilter('bunga')}
              className={`min-h-[44px] px-5 py-2 rounded-full text-xs sm:text-sm font-semibold transition-all border ${
                activeFilter === 'bunga'
                  ? 'bg-[#7B1FA2] text-white border-[#7B1FA2] shadow-sm'
                  : 'bg-white text-muted hover:text-[#7B1FA2] border-line'
              }`}
            >
              Bunga Kawat Bulu
            </button>
            <button
              type="button"
              role="tab"
              aria-selected={activeFilter === 'idol-wisuda'}
              onClick={() => setActiveFilter('idol-wisuda')}
              className={`min-h-[44px] px-5 py-2 rounded-full text-xs sm:text-sm font-semibold transition-all border ${
                activeFilter === 'idol-wisuda'
                  ? 'bg-[#7B1FA2] text-white border-[#7B1FA2] shadow-sm'
                  : 'bg-white text-muted hover:text-[#7B1FA2] border-line'
              }`}
            >
              Idol & Wisuda
            </button>
            <button
              type="button"
              role="tab"
              aria-selected={activeFilter === 'snack-uang'}
              onClick={() => setActiveFilter('snack-uang')}
              className={`min-h-[44px] px-5 py-2 rounded-full text-xs sm:text-sm font-semibold transition-all border ${
                activeFilter === 'snack-uang'
                  ? 'bg-[#7B1FA2] text-white border-[#7B1FA2] shadow-sm'
                  : 'bg-white text-muted hover:text-[#7B1FA2] border-line'
              }`}
            >
              Cokelat, Snack & Uang
            </button>
          </div>
        </div>

        {/* Gallery Grid */}
        <div className="gallery-grid grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredItems.map((item) => (
            <article
              key={item.id}
              className="gallery-card bg-white rounded-2xl border border-line overflow-hidden shadow-xs hover:shadow-md transition-all duration-300 flex flex-col group"
            >
              {/* Photo Area */}
              <div className="relative aspect-square overflow-hidden bg-purple-50/40">
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  loading="lazy"
                />

                {/* Overlays / Badges */}
                <div className="absolute top-3 left-3 flex flex-col gap-1.5 items-start">
                  {item.badge && (
                    <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-white/95 backdrop-blur-sm text-[11px] font-bold text-purple-900 border border-purple-200/80 shadow-xs">
                      <Sparkles className="w-3 h-3 text-pink-500" aria-hidden="true" />
                      {item.badge}
                    </span>
                  )}
                  {item.highlightTag && (
                    <span className="inline-block px-2 py-0.5 rounded-md bg-[#7B1FA2]/90 text-white text-[10px] font-semibold">
                      {item.highlightTag}
                    </span>
                  )}
                </div>

                {/* Quick Zoom Button */}
                <button
                  type="button"
                  onClick={() => setActiveModalItem(item)}
                  className="absolute bottom-3 right-3 min-w-[44px] min-h-[44px] p-2.5 rounded-full bg-white/90 backdrop-blur-sm text-purple-900 shadow-md hover:bg-white hover:scale-110 transition-all border border-purple-200 flex items-center justify-center"
                  aria-label={`Perbesar foto ${item.title}`}
                >
                  <ZoomIn className="w-5 h-5" aria-hidden="true" />
                </button>
              </div>

              {/* Body */}
              <div className="p-5 flex flex-col flex-1">
                <div className="flex items-center justify-between gap-2 mb-1.5">
                  <span className="text-xs font-semibold uppercase tracking-wider text-muted">
                    {item.categoryLabel}
                  </span>
                  <span className="font-mono text-xs font-bold text-pink-600 bg-pink-50 px-2 py-0.5 rounded-md border border-pink-100">
                    {item.priceDisplay}
                  </span>
                </div>

                <h3 className="font-serif text-lg font-bold text-[#7B1FA2] mb-2 leading-snug">
                  {item.title}
                </h3>

                <p className="text-xs sm:text-sm text-muted leading-relaxed line-clamp-3 mb-4 flex-1">
                  {item.description}
                </p>

                {/* Action Buttons */}
                <div className="mt-auto pt-3 border-t border-line/60 flex items-center gap-2">
                  <a
                    href={getWhatsAppLink(item)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="min-h-[44px] flex-1 inline-flex items-center justify-center gap-1.5 px-3 py-2 rounded-full bg-[#1C9C3E] hover:bg-[#168032] text-white text-xs font-bold transition-colors shadow-xs"
                    aria-label={`Chat WhatsApp untuk pesan ${item.title}`}
                  >
                    <MessageCircle className="w-4 h-4" aria-hidden="true" />
                    <span>Pesan Model Ini</span>
                  </a>
                  <a
                    href={`/rangkai/?item=${item.orderItemId || 'bucket-flower'}&cat=bucket`}
                    className="min-h-[44px] px-4 py-2 inline-flex items-center justify-center gap-1 rounded-full bg-purple-50 hover:bg-purple-100 text-[#7B1FA2] text-xs font-bold transition-colors border border-purple-200"
                    aria-label={`Rangkai atau sesuaikan ${item.title}`}
                  >
                    <span>Rangkai</span>
                    <ArrowRight className="w-3.5 h-3.5" aria-hidden="true" />
                  </a>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>

      {/* Lightbox Zoom Modal */}
      {activeModalItem && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label={activeModalItem.title}
          className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/60 backdrop-blur-sm animate-fade-in"
        >
          <div
            className="absolute inset-0 cursor-pointer"
            onClick={() => setActiveModalItem(null)}
            aria-hidden="true"
          />

          <div className="relative z-10 w-full max-w-2xl bg-white rounded-3xl overflow-hidden shadow-2xl border border-purple-200 flex flex-col max-h-[90vh]">
            <div className="flex items-center justify-between p-4 sm:px-6 border-b border-line bg-purple-50/50">
              <div>
                <span className="text-[11px] font-bold uppercase tracking-wider text-muted">
                  {activeModalItem.categoryLabel}
                </span>
                <h3 className="font-serif text-lg sm:text-xl font-bold text-[#7B1FA2]">
                  {activeModalItem.title}
                </h3>
              </div>
              <button
                type="button"
                onClick={() => setActiveModalItem(null)}
                className="min-w-[44px] min-h-[44px] rounded-full p-2 text-muted hover:text-ink hover:bg-purple-100/70 transition-colors flex items-center justify-center"
                aria-label="Tutup perbesaran foto"
              >
                <X className="w-5 h-5" aria-hidden="true" />
              </button>
            </div>

            <div className="overflow-y-auto p-4 sm:p-6 flex flex-col items-center">
              <div className="relative w-full max-w-md aspect-square rounded-2xl overflow-hidden bg-purple-50 shadow-inner border border-line">
                <img
                  src={activeModalItem.image}
                  alt={activeModalItem.title}
                  className="w-full h-full object-cover"
                />
              </div>

              <div className="mt-5 w-full">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-semibold text-muted">Estimasi Harga:</span>
                  <span className="font-mono text-base font-bold text-pink-600 bg-pink-50 px-3 py-1 rounded-lg border border-pink-100">
                    {activeModalItem.priceDisplay}
                  </span>
                </div>
                <p className="text-sm text-ink leading-relaxed mb-6">
                  {activeModalItem.description}
                </p>

                <div className="flex flex-col sm:flex-row items-center gap-3">
                  <a
                    href={getWhatsAppLink(activeModalItem)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="min-h-[44px] w-full sm:flex-1 inline-flex items-center justify-center gap-2 rounded-full bg-[#1C9C3E] hover:bg-[#168032] text-white text-sm font-bold px-6 py-3 transition-colors shadow-sm"
                  >
                    <MessageCircle className="w-5 h-5" aria-hidden="true" />
                    <span>Chat WhatsApp Admin untuk Pesan</span>
                  </a>
                  <a
                    href={`/rangkai/?item=${activeModalItem.orderItemId || 'bucket-flower'}&cat=bucket`}
                    className="min-h-[44px] w-full sm:w-auto inline-flex items-center justify-center gap-1.5 rounded-full bg-purple-100 hover:bg-purple-200 text-[#7B1FA2] text-sm font-bold px-6 py-3 transition-colors border border-purple-200"
                  >
                    <span>Buka di Order Studio</span>
                    <ArrowRight className="w-4 h-4" aria-hidden="true" />
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
