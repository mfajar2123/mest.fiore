import { useMemo, useState, useEffect } from 'react';
import {
  BUCKET_LIST,
  BUNGA_LIST,
  COD_LOCATIONS,
  GANTUNGAN_LIST,
  WRAP_OPTIONS,
  BRAND_INFO,
  type ProductItem,
} from '@/data/mestFioreData';
import { formatRupiah } from '@/lib/utils';
import { PipeCleanerArt } from '@/components/art/PipeCleanerArt';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Copy, Check, MessageCircle, RotateCcw } from 'lucide-react';
import confetti from 'canvas-confetti';

type Tab = 'stems' | 'bucket' | 'keychain';
type Quantities = Record<string, number>;

function adjust(
  setter: React.Dispatch<React.SetStateAction<Quantities>>,
  id: string,
  change: number
) {
  setter((current) => {
    const next = Math.max(0, (current[id] ?? 0) + change);
    if (next === 0) {
      const copy = { ...current };
      delete copy[id];
      return copy;
    }
    return { ...current, [id]: next };
  });
}

function Picker({
  items,
  quantities,
  onChange,
}: {
  items: ProductItem[];
  quantities: Quantities;
  onChange: (id: string, change: number) => void;
}) {
  return (
    <div className="order-items">
      {items.map((item) => {
        const qty = quantities[item.id] ?? 0;
        return (
          <div
            className={`order-item transition-all duration-200 ${
              qty > 0 ? 'border-purple-300 bg-white ring-1 ring-purple-200/60 shadow-sm' : ''
            }`}
            key={item.id}
          >
            <div className="flex items-center gap-3.5">
              <div
                className="w-12 h-12 rounded-xl bg-purple-50/80 flex items-center justify-center shrink-0 border border-purple-100 overflow-hidden"
                aria-hidden="true"
              >
                {item.image ? (
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-full h-full object-cover"
                    loading="lazy"
                  />
                ) : (
                  <PipeCleanerArt id={item.id} size={38} />
                )}
              </div>
              <div>
                <strong>{item.name}</strong>
                <span>{item.priceDisplay}</span>
              </div>
            </div>

            <div className="quantity">
              <Button
                type="button"
                variant="outline"
                size="icon"
                aria-label={`Kurangi ${item.name}`}
                disabled={qty === 0}
                onClick={() => onChange(item.id, -1)}
              >
                −
              </Button>
              <output aria-label={`Jumlah ${item.name}`}>{qty}</output>
              <Button
                type="button"
                variant="outline"
                size="icon"
                aria-label={`Tambah ${item.name}`}
                onClick={() => onChange(item.id, 1)}
              >
                +
              </Button>
            </div>
          </div>
        );
      })}
    </div>
  );
}

