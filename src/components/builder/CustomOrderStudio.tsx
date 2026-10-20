import React, { useState, useEffect } from 'react';
import {
  BUCKET_LIST,
  BUNGA_LIST,
  GANTUNGAN_LIST,
  WRAP_OPTIONS,
  COD_LOCATIONS,
  BRAND_INFO,
} from '@/data/mestFioreData';
import { PipeCleanerArt } from '@/components/art/PipeCleanerArt';
import { formatRupiah } from '@/lib/utils';
import { Plus, Minus, Send, Sparkles, Trash2, ShoppingBag, Copy, Check } from 'lucide-react';
import confetti from 'canvas-confetti';

export const CustomOrderStudio: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'stems' | 'bucket' | 'keychain'>('stems');
  const [copied, setCopied] = useState<boolean>(false);

  // Quantities state
  const [stemQuantities, setStemQuantities] = useState<Record<string, number>>({
    'bunga-lily': 1,
    'bunga-tulip': 1,
  });
  const [bucketQuantities, setBucketQuantities] = useState<Record<string, number>>({});
  const [keychainQuantities, setKeychainQuantities] = useState<Record<string, number>>({});

  // Additional options
  const [selectedWrapId, setSelectedWrapId] = useState<string>('wrap-mini');
  const [selectedCodLocation, setSelectedCodLocation] = useState<string>(COD_LOCATIONS[0]);
  const [customNotes, setCustomNotes] = useState<string>('Request warna tulip biru elektrik, wrap pastel lilac, dan pita satin pink');
  const [customerName, setCustomerName] = useState<string>('');

  // Listen to external add events from Section 4
  useEffect(() => {
    const handleAddStemEvent = (e: Event) => {
      const customEvent = e as CustomEvent<{ id: string; name: string }>;
      if (customEvent.detail && customEvent.detail.id) {
        const id = customEvent.detail.id;
        setStemQuantities((prev) => ({
          ...prev,
          [id]: (prev[id] || 0) + 1,
        }));
      }
    };

    window.addEventListener('mest:add-stem', handleAddStemEvent);
    return () => window.removeEventListener('mest:add-stem', handleAddStemEvent);
  }, []);

  // Handlers for stem quantities
  const updateStemQty = (id: string, delta: number) => {
    setStemQuantities((prev) => {
      const current = prev[id] || 0;
      const next = Math.max(0, current + delta);
      if (next === 0) {
        const copy = { ...prev };
        delete copy[id];
        return copy;
      }
      return { ...prev, [id]: next };
    });
  };

  // Handlers for bucket quantities
  const updateBucketQty = (id: string, delta: number) => {
    setBucketQuantities((prev) => {
      const current = prev[id] || 0;
      const next = Math.max(0, current + delta);
      if (next === 0) {
        const copy = { ...prev };
        delete copy[id];
        return copy;
      }
      return { ...prev, [id]: next };
    });
  };

  // Handlers for keychain quantities
  const updateKeychainQty = (id: string, delta: number) => {
    setKeychainQuantities((prev) => {
      const current = prev[id] || 0;
      const next = Math.max(0, current + delta);
      if (next === 0) {
        const copy = { ...prev };
        delete copy[id];
        return copy;
      }
      return { ...prev, [id]: next };
    });
  };

  // Clear all items
  const handleReset = () => {
    setStemQuantities({});
    setBucketQuantities({});
    setKeychainQuantities({});
  };

  // Category item counts
  const stemCount = Object.values(stemQuantities).reduce((a, b) => a + b, 0);
  const bucketCount = Object.values(bucketQuantities).reduce((a, b) => a + b, 0);
  const keychainCount = Object.values(keychainQuantities).reduce((a, b) => a + b, 0);

  // Calculation of totals
  const totalStemsCost = Object.entries(stemQuantities).reduce((sum, [id, qty]) => {
    const item = BUNGA_LIST.find((b) => b.id === id);
    return sum + (item ? item.numericPrice * qty : 0);
  }, 0);

  const totalBucketsCost = Object.entries(bucketQuantities).reduce((sum, [id, qty]) => {
    const item = BUCKET_LIST.find((b) => b.id === id);
    return sum + (item ? item.numericPrice * qty : 0);
  }, 0);

  const totalKeychainsCost = Object.entries(keychainQuantities).reduce((sum, [id, qty]) => {
    const item = GANTUNGAN_LIST.find((g) => g.id === id);
    return sum + (item ? item.numericPrice * qty : 0);
  }, 0);

  // Wrap cost applies if stems are chosen and a wrap is selected
  const hasStems = Object.keys(stemQuantities).length > 0;
  const chosenWrap = WRAP_OPTIONS.find((w) => w.id === selectedWrapId) || WRAP_OPTIONS[0];
  const wrapCost = hasStems ? chosenWrap.price : 0;

  const grandTotal = totalStemsCost + wrapCost + totalBucketsCost + totalKeychainsCost;
  const totalItemCount = stemCount + bucketCount + keychainCount;

  // WhatsApp message generation
  const buildOrderSummaryText = () => {
    let orderLines: string[] = [];

    // Buckets
    Object.entries(bucketQuantities).forEach(([id, qty]) => {
      const item = BUCKET_LIST.find((b) => b.id === id);
      if (item) {
        orderLines.push(`• ${qty}x ${item.name} (${item.priceDisplay}) = ${formatRupiah(item.numericPrice * qty)}`);
      }
    });

    // Stems
    Object.entries(stemQuantities).forEach(([id, qty]) => {
      const item = BUNGA_LIST.find((b) => b.id === id);
      if (item) {
        orderLines.push(`• ${qty}x ${item.name} (${item.priceDisplay}) = ${formatRupiah(item.numericPrice * qty)}`);
      }
    });

    if (hasStems && chosenWrap.price > 0) {
      orderLines.push(`• Opsi Wrap: ${chosenWrap.name} (${formatRupiah(chosenWrap.price)})`);
    }

    // Keychains
    Object.entries(keychainQuantities).forEach(([id, qty]) => {
      const item = GANTUNGAN_LIST.find((g) => g.id === id);
      if (item) {
        orderLines.push(`• ${qty}x Gantungan ${item.name} (${item.priceDisplay}) = ${formatRupiah(item.numericPrice * qty)}`);
      }
    });

    const itemsSummary = orderLines.length > 0 ? orderLines.join('\n') : '• (Belum memilih item, ingin konsultasi custom)';

    return [
      `Halo Kak Admin @mest.fiore! 🎀🌷`,
      `Saya ingin memesan rangkaian bunga / gantungan kawat bulu kustom dengan rincian berikut:`,
      ``,
      `📋 RINCIAN PESANAN:`,
      itemsSummary,
      ``,
      `🎨 REQUEST WARNA & DESAIN:`,
      customNotes.trim() ? `"${customNotes.trim()}"` : `Bebas / Rekomendasi Admin`,
      ``,
      `📍 TITIK COD / PENGAMBILAN:`,
      selectedCodLocation,
      customerName.trim() ? `\n👤 Pemesan: ${customerName.trim()}` : ``,
      ``,
      `💰 ESTIMASI TOTAL: ${formatRupiah(grandTotal)}`,
      ``,
      `Apakah slot pesanan untuk jadwal ini masih ada kak? Terima kasih! ✨`,
    ].join('\n');
  };

  const generateWhatsAppMessage = () => {
    const text = buildOrderSummaryText();
    return `https://wa.me/${BRAND_INFO.whatsappNumber}?text=${encodeURIComponent(text)}`;
  };

  const handleCopyOrder = async () => {
    try {
      await navigator.clipboard.writeText(buildOrderSummaryText());
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    } catch {
      // fallback
    }
  };

  const handleOrderSubmit = () => {
    confetti({
      particleCount: 50,
      spread: 60,
      origin: { y: 0.8 },
      colors: ['#F27EB2', '#7B1FA2', '#E5D0F6', '#FAF3FC'],
    });
  };

  return (
    <section id="custom-builder" className="relative py-24 px-4 sm:px-6 md:px-12 lg:px-20 overflow-hidden border-t border-[#E5D0F6]/60">
      <div className="mx-auto max-w-7xl">
        {/* Section Header: Rata Tengah Editorial */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-2 text-xs font-bold tracking-widest text-[#D81B60] uppercase">
            <span>✨ STUDIO MIX & MATCH • FRONTEND ONLY ✨</span>
          </div>

          <h2 className="font-serif text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight text-[#7B1FA2]">
            Make Your Own Desain
          </h2>

          <p className="font-serif italic text-xl sm:text-2xl text-[#F27EB2]">
            Kombinasikan Tangkai Bunga, Opsi Wrap & Gantungan Favoritmu
          </p>

          <p className="text-sm sm:text-base text-[#3B2342]/80 leading-relaxed">
            Hitung total estimasi secara real-time dan kirimkan ringkasan pesanan ke WhatsApp resmi @mest.fiore hanya dengan sekali klik!
          </p>
        </div>

        {/* Split View Clean Studio Container */}
        <div className="mt-12 grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* LEFT 7 cols: Interactive Catalog Pickers */}
          <div className="lg:col-span-7 rounded-3xl bg-white/80 p-6 sm:p-8 border border-[#E5D0F6] shadow-sm backdrop-blur-md">
            {/* Mode Switcher Tabs with Count Badges */}
            <div className="flex border-b border-[#E5D0F6] pb-4 gap-2 overflow-x-auto">
              <button
                onClick={() => setActiveTab('stems')}
                className={`flex items-center gap-2 rounded-full px-5 py-2.5 text-xs sm:text-sm font-semibold transition-all whitespace-nowrap ${
                  activeTab === 'stems'
                    ? 'bg-[#7B1FA2] text-white shadow-md'
                    : 'bg-[#FAF3FC] text-[#3B2342] hover:bg-[#E5D0F6]/60'
                }`}
              >
                <span>🌸 Rangkai Per Tangkai (1K - 8K)</span>
                {stemCount > 0 && (
                  <span className={`rounded-full px-2 py-0.5 text-[11px] font-bold ${activeTab === 'stems' ? 'bg-white text-[#7B1FA2]' : 'bg-[#7B1FA2] text-white'}`}>
                    {stemCount}
                  </span>
                )}
              </button>

              <button
                onClick={() => setActiveTab('bucket')}
                className={`flex items-center gap-2 rounded-full px-5 py-2.5 text-xs sm:text-sm font-semibold transition-all whitespace-nowrap ${
                  activeTab === 'bucket'
                    ? 'bg-[#7B1FA2] text-white shadow-md'
                    : 'bg-[#FAF3FC] text-[#3B2342] hover:bg-[#E5D0F6]/60'
                }`}
              >
                <span>🌷 Paket Bucket Jadi (10K - 25K)</span>
                {bucketCount > 0 && (
                  <span className={`rounded-full px-2 py-0.5 text-[11px] font-bold ${activeTab === 'bucket' ? 'bg-white text-[#7B1FA2]' : 'bg-[#7B1FA2] text-white'}`}>
                    {bucketCount}
                  </span>
                )}
              </button>

              <button
                onClick={() => setActiveTab('keychain')}
                className={`flex items-center gap-2 rounded-full px-5 py-2.5 text-xs sm:text-sm font-semibold transition-all whitespace-nowrap ${
                  activeTab === 'keychain'
                    ? 'bg-[#7B1FA2] text-white shadow-md'
                    : 'bg-[#FAF3FC] text-[#3B2342] hover:bg-[#E5D0F6]/60'
                }`}
              >
                <span>🎀 Gantungan Custom (3K - 8K)</span>
                {keychainCount > 0 && (
                  <span className={`rounded-full px-2 py-0.5 text-[11px] font-bold ${activeTab === 'keychain' ? 'bg-white text-[#7B1FA2]' : 'bg-[#7B1FA2] text-white'}`}>
                    {keychainCount}
                  </span>
                )}
              </button>
            </div>

            {/* Tab 1: Stems Selection (10 items) */}
            {activeTab === 'stems' && (
              <div className="mt-6 space-y-6">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold uppercase tracking-wider text-[#7B1FA2]">
                    Pilih Jumlah Tangkai Bunga:
                  </span>
                  <span className="text-xs text-[#D81B60] font-semibold">
                    Note: Harga bunga belum termasuk wrap
                  </span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {BUNGA_LIST.map((stem) => {
                    const qty = stemQuantities[stem.id] || 0;
                    return (
                      <div
                        key={stem.id}
                        className={`flex items-center justify-between rounded-2xl p-3 border transition-all ${
                          qty > 0
                            ? 'bg-[#FAF3FC] border-[#7B1FA2]'
                            : 'bg-white/60 border-[#E5D0F6]/80 hover:border-[#E5D0F6]'
                        }`}
                      >
                        <div className="flex items-center gap-3">
                          <div className="h-12 w-12 flex-shrink-0">
                            <PipeCleanerArt id={stem.id} size={48} />
                          </div>
                          <div>
                            <h4 className="font-serif text-base font-bold text-[#7B1FA2]">
                              {stem.name}
                            </h4>
                            <span className="font-mono text-xs font-bold text-[#D81B60]">
                              {stem.priceDisplay}
                            </span>
                          </div>
                        </div>

                        <div className="flex items-center gap-1.5">
                          {qty > 0 && (
                            <button
                              onClick={() => updateStemQty(stem.id, -1)}
                              className="h-8 w-8 inline-flex items-center justify-center rounded-full bg-white text-[#7B1FA2] hover:bg-[#E5D0F6] border border-[#E5D0F6] transition-all"
                              aria-label={`Kurangi ${stem.name}`}
                            >
                              <Minus className="h-4 w-4" />
                            </button>
                          )}
                          <span className={`w-7 text-center font-mono text-sm font-bold ${qty > 0 ? 'text-[#7B1FA2]' : 'text-[#3B2342]/40'}`}>
                            {qty}
                          </span>
                          <button
                            onClick={() => updateStemQty(stem.id, 1)}
                            className="h-8 w-8 inline-flex items-center justify-center rounded-full bg-[#7B1FA2] text-white hover:bg-[#6A1B9A] transition-all shadow-sm"
                            aria-label={`Tambah ${stem.name}`}
                          >
                            <Plus className="h-4 w-4" />
                          </button>
                        </div>
                      </div>
                    );
                  })}
                </div>

                {/* Wrapping Options for Stems */}
                <div className="pt-4 border-t border-[#E5D0F6]">
                  <span className="text-xs font-bold uppercase tracking-wider text-[#7B1FA2]">
                    Pilih Opsi Wrapping Buket:
                  </span>

                  <div className="mt-3 grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {WRAP_OPTIONS.map((wrap) => {
                      const isSelected = selectedWrapId === wrap.id;
                      return (
                        <div
                          key={wrap.id}
                          onClick={() => setSelectedWrapId(wrap.id)}
                          className={`cursor-pointer rounded-2xl p-3.5 border transition-all ${
                            isSelected
                              ? 'bg-[#FAF3FC] border-[#7B1FA2] shadow-sm ring-1 ring-[#7B1FA2]'
                              : 'bg-white/60 border-[#E5D0F6]/80 hover:bg-white'
                          }`}
                        >
                          <div className="flex items-center justify-between">
                            <h5 className="font-medium text-xs sm:text-sm text-[#3B2342]">
                              {wrap.name}
                            </h5>
                            <span className="font-mono text-xs font-bold text-[#7B1FA2]">
                              {wrap.price > 0 ? `+${formatRupiah(wrap.price)}` : 'Gratis'}
                            </span>
                          </div>
                          <p className="mt-1 text-[11px] text-[#3B2342]/70 leading-snug">
                            {wrap.description}
                          </p>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>
            )}

            {/* Tab 2: Preset Bucket Selection */}
            {activeTab === 'bucket' && (
              <div className="mt-6 space-y-4">
                <span className="text-xs font-bold uppercase tracking-wider text-[#7B1FA2]">
                  Pilih Paket Buket Jadi (Sudah Termasuk Wrapping & Pita):
                </span>

                <div className="space-y-3">
                  {BUCKET_LIST.map((bucket) => {
                    const qty = bucketQuantities[bucket.id] || 0;
                    return (
                      <div
                        key={bucket.id}
                        className={`flex items-center justify-between rounded-2xl p-4 border transition-all ${
                          qty > 0
                            ? 'bg-[#FAF3FC] border-[#7B1FA2] shadow-sm'
                            : 'bg-white/60 border-[#E5D0F6]/80 hover:bg-white'
                        }`}
                      >
                        <div className="flex items-center gap-4">
                          <div className="h-16 w-16 flex-shrink-0">
                            <PipeCleanerArt id={bucket.id} size={64} />
                          </div>
                          <div>
                            <div className="flex items-center gap-2">
                              <h4 className="font-serif text-lg font-bold text-[#7B1FA2]">
                                {bucket.name}
                              </h4>
                              <span className="text-[11px] rounded-full bg-[#E5D0F6] px-2 py-0.5 text-[#7B1FA2] font-semibold">
                                {bucket.badge}
                              </span>
                            </div>
                            <span className="font-mono text-sm font-bold text-[#D81B60]">
                              {bucket.priceDisplay}
                            </span>
                            <p className="mt-1 text-xs text-[#3B2342]/75 max-w-md hidden sm:block">
                              {bucket.description}
                            </p>
                          </div>
                        </div>

                        <div className="flex items-center gap-1.5">
                          {qty > 0 && (
                            <button
                              onClick={() => updateBucketQty(bucket.id, -1)}
                              className="h-8 w-8 inline-flex items-center justify-center rounded-full bg-white text-[#7B1FA2] hover:bg-[#E5D0F6] border border-[#E5D0F6] transition-all"
                              aria-label={`Kurangi ${bucket.name}`}
                            >
                              <Minus className="h-4 w-4" />
                            </button>
                          )}
                          <span className={`w-7 text-center font-mono text-sm font-bold ${qty > 0 ? 'text-[#7B1FA2]' : 'text-[#3B2342]/40'}`}>
                            {qty}
                          </span>
                          <button
                            onClick={() => updateBucketQty(bucket.id, 1)}
                            className="h-8 w-8 inline-flex items-center justify-center rounded-full bg-[#7B1FA2] text-white hover:bg-[#6A1B9A] transition-all shadow-sm"
                            aria-label={`Tambah ${bucket.name}`}
                          >
                            <Plus className="h-4 w-4" />
                          </button>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}

            {/* Tab 3: Keychain Selection */}
            {activeTab === 'keychain' && (
              <div className="mt-6 space-y-4">
                <span className="text-xs font-bold uppercase tracking-wider text-[#7B1FA2]">
                  Pilih Koleksi Gantungan Kawat Bulu:
                </span>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {GANTUNGAN_LIST.map((keychain) => {
                    const qty = keychainQuantities[keychain.id] || 0;
                    return (
                      <div
                        key={keychain.id}
                        className={`flex items-center justify-between rounded-2xl p-3 border transition-all ${
                          qty > 0
                            ? 'bg-[#FAF3FC] border-[#7B1FA2]'
                            : 'bg-white/60 border-[#E5D0F6]/80 hover:border-[#E5D0F6]'
                        }`}
                      >
                        <div className="flex items-center gap-3">
                          <div className="h-12 w-12 flex-shrink-0">
                            <PipeCleanerArt id={keychain.id} size={48} />
                          </div>
                          <div>
                            <h4 className="font-serif text-base font-bold text-[#7B1FA2]">
                              {keychain.name}
                            </h4>
                            <span className="font-mono text-xs font-bold text-[#D81B60]">
                              {keychain.priceDisplay}
                            </span>
                          </div>
                        </div>

                        <div className="flex items-center gap-1.5">
                          {qty > 0 && (
                            <button
                              onClick={() => updateKeychainQty(keychain.id, -1)}
                              className="h-8 w-8 inline-flex items-center justify-center rounded-full bg-white text-[#7B1FA2] hover:bg-[#E5D0F6] border border-[#E5D0F6] transition-all"
                              aria-label={`Kurangi ${keychain.name}`}
                            >
                              <Minus className="h-4 w-4" />
                            </button>
                          )}
                          <span className={`w-7 text-center font-mono text-sm font-bold ${qty > 0 ? 'text-[#7B1FA2]' : 'text-[#3B2342]/40'}`}>
                            {qty}
                          </span>
                          <button
                            onClick={() => updateKeychainQty(keychain.id, 1)}
                            className="h-8 w-8 inline-flex items-center justify-center rounded-full bg-[#7B1FA2] text-white hover:bg-[#6A1B9A] transition-all shadow-sm"
                            aria-label={`Tambah ${keychain.name}`}
                          >
                            <Plus className="h-4 w-4" />
                          </button>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}

            {/* Custom Notes & COD Location inputs */}
            <div className="mt-8 pt-6 border-t border-[#E5D0F6] space-y-4">
              <div>
                <label htmlFor="custom-notes" className="block text-xs font-bold uppercase tracking-wider text-[#7B1FA2] mb-1">
                  Catatan Kustomisasi Warna / Foto Idol:
                </label>
                <textarea
                  id="custom-notes"
                  value={customNotes}
                  onChange={(e) => setCustomNotes(e.target.value)}
                  placeholder="Contoh: Tulip biru elektrik, pita lilac, idol bucket foto Karina aespa"
                  rows={2}
                  className="w-full rounded-2xl border border-[#E5D0F6] bg-white/70 px-4 py-2.5 text-xs sm:text-sm text-[#3B2342] placeholder-[#3B2342]/40 focus:border-[#7B1FA2] focus:bg-white focus:outline-none focus:ring-1 focus:ring-[#7B1FA2]"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="cod-location" className="block text-xs font-bold uppercase tracking-wider text-[#7B1FA2] mb-1">
                    Titik Temu COD Jatinangor:
                  </label>
                  <select
                    id="cod-location"
                    value={selectedCodLocation}
                    onChange={(e) => setSelectedCodLocation(e.target.value)}
                    className="w-full rounded-2xl border border-[#E5D0F6] bg-white/70 px-4 py-2 text-xs sm:text-sm text-[#3B2342] focus:border-[#7B1FA2] focus:bg-white focus:outline-none focus:ring-1 focus:ring-[#7B1FA2]"
                  >
                    {COD_LOCATIONS.map((loc) => (
                      <option key={loc} value={loc}>
                        {loc}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label htmlFor="customer-name" className="block text-xs font-bold uppercase tracking-wider text-[#7B1FA2] mb-1">
                    Nama Kamu (Opsional):
                  </label>
                  <input
                    id="customer-name"
                    type="text"
                    value={customerName}
                    onChange={(e) => setCustomerName(e.target.value)}
                    placeholder="Nama panggilan kamu"
                    className="w-full rounded-2xl border border-[#E5D0F6] bg-white/70 px-4 py-2 text-xs sm:text-sm text-[#3B2342] placeholder-[#3B2342]/40 focus:border-[#7B1FA2] focus:bg-white focus:outline-none focus:ring-1 focus:ring-[#7B1FA2]"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* RIGHT 5 cols: Live Order Summary & WhatsApp Redirect Studio */}
          <div className="lg:col-span-5 sticky top-28 rounded-3xl bg-white/90 p-6 sm:p-8 border-2 border-[#E5D0F6] shadow-lg backdrop-blur-md">
            <div className="flex items-center justify-between border-b border-[#E5D0F6] pb-4">
              <div className="flex items-center gap-2">
                <ShoppingBag className="h-5 w-5 text-[#7B1FA2]" />
                <h3 className="font-serif text-xl sm:text-2xl font-bold text-[#7B1FA2]">
                  Ringkasan Pesanan
                </h3>
              </div>

              {totalItemCount > 0 && (
                <button
                  onClick={handleReset}
                  className="inline-flex items-center gap-1 text-xs text-[#E11D48] hover:underline"
                  title="Kosongkan keranjang"
                >
                  <Trash2 className="h-3.5 w-3.5" />
                  <span>Reset</span>
                </button>
              )}
            </div>

            {/* Selected items breakdown with quick inline adjustment buttons */}
            <div className="mt-4 max-h-64 overflow-y-auto space-y-2 pr-1">
              {totalItemCount === 0 ? (
                <div className="py-8 text-center text-[#3B2342]/60">
                  <span className="text-3xl">🧺</span>
                  <p className="mt-2 text-xs sm:text-sm">
                    Belum ada item yang dipilih. Klik tombol (+) di katalog sebelah kiri untuk mulai merangkai!
                  </p>
                </div>
              ) : (
                <>
                  {/* Buckets in list */}
                  {Object.entries(bucketQuantities).map(([id, qty]) => {
                    const item = BUCKET_LIST.find((b) => b.id === id);
                    if (!item) return null;
                    return (
                      <div key={id} className="flex items-center justify-between text-xs py-2 border-b border-[#E5D0F6]/50">
                        <div className="flex items-center gap-2">
                          <div className="flex items-center gap-1">
                            <button
                              onClick={() => updateBucketQty(id, -1)}
                              className="h-5 w-5 rounded-full bg-[#E5D0F6]/60 text-[#7B1FA2] hover:bg-[#E5D0F6] flex items-center justify-center font-bold"
                              title="Kurang 1"
                            >
                              -
                            </button>
                            <span className="font-mono font-bold text-[#7B1FA2] w-4 text-center">{qty}</span>
                            <button
                              onClick={() => updateBucketQty(id, 1)}
                              className="h-5 w-5 rounded-full bg-[#E5D0F6]/60 text-[#7B1FA2] hover:bg-[#E5D0F6] flex items-center justify-center font-bold"
                              title="Tambah 1"
                            >
                              +
                            </button>
                          </div>
                          <span className="text-[#3B2342] font-medium truncate max-w-[140px] sm:max-w-[180px]">
                            {item.name}
                          </span>
                        </div>
                        <span className="font-mono font-bold text-[#7B1FA2]">
                          {formatRupiah(item.numericPrice * qty)}
                        </span>
                      </div>
                    );
                  })}

                  {/* Stems in list */}
                  {Object.entries(stemQuantities).map(([id, qty]) => {
                    const item = BUNGA_LIST.find((b) => b.id === id);
                    if (!item) return null;
                    return (
                      <div key={id} className="flex items-center justify-between text-xs py-2 border-b border-[#E5D0F6]/50">
                        <div className="flex items-center gap-2">
                          <div className="flex items-center gap-1">
                            <button
                              onClick={() => updateStemQty(id, -1)}
                              className="h-5 w-5 rounded-full bg-[#E5D0F6]/60 text-[#7B1FA2] hover:bg-[#E5D0F6] flex items-center justify-center font-bold"
                              title="Kurang 1"
                            >
                              -
                            </button>
                            <span className="font-mono font-bold text-[#7B1FA2] w-4 text-center">{qty}</span>
                            <button
                              onClick={() => updateStemQty(id, 1)}
                              className="h-5 w-5 rounded-full bg-[#E5D0F6]/60 text-[#7B1FA2] hover:bg-[#E5D0F6] flex items-center justify-center font-bold"
                              title="Tambah 1"
                            >
                              +
                            </button>
                          </div>
                          <span className="text-[#3B2342] font-medium truncate max-w-[140px] sm:max-w-[180px]">
                            {item.name} <span className="text-[11px] text-[#D81B60]">({item.priceDisplay})</span>
                          </span>
                        </div>
                        <span className="font-mono font-bold text-[#7B1FA2]">
                          {formatRupiah(item.numericPrice * qty)}
                        </span>
                      </div>
                    );
                  })}

                  {/* Wrap row */}
                  {hasStems && (
                    <div className="flex items-center justify-between text-xs py-2 border-b border-[#E5D0F6]/50 bg-[#FAF3FC]/40 px-2 rounded-lg">
                      <span className="text-[#3B2342] font-medium truncate max-w-[200px]">
                        Opsi Wrap: {chosenWrap.name}
                      </span>
                      <span className="font-mono font-bold text-[#7B1FA2]">
                        {chosenWrap.price > 0 ? formatRupiah(chosenWrap.price) : 'Gratis'}
                      </span>
                    </div>
                  )}

                  {/* Keychains in list */}
                  {Object.entries(keychainQuantities).map(([id, qty]) => {
                    const item = GANTUNGAN_LIST.find((g) => g.id === id);
                    if (!item) return null;
                    return (
                      <div key={id} className="flex items-center justify-between text-xs py-2 border-b border-[#E5D0F6]/50">
                        <div className="flex items-center gap-2">
                          <div className="flex items-center gap-1">
                            <button
                              onClick={() => updateKeychainQty(id, -1)}
                              className="h-5 w-5 rounded-full bg-[#E5D0F6]/60 text-[#7B1FA2] hover:bg-[#E5D0F6] flex items-center justify-center font-bold"
                              title="Kurang 1"
                            >
                              -
                            </button>
                            <span className="font-mono font-bold text-[#7B1FA2] w-4 text-center">{qty}</span>
                            <button
                              onClick={() => updateKeychainQty(id, 1)}
                              className="h-5 w-5 rounded-full bg-[#E5D0F6]/60 text-[#7B1FA2] hover:bg-[#E5D0F6] flex items-center justify-center font-bold"
                              title="Tambah 1"
                            >
                              +
                            </button>
                          </div>
                          <span className="text-[#3B2342] font-medium truncate max-w-[140px] sm:max-w-[180px]">
                            Gantungan {item.name}
                          </span>
                        </div>
                        <span className="font-mono font-bold text-[#7B1FA2]">
                          {formatRupiah(item.numericPrice * qty)}
                        </span>
                      </div>
                    );
                  })}
                </>
              )}
            </div>

            {/* Total Calculation */}
            <div className="mt-6 pt-4 border-t-2 border-[#E5D0F6] space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-xs uppercase tracking-wider text-[#3B2342]/70 font-semibold">
                  Total Estimasi Harga:
                </span>
                <span className="font-mono text-2xl font-bold text-[#7B1FA2]">
                  {formatRupiah(grandTotal)}
                </span>
              </div>
              <p className="text-[11px] text-[#3B2342]/60 leading-snug">
                *Harga final dapat disesuaikan kembali dengan detail aksen atau kartu ucapan khusus saat konfirmasi chat.
              </p>
            </div>

            {/* Action Buttons: WhatsApp Direct & Copy Format */}
            <div className="mt-6 space-y-2.5">
              <a
                href={generateWhatsAppMessage()}
                target="_blank"
                rel="noopener noreferrer"
                onClick={handleOrderSubmit}
                className="group relative flex w-full items-center justify-center gap-3 rounded-full bg-[#1C9C3E] px-6 py-4 text-sm font-bold text-white shadow-md hover:bg-[#15803d] hover:shadow-lg transition-all hover:scale-[1.02] focus:outline-none focus:ring-2 focus:ring-[#1C9C3E]"
              >
                <Send className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                <span>Pesan Rangkaian Ini via WhatsApp (@mest.fiore)</span>
                <span className="text-base">↗</span>
              </a>

              <button
                type="button"
                onClick={handleCopyOrder}
                className="flex w-full items-center justify-center gap-2 rounded-full border border-[#E5D0F6] bg-white/70 py-2.5 text-xs font-semibold text-[#7B1FA2] hover:bg-white transition-colors"
              >
                {copied ? (
                  <>
                    <Check className="h-3.5 w-3.5 text-[#1C9C3E]" />
                    <span className="text-[#1C9C3E]">Rincian Pesanan Berhasil Disalin!</span>
                  </>
                ) : (
                  <>
                    <Copy className="h-3.5 w-3.5" />
                    <span>Salin Rincian Chat Pesanan</span>
                  </>
                )}
              </button>

              <div className="mt-2 flex items-center justify-center gap-2 text-[11px] text-[#3B2342]/70">
                <Sparkles className="h-3.5 w-3.5 text-[#D81B60]" />
                <span>Pesan otomatis tersusun rapi langsung ke admin @mest.fiore</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Floating Sticky Mobile Order Bar */}
      {totalItemCount > 0 && (
        <div className="lg:hidden fixed bottom-4 inset-x-3 sm:inset-x-6 z-40 animate-fade-in">
          <div className="flex items-center justify-between rounded-full bg-[#3B2342]/95 backdrop-blur-md px-5 py-3 text-white shadow-2xl border border-[#F27EB2]/40">
            <div className="flex flex-col">
              <span className="text-[11px] text-[#FAF3FC]/80">{totalItemCount} item dirangkai</span>
              <span className="font-mono text-base font-bold text-[#FAD9EC]">{formatRupiah(grandTotal)}</span>
            </div>
            <a
              href={generateWhatsAppMessage()}
              target="_blank"
              rel="noopener noreferrer"
              onClick={handleOrderSubmit}
              className="inline-flex items-center gap-1.5 rounded-full bg-[#1C9C3E] px-4 py-2 text-xs font-bold text-white shadow-md hover:bg-[#15803d] active:scale-95 transition-all"
            >
              <span>Pesan via WA</span>
              <Send className="h-3.5 w-3.5" />
            </a>
          </div>
        </div>
      )}
    </section>
  );
};
