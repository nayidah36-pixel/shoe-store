'use client';

import { useState } from 'react';
import { CartItem } from '@/types/shoe';
import { buildWhatsAppUrl, formatPrice } from '@/lib/whatsapp';

interface Props {
  isOpen: boolean;
  onClose: () => void;
  cart: CartItem[];
  onOrderSent: () => void;
}

export default function CheckoutModal({ isOpen, onClose, cart, onOrderSent }: Props) {
  const [name, setName] = useState('');
  const [location, setLocation] = useState('');
  const [notes, setNotes] = useState('');

  if (!isOpen) return null;

  const subtotal = cart.reduce((s, i) => s + i.shoe.price * i.quantity, 0);

  const handleSend = () => {
    const url = buildWhatsAppUrl(cart, { name, location, notes });
    window.open(url, '_blank');
    onOrderSent();
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4">
      <div className="bg-white rounded-2xl max-w-md w-full p-6 shadow-2xl max-h-[90vh] overflow-y-auto">
        <div className="flex justify-between items-start mb-4">
          <div>
            <h3 className="text-lg font-bold">Complete Your Order</h3>
            <p className="text-xs text-gray-500">
              We'll send your cart to WhatsApp for confirmation.
            </p>
          </div>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-900 text-2xl leading-none">×</button>
        </div>

        {/* Order summary */}
        <div className="bg-gray-50 rounded-xl p-3 mb-4 space-y-2 max-h-40 overflow-y-auto">
          {cart.map((i) => (
            <div key={`${i.shoe.id}-${i.selectedSize}`} className="flex justify-between text-xs">
              <span className="text-gray-700 line-clamp-1">
                {i.quantity}× {i.shoe.name} (EU {i.selectedSize})
              </span>
              <span className="font-semibold shrink-0 ml-2">
                {formatPrice(i.shoe.price * i.quantity)}
              </span>
            </div>
          ))}
          <div className="flex justify-between text-sm font-bold border-t border-gray-200 pt-2">
            <span>Total</span>
            <span>{formatPrice(subtotal)}</span>
          </div>
        </div>

        {/* Customer form */}
        <div className="space-y-3 mb-4">
          <div>
            <label className="text-xs font-semibold block mb-1">Your Name</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="e.g. Jane Wanjiru"
              className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-brand"
            />
          </div>
          <div>
            <label className="text-xs font-semibold block mb-1">Delivery Location</label>
            <input
              type="text"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              placeholder="e.g. Westlands, Nairobi"
              className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-brand"
            />
          </div>
          <div>
            <label className="text-xs font-semibold block mb-1">Notes (optional)</label>
            <textarea
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              rows={2}
              placeholder="Colour preference, delivery time, etc."
              className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-brand resize-none"
            />
          </div>
        </div>

        <button
          onClick={handleSend}
          className="w-full bg-green-500 hover:bg-green-600 text-white font-bold py-3 rounded-full transition flex items-center justify-center gap-2"
        >
          <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
          </svg>
          Send Order via WhatsApp
        </button>

        <p className="text-[10px] text-gray-400 text-center mt-3">
          You'll be redirected to WhatsApp to confirm your order.
        </p>
      </div>
    </div>
  );
}