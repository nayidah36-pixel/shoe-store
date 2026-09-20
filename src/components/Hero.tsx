'use client';

import { useState } from 'react';

const slides = [
  {
    tag: 'NEW COLLECTION',
    title: 'Step Into Your Style',
    desc: 'Premium shoes for every occasion. Comfort, quality, and style — all in one place.',
    cta: 'Shop Now',
    bg: 'from-[#fef3e2] via-[#fde4c3] to-[#f8d5a8]',
    img: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=600&h=500&fit=crop',
  },
  {
    tag: 'LIMITED EDITION',
    title: 'Run Your Way',
    desc: 'Performance running shoes engineered for speed and endurance.',
    cta: 'Explore',
    bg: 'from-[#e0f2fe] via-[#bae6fd] to-[#7dd3fc]',
    img: 'https://images.unsplash.com/photo-1552346154-21d32810aba3?w=600&h=500&fit=crop',
  },
];

export default function Hero() {
  const [current, setCurrent] = useState(0);
  const slide = slides[current];

  return (
    <section className="max-w-[1400px] mx-auto px-4 mt-6">
      <div className={`relative rounded-2xl overflow-hidden bg-gradient-to-br ${slide.bg} min-h-[380px] md:min-h-[420px]`}>
        <div className="grid md:grid-cols-2 h-full">
          <div className="p-8 md:p-14 flex flex-col justify-center relative z-10">
            <span className="text-xs tracking-[0.2em] font-semibold text-gray-700 mb-3">
              {slide.tag}
            </span>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight text-gray-900 mb-4">
              {slide.title.split(' ').slice(0, 2).join(' ')}<br />
              {slide.title.split(' ').slice(2).join(' ')}
            </h1>
            <p className="text-gray-700 mb-6 max-w-md">{slide.desc}</p>
            <button className="bg-brand hover:bg-brand-dark text-white font-semibold px-6 py-3 rounded-full w-fit transition shadow-sm">
              {slide.cta} →
            </button>
          </div>
          <div className="relative hidden md:block">
            <img
              src={slide.img}
              alt={slide.title}
              className="absolute inset-0 w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-transparent to-transparent" />
          </div>
        </div>

        {/* Arrows */}
        <button
          onClick={() => setCurrent((c) => (c - 1 + slides.length) % slides.length)}
          className="absolute left-3 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full bg-white/70 hover:bg-white flex items-center justify-center shadow-sm"
        >
          ‹
        </button>
        <button
          onClick={() => setCurrent((c) => (c + 1) % slides.length)}
          className="absolute right-3 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full bg-white/70 hover:bg-white flex items-center justify-center shadow-sm"
        >
          ›
        </button>

        {/* Dots */}
        <div className="absolute bottom-4 left-8 flex gap-1.5">
          {slides.map((_, i) => (
            <button
              key={i}
              onClick={() => setCurrent(i)}
              className={`h-1.5 rounded-full transition-all ${
                i === current ? 'bg-brand w-6' : 'bg-white/70 w-1.5'
              }`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}