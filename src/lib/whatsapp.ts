import { CartItem } from '@/types/shoe';

const WHATSAPP_NUMBER = '254712345678'; // ← change to your real number
const KES_RATE = 130;

export function formatPrice(usd: number) {
  return `KES ${(usd * KES_RATE).toLocaleString()}`;
}

export function sendCartToWhatsApp(cart: CartItem[]) {
  let subtotal = 0;
  const lines = ['*New Order — StepStyle* 🛒', '', '*Items:*'];

  cart.forEach((item, i) => {
    const total = item.shoe.price * item.quantity;
    subtotal += total;
    lines.push(
      `${i + 1}. ${item.shoe.brand} ${item.shoe.name}`,
      `   Size EU ${item.selectedSize}  ×${item.quantity}`,
      `   ${formatPrice(total)}`
    );
  });

  lines.push('', `*TOTAL: ${formatPrice(subtotal)}*`);
  lines.push('', 'Please confirm my order. Thank you!');

  const url = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(lines.join('\n'))}`;
  window.open(url, '_blank');
}