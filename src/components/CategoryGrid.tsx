const categories = [
  { label: 'Men', sub: 'Shoes', img: 'https://images.unsplash.com/photo-1549298916-b41d501d3772?w=300&h=300&fit=crop' },
  { label: 'Women', sub: 'Shoes', img: 'https://images.unsplash.com/photo-1543163521-1bf539c55dd2?w=300&h=300&fit=crop' },
  { label: 'Kids', sub: 'Shoes', img: 'https://images.unsplash.com/photo-1514989940723-e8e51635b782?w=300&h=300&fit=crop' },
  { label: 'Sports', sub: 'Shoes', img: 'https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?w=300&h=300&fit=crop' },
  { label: 'Boots', sub: '& More', img: 'https://images.unsplash.com/photo-1608256246200-53e635b5b65f?w=300&h=300&fit=crop' },
];

export default function CategoryGrid() {
  return (
    <section className="max-w-[1400px] mx-auto px-4 mt-10">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-bold text-gray-900">Shop by Category</h2>
        <button className="text-sm font-semibold text-brand hover:underline">View All →</button>
      </div>
      <div className="grid grid-cols-3 md:grid-cols-5 gap-3">
        {categories.map((c) => (
          <div
            key={c.label}
            className="bg-white rounded-xl border border-gray-100 p-3 cursor-pointer hover:shadow-md hover:-translate-y-0.5 transition-all group"
          >
            <div className="aspect-square rounded-lg overflow-hidden bg-gray-50 mb-2">
              <img
                src={c.img}
                alt={c.label}
                className="w-full h-full object-cover group-hover:scale-105 transition"
              />
            </div>
            <p className="text-sm font-bold text-center text-gray-900">{c.label}</p>
            <p className="text-xs text-center text-gray-500">{c.sub}</p>
          </div>
        ))}
      </div>
    </section>
  );
}