import { showToast } from 'site.js';

const ROOMS = {
  suite: { name: 'Deluxe Ocean Suite', basePrice: 340, inventory: 8 },
  penthouse: { name: 'Executive Villa', basePrice: 620, inventory: 3 },
};

export function crsReady() {
  $w.onReady(() => {
    let currentRoom = 'suite';
    let isStopSell = false;

    const update = () => {
      const room = ROOMS[currentRoom];
      const surge = $w('#surgeSlider').value;
      const calculatedPrice = Math.round(room.basePrice * (1 + surge / 100));
      const activeInv = isStopSell ? 0 : room.inventory;
      const priceDisplay = isStopSell ? 'STOP SELL' : '$' + calculatedPrice;

      $w('#roomNameReadout').text = room.name;
      $w('#surgeReadout').text = '+' + surge + '% ($' + calculatedPrice + ')';
      $w('#inventoryReadout').text = activeInv + ' Rooms • ' + priceDisplay;
      $w('#otaStatusReadout').text = (isStopSell ? 'STOPPED' : 'Synced') + ' • ' + activeInv + ' Rooms (' + priceDisplay + ')';
    };

    $w('#roomSelect').onChange(() => {
      currentRoom = $w('#roomSelect').value;
      update();
    });
    $w('#surgeSlider').onChange(update);
    $w('#stopSellToggle').onChange(() => {
      isStopSell = $w('#stopSellToggle').checked;
      update();
    });
    update();

    $w('#syncButton').onClick(() => {
      showToast('2-Way OTA Webhook Sync Dispatched to all 45+ OTAs!');
      const now = new Date();
      const timeStr = now.toTimeString().split(' ')[0] + ' UTC';
      $w('#logTimeReadout').text = timeStr;
      $w('#logTextReadout').text =
        '[' + timeStr + '] SYNC DISPATCH: ' + ROOMS[currentRoom].name + ' rate adjusted to $' +
        Math.round(ROOMS[currentRoom].basePrice * (1 + $w('#surgeSlider').value / 100)) +
        ' across 45 channels in 142ms. Zero error packets.';
    });
  });
}