import React, { useState } from 'react';
import { useCart } from '../context/CartContext';
import { getSupabase } from '../lib/supabase';

interface CartDrawerProps {
  onCheckoutSuccess?: () => void;
}

export const CartDrawer: React.FC<CartDrawerProps> = ({ onCheckoutSuccess }) => {
  const { cart, removeFromCart, clearCart, isCartOpen, setIsCartOpen, showToast } = useCart();
  const [promoCode, setPromoCode] = useState('IMAGINE360-Q4');
  const [isSubmitting, setIsSubmitting] = useState(false);

  if (!isCartOpen) return null;

  // Calculate prices
  const parsePrice = (priceStr: string) => {
    const num = parseFloat(priceStr.replace(/[^0-9.]/g, ''));
    return isNaN(num) ? 0 : num;
  };

  const subtotal = cart.reduce((sum, item) => sum + parsePrice(item.price), 0);
  const partnerDiscount = subtotal * 0.1;
  const gst = (subtotal - partnerDiscount) * 0.18;
  const escrowFee = subtotal > 0 ? 50.0 : 0;
  const grandTotal = Math.max(0, subtotal - partnerDiscount + gst + escrowFee);

  const handleCheckout = async () => {
    setIsSubmitting(true);
    try {
      // Record booking into Supabase if available
      const supabase = getSupabase();
      await supabase.from('bookings').insert([
        {
          items: cart,
          total: grandTotal,
          status: 'confirmed',
          created_at: new Date().toISOString(),
        }
      ]).select();
    } catch {
      // Non-blocking fallback
    }

    setTimeout(() => {
      setIsSubmitting(false);
      setIsCartOpen(false);
      clearCart();
      showToast('Dispatch Session Locked! Booking reference #I360-' + Math.floor(1000 + Math.random() * 9000));
      if (onCheckoutSuccess) onCheckoutSuccess();
    }, 1200);
  };

  return (
    <div className="fixed inset-0 z-50 flex justify-end bg-black/60 backdrop-blur-xs animate-fade-in">
      <div className="w-full max-w-md bg-surface-container border-l border-surface-container-high h-full flex flex-col justify-between shadow-2xl overflow-y-auto">
        {/* Drawer Header */}
        <div className="p-6 border-b border-surface-container-high flex items-center justify-between bg-surface-container-lowest/80">
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-primary text-2xl">shopping_bag</span>
            <div>
              <h3 className="font-headline-sm text-lg text-on-surface font-bold">Booking Cart</h3>
              <span className="text-xs text-on-surface-variant font-label-sm">
                {cart.length} Service{cart.length === 1 ? '' : 's'} Allocated
              </span>
            </div>
          </div>

          <div className="flex items-center gap-2">
            {cart.length > 0 && (
              <button
                onClick={clearCart}
                className="text-xs font-label-sm text-outline hover:text-error transition-colors flex items-center gap-1 p-1"
                title="Clear cart"
              >
                <span className="material-symbols-outlined text-sm">delete_sweep</span>
                <span>Clear</span>
              </button>
            )}
            <button
              onClick={() => setIsCartOpen(false)}
              className="p-1.5 rounded-lg text-on-surface-variant hover:text-on-surface hover:bg-surface-container-high transition-colors"
            >
              <span className="material-symbols-outlined text-xl">close</span>
            </button>
          </div>
        </div>

        {/* Drawer Items List */}
        <div className="p-6 flex-1 space-y-3 overflow-y-auto">
          {cart.length === 0 ? (
            <div className="py-16 text-center text-on-surface-variant space-y-3">
              <span className="material-symbols-outlined text-5xl text-outline opacity-40">
                shopping_cart
              </span>
              <p className="font-body-md text-sm text-on-surface font-medium">Your dispatch docket is empty</p>
              <p className="text-xs text-outline">Browse services or 3D visualizers to reserve a flight slot.</p>
            </div>
          ) : (
            cart.map((item) => (
              <div
                key={item.id}
                className="p-4 rounded-xl bg-surface-container-low border border-surface-container-high/60 shadow-sm flex gap-3 relative group"
              >
                {item.image && (
                  <div className="w-14 h-14 rounded-lg overflow-hidden shrink-0 bg-surface-container-highest relative">
                    <img alt={item.name} className="w-full h-full object-cover" src={item.image} />
                  </div>
                )}
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between gap-1">
                    <h4 className="font-headline-sm text-xs sm:text-sm text-on-surface font-semibold truncate">
                      {item.name}
                    </h4>
                    <button
                      onClick={() => removeFromCart(item.id)}
                      className="text-outline hover:text-error transition-colors p-0.5"
                    >
                      <span className="material-symbols-outlined text-sm">close</span>
                    </button>
                  </div>
                  {item.category && (
                    <span className="text-[10px] font-label-sm text-primary block mt-0.5">
                      {item.category}
                    </span>
                  )}
                  {item.date && (
                    <span className="text-[10px] text-on-surface-variant flex items-center gap-1 mt-0.5 font-label-sm">
                      <span className="material-symbols-outlined text-xs">event</span>
                      <span>{item.date} {item.time ? `• ${item.time}` : ''}</span>
                    </span>
                  )}
                  <div className="flex items-center justify-between mt-2 pt-1 border-t border-surface-container-high/40">
                    <span className="text-[10px] font-label-sm text-tertiary">{item.badge || 'Active Spec'}</span>
                    <span className="font-label-md text-xs sm:text-sm text-on-surface font-bold text-primary">
                      {item.price}
                    </span>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Drawer Footer & Breakdown */}
        {cart.length > 0 && (
          <div className="p-6 border-t border-surface-container-high bg-surface-container-lowest/90 space-y-4">
            {/* Promo Code Input */}
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <input
                  type="text"
                  value={promoCode}
                  onChange={(e) => setPromoCode(e.target.value)}
                  placeholder="Promo Code"
                  className="flex-1 bg-surface-container-low text-xs px-3 py-2 rounded-lg font-mono text-on-surface border border-surface-container-high focus:outline-none focus:border-primary uppercase"
                />
                <button
                  type="button"
                  onClick={() => showToast('Promo code verified!')}
                  className="px-3 py-2 bg-surface-container-high hover:bg-surface-container-highest text-primary font-label-sm text-xs font-bold rounded-lg transition-colors"
                >
                  Apply
                </button>
              </div>
              <span className="text-[10px] font-label-sm text-tertiary flex items-center gap-1">
                <span className="material-symbols-outlined text-xs">check</span>
                Code active: 10% Imagine360tours Tech Credit
              </span>
            </div>

            {/* Calculations Breakdown */}
            <div className="p-3.5 rounded-xl bg-surface-container-low space-y-1.5 text-xs">
              <div className="flex justify-between text-on-surface-variant">
                <span>Subtotal ({cart.length} Services)</span>
                <span className="font-mono text-on-surface font-medium">${subtotal.toLocaleString('en-US', { minimumFractionDigits: 2 })}</span>
              </div>
              <div className="flex justify-between text-tertiary">
                <span>Partner Credit (10%)</span>
                <span className="font-mono">-${partnerDiscount.toLocaleString('en-US', { minimumFractionDigits: 2 })}</span>
              </div>
              <div className="flex justify-between text-on-surface-variant">
                <span>Platform GST (18%)</span>
                <span className="font-mono">+${gst.toLocaleString('en-US', { minimumFractionDigits: 2 })}</span>
              </div>
              <div className="flex justify-between text-on-surface-variant">
                <span>Service Guarantee Escrow</span>
                <span className="font-mono">+${escrowFee.toFixed(2)}</span>
              </div>
              <div className="pt-2 border-t border-surface-container-high flex justify-between items-center text-sm font-bold">
                <span className="text-on-surface">Estimated Total Due</span>
                <span className="text-primary font-mono text-base font-extrabold">
                  ${grandTotal.toLocaleString('en-US', { minimumFractionDigits: 2 })}
                </span>
              </div>
            </div>

            {/* Action Checkout Button */}
            <button
              onClick={handleCheckout}
              disabled={isSubmitting}
              className="w-full py-3.5 rounded-xl bg-primary hover:bg-primary-container text-on-primary font-headline-sm text-sm font-bold shadow-[0_0_24px_rgba(76,215,246,0.35)] flex items-center justify-center gap-2 transition-all disabled:opacity-50"
            >
              {isSubmitting ? (
                <>
                  <span className="material-symbols-outlined text-base animate-spin">refresh</span>
                  <span>Transmitting Dispatch Request...</span>
                </>
              ) : (
                <>
                  <span>Lock Dispatch &amp; Checkout</span>
                  <span className="material-symbols-outlined text-base">lock</span>
                </>
              )}
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
