import React, { useState } from 'react';
import { GANTUNGAN_LIST } from '@/data/mestFioreData';
import { PipeCleanerArt } from '@/components/art/PipeCleanerArt';
import { withBase } from '@/lib/paths';

export const KeychainAtelierSection: React.FC = () => {
  const [activeKeychain, setActiveKeychain] = useState<string>('gantungan-coquette');

  return (
    <section id="keychain-atelier" className="relative py-24 px-4 sm:px-6 md:px-12 lg:px-20 overflow-hidden border-t border-[#E5D0F6]/60">
      <div className="mx-auto max-w-7xl">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          {/* LEFT 50%: Floating Frameless Keychains Showcase */}
          <div className="lg:col-span-5 order-2 lg:order-1 relative flex flex-col items-center justify-center">
            {/* Ambient Background Aura */}
            <div className="absolute h-72 w-72 sm:h-96 sm:w-96 rounded-full bg-gradient-to-br from-[#FAD9EC]/80 via-[#FAF3FC] to-[#E5D0F6]/80 blur-2xl -z-10 animate-pulse-subtle" />

            {/* Main Active Keychain Large Floating Cutout */}
            <div className="relative w-60 sm:w-72 h-64 sm:h-80 flex items-center justify-center transition-all duration-500 transform hover:scale-105">
              <PipeCleanerArt
                key={activeKeychain}
                id={activeKeychain}
                size={260}
                className="w-full h-full object-contain filter drop-shadow-xl animate-fade-in"
              />
            </div>

            {/* Quick interactive thumbnail switchers (Frameless pill strip) */}
            <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
              {GANTUNGAN_LIST.map((item) => {
                const isActive = item.id === activeKeychain;
                return (
                  <button
                    key={item.id}
                    onClick={() => setActiveKeychain(item.id)}
                    className={`flex items-center gap-2 rounded-full px-3.5 py-1.5 text-xs font-semibold transition-all ${
                      isActive
                        ? 'bg-[#7B1FA2] text-white shadow-md scale-105'
                        : 'bg-white/80 text-[#3B2342] hover:bg-white border border-[#E5D0F6]'
                    }`}
                  >
                    <span>{item.name}</span>
                    <span className={`font-mono text-[11px] ${isActive ? 'text-[#FAD9EC]' : 'text-[#F27EB2]'}`}>
                      {item.priceDisplay}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* RIGHT 50%: Strictly Right-Aligned Editorial Typography */}
          <div className="lg:col-span-7 order-1 lg:order-2 text-right space-y-6">
            <div className="inline-flex items-center justify-end gap-2 text-xs font-bold tracking-widest text-[#F27EB2] uppercase">
              <span>PRICE LIST • GANTUNGAN 🎀✨️</span>
              <span className="h-1.5 w-6 bg-[#F27EB2] rounded-full"></span>
            </div>

            <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-[#7B1FA2] leading-[1.15]">
              Gantungan Gemas Mulai 3K Buat Totebag & Kunci Kosan Kamu.
            </h2>

            <p className="text-base sm:text-lg text-[#3B2342]/85 leading-relaxed max-w-2xl ml-auto">
              Bikin tas kuliah kamu makin standout dengan koleksi gantungan handmade dari @mest.fiore. Mau pita Coquette 3K yang simpel, Butterfly 5K, Flower 5K, sampai Cerry & Jellyfish 8K yang super chubby: semuanya bebas kamu custom warna bareng bestie!
            </p>

            {/* Interactive Price Table in Right-Alignment */}
            <div className="pt-4 space-y-3 max-w-xl ml-auto">
              {GANTUNGAN_LIST.map((item) => {
                const isSelected = item.id === activeKeychain;
                return (
                  <div
                    key={item.id}
                    onClick={() => setActiveKeychain(item.id)}
                    onMouseEnter={() => setActiveKeychain(item.id)}
                    className={`group cursor-pointer rounded-2xl p-4 transition-all duration-300 text-right ${
                      isSelected
                        ? 'bg-white/80 shadow-md border-r-4 border-r-[#F27EB2] border-t border-l border-b border-[#E5D0F6]'
                        : 'bg-transparent hover:bg-white/40 border-r-4 border-r-transparent'
                    }`}
                  >
                    <div className="flex items-center justify-end gap-4">
                      <p className="text-xs text-[#3B2342]/70 hidden sm:block max-w-xs">
                        {item.description}
                      </p>
                      <span className="font-mono text-base font-bold text-[#F27EB2]">
                        {item.priceDisplay}
                      </span>
                      <h3 className={`font-serif text-xl font-bold transition-colors ${isSelected ? 'text-[#7B1FA2]' : 'text-[#3B2342] group-hover:text-[#7B1FA2]'}`}>
                        {item.name}
                      </h3>
                    </div>
                  </div>
                );
              })}
            </div>

            <div className="pt-4 flex justify-end">
              <a
                href={withBase('/rangkai/')}
                className="inline-flex items-center gap-2 rounded-full bg-[#F27EB2] px-6 py-2.5 text-sm font-semibold text-white shadow-md hover:bg-[#e0669c] transition-all hover:scale-105"
              >
                <span>Pesan Gantungan Custom Sekarang</span>
                <span>→</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
