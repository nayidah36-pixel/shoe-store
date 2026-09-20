export default function PromoBanners() {
  return (
    <section className="max-w-[1400px] mx-auto px-4 mt-10">
      <div className="grid md:grid-cols-3 gap-3">
        {/* Big left banner */}
        <div className="md:col-span-2 relative rounded-xl overflow-hidden min-h-[220px] bg-gradient-to-r from-gray-900 to-gray-700">
          <img
            src="https://images.unsplash.com/photo-1460353581641-37baddab0fa2?w=800&h=400&fit=crop"
            alt="Comfort meets style"
            className="absolute inset-0 w-full h-full object-cover opacity-60"
          />
          <div className="relative p-8 text-white">
            <h3 className="text-2xl font-bold mb-2">Comfort Meets Style</h3>
            <p className="text-sm text-white/80 mb-4 max-w-sm">
              Discover shoes that keep up with your life.
            </p>
            <button className="bg-white text-gray-900 font-semibold text-sm px-5 py-2 rounded-full hover:bg-gray-100 transition">
              Explore Women's Collection →
            </button>
          </div>
        </div>

        {/* Right banner */}
        <div className="rounded-xl overflow-hidden bg-gradient-to-br from-pink-50 to-rose-100 p-6 flex flex-col justify-between min-h-[220px]">
          <div>
            <p className="text-lg font-bold text-gray-900">Up to 50% Off</p>
            <p className="text-sm text-gray-600 mb-4">Selected Styles</p>
            <img
              src="https://images.unsplash.com/photo-1606107557195-0e29a4b5b4aa?w=300&h=200&fit=crop"
              alt="Sale"
              className="w-full h-24 object-cover rounded-lg"
            />
          </div>
          <button className="bg-white text-gray-900 font-semibold text-sm px-4 py-2 rounded-full hover:bg-gray-50 w-fit shadow-sm">
            Shop Sale →
          </button>
        </div>
      </div>
    </section>
  );
}