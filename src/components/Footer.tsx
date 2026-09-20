import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="bg-white border-t border-gray-200 mt-14">
      <div className="max-w-[1400px] mx-auto px-4 py-12 grid grid-cols-2 md:grid-cols-5 gap-8">
        <div className="col-span-2 md:col-span-2">
          <div className="flex items-center gap-1.5 mb-3">
            <span className="text-2xl">👟</span>
            <span className="text-xl font-bold">Step<span className="text-brand">Style</span></span>
          </div>
          <p className="text-sm text-gray-600 max-w-xs mb-4">
            Premium shoes for every occasion. Comfort, quality, and style — all in one place.
          </p>
        </div>

        {[
          { title: 'Quick Links', links: ['Home', 'Shop', 'About Us', 'Contact'] },
          { title: 'Customer Care', links: ['Shipping Policy', 'Returns & Refunds', 'Size Guide', 'FAQ'] },
        ].map((col) => (
          <div key={col.title}>
            <h4 className="font-bold text-sm mb-3">{col.title}</h4>
            <ul className="space-y-2">
              {col.links.map((l) => (
                <li key={l}>
                  <Link href="#" className="text-sm text-gray-600 hover:text-brand">{l}</Link>
                </li>
              ))}
            </ul>
          </div>
        ))}

        <div>
          <h4 className="font-bold text-sm mb-3">Stay Connected</h4>
          <p className="text-xs text-gray-500 mb-3">Get the latest news and updates</p>
          <form className="flex">
            <input
              type="email"
              placeholder="Enter your email"
              className="flex-1 px-3 py-2 text-xs border border-gray-200 rounded-l-full focus:outline-none focus:border-brand"
            />
            <button className="bg-brand hover:bg-brand-dark text-white px-3 rounded-r-full text-xs font-semibold">
              →
            </button>
          </form>
          <div className="flex gap-2 mt-4">
            {['f', '𝕏', 'in', '◎'].map((s, i) => (
              <button key={i} className="w-8 h-8 rounded-full bg-gray-100 hover:bg-brand hover:text-white flex items-center justify-center text-sm font-semibold transition">
                {s}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="border-t border-gray-200">
        <div className="max-w-[1400px] mx-auto px-4 py-4 flex flex-col md:flex-row justify-between items-center gap-3">
          <p className="text-xs text-gray-500">© 2026 StepStyle. All rights reserved.</p>
          <div className="flex items-center gap-3 text-xs text-gray-500">
            <span className="font-bold text-blue-700">VISA</span>
            <span className="font-bold text-red-600">Mastercard</span>
            <span className="font-bold text-blue-500">PayPal</span>
          </div>
        </div>
      </div>
    </footer>
  );
}