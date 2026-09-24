import { addToCart } from 'public/cart-utils.js';
import { renderCart } from 'site.js';

const CAMERAS = {
  living: 'Living Room',
  deck: 'Deck',
  lounge: 'Lounge',
};
const FLOORING = ['Calacatta Gold', 'Smoked French Oak', 'Belgian Bluestone'];
const WOOD = ['American Walnut', 'Ebonized Ash', 'Bleached Oak'];
const LIGHTING = ['Golden Hour Dusk', 'Midday Whites'];

export function threeDReady() {
  $w.onReady(() => {
    $w('#cameraRadioGroup').onChange(() => {
      const active = $w('#cameraRadioGroup').value;
      $w('#cameraLabelReadout').text = CAMERAS[active] || active;
    });

    const updateMaterial = () => {
      $w('#flooringReadout').text = $w('#flooringDropdown').value;
      $w('#woodReadout').text = $w('#woodDropdown').value;
      $w('#lightReadout').text = $w('#lightingDropdown').value;
    };

    $w('#flooringDropdown').onChange(updateMaterial);
    $w('#woodDropdown').onChange(updateMaterial);
    $w('#lightingDropdown').onChange(updateMaterial);
    updateMaterial();

    $w('#tier1Button').onClick(() => {
      addToCart('Essential Spatial Render', '$249', 'Spatial Synthesis', 'Interactive WebGL');
      renderCart();
    });
    $w('#tier2Button').onClick(() => {
      addToCart('Interactive 3D Walkthrough', '$620', 'Spatial Synthesis', 'Interactive WebGL');
      renderCart();
    });
    $w('#tier3Button').onClick(() => {
      addToCart('Enterprise Digital Twin', '$1,650', 'Spatial Synthesis', 'BIM IFC4');
      renderCart();
    });
  });
}