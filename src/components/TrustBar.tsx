const items = [
  { icon: '🚚', title: 'Free Shipping', desc: 'For orders over $50' },
  { icon: '↩️', title: 'Easy Returns', desc: '30-day return policy' },
  { icon: '🔒', title: 'Secure Payments', desc: '100% secure checkout' },
  { icon: '🎧', title: '24/7 Support', desc: "We're here to help" },
];

export default function TrustBar() {
  return (
    <section className="max-w-[1400px] mx-auto px-4 mt-6">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        {items.map((it) => (
          <div key={it.title} className="bg-white rounded-xl border border-gray-100 p-4 flex items-start gap-3">
            <span className="text-2xl">{it.icon}</span>
            <div>
              <p className="text-sm font-bold text-gray-900">{it.title}</p>
              <p className="text-xs text-gray-500">{it.desc}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}