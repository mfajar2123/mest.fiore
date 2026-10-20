import React, { useState } from 'react';
import { FAQ_ITEMS, BRAND_INFO } from '@/data/mestFioreData';
import { ChevronDown, MapPin, MessageCircle, Clock, Heart } from 'lucide-react';

export const FooterFaqSection: React.FC = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggleFaq = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <footer id="studio-faq" className="relative pt-24 pb-12 px-4 sm:px-6 md:px-12 lg:px-20 overflow-hidden border-t border-[#E5D0F6]/80 bg-white/40 backdrop-blur-sm">
      <div className="mx-auto max-w-7xl">
        {/* Split Grid: Left Studio Info vs Right FAQ Accordion */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start pb-20 border-b border-[#E5D0F6]">
          {/* SISI KIRI (RATA KIRI): Info Studio & Lokasi COD */}
          <div className="lg:col-span-5 text-left space-y-6">
            <div>
              <span className="text-xs font-bold uppercase tracking-widest text-[#F27EB2]">
                ATELIER & COD STUDIO
              </span>
              <h3 className="mt-2 font-serif text-3xl sm:text-4xl font-bold text-[#7B1FA2]">
                Mestiere fiolet 🎀🌷
              </h3>
              <p className="font-serif italic text-lg text-[#F27EB2]">
                Handcrafted Flower Bouquet & Bag Charm Studio
              </p>
            </div>

            <p className="text-sm text-[#3B2342]/85 leading-relaxed">
              Dibuat satu per satu dengan tangan penuh kasih untuk momen kelulusan, sidang skripsi, ulang tahun, atau sekadar hadiah kecil pemanis harimu di Jatinangor.
            </p>

            {/* Studio Badges */}
            <div className="space-y-3 pt-2 text-xs sm:text-sm text-[#3B2342]">
              <div className="flex items-start gap-3">
                <MapPin className="h-5 w-5 text-[#7B1FA2] flex-shrink-0 mt-0.5" />
                <div>
                  <span className="font-bold text-[#7B1FA2]">Lokasi Studio:</span>
                  <p className="text-xs text-[#3B2342]/80 mt-0.5">
                    Jatinangor, Kab. Sumedang (Siap COD Unpad, ITB, IPDN, IKOPIN, Jatos, Ciseke, & Cikuda)
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <Clock className="h-5 w-5 text-[#7B1FA2] flex-shrink-0" />
                <div>
                  <span className="font-bold text-[#7B1FA2]">Jadwal Pemesanan:</span>
                  <span className="ml-2 text-xs text-[#3B2342]/80">Open Order Setiap Hari</span>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <svg className="h-5 w-5 text-[#F27EB2] flex-shrink-0 fill-none stroke-current" viewBox="0 0 24 24" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <rect width="20" height="20" x="2" y="2" rx="5" ry="5"/>
                  <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/>
                  <line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/>
                </svg>
                <a
                  href={BRAND_INFO.instagramUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-bold text-[#7B1FA2] hover:text-[#F27EB2] transition-colors underline"
                >
                  {BRAND_INFO.handle}
                </a>
              </div>

              <div className="flex items-center gap-3">
                <MessageCircle className="h-5 w-5 text-[#1C9C3E] flex-shrink-0" />
                <a
                  href={`https://wa.me/${BRAND_INFO.whatsappNumber}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-bold text-[#1C9C3E] hover:underline"
                >
                  WhatsApp Admin (+62 857-2134-5678)
                </a>
              </div>
            </div>
          </div>

          {/* SISI KANAN (RATA KANAN KE KIRI RESPONSIF): Pertanyaan Populer Mahasiswa */}
          <div className="lg:col-span-7 space-y-4">
            <div className="text-left lg:text-right mb-6">
              <span className="text-xs font-bold uppercase tracking-widest text-[#F27EB2]">
                PERTANYAAN MAHASISWA JATINANGOR
              </span>
              <h3 className="mt-1 font-serif text-2xl sm:text-3xl font-bold text-[#7B1FA2]">
                Frequently Asked Questions
              </h3>
            </div>

            {/* Accordion list */}
            <div className="space-y-3">
              {FAQ_ITEMS.map((faq, index) => {
                const isOpen = openIndex === index;
                return (
                  <div
                    key={index}
                    className={`rounded-2xl border transition-all duration-300 ${
                      isOpen
                        ? 'bg-white/90 border-[#7B1FA2] shadow-sm'
                        : 'bg-white/60 border-[#E5D0F6]/80 hover:bg-white'
                    }`}
                  >
                    <button
                      onClick={() => toggleFaq(index)}
                      className="flex w-full items-center justify-between p-4 sm:p-5 text-left focus:outline-none focus:ring-2 focus:ring-[#7B1FA2] rounded-2xl"
                      aria-expanded={isOpen}
                    >
                      <span className="font-serif text-base sm:text-lg font-bold text-[#7B1FA2] pr-4">
                        {faq.question}
                      </span>
                      <ChevronDown
                        className={`h-5 w-5 text-[#F27EB2] flex-shrink-0 transition-transform duration-300 ${
                          isOpen ? 'rotate-180 text-[#7B1FA2]' : ''
                        }`}
                      />
                    </button>

                    {isOpen && (
                      <div className="px-5 pb-5 pt-1 text-xs sm:text-sm text-[#3B2342]/85 leading-relaxed border-t border-[#E5D0F6]/40">
                        {faq.answer}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Grand Signature Footer with Giant Brand Typography */}
        <div className="pt-16 pb-8 text-center select-none">
          <p className="font-serif italic text-base sm:text-lg text-[#F27EB2] mb-2">
            Mestiere Fiolet • Handmade Flower & Charm Studio
          </p>

          <h2 className="font-serif font-extrabold tracking-widest text-[#7B1FA2]/15 text-4xl sm:text-6xl md:text-8xl lg:text-9xl uppercase transition-colors hover:text-[#7B1FA2]/25">
            MESTIERE FIOLET
          </h2>

          <div className="mt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[#3B2342]/70">
            <p>
              © {new Date().getFullYear()} Mestiere Fiolet (@mest.fiore) Jatinangor. All Rights Reserved.
            </p>
            <p className="flex items-center gap-1">
              Crafted with <Heart className="h-3 w-3 text-[#E11D48] fill-current" /> for Jatinangor College Community
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};
