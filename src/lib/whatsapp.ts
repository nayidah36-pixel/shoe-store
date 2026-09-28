import { CartItem } from '@/types/shoe';

const WHATSAPP_NUMBER = '254748716418';

export function formatPrice(kes: number): string {
  return `KES ${kes.toLocaleString('en-KE')}`;
}

export function buildWhatsAppMessage(
  cart: CartItem[],
  customer?: { name?: string; location?: string; notes?: string }
): string {
  const lines: string[] = [];

  lines.push('*New Order — StepStyle* 🛒');
  lines.push('');

  if (customer?.name) lines.push(`*Name:* ${customer.name}`);
  if (customer?.location) lines.push(`*Delivery:* ${customer.location}`);
  if (customer?.name || customer?.location) lines.push('');

  lines.push('*Items:*');
  lines.push('──────────────────');

  let subtotal = 0;
  cart.forEach((item, i) => {
    const total = item.shoe.price * item.quantity;
    subtotal += total;
    lines.push(
      `${i + 1}. ${item.shoe.brand} ${item.shoe.name}`,
      `    Size EU ${item.selectedSize}  ×${item.quantity}`,
      `    ${formatPrice(total)}`
    );
  });

  lines.push('──────────────────');
  lines.push(`*TOTAL: ${formatPrice(subtotal)}*`);

  if (customer?.notes) {
    lines.push('');
    lines.push(`*Notes:* ${customer.notes}`);
  }

  lines.push('');
  lines.push('Please confirm my order. Thank you!');

  return lines.join('\n');
}

export function buildWhatsAppUrl(
  cart: CartItem[],
  customer?: { name?: string; location?: string; notes?: string }
): string {
  const message = buildWhatsAppMessage(cart, customer);
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
}

export function sendCartToWhatsApp(cart: CartItem[]): void {
  const url = buildWhatsAppUrl(cart);
  window.open(url, '_blank');
}