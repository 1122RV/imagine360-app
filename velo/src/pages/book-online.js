import { getCart, cartTotals } from 'public/cart-utils.js';
import { showToast, renderCart } from 'site.js';
import { createBooking } from 'backend/dispatch.jsw';

export function bookOnlineReady() {
  $w.onReady(() => {
    const addonSelectors = {
      express: $w('#addonExpress'),
      rawDLog: $w('#addonRawDLog'),
      rtmp: $w('#addonRtmp'),
      gstSplit: $w('#addonGstSplit'),
    };

    const readAddons = () => {
      return {
        express: !!(addonSelectors.express && addonSelectors.express.checked),
        rawDLog: !!(addonSelectors.rawDLog && addonSelectors.rawDLog.checked),
        rtmp: !!(addonSelectors.rtmp && addonSelectors.rtmp.checked),
        gstSplit: !!(addonSelectors.gstSplit && addonSelectors.gstSplit.checked),
      };
    };

    const updateTotals = () => {
      const totals = cartTotals(getCart(), readAddons());
      $w('#cartSubtotal').text = '$' + totals.subtotal.toLocaleString('en-US', { minimumFractionDigits: 2 });
      $w('#cartAddons').text = totals.addonsCost > 0 ? '+$' + totals.addonsCost.toFixed(2) : '+$0.00';
      $w('#cartDiscount').text = '-$' + totals.discount.toFixed(2);
      $w('#cartGst').text = '+$' + totals.gstTax.toFixed(2);
      $w('#cartEscrow').text = '+$' + totals.escrow.toFixed(2);
      $w('#cartTotal').text = '$' + totals.grandTotal.toFixed(2);
    };

    Object.values(addonSelectors).forEach((el) => {
      if (el) el.onChange(updateTotals);
    });
    $w('#qtySelect').onChange(updateTotals);
    updateTotals();

    const checkout = $w('#checkoutButton');
    if (checkout) {
      checkout.onClick(async () => {
        const totals = cartTotals(getCart(), readAddons());
        const ref = await createBooking({
          target_date: '2025-11-' + String($w('#dateSelect').value).padStart(2, '0'),
          slot: $w('#slotSelect').value,
          site: $w('#siteInput').value,
          items: getCart(),
          total: totals.grandTotal,
        });
        showToast('Dispatch Session Confirmed! Reference #' + ref);
        renderCart();
        updateTotals();
      });
    }
  });
}