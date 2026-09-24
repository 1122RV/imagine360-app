import { showToast } from 'site.js';
import { generateIrnHash } from 'backend/pricing.jsw';

const CLIENTS = {
  mh: { name: 'Horizon Apex Towers Pvt Ltd', gstin: '27AABCH1234F1Z8', pos: '27-MAHARASHTRA', inter: false },
  dl: { name: 'Quantum Spatial Logistics LLP', gstin: '07AACQ5678K1ZQ', pos: '07-DELHI', inter: true },
  ka: { name: 'OmniRetail Global Ventures', gstin: '29AABCO9012L1ZV', pos: '29-KARNATAKA', inter: true },
};

export function gstBillingReady() {
  $w.onReady(() => {
    const updateInvoice = () => {
      const client = CLIENTS[$w('#clientSelect').value];
      const isInterState = client.inter;
      $w('#clientNameReadout').text = client.name + ' (' + client.gstin + ')';
      $w('#posReadout').text = client.pos;
      $w('#taxLabelReadout').text = isInterState ? 'Inter-State (IGST 18%)' : 'Intra-State (CGST 9% + SGST 9%)';

      const tot1 = Math.max(0, $w('#item1Qty').value || 0) * Math.max(0, $w('#item1Rate').value || 0);
      const tot2 = Math.max(0, $w('#item2Qty').value || 0) * Math.max(0, $w('#item2Rate').value || 0);
      const subtotal = tot1 + tot2;
      const cgst = isInterState ? 0 : subtotal * 0.09;
      const sgst = isInterState ? 0 : subtotal * 0.09;
      const igst = isInterState ? subtotal * 0.18 : 0;
      const totalPayable = subtotal + cgst + sgst + igst;

      $w('#subtotalReadout').text = '₹' + subtotal.toLocaleString('en-IN', { minimumFractionDigits: 2 });
      $w('#cgstReadout').text = isInterState ? '' : '₹' + cgst.toLocaleString('en-IN', { minimumFractionDigits: 2 });
      $w('#sgstReadout').text = isInterState ? '' : '₹' + sgst.toLocaleString('en-IN', { minimumFractionDigits: 2 });
      $w('#igstReadout').text = isInterState ? '₹' + igst.toLocaleString('en-IN', { minimumFractionDigits: 2 }) : '';
      $w('#payableReadout').text = '₹' + totalPayable.toLocaleString('en-IN', { minimumFractionDigits: 2 });
    };

    $w('#clientSelect').onChange(updateInvoice);
    $w('#item1Qty').onInput(updateInvoice);
    $w('#item1Rate').onInput(updateInvoice);
    $w('#item2Qty').onInput(updateInvoice);
    $w('#item2Rate').onInput(updateInvoice);
    updateInvoice();

    $w('#generateIrnButton').onClick(() => {
      $w('#generateIrnButton').disable();
      setTimeout(() => {
        $w('#irnHashReadout').text = generateIrnHash();
        $w('#generateIrnButton').enable();
        showToast('IRN Generated & Pushed to NIC Portal (200 OK)');
      }, 600);
    });
  });
}