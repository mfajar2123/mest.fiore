import React, { useState, useEffect } from 'react';
import { X, BookOpen } from 'lucide-react';
import { BUCKET_LIST, BUNGA_LIST, GANTUNGAN_LIST } from '@/data/mestFioreData';
import { PipeCleanerArt } from '@/components/art/PipeCleanerArt';

export const OriginalPosterModal: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<'bunga' | 'gantungan' | 'bucket'>('bunga');

  // Close on escape key (R-32)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        setIsOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen]);

  // Lock body scroll when modal is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        className="group relative inline-flex items-center gap-2 rounded-full bg-white/80 px-5 py-2.5 text-sm font-semibold text-[#7B1FA2] shadow-sm backdrop-blur-md transition-all hover:bg-white hover:shadow-md hover:scale-105 border border-[#E5D0F6]"
        aria-label="Lihat Lembar Katalog Asli @mest.fiore"
      >
        <BookOpen className="h-4 w-4 text-[#F27EB2] transition-transform group-hover:rotate-12" />
        <span>Lihat Lembar Katalog Asli @mest.fiore</span>
        <span className="flex h-2 w-2 rounded-full bg-[#F27EB2] animate-pulse" />
      </button>

      {isOpen && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label="Katalog Asli Mestiere Fiolet"
          className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/40 backdrop-blur-sm animate-fade-in"
        >
          {/* Backdrop click to close */}
          <div
            className="absolute inset-0 cursor-pointer"
            onClick={() => setIsOpen(false)}
            aria-hidden="true"
          />

          {/* Modal Container */}
          <div className="relative z-10 flex max-h-[90vh] w-full max-w-4xl flex-col overflow-hidden rounded-3xl bg-[#FAF3FC] border-2 border-[#E5D0F6] shadow-2xl">
            {/* Header */}
            <div className="flex items-center justify-between border-b border-[#E5D0F6] bg-white/60 px-6 py-4 backdrop-blur-md">
              <div className="flex items-center gap-3">
                <span className="text-xl">🌸</span>
                <div>
                  <h3 className="font-serif text-xl font-bold text-[#7B1FA2]">
                    Katalog Asli @mest.fiore
                  </h3>
                  <p className="text-xs text-[#3B2342]/70">
                    Lembar referensi resmi price list Mestiere Fiolet Jatinangor
                  </p>
                </div>
              </div>

              <button
                onClick={() => setIsOpen(false)}
                className="rounded-full p-2 text-[#3B2342]/60 hover:bg-[#E5D0F6]/50 hover:text-[#3B2342] transition-colors focus:outline-none focus:ring-2 focus:ring-[#7B1FA2]"
                aria-label="Tutup katalog"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            {/* Poster Tabs */}
            <div className="flex border-b border-[#E5D0F6] bg-[#FAF3FC]/80 px-6 pt-3 gap-2 overflow-x-auto">
              <button
                onClick={() => setActiveTab('bunga')}
                className={`relative pb-3 px-4 font-serif text-base font-bold transition-colors whitespace-nowrap ${
                  activeTab === 'bunga'
                    ? 'text-[#7B1FA2]'
                    : 'text-[#3B2342]/60 hover:text-[#7B1FA2]'
                }`}
              >
                Poster 1: Price List Bunga (1K - 8K)
                {activeTab === 'bunga' && (
                  <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#7B1FA2] rounded-full" />
                )}
              </button>

              <button
                onClick={() => setActiveTab('gantungan')}
                className={`relative pb-3 px-4 font-serif text-base font-bold transition-colors whitespace-nowrap ${
                  activeTab === 'gantungan'
                    ? 'text-[#7B1FA2]'
                    : 'text-[#3B2342]/60 hover:text-[#7B1FA2]'
                }`}
              >
                Poster 2: Price List Gantungan (3K - 8K)
                {activeTab === 'gantungan' && (
                  <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#7B1FA2] rounded-full" />
                )}
              </button>

              <button
                onClick={() => setActiveTab('bucket')}
                className={`relative pb-3 px-4 font-serif text-base font-bold transition-colors whitespace-nowrap ${
                  activeTab === 'bucket'
                    ? 'text-[#7B1FA2]'
                    : 'text-[#3B2342]/60 hover:text-[#7B1FA2]'
                }`}
              >
                Poster 3: Open Order Bucket (10K - 25K)
                {activeTab === 'bucket' && (
                  <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#7B1FA2] rounded-full" />
                )}
              </button>
            </div>

            {/* Poster Sheet View */}
            <div className="flex-1 overflow-y-auto p-6 bg-gradient-to-br from-[#FAF3FC] via-[#FAD9EC]/30 to-[#E5D0F6]/40">
              {activeTab === 'bunga' && (
                <div className="relative mx-auto max-w-2xl rounded-2xl bg-white/80 p-6 md:p-8 shadow-sm border border-[#E5D0F6]">
                  {/* Poster Header */}
                  <div className="text-center pb-6">
                    <p className="text-xs uppercase tracking-widest text-[#F27EB2] font-semibold">
                      MAKE YOUR OWN DESAIN • FREE CUSTOM • @MEST.FIORE
                    </p>
                    <h4 className="mt-1 font-serif text-3xl font-bold tracking-tight text-[#7B1FA2]">
                      PRICE LIST <span className="font-serif italic font-normal text-[#F27EB2]">BUNGA</span>
                    </h4>
                  </div>

                  {/* Starburst badge */}
                  <div className="my-3 flex justify-center">
                    <div className="starburst-badge bg-[#F985B5] px-6 py-3 text-center text-xs font-bold text-white shadow-md">
                      NOTE: HARGA BELUM TERMASUK WRAP
                    </div>
                  </div>

                  {/* 10 Items Grid */}
                  <div className="mt-6 grid grid-cols-2 sm:grid-cols-3 gap-4">
                    {BUNGA_LIST.map((item) => (
                      <div
                        key={item.id}
                        className="flex flex-col items-center rounded-xl bg-white/70 p-3 border border-[#E5D0F6]/80 text-center"
                      >
                        <div className="h-20 w-20">
                          <PipeCleanerArt id={item.id} size={80} />
                        </div>
                        <h5 className="mt-2 font-serif text-base font-bold text-[#7B1FA2]">
                          {item.name}
                        </h5>
                        <span className="mt-0.5 font-mono text-sm font-bold text-[#F27EB2]">
                          {item.priceDisplay}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {activeTab === 'gantungan' && (
                <div className="relative mx-auto max-w-2xl rounded-2xl bg-white/80 p-6 md:p-8 shadow-sm border border-[#E5D0F6]">
                  <div className="text-center pb-6">
                    <p className="text-xs uppercase tracking-widest text-[#F27EB2] font-semibold">
                      MAKE YOUR OWN DESAIN • WITH CUSTOM • START FROM 3K
                    </p>
                    <h4 className="mt-1 font-serif text-3xl font-bold tracking-tight text-[#7B1FA2]">
                      PRICE LIST <span className="font-serif italic font-normal text-[#F27EB2]">GANTUNGAN</span>
                    </h4>
                  </div>

                  <div className="mt-4 grid grid-cols-2 sm:grid-cols-3 gap-4">
                    {GANTUNGAN_LIST.map((item) => (
                      <div
                        key={item.id}
                        className="flex flex-col items-center rounded-xl bg-white/70 p-3 border border-[#E5D0F6]/80 text-center"
                      >
                        <div className="h-20 w-20">
                          <PipeCleanerArt id={item.id} size={80} />
                        </div>
                        <h5 className="mt-2 font-serif text-base font-bold text-[#7B1FA2]">
                          {item.name}
                        </h5>
                        <span className="mt-0.5 font-mono text-sm font-bold text-[#F27EB2]">
                          {item.priceDisplay}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {activeTab === 'bucket' && (
                <div className="relative mx-auto max-w-2xl rounded-2xl bg-white/80 p-6 md:p-8 shadow-sm border border-[#E5D0F6]">
                  <div className="text-center pb-6">
                    <p className="text-xs uppercase tracking-widest text-[#F27EB2] font-semibold">
                      MAKE YOUR OWN DESAIN • FREE CUSTOM • START FROM 10K
                    </p>
                    <h4 className="mt-1 font-serif text-3xl font-bold tracking-tight text-[#7B1FA2]">
                      OPEN ORDER <span className="font-serif italic font-normal text-[#F27EB2]">BUCKET</span>
                    </h4>
                  </div>

                  <div className="mt-4 grid grid-cols-1 sm:grid-cols-3 gap-4">
                    {BUCKET_LIST.map((item) => (
                      <div
                        key={item.id}
                        className="flex flex-col items-center rounded-xl bg-white/70 p-4 border border-[#E5D0F6]/80 text-center"
                      >
                        <div className="h-28 w-28">
                          <PipeCleanerArt id={item.id} size={110} />
                        </div>
                        <h5 className="mt-3 font-serif text-lg font-bold text-[#7B1FA2]">
                          {item.name}
                        </h5>
                        <span className="mt-1 rounded-full bg-[#E5D0F6]/60 px-3 py-1 font-mono text-xs font-bold text-[#7B1FA2]">
                          {item.priceDisplay}
                        </span>
                        <p className="mt-2 text-xs text-[#3B2342]/80 leading-relaxed">
                          {item.description}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Footer with quick action */}
            <div className="border-t border-[#E5D0F6] bg-white/60 px-6 py-4 flex flex-col sm:flex-row items-center justify-between gap-3">
              <span className="text-xs text-[#3B2342]/70">
                Pemesanan & custom request langsung via WhatsApp @mest.fiore Jatinangor
              </span>
              <button
                onClick={() => setIsOpen(false)}
                className="w-full sm:w-auto rounded-full bg-[#7B1FA2] px-6 py-2 text-xs font-semibold text-white shadow-sm hover:bg-[#6A1B9A] transition-colors"
              >
                Tutup & Lanjut Rangkai
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
