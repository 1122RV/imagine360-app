import { local } from 'wix-storage-frontend';

const CART_KEY = 'im360_cart';

export function getCart() {
  const raw = local.getItem(CART_KEY);
  try {
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

export function saveCart(cart) {
  local.setItem(CART_KEY, JSON.stringify(cart));
}

export function parseNum(value) {
  const parsed = parseFloat(String(value).replace(/[^0-9.]/g, ''));
  return isNaN(parsed) ? 0 : parsed;
}

export function cartTotals(items, addons = {}) {
  const subtotal = items.reduce((acc, item) => acc + parseNum(item.price), 0);
  const addonsCost = (addons.express ? 250 : 0) + (addons.rawDLog ? 128 : 0) + (addons.rtmp ? 490 : 0);
  const totalBase = subtotal + addonsCost;
  const discount = totalBase * 0.1;
  const gstTax = (totalBase - discount) * 0.18;
  const escrow = 50;
  const grandTotal = Math.max(0, totalBase - discount + gstTax + escrow);
  return { subtotal, addonsCost, totalBase, discount, gstTax, escrow, grandTotal };
}

export function addToCart(name, price, category, badge, image) {
  const cart = getCart();
  cart.unshift({
    id: 'item-' + Date.now(),
    name,
    price,
    category: category || 'Enterprise Service',
    date: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
    time: '10:00 AM',
    badge: badge || 'Verified SLA',
    image: image || '',
  });
  saveCart(cart);
  return cart;
}

export function removeFromCart(id) {
  saveCart(getCart().filter((item) => item.id !== id));
  return getCart();
}

export function clearCart() {
  saveCart([]);
  return [];
}

export function bookingReference() {
  return 'I360-' + Math.floor(1000 + Math.random() * 9000);
}