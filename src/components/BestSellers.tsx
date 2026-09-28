'use client';

import shoeData from '@/data/shoes.json';
import { Shoe } from '@/types/shoe';
import { formatPrice } from '@/lib/whatsapp';

export default function BestSellers({ onSelect }: { onSelect: (shoe: Shoe) => void }) {
  const bestSellers = (shoeData as Shoe[]).slice(0, 4);

  return (
    <section className="max-w-[1400px] mx-auto px-4 mt-10">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-bold text-gray-900">Best Sellers</h2>
        <button className="text-sm font-semibold text-brand hover:underline">View All →</button>
      </div>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        {bestSellers.map((p) => (
          <div
            key={p.id}
            onClick={() => onSelect(p)}
            className="bg-white rounded-xl border border-gray-100 p-3 cursor-pointer hover:shadow-lg transition-all group relative"
          >
            <button
              onClick={(e) => e.stopPropagation()}
              className="absolute top-3 right-3 w-7 h-7 rounded-full bg-white shadow-sm flex items-center justify-center text-gray-400 hover:text-brand z-10"
            >
              ♡
            </button>
            <div className="aspect-square rounded-lg bg-gray-50 mb-3 overflow-hidden">
              <img src={p.image} alt={p.name} className="w-full h-full object-cover group-hover:scale-105 transition" />
            </div>
            <h3 className="text-sm font-bold text-gray-900 line-clamp-1">
              {p.brand} {p.name}
            </h3>
            <p className="text-[11px] text-gray-500 mb-1">
              {p.gender} · {p.category}
            </p>
            <p className="text-base font-bold text-gray-900">{formatPrice(p.price)}</p>
            <div className="flex items-center gap-1 mt-1">
              <span className="text-brand text-xs">{'★'.repeat(Math.round(p.rating || 4))}</span>
              <span className="text-[11px] text-gray-500">({p.rating})</span>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}