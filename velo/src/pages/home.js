import { addToCart } from 'public/cart-utils.js';
import { renderCart } from 'site.js';

const BASE_RATES = {
  visual: [2400, 5800, 14000],
  drone: [1800, 4200, 9500],
  commercial: [3200, 7500, 18500],
  saas: [850, 2200, 6800],
};
const TIER_NAMES = ['Standard Tier', 'Enterprise Expansion', 'Full Autonomous Fleet'];

export function homeReady() {
  $w.onReady(() => {
    const lockButton = $w('#instantLockButton');
    let reserveText = 'Instant Lock';

    const updateCost = () => {
      const capability = $w('#capabilitySelect').value;
      const scaleIndex = $w('#scaleSlider').value;
      const cost = BASE_RATES[capability][scaleIndex - 1];
      $w('#costReadout').text = '$' + cost.toLocaleString('en-US');
      $w('#tierReadout').text = TIER_NAMES[scaleIndex - 1];
    };

    $w('#capabilitySelect').onChange(updateCost);
    $w('#scaleSlider').onChange(updateCost);
    updateCost();

    lockButton.onClick(() => {
      const capability = $w('#capabilitySelect').value;
      const scaleIndex = $w('#scaleSlider').value;
      const cost = BASE_RATES[capability][scaleIndex - 1];
      addToCart(
        capability.toUpperCase() + ' - ' + TIER_NAMES[scaleIndex - 1],
        '$' + cost.toLocaleString('en-US'),
        'Direct Allocation',
        'Instant Lock'
      );
      renderCart();
      lockButton.label = 'Allocated ✓';
      setTimeout(() => {
        lockButton.label = reserveText;
      }, 2500);
    });
  });
}