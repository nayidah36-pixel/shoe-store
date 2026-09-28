'use client';

import { useEffect, useMemo, useState } from 'react';
import shoeData from '@/data/shoes.json';
import Header from '@/components/Header';
import Hero from '@/components/Hero';
import TrustBar from '@/components/TrustBar';
import CategoryGrid from '@/components/CategoryGrid';
import BestSellers from '@/components/BestSellers';
import PromoBanners from '@/components/PromoBanners';
import Footer from '@/components/Footer';
import CartDrawer from '@/components/CartDrawer';
import { CartItem, Shoe } from '@/types/shoe';
import { formatPrice } from '@/lib/whatsapp';

export default function Home() {
  const shoes = shoeData as Shoe[];

  // ─── State ───────────────────────────────────────
  const [cart, setCart] = useState<CartItem[]>([]);
  const [cartHydrated, setCartHydrated] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [search, setSearch] = useState('');
  const [genderFilter, setGenderFilter] = useState('');
  const [saleOnly, setSaleOnly] = useState(false);
  const [selectedShoe, setSelectedShoe] = useState<Shoe | null>(null);
  const [chosenSize, setChosenSize] = useState<number | null>(null);

  // ─── Effects ─────────────────────────────────────
  // Load cart from localStorage on mount
  useEffect(() => {
    try {
      const saved = localStorage.getItem('stepstyle_cart');
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length > 0) {
          setCart(parsed);
        }
      }
    } catch (e) {
      console.error('Cart load failed', e);
    }
    setCartHydrated(true);
  }, []);

  // Save cart — only after hydration so we don't overwrite on first render
  useEffect(() => {
    if (!cartHydrated) return;
    localStorage.setItem('stepstyle_cart', JSON.stringify(cart));
  }, [cart, cartHydrated]);

  // ─── Derived data ────────────────────────────────
  const filteredShoes = useMemo(() => {
    const q = search.toLowerCase().trim();
    return shoes.filter((s) => {
      const matchSearch =
        !q ||
        s.name.toLowerCase().includes(q) ||
        s.brand.toLowerCase().includes(q);
      const matchGender = !genderFilter || s.gender === genderFilter;
      const matchSale = !saleOnly || s.price <= 100;
      return matchSearch && matchGender && matchSale;
    });
  }, [shoes, search, genderFilter, saleOnly]);

  // ─── Handlers ────────────────────────────────────
  const handleUpdateQuantity = (id: string, size: number, delta: number) => {
    setCart((prev) =>
      prev
        .map((item) => {
          if (item.shoe.id === id && item.selectedSize === size) {
            const q = item.quantity + delta;
            return q > 0 ? { ...item, quantity: q } : null;
          }
          return item;
        })
        .filter(Boolean) as CartItem[]
    );
  };

  const handleRemove = (id: string, size: number) =>
    setCart((prev) =>
      prev.filter((i) => !(i.shoe.id === id && i.selectedSize === size))
    );

  const openSizePicker = (shoe: Shoe) => {
    setSelectedShoe(shoe);
    setChosenSize(shoe.sizes[0]);
  };

  const confirmAddToCart = () => {
    if (!selectedShoe || chosenSize === null) return;
    setCart((prev) => {
      const existing = prev.find(
        (i) => i.shoe.id === selectedShoe.id && i.selectedSize === chosenSize
      );
      if (existing) {
        return prev.map((i) =>
          i.shoe.id === selectedShoe.id && i.selectedSize === chosenSize
            ? { ...i, quantity: i.quantity + 1 }
            : i
        );
      }
      return [
        ...prev,
        { shoe: selectedShoe, selectedSize: chosenSize, quantity: 1 },
      ];
    });
    setSelectedShoe(null);
    setIsCartOpen(true);
  };

  const handleNavClick = (value: string) => {
    setGenderFilter('');
    setSaleOnly(false);
    setSearch('');

    if (value === '') return;
    if (value === 'Men' || value === 'Women' || value === 'Kids') {
      setGenderFilter(value);
    } else if (value === '__sale__') {
      setSaleOnly(true);
    }

    setTimeout(() => {
      document
        .getElementById('results')
        ?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }, 50);
  };

  const clearFilters = () => {
    setSearch('');
    setGenderFilter('');
    setSaleOnly(false);
  };

  // ─── Render ──────────────────────────────────────
  return (
    <div className="min-h-screen bg-[#f8f9fa]">
      <Header
        cartCount={cart.reduce((s, i) => s + i.quantity, 0)}
        search={search}
        onSearchChange={setSearch}
        onCartClick={() => setIsCartOpen(true)}
        onNavClick={handleNavClick}
      />

      <Hero />
      <TrustBar />
      <CategoryGrid />
      <BestSellers onSelect={openSizePicker} />
      <PromoBanners />

      {/* Results */}
      <section id="results" className="max-w-[1400px] mx-auto px-4 mt-14">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-bold text-gray-900">
            {search
              ? `Results for "${search}"`
              : genderFilter
              ? `${genderFilter}'s Shoes`
              : saleOnly
              ? 'On Sale'
              : 'All Products'}
          </h2>
          <span className="text-xs text-gray-500">
            {filteredShoes.length}{' '}
            {filteredShoes.length === 1 ? 'result' : 'results'}
          </span>
        </div>

        {filteredShoes.length === 0 ? (
          <div className="bg-white rounded-xl border border-gray-100 py-16 text-center">
            <p className="text-gray-500 text-sm mb-2">
              No shoes match your filters.
            </p>
            <button
              onClick={clearFilters}
              className="text-brand font-bold text-sm hover:underline"
            >
              Clear filters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {filteredShoes.map((shoe) => (
              <div
                key={shoe.id}
                onClick={() => openSizePicker(shoe)}
                className="bg-white rounded-xl border border-gray-100 p-3 hover:shadow-lg transition cursor-pointer group"
              >
                <div className="aspect-square rounded-lg bg-gray-50 overflow-hidden mb-3">
                  <img
                    src={shoe.image}
                    alt={shoe.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition"
                  />
                </div>
                <h3 className="text-sm font-bold text-gray-900 line-clamp-1">
                  {shoe.brand} {shoe.name}
                </h3>
                <p className="text-[11px] text-gray-500 mb-1">
                  {shoe.gender} · {shoe.category}
                </p>
                <div className="flex items-center gap-1 mb-1">
                  <span className="text-brand text-xs">
                    {'★'.repeat(Math.round(shoe.rating || 4))}
                  </span>
                  <span className="text-[11px] text-gray-500">
                    ({shoe.rating})
                  </span>
                </div>
                <p className="text-base font-bold text-gray-900">
                  {formatPrice(shoe.price)}
                </p>
              </div>
            ))}
          </div>
        )}
      </section>

      <Footer />

      {/* Size picker modal */}
      {selectedShoe && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4">
          <div className="bg-white rounded-2xl max-w-md w-full p-6 shadow-2xl">
            <h3 className="font-bold mb-1">
              {selectedShoe.brand} {selectedShoe.name}
            </h3>
            <p className="text-xs text-gray-500 mb-4">
              {formatPrice(selectedShoe.price)}
            </p>
            <p className="text-xs font-bold mb-2">Select Size (EU):</p>
            <div className="flex flex-wrap gap-2 mb-5">
              {(selectedShoe.sizes ?? []).map((s) => (
                <button
                  key={s}
                  onClick={() => setChosenSize(s)}
                  className={`w-11 h-11 rounded-lg border font-semibold text-sm transition ${
                    chosenSize === s
                      ? 'bg-gray-900 text-white border-gray-900'
                      : 'bg-white text-gray-800 border-gray-300 hover:border-gray-900'
                  }`}
                >
                  {s}
                </button>
              ))}
            </div>
            <div className="flex gap-3">
              <button
                onClick={() => setSelectedShoe(null)}
                className="flex-1 py-2.5 border rounded-full text-sm font-semibold hover:bg-gray-50"
              >
                Cancel
              </button>
              <button
                onClick={confirmAddToCart}
                className="flex-1 py-2.5 bg-brand hover:bg-brand-dark text-white font-bold rounded-full text-sm"
              >
                Add to Cart
              </button>
            </div>
          </div>
        </div>
      )}

      <CartDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        cartItems={cart}
        onUpdateQuantity={handleUpdateQuantity}
        onRemoveItem={handleRemove}
        merchantPhoneNumber="254748716418"
      />
    </div>
  );
}