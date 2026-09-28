'use client';

import { CartItem } from '@/types/shoe';

interface Props {
  isOpen: boolean;
  onClose: () => void;
  cartItems: CartItem[];
  onUpdateQuantity: (id: string, size: number, delta: number) => void;
  onRemoveItem: (id: string, size: number) => void;
  merchantPhoneNumber: string;
}

// ─── WhatsApp checkout helper ─────────────────────────────
function sendCartToWhatsApp(cartItems: CartItem[]) {
  const WHATSAPP_NUMBER = '254748716418'; // ← CHANGE TO YOUR REAL NUMBER
  const KES_RATE = 130;

  let subtotal = 0;
  const lines = ['*New Order — StepStyle* 🛒', '', '*Items:*'];

  cartItems.forEach((item, i) => {
    const total = item.shoe.price * KES_RATE * item.quantity;
    subtotal += total;
    lines.push(
      `${i + 1}. ${item.shoe.brand} ${item.shoe.name}`,
      `   Size EU ${item.selectedSize}  ×${item.quantity}`,
      `   KES ${total.toLocaleString()}`
    );
  });

  lines.push('', `*TOTAL: KES ${subtotal.toLocaleString()}*`);
  lines.push('', 'Please confirm my order. Thank you!');

  const url = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(
    lines.join('\n')
  )}`;
  window.open(url, '_blank');
}
// ──────────────────────────────────────────────────────────

export default function CartDrawer({
  isOpen,
  onClose,
  cartItems,
  onUpdateQuantity,
  onRemoveItem,
}: Props) {
  if (!isOpen) return null;

  const subtotal = cartItems.reduce(
  (s, i) => s + i.shoe.price * i.quantity,
  0
);
  const itemCount = cartItems.reduce((s, i) => s + i.quantity, 0);

  return (
    <div className="fixed inset-0 z-50 flex">
      <div className="flex-1 bg-black/50" onClick={onClose} />
      <aside className="w-full max-w-md bg-white h-full overflow-y-auto shadow-2xl">
        <div className="sticky top-0 bg-white border-b border-gray-200 p-5 flex items-center justify-between">
          <div>
            <h2 className="text-xl font-bold">Your Cart</h2>
            <p className="text-xs text-gray-500">
              {itemCount} item{itemCount !== 1 ? 's' : ''}
            </p>
          </div>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-900 text-2xl leading-none"
          >
            ×
          </button>
        </div>

        <div className="p-5 space-y-4">
          {cartItems.length === 0 ? (
            <div className="text-center py-16">
              <p className="text-5xl mb-3">🛒</p>
              <p className="text-sm text-gray-500">Your cart is empty</p>
            </div>
          ) : (
            cartItems.map((item) => (
              <div
                key={`${item.shoe.id}-${item.selectedSize}`}
                className="flex gap-3 bg-gray-50 rounded-xl p-3"
              >
                <div className="w-20 h-20 bg-white rounded-lg overflow-hidden shrink-0">
                  <img
                    src={item.shoe.image}
                    alt={item.shoe.name}
                    className="w-full h-full object-contain p-1"
                  />
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="text-sm font-bold line-clamp-1">
                    {item.shoe.name}
                  </h3>
                  <p className="text-xs text-gray-500 mb-2">
                    Size {item.selectedSize}
                  </p>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center border border-gray-200 rounded-full bg-white">
                      <button
                        onClick={() =>
                          onUpdateQuantity(item.shoe.id, item.selectedSize, -1)
                        }
                        className="w-7 h-7 text-sm hover:bg-gray-50 rounded-l-full"
                      >
                        −
                      </button>
                      <span className="w-6 text-center text-xs font-semibold">
                        {item.quantity}
                      </span>
                      <button
                        onClick={() =>
                          onUpdateQuantity(item.shoe.id, item.selectedSize, 1)
                        }
                        className="w-7 h-7 text-sm hover:bg-gray-50 rounded-r-full"
                      >
                        +
                      </button>
                    </div>
                    <span className="font-bold text-sm">
                      KES{' '}
                      {(item.shoe.price * 130 * item.quantity).toLocaleString()}
                    </span>
                  </div>
                </div>
                <button
                  onClick={() => onRemoveItem(item.shoe.id, item.selectedSize)}
                  className="text-gray-400 hover:text-red-500 self-start text-lg"
                >
                  🗑
                </button>
              </div>
            ))
          )}
        </div>

        {cartItems.length > 0 && (
          <div className="border-t border-gray-200 p-5 space-y-3 sticky bottom-0 bg-white">
            <div className="flex justify-between text-sm">
              <span className="text-gray-600">Subtotal</span>
              <span className="font-semibold">
                KES {subtotal.toLocaleString()}
              </span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-gray-600">Shipping</span>
              <span className="font-semibold text-green-600">FREE</span>
            </div>
            <div className="flex justify-between text-base font-bold border-t border-gray-200 pt-3">
              <span>Total</span>
              <span>KES {subtotal.toLocaleString()}</span>
            </div>
            <button
  onClick={() => sendCartToWhatsApp(cartItems)}
  className="w-full bg-green-500 hover:bg-green-600 text-white font-bold py-3 rounded-full transition flex items-center justify-center gap-2"
>
  <svg
    className="w-5 h-5"
    viewBox="0 0 24 24"
    fill="currentColor"
    aria-hidden="true"
  >
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
  </svg>
  Checkout via WhatsApp
</button>
            <div className="flex items-center justify-center gap-3 pt-1 text-[10px] text-gray-500 font-bold">
              <span className="text-blue-700">VISA</span>
              <span className="text-red-600">Mastercard</span>
              <span className="text-blue-500">PayPal</span>
              <span>Pay</span>
            </div>
          </div>
        )}
      </aside>
    </div>
  );
}