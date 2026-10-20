import React, { useState } from 'react';
import { BUNGA_LIST } from '@/data/mestFioreData';
import { PipeCleanerArt } from '@/components/art/PipeCleanerArt';
import { Plus, Check, ArrowRight, Sparkles } from 'lucide-react';

export const FlowerIndexSection: React.FC = () => {
  const [activeFlowerId, setActiveFlowerId] = useState<string>('bunga-tulip');
  const [addedFlowerId, setAddedFlowerId] = useState<string | null>(null);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const activeFlower = BUNGA_LIST.find((f) => f.id === activeFlowerId) || BUNGA_LIST[0];

  const handleAddFlower = (id: string, name: string) => {
    setAddedFlowerId(id);
    setToastMessage(`1x ${name} berhasil ditambahkan ke racikan buket!`);
    
    setTimeout(() => setAddedFlowerId(null), 1500);
    setTimeout(() => setToastMessage(null), 4000);

    // Dispatch global event for the custom builder in Section 5
    window.dispatchEvent(new CustomEvent('mest:add-stem', { detail: { id, name } }));
  };

  const scrollToBuilder = () => {
    const builderElem = document.getElementById('custom-builder');
    if (builderElem) {
      builderElem.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id="pricelist-bunga" className="relative py-24 px-4 sm:px-6 md:px-12 lg:px-20 overflow-hidden border-t border-[#E5D0F6]/60">
      <div className="mx-auto max-w-7xl">
        {/* Header with Title & Fixed Floating Starburst Sticker */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-6 pb-12 border-b border-[#E5D0F6]">
          <div>
            <div className="inline-flex items-center gap-2 text-xs font-bold tracking-widest text-[#D81B60] uppercase">
              <span>MIX & MATCH PER TANGKAI 🌸✨️</span>
            </div>
            <h2 className="mt-2 font-serif text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight text-[#7B1FA2]">
              PRICE LIST <span className="font-serif italic font-normal text-[#F27EB2]">BUNGA</span>
            </h2>
            <p className="mt-2 text-sm sm:text-base text-[#3B2342]/80 max-w-xl">
              Pilih dan kombinasikan bunga kawat bulu favoritmu sesuka hati. Rangkai sendiri buket impianmu atau pesan satuan buat pajangan manis!
            </p>
          </div>

          {/* Starburst Badge: "NOTE: HARGA BELUM TERMASUK WRAP" — Fixed angled sticker with subtle float, readable text */}
          <div className="relative flex-shrink-0">
            <div className="starburst-badge bg-[#F985B5] px-6 py-5 text-center shadow-lg w-44 sm:w-48 h-44 sm:h-48 flex items-center justify-center transform hover:scale-105 transition-transform duration-300 animate-float">
              <div className="transform -rotate-12 text-white">
                <span className="block text-[10px] tracking-wider uppercase font-semibold">Catatan Penting</span>
                <span className="block text-xs sm:text-sm font-extrabold uppercase leading-tight mt-0.5">
                  NOTE: HARGA BELUM TERMASUK WRAP
                </span>
                <span className="block text-[10px] mt-1 font-mono opacity-90">@mest.fiore</span>
              </div>
            </div>
          </div>
        </div>

        {/* Botanical Index Grid + Large Floating Active Preview */}
        <div className="mt-12 grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          {/* LEFT 7 cols: Editorial Botanical Index (10 Items, Clean Typographic rows) */}
          <div className="lg:col-span-7 space-y-2">
            {BUNGA_LIST.map((flower, idx) => {
              const isCurrent = flower.id === activeFlowerId;
              const isAdded = addedFlowerId === flower.id;
              const numStr = (idx + 1 < 10 ? `0${idx + 1}` : `${idx + 1}`);

              return (
                <div
                  key={flower.id}
                  onMouseEnter={() => setActiveFlowerId(flower.id)}
                  onClick={() => setActiveFlowerId(flower.id)}
                  className={`group flex items-center justify-between rounded-xl px-4 py-3.5 transition-all duration-200 cursor-pointer ${
                    isCurrent
                      ? 'bg-white/90 shadow-sm border border-[#E5D0F6]'
                      : 'hover:bg-white/40 border border-transparent'
                  }`}
                >
                  <div className="flex items-center gap-4">
                    <span className="font-mono text-xs font-bold text-[#7B1FA2]/60">
                      {numStr}
                    </span>
                    <div>
                      <h3 className={`font-serif text-lg sm:text-xl font-bold transition-colors ${
                        isCurrent ? 'text-[#7B1FA2]' : 'text-[#3B2342] group-hover:text-[#7B1FA2]'
                      }`}>
                        {flower.name}
                      </h3>
                      <p className="text-xs text-[#3B2342]/70 hidden sm:block max-w-sm">
                        {flower.description}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <span className="font-mono text-base font-bold text-[#D81B60]">
                      {flower.priceDisplay}
                    </span>

                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        handleAddFlower(flower.id, flower.name);
                      }}
                      className={`inline-flex items-center justify-center rounded-full h-8 w-8 text-xs font-semibold transition-all ${
                        isAdded
                          ? 'bg-[#1C9C3E] text-white scale-110'
                          : 'bg-[#7B1FA2]/10 text-[#7B1FA2] hover:bg-[#7B1FA2] hover:text-white'
                      }`}
                      title={`Tambah ${flower.name} ke keranjang custom`}
                      aria-label={`Tambah ${flower.name} ke keranjang custom`}
                    >
                      {isAdded ? <Check className="h-4 w-4" /> : <Plus className="h-4 w-4" />}
                    </button>
                  </div>
                </div>
              );
            })}
          </div>

          {/* RIGHT 5 cols: Large Floating Botanical Specimen Card */}
          <div className="lg:col-span-5 sticky top-28 flex flex-col items-center justify-center rounded-3xl bg-white/70 p-8 border border-[#E5D0F6] backdrop-blur-md shadow-sm text-center">
            <span className="text-xs font-bold tracking-widest text-[#D81B60] uppercase">
              Botanical Specimen
            </span>

            {/* Large Floating Specimen Visual */}
            <div className="relative my-4 h-56 sm:h-64 w-56 sm:w-64 flex items-center justify-center transition-all duration-300">
              <PipeCleanerArt
                key={activeFlower.id}
                id={activeFlower.id}
                size={230}
                className="w-full h-full object-contain filter drop-shadow-md animate-fade-in"
              />
            </div>

            <h3 className="font-serif text-2xl sm:text-3xl font-bold text-[#7B1FA2]">
              {activeFlower.name}
            </h3>
            <span className="mt-1 font-mono text-xl font-bold text-[#D81B60]">
              {activeFlower.priceDisplay}
            </span>
            <p className="mt-3 text-xs sm:text-sm text-[#3B2342]/80 leading-relaxed max-w-xs">
              {activeFlower.description}
            </p>

            <div className="mt-6 flex flex-col sm:flex-row items-center gap-3 w-full max-w-xs">
              <button
                onClick={() => handleAddFlower(activeFlower.id, activeFlower.name)}
                className="w-full inline-flex items-center justify-center gap-2 rounded-full bg-[#7B1FA2] px-5 py-2.5 text-xs sm:text-sm font-semibold text-white shadow-md hover:bg-[#6A1B9A] transition-all hover:scale-105"
              >
                <Plus className="h-4 w-4" />
                <span>Tambah ke Buketku</span>
              </button>

              <button
                onClick={scrollToBuilder}
                className="w-full inline-flex items-center justify-center gap-1.5 rounded-full bg-white/80 border border-[#E5D0F6] px-4 py-2 text-xs font-medium text-[#7B1FA2] hover:bg-white transition-all"
              >
                <span>Buka Studio</span>
                <ArrowRight className="h-3.5 w-3.5" />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Floating Gentle Toast Notification when Flower Added */}
      {toastMessage && (
        <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 flex items-center gap-3 rounded-full bg-[#3B2342] text-white px-5 py-3 shadow-2xl backdrop-blur-md border border-[#F27EB2]/40 animate-fade-in max-w-[90vw]">
          <Sparkles className="h-4 w-4 text-[#F27EB2] flex-shrink-0 animate-pulse" />
          <span className="text-xs sm:text-sm font-medium truncate">{toastMessage}</span>
          <button
            onClick={scrollToBuilder}
            className="flex-shrink-0 inline-flex items-center gap-1 rounded-full bg-[#7B1FA2] px-3 py-1 text-xs font-semibold text-white hover:bg-[#6A1B9A] transition-colors"
          >
            <span>Lihat Studio</span>
            <ArrowRight className="h-3 w-3" />
          </button>
        </div>
      )}
    </section>
  );
};
