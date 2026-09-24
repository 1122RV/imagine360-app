import { getCart, addToCart, removeFromCart, clearCart, parseNum } from 'public/cart-utils.js';
import { createBooking } from 'backend/dispatch.jsw';

function showToast(message) {
  const toast = $w('#cartToast');
  if (!toast) return;
  $w('#cartToastText').text = message;
  toast.show();
  setTimeout(() => {
    $w('#cartToast').hide();
  }, 3500);
}

function renderCart() {
  const cart = getCart();
  const count = $w('#cartCount');
  if (count) count.text = String(cart.length);

  const list = $w('#cartItems');
  if (!list) return;
  $w('#cartItems').dataset = cart.length ? cart : [{}];

  const setText = (id, value) => {
    const el = $w(id);
    if (el) el.text = value;
  };
  const subtotal = cart.reduce((acc, item) => acc + parseNum(item.price), 0);
  const partnerDiscount = subtotal * 0.1;
  const gst = (subtotal - partnerDiscount) * 0.18;
  const escrowFee = subtotal > 0 ? 50.0 : 0;
  const grandTotal = Math.max(0, subtotal - partnerDiscount + gst + escrowFee);
  setText('#cartSubtotal', '$' + subtotal.toFixed(2));
  setText('#cartAddons', '+$0.00');
  setText('#cartDiscount', '-$' + partnerDiscount.toFixed(2));
  setText('#cartGst', '+$' + gst.toFixed(2));
  setText('#cartEscrow', '+$' + escrowFee.toFixed(2));
  setText('#cartTotal', '$' + grandTotal.toFixed(2));
}

function drawerTotals(cart) {
  const subtotal = cart.reduce((acc, item) => acc + parseNum(item.price), 0);
  const partnerDiscount = subtotal * 0.1;
  const gst = (subtotal - partnerDiscount) * 0.18;
  const escrowFee = subtotal > 0 ? 50.0 : 0;
  return { subtotal, partnerDiscount, gst, escrowFee, grandTotal: Math.max(0, subtotal - partnerDiscount + gst + escrowFee) };
}

export async function onCartReady() {
  renderCart();

  const trigger = $w('#cartTrigger');
  const close = $w('#cartClose');
  const overlay = $w('#cartOverlay');
  if (trigger) trigger.onClick(() => {
    renderCart();
    if ($w('#cartDrawer')) $w('#cartDrawer').show();
  });
  if (close) close.onClick(() => $w('#cartDrawer').hide());
  if (overlay) overlay.onClick(() => $w('#cartDrawer').hide());

  const checkout = $w('#cartCheckout');
  if (checkout) {
    checkout.onClick(async () => {
      const cart = getCart();
      const totals = drawerTotals(cart);
      const ref = await createBooking({
        target_date: new Date().toISOString().slice(0, 10),
        slot: '10:00 AM',
        site: 'Dispatch Desk',
        items: cart,
        total: totals.grandTotal,
      });
      clearCart();
      renderCart();
      showToast('Dispatch Session Confirmed! Reference #' + ref);
      if ($w('#cartDrawer')) $w('#cartDrawer').hide();
      $w('#cartItems').dataset = [{}];
    });
  }
}

export function handleRemove(id) {
  removeFromCart(id);
  renderCart();
}

export { showToast, renderCart };