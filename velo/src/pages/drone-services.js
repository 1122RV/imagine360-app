import { addToCart } from 'public/cart-utils.js';
import { renderCart } from 'site.js';

export function droneServicesReady() {
  $w.onReady(() => {
    const updateTelemetry = () => {
      const altitude = $w('#altitudeSlider').value;
      const overlap = $w('#overlapSlider').value;
      const targetGsd = (altitude * 0.0112).toFixed(1);
      const duration = Math.round(overlap * 0.48);
      const pointCount = ((150 - altitude) * 0.42).toFixed(1);
      $w('#gsdReadout').text = targetGsd + ' cm/px';
      $w('#durationReadout').text = duration + ' min';
      $w('#pointReadout').text = pointCount + 'M PTS';
      $w('#altitudeReadout').text = altitude + 'm AGL' + (altitude === 125 ? ' (LEGAL CEILING)' : '');
      $w('#overlapReadout').text = overlap + ' / ' + Math.max(60, overlap - 5) + '%';
    };

    $w('#altitudeSlider').onChange(updateTelemetry);
    $w('#overlapSlider').onChange(updateTelemetry);
    updateTelemetry();

    $w('#computeButton').onClick(() => {
      updateTelemetry();
      renderCart();
    });

    $w('#geoTiffButton').onClick(() => {
      addToCart('GeoTIFF Orthomosaic Export', '$420', 'Airborne Ops', 'RTK LOCKED');
      renderCart();
    });
  });
}