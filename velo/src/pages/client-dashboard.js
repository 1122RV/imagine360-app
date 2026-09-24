import { listMissions, listAssets } from 'backend/dispatch.jsw';

export function clientDashboardReady() {
  $w.onReady(() => {
    listMissions().then((missions) => {
      $w('#missionsRepeat').dataset = missions;
      const active = missions.filter((m) => m.status === 'active').length;
      $w('#activeMissionsReadout').text = String(active);
    }).catch(() => {
      $w('#missionsRepeat').dataset = [{}];
    });

    listAssets().then((assets) => {
      $w('#assetsRepeat').dataset = assets;
      $w('#assetsReadout').text = String(assets.length);
    }).catch(() => {
      $w('#assetsRepeat').dataset = [{}];
    });
  });
}