import React, { useState } from 'react';
import { BUCKET_LIST } from '@/data/mestFioreData';
import { PipeCleanerArt } from '@/components/art/PipeCleanerArt';
import { withBase } from '@/lib/paths';

export const BucketStorySection: React.FC = () => {
  const [selectedBucket, setSelectedBucket] = useState<string>('bucket-single');

  const activeItem = BUCKET_LIST.find((b) => b.id === selectedBucket) || BUCKET_LIST[0];

  return (
    <section id="bucket-story" className="relative py-24 px-4 sm:px-6 md:px-12 lg:px-20 overflow-hidden border-t border-[#E5D0F6]/60">
      <div className="mx-auto max-w-7xl">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          {/* LEFT 50%: Left-Aligned Editorial Typography */}
          <div className="lg:col-span-7 text-left space-y-6">
            <div className="inline-flex items-center gap-2 text-xs font-bold tracking-widest text-[#F27EB2] uppercase">
              <span className="h-1.5 w-6 bg-[#F27EB2] rounded-full"></span>
              <span>OPEN ORDER • BUCKET 🌷✨️</span>
            </div>

            <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-[#7B1FA2] leading-[1.15]">
              Dari Single Flower 10K Sampai Idol Bucket Bias Favoritmu.
            </h2>

            <p className="text-base sm:text-lg text-[#3B2342]/85 leading-relaxed max-w-2xl">
              Siapa bilang buket cantik harus mahal? Mulai dari 10K aja kamu udah bisa dapetin Single Flower Bucket dengan wrapping iridescent yang super dreamy. Pengen kasih kejutan unik buat temen K-Popers atau wisudaan? Pesan Idol Bucket mulai 25K: lengkap sama foto cut-out dan bunga kawat bulu yang awet dipajang di kosan selamanya!
            </p>

            {/* Frameless Interactive List (Tanpa Kotak Kaku) */}
            <div className="pt-4 space-y-4">
              {BUCKET_LIST.map((item, index) => {
                const isSelected = item.id === selectedBucket;
                const indexNumber = `0${index + 1}`;

                return (
                  <div
                    key={item.id}
                    onClick={() => setSelectedBucket(item.id)}
                    onMouseEnter={() => setSelectedBucket(item.id)}
                    className={`group cursor-pointer rounded-2xl p-4 sm:p-5 transition-all duration-300 ${
                      isSelected
                        ? 'bg-white/80 shadow-md border-l-4 border-l-[#7B1FA2] border-t border-r border-b border-[#E5D0F6]'
                        : 'bg-transparent hover:bg-white/40 border-l-4 border-l-transparent'
                    }`}
                  >
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                      <div className="flex items-baseline gap-3">
                        <span className={`font-mono text-sm font-bold ${isSelected ? 'text-[#7B1FA2]' : 'text-[#3B2342]/40'}`}>
                          {indexNumber}
                        </span>
                        <h3 className={`font-serif text-xl sm:text-2xl font-bold transition-colors ${isSelected ? 'text-[#7B1FA2]' : 'text-[#3B2342] group-hover:text-[#7B1FA2]'}`}>
                          {item.name}
                        </h3>
                      </div>

                      <div className="flex items-center gap-2">
                        <span className="font-serif italic text-base sm:text-lg font-bold text-[#F27EB2]">
                          {item.priceDisplay}
                        </span>
                        <span className={`text-xs px-2.5 py-0.5 rounded-full font-medium ${isSelected ? 'bg-[#E5D0F6] text-[#7B1FA2]' : 'bg-transparent text-transparent group-hover:bg-[#E5D0F6]/50 group-hover:text-[#7B1FA2]'}`}>
                          {item.badge}
                        </span>
                      </div>
                    </div>

                    <p className={`mt-2 text-xs sm:text-sm leading-relaxed transition-opacity ${isSelected ? 'text-[#3B2342]/80 opacity-100' : 'text-[#3B2342]/60 opacity-80'}`}>
                      {item.description}
                    </p>
                  </div>
                );
              })}
            </div>

            <div className="pt-4">
              <a
                href={withBase('/rangkai/')}
                className="inline-flex items-center gap-2 text-sm font-bold text-[#7B1FA2] hover:text-[#F27EB2] transition-colors group"
              >
                <span>Pilih paket ini & atur kustomisasi warna di WhatsApp</span>
                <span className="transition-transform group-hover:translate-x-1">→</span>
              </a>
            </div>
          </div>

          {/* RIGHT 50%: Large Frameless Visual Crossfade & Floating Depth */}
          <div className="lg:col-span-5 relative flex items-center justify-center min-h-[380px] sm:min-h-[460px]">
            {/* Ambient Background Aura Circle */}
            <div className="absolute h-72 w-72 sm:h-96 sm:w-96 rounded-full bg-gradient-to-tr from-[#E5D0F6]/80 via-[#FAD9EC]/70 to-[#DCE5FA]/80 blur-2xl -z-10 animate-pulse-subtle" />

            {/* Frameless floating visual container */}
            <div className="relative flex flex-col items-center justify-center p-6 text-center">
              <div className="relative w-64 sm:w-80 h-72 sm:h-96 flex items-center justify-center transition-all duration-500 transform hover:scale-105">
                <PipeCleanerArt
                  key={activeItem.id}
                  id={activeItem.id}
                  size={320}
                  className="w-full h-full object-contain filter drop-shadow-2xl animate-fade-in"
                />
              </div>

              {/* Floating aesthetic pill badge */}
              <div className="mt-4 inline-flex items-center gap-2 rounded-full bg-white/90 px-5 py-2 shadow-sm border border-[#E5D0F6]">
                <span className="h-2 w-2 rounded-full" style={{ backgroundColor: activeItem.accentColor }} />
                <span className="font-serif text-sm font-bold text-[#7B1FA2]">
                  {activeItem.name}
                </span>
                <span className="text-xs text-[#3B2342]/60">•</span>
                <span className="font-mono text-xs font-bold text-[#F27EB2]">
                  {activeItem.priceDisplay}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
