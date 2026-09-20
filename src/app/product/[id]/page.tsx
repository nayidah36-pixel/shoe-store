'use client';

import { useState } from 'react';
import Link from 'next/link';

export default function ProductPage() {
  const [size, setSize] = useState(8);
  const [qty, setQty] = useState(1);
  const [color, setColor] = useState(0);
  const [tab, setTab] = useState<'desc' | 'spec' | 'rev'>('desc');
  const [mainImg, setMainImg] = useState(0);

  const images = [
    'https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?w=600&h=600&fit=crop',
    'https://images.unsplash.com/photo-1600185365483-26d7a4cc7519?w=600&h=600&fit=crop',
    'https://images.unsplash.com/photo-1549298916-b41d501d3772?w=600&h=600&fit=crop',
    'https://images.unsplash.com/photo-1608231387042-66d1773070a5?w=600&h=600&fit=crop',
  ];
  const colors = ['#ffffff', '#1a1a1a', '#f5b7c4'];

  return (
    <div className="max-w-[1400px] mx-auto px-4 py-6">
      {/* Breadcrumbs */}
      <nav className="text-xs text-gray-500 mb-4">
        <Link href="/" className="hover:text-brand">Home</Link> ›{' '}
        <Link href="/women" className="hover:text-brand">Women</Link> ›{' '}
        <Link href="/sneakers" className="hover:text-brand">Sneakers</Link> ›{' '}
        <span className="text-gray-800">Nike Air Force 1 '07</span>
      </nav>

      <div className="grid lg:grid-cols-2 gap-8">
        {/* Gallery */}
        <div className="flex gap-3">
          <div className="flex flex-col gap-2">
            {images.map((img, i) => (
              <button
                key={i}
                onClick={() => setMainImg(i)}
                className={`w-16 h-16 rounded-lg border-2 overflow-hidden transition ${
                  mainImg === i ? 'border-brand' : 'border-gray-200 hover:border-gray-300'
                }`}
              >
                <img src={img} alt="" className="w-full h-full object-cover" />
              </button>
            ))}
          </div>
          <div className="flex-1 bg-white rounded-2xl border border-gray-100 p-6 aspect-square flex items-center justify-center">
            <img src={images[mainImg]} alt="Product" className="max-h-full object-contain" />
          </div>
        </div>

        {/* Details */}
        <div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Nike Air Force 1 '07</h1>
          <div className="flex items-center gap-2 mb-4">
            <span className="text-brand">★★★★★</span>
            <span className="text-sm text-gray-600">(4.8)</span>
            <span className="text-sm text-gray-500">· 2,341 reviews</span>
          </div>

          <div className="flex items-baseline gap-3 mb-6">
            <span className="text-3xl font-bold">$110.00</span>
            <span className="text-gray-400 line-through">$130.00</span>
            <span className="bg-green-100 text-green-700 text-xs font-bold px-2 py-1 rounded">15% OFF</span>
          </div>

          {/* Color */}
          <div className="mb-5">
            <p className="text-sm font-semibold mb-2">
              Color: <span className="text-gray-600 font-normal">White</span>
            </p>
            <div className="flex gap-2">
              {colors.map((c, i) => (
                <button
                  key={i}
                  onClick={() => setColor(i)}
                  style={{ background: c }}
                  className={`w-8 h-8 rounded-full border-2 ${
                    color === i ? 'border-brand ring-2 ring-brand/30' : 'border-gray-300'
                  }`}
                />
              ))}
            </div>
          </div>

          {/* Size */}
          <div className="mb-5">
            <p className="text-sm font-semibold mb-2">Size: <span className="text-gray-600 font-normal">{size}</span></p>
            <div className="flex flex-wrap gap-2">
              {[6, 7, 8, 9, 10, 11, 12].map((s) => (
                <button
                  key={s}
                  onClick={() => setSize(s)}
                  className={`w-11 h-11 rounded-lg border font-semibold text-sm transition ${
                    size === s
                      ? 'bg-gray-900 text-white border-gray-900'
                      : 'bg-white text-gray-800 border-gray-300 hover:border-gray-900'
                  }`}
                >
                  {s}
                </button>
              ))}
            </div>
          </div>

          <p className="text-sm text-green-600 font-semibold mb-4">
            ● In Stock · Ships within 1-2 business days
          </p>

          {/* Qty + Add */}
          <div className="flex gap-3 mb-3">
            <div className="flex items-center border border-gray-300 rounded-full">
              <button
                onClick={() => setQty(Math.max(1, qty - 1))}
                className="w-10 h-11 text-lg hover:bg-gray-50 rounded-l-full"
              >−</button>
              <span className="w-8 text-center font-semibold">{qty}</span>
              <button
                onClick={() => setQty(qty + 1)}
                className="w-10 h-11 text-lg hover:bg-gray-50 rounded-r-full"
              >+</button>
            </div>
            <button className="flex-1 bg-brand hover:bg-brand-dark text-white font-bold py-3 rounded-full transition shadow-sm">
              Add to Cart
            </button>
          </div>

          <button className="w-full py-3 border-2 border-gray-200 rounded-full font-semibold text-gray-700 hover:border-gray-900 transition flex items-center justify-center gap-2 mb-6">
            ♡ Add to Wishlist
          </button>

          {/* Tabs */}
          <div className="border-b border-gray-200 flex gap-6 mb-4">
            {[
              { k: 'desc', l: 'Description' },
              { k: 'spec', l: 'Specifications' },
              { k: 'rev', l: 'Reviews (2,341)' },
            ].map((t) => (
              <button
                key={t.k}
                onClick={() => setTab(t.k as any)}
                className={`pb-3 text-sm font-semibold border-b-2 transition ${
                  tab === t.k ? 'border-brand text-gray-900' : 'border-transparent text-gray-500 hover:text-gray-900'
                }`}
              >
                {t.l}
              </button>
            ))}
          </div>

          {tab === 'desc' && (
            <div>
              <h3 className="font-bold text-gray-900 mb-2">Description</h3>
              <p className="text-sm text-gray-600 leading-relaxed mb-4">
                The Nike Air Force 1 '07 is a timeless classic that blends iconic style with everyday comfort. Featuring a clean leather upper, durable construction, and a cushioned midsole, this sneaker is perfect for any occasion.
              </p>
              <ul className="space-y-2 text-sm text-gray-600">
                {['Premium leather upper', 'Air-Sole unit for cushioning', 'Durable rubber outsole', 'Classic low-top design'].map((f) => (
                  <li key={f} className="flex items-center gap-2">
                    <span className="text-green-500">✓</span> {f}
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </div>

      {/* You may also like */}
      <section className="mt-14">
        <h2 className="text-xl font-bold mb-4">You may also like</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          {[
            { n: 'Adidas Ultraboost 22', p: 160, r: 4.7, img: 'https://images.unsplash.com/photo-1608231387042-66d1773070a5?w=400&h=400&fit=crop' },
            { n: 'Nike Dunk Low', p: 120, r: 4.6, img: 'https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?w=400&h=400&fit=crop' },
            { n: 'Converse Chuck Taylor', p: 70, r: 4.5, img: 'https://images.unsplash.com/photo-1606107557195-0e29a4b5b4aa?w=400&h=400&fit=crop' },
            { n: 'New Balance 550', p: 110, r: 4.5, img: 'https://images.unsplash.com/photo-1600185365483-26d7a4cc7519?w=400&h=400&fit=crop' },
          ].map((p) => (
            <div key={p.n} className="bg-white rounded-xl border border-gray-100 p-3 hover:shadow-lg transition cursor-pointer">
              <div className="aspect-square bg-gray-50 rounded-lg overflow-hidden mb-2">
                <img src={p.img} alt={p.n} className="w-full h-full object-cover" />
              </div>
              <h3 className="text-sm font-bold line-clamp-1">{p.n}</h3>
              <p className="text-base font-bold mt-1">${p.p.toFixed(2)}</p>
              <div className="flex items-center gap-1">
                <span className="text-brand text-xs">{'★'.repeat(Math.round(p.r))}</span>
                <span className="text-[11px] text-gray-500">({p.r})</span>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}