export function OrderStudio() {
  const [tab, setTab] = useState<Tab>('stems');
  const [stems, setStems] = useState<Quantities>({});
  const [buckets, setBuckets] = useState<Quantities>({});
  const [keychains, setKeychains] = useState<Quantities>({});
  const [wrapId, setWrapId] = useState('wrap-none');
  const [location, setLocation] = useState(COD_LOCATIONS[0]);
  const [name, setName] = useState('');
  const [note, setNote] = useState('');
  const [copied, setCopied] = useState(false);

  // URL / Session preselection hydration
  useEffect(() => {
    try {
      const params = new URLSearchParams(window.location.search);
      const targetItem =
        params.get('item') || sessionStorage.getItem('mest_selected_item');
      const targetCat =
        params.get('cat') || sessionStorage.getItem('mest_selected_category');

      if (targetItem) {
        if (targetCat === 'bucket' || BUCKET_LIST.some((b) => b.id === targetItem)) {
          setTab('bucket');
          setBuckets((prev) => ({ ...prev, [targetItem]: Math.max(1, prev[targetItem] || 1) }));
        } else if (targetCat === 'gantungan' || GANTUNGAN_LIST.some((g) => g.id === targetItem)) {
          setTab('keychain');
          setKeychains((prev) => ({ ...prev, [targetItem]: Math.max(1, prev[targetItem] || 1) }));
        } else if (BUNGA_LIST.some((f) => f.id === targetItem)) {
          setTab('stems');
          setStems((prev) => ({ ...prev, [targetItem]: Math.max(1, prev[targetItem] || 1) }));
        }
        sessionStorage.removeItem('mest_selected_item');
        sessionStorage.removeItem('mest_selected_category');
      }
    } catch {
      // Ignore URL/sessionStorage errors
    }
  }, []);

  const selectedWrap =
    WRAP_OPTIONS.find((wrap) => wrap.id === wrapId) ?? WRAP_OPTIONS[0];
  const allLists = [BUCKET_LIST, BUNGA_LIST, GANTUNGAN_LIST];

  const itemCost = (quantities: Quantities) =>
    Object.entries(quantities).reduce(
      (total, [id, quantity]) =>
        total +
        (allLists.flat().find((item) => item.id === id)?.numericPrice ?? 0) *
          quantity,
      0
    );

  const hasStems = Object.keys(stems).length > 0;
  const wrapCost = hasStems ? selectedWrap.price : 0;
  const total = itemCost(stems) + itemCost(buckets) + itemCost(keychains) + wrapCost;
  const totalItems = Object.values({ ...stems, ...buckets, ...keychains }).reduce(
    (sum, quantity) => sum + quantity,
    0
  );

  const stemsCount = Object.values(stems).reduce((a, b) => a + b, 0);
  const bucketsCount = Object.values(buckets).reduce((a, b) => a + b, 0);
  const keychainsCount = Object.values(keychains).reduce((a, b) => a + b, 0);

  const lines = useMemo(
    () => [
      ...Object.entries(buckets).map(
        ([id, qty]) =>
          `${qty}x ${BUCKET_LIST.find((item) => item.id === id)?.name}`
      ),
      ...Object.entries(stems).map(
        ([id, qty]) =>
          `${qty}x ${BUNGA_LIST.find((item) => item.id === id)?.name}`
      ),
      ...Object.entries(keychains).map(
        ([id, qty]) =>
          `${qty}x ${GANTUNGAN_LIST.find((item) => item.id === id)?.name}`
      ),
    ],
    [buckets, stems, keychains]
  );

  const formattedOrderMessage = useMemo(() => {
    return [
      'Halo admin Mestiere Fiolet, aku mau pesan:',
      name.trim() ? `Nama: ${name.trim()}` : '',
      ...lines,
      hasStems ? `Wrap: ${selectedWrap.name}` : '',
      `Estimasi: ${formatRupiah(total)}`,
      `Pengambilan: ${location}`,
      note.trim() ? `Request: ${note.trim()}` : '',
      'Mohon konfirmasi ketersediaan dan harga final ya. Terima kasih!',
    ]
      .filter(Boolean)
      .join('\n');
  }, [name, lines, hasStems, selectedWrap.name, total, location, note]);

  const whatsappHref = useMemo(() => {
    return `https://wa.me/${BRAND_INFO.whatsappNumber}?${new URLSearchParams({
      text: formattedOrderMessage,
    }).toString()}`;
  }, [formattedOrderMessage]);

  const handleCopyOrder = async () => {
    try {
      await navigator.clipboard.writeText(formattedOrderMessage);
      setCopied(true);
      confetti({ particleCount: 35, spread: 50, origin: { y: 0.85 } });
      setTimeout(() => setCopied(false), 2400);
    } catch {
      // Fallback
    }
  };

  const handleWhatsAppClick = () => {
    if (totalItems > 0) {
      confetti({ particleCount: 45, spread: 60, origin: { y: 0.8 } });
    }
  };

  const tabData: Record<
    Tab,
    {
      label: string;
      badgeCount: number;
      items: ProductItem[];
      quantities: Quantities;
      setter: React.Dispatch<React.SetStateAction<Quantities>>;
    }
  > = {
    stems: {
      label: 'Bunga satuan',
      badgeCount: stemsCount,
      items: BUNGA_LIST,
      quantities: stems,
      setter: setStems,
    },
    bucket: {
      label: 'Paket buket',
      badgeCount: bucketsCount,
      items: BUCKET_LIST,
      quantities: buckets,
      setter: setBuckets,
    },
    keychain: {
      label: 'Gantungan',
      badgeCount: keychainsCount,
      items: GANTUNGAN_LIST,
      quantities: keychains,
      setter: setKeychains,
    },
  };

  const tabKeys = Object.keys(tabData) as Tab[];

  return (
    <section className="order-studio" aria-label="Rangkai pesanan">
      <Tabs
        value={tab}
        onValueChange={(value) => setTab(value as Tab)}
        className="order-tabs-root"
      >
        <TabsList className="order-tabs" aria-label="Kategori pesanan">
          {tabKeys.map((key) => {
            const count = tabData[key].badgeCount;
            return (
              <TabsTrigger key={key} value={key}>
                <span>{tabData[key].label}</span>
                {count > 0 && (
                  <span className="ml-1.5 px-2 py-0.5 rounded-full bg-pink-100 text-pink-700 text-xs font-bold">
                    {count}
                  </span>
                )}
              </TabsTrigger>
            );
          })}
        </TabsList>

        <div className="order-grid">
          <div>
            {tabKeys.map((key) => (
              <TabsContent key={key} value={key} className="order-panel">
                <h2>{tabData[key].label}</h2>
                <p className="order-helper">
                  Atur jumlah yang kamu mau. Harga ini adalah estimasi sebelum admin mengonfirmasi pesanan.
                </p>
                <Picker
                  items={tabData[key].items}
                  quantities={tabData[key].quantities}
                  onChange={(id, change) =>
                    adjust(tabData[key].setter, id, change)
                  }
                />

                {key === 'stems' && (
                  <div className="mt-6 p-4 rounded-xl bg-purple-50/60 border border-purple-100">
                    <label className="field mt-0">
                      <span>Pilihan Wrapping (Khusus Bunga Satuan)</span>
                      <select
                        value={wrapId}
                        onChange={(event) => setWrapId(event.target.value)}
                      >
                        {WRAP_OPTIONS.map((wrap) => (
                          <option key={wrap.id} value={wrap.id}>
                            {wrap.name} — {formatRupiah(wrap.price)}
                          </option>
                        ))}
                      </select>
                    </label>
                    <p className="text-xs text-muted-foreground mt-2">
                      💡 {selectedWrap.description}
                    </p>
                  </div>
                )}
              </TabsContent>
            ))}
          </div>

          <aside className="order-summary" id="ringkasan-pesanan">
            <p className="summary-label">Ringkasan pesanan</p>
            <strong className="summary-total">{formatRupiah(total)}</strong>
            <p className="muted text-sm">
              {totalItems ? `${totalItems} item dipilih` : 'Belum ada item dipilih'}
            </p>

            <div className="summary-lines" aria-live="polite">
              {lines.length ? (
                lines.map((line) => (
                  <div key={line} className="flex justify-between items-center py-0.5">
                    <span>{line}</span>
                  </div>
                ))
              ) : (
                <span>Mulai dari kategori di sebelah kiri.</span>
              )}
              {hasStems && selectedWrap.price > 0 && (
                <div className="flex justify-between items-center py-0.5 text-xs text-purple-800 font-semibold">
                  <span>Wrap: {selectedWrap.name}</span>
                  <span>+{formatRupiah(selectedWrap.price)}</span>
                </div>
              )}
            </div>

            <label className="field">
              <span>Nama panggilan (opsional)</span>
              <input
                value={name}
                onChange={(event) => setName(event.target.value.slice(0, 60))}
                maxLength={60}
                placeholder="Contoh: Fajar"
                autoComplete="name"
              />
            </label>

            <label className="field">
              <span>Ambil atau COD</span>
              <select
                value={location}
                onChange={(event) => setLocation(event.target.value)}
              >
                {COD_LOCATIONS.map((place) => (
                  <option key={place}>{place}</option>
                ))}
              </select>
            </label>

            <label className="field">
              <span>Warna atau request (opsional)</span>
              <textarea
                value={note}
                onChange={(event) => setNote(event.target.value.slice(0, 300))}
                maxLength={300}
                rows={3}
                placeholder="Contoh: tulip ungu, wrap putih, pita pink"
              />
            </label>

            <div className="flex flex-col gap-2 mt-5">
              <Button
                asChild
                className="summary-action w-full min-h-[48px] bg-emerald-600 hover:bg-emerald-700 text-white shadow-md hover:shadow-lg transition-all"
              >
                <a
                  href={whatsappHref}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={handleWhatsAppClick}
                >
                  <MessageCircle className="w-4 h-4 mr-1 inline-block" aria-hidden="true" />
                  Kirim ke WhatsApp <span aria-hidden="true">→</span>
                </a>
              </Button>

              <Button
                type="button"
                variant="outline"
                className="w-full min-h-[44px] flex items-center justify-center gap-2 border-line hover:border-plum text-sm font-semibold"
                onClick={handleCopyOrder}
              >
                {copied ? (
                  <>
                    <Check className="w-4 h-4 text-emerald-600" aria-hidden="true" />
                    <span>Rincian Tersalin!</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-4 h-4 text-muted-foreground" aria-hidden="true" />
                    <span>Salin Rincian Pesanan</span>
                  </>
                )}
              </Button>
            </div>

            <Button
              className="reset-order"
              variant="link"
              type="button"
              onClick={() => {
                setStems({});
                setBuckets({});
                setKeychains({});
                setWrapId('wrap-none');
                setName('');
                setNote('');
              }}
            >
              <RotateCcw className="w-3.5 h-3.5 mr-1 inline-block" aria-hidden="true" />
              Reset pilihan
            </Button>
          </aside>
        </div>
      </Tabs>
    </section>
  );
}
