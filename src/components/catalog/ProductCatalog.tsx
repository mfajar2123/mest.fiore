import { useState } from 'react';
import { ArrowRight } from 'lucide-react';
import type { ProductItem } from '@/data/mestFioreData';
import { PipeCleanerArt } from '@/components/art/PipeCleanerArt';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { withBase } from '@/lib/paths';

interface Props {
  items: ProductItem[];
  heading: string;
  intro: string;
  actionLabel: string;
}

export function ProductCatalog({ items, heading, intro, actionLabel }: Props) {
  const [selectedId, setSelectedId] = useState(items[0]?.id ?? '');

  if (!items.length) return null;

  const handleSelectProduct = (item: ProductItem) => {
    try {
      sessionStorage.setItem('mest_selected_item', item.id);
      sessionStorage.setItem('mest_selected_category', item.category);
    } catch {
      // Ignore sessionStorage errors
    }
  };

  const moveSelection = (direction: 1 | -1) => {
    const currentIndex = items.findIndex((item) => item.id === selectedId);
    const nextIndex = (currentIndex + direction + items.length) % items.length;
    setSelectedId(items[nextIndex].id);
  };

  return (
    <section className="catalog-shell" aria-labelledby="catalog-heading">
      <div className="catalog-intro">
        <h1 id="catalog-heading">{heading}</h1>
        <p>{intro}</p>
      </div>

      {/* Featured Interactive Selection (Vertical Tabs: Klik list di kiri, hanya 1 kotak aktif di kanan) */}
      <Tabs
        value={selectedId}
        onValueChange={setSelectedId}
        orientation="vertical"
        activationMode="automatic"
        className="catalog-layout"
      >
        <TabsList
          className="catalog-list"
          aria-label={`Pilihan ${heading}`}
          onKeyDown={(event) => {
            if (event.key === 'ArrowDown') moveSelection(1);
            if (event.key === 'ArrowUp') moveSelection(-1);
          }}
        >
          {items.map((item) => (
            <TabsTrigger
              className="catalog-item"
              key={item.id}
              value={item.id}
            >
              <span>{item.name}</span>
              <strong>{item.priceDisplay}</strong>
            </TabsTrigger>
          ))}
        </TabsList>

        <div className="catalog-stage-wrapper">
          {items.map((item) => (
            <TabsContent
              className="product-stage"
              key={item.id}
              value={item.id}
            >
              <div className="product-art" aria-hidden="true">
                {item.image ? (
                  <div className="relative w-full max-w-[320px] aspect-square rounded-2xl overflow-hidden border border-purple-100 bg-white/70 shadow-sm group">
                    <img
                      src={withBase(item.image)}
                      alt={`Foto asli ${item.name}`}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                      loading="eager"
                    />
                  </div>
                ) : (
                  <PipeCleanerArt id={item.id} size={280} />
                )}
              </div>
              <div>
                {item.badge && (
                  <span className="inline-block px-2.5 py-0.5 rounded-md bg-purple-100 text-purple-800 text-xs font-bold mb-2">
                    {item.badge}
                  </span>
                )}
                <p className="product-price">{item.priceDisplay}</p>
                <h2>{item.name}</h2>
                <p>{item.description}</p>
                <Button
                  asChild
                  variant="link"
                  className="text-link strong-link"
                >
                  <a
                    href={withBase('/rangkai/')}
                    onClick={() => handleSelectProduct(item)}
                  >
                    {actionLabel}{' '}
                    <ArrowRight data-icon="inline-end" aria-hidden="true" />
                  </a>
                </Button>
              </div>
            </TabsContent>
          ))}
        </div>
      </Tabs>

      {/* Complete Product Grid: Semua Ukuran Card Fixed & Rapi */}
      <div className="catalog-all-section">
        <h2 className="catalog-all-title">Semua Pilihan Koleksi ({items.length} Item)</h2>
        <div className="catalog-all-grid">
          {items.map((item) => (
            <div key={item.id} className="catalog-card">
              <div className="catalog-card-art" aria-hidden="true">
                {item.image ? (
                  <div className="relative w-full h-full overflow-hidden rounded-lg group">
                    <img
                      src={withBase(item.image)}
                      alt={item.name}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                      loading="lazy"
                    />
                  </div>
                ) : (
                  <PipeCleanerArt id={item.id} size={150} />
                )}
              </div>
              <div className="catalog-card-body">
                <span className="product-price">{item.priceDisplay}</span>
                <h3>{item.name}</h3>
                <p>{item.description}</p>
                <div className="catalog-card-footer">
                  <a
                    href={withBase('/rangkai/')}
                    className="button button-small w-full text-center"
                    onClick={() => handleSelectProduct(item)}
                  >
                    Rangkai pesanan <span aria-hidden="true">→</span>
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
