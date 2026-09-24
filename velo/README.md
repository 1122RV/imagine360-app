# Imagine360 — Velo Code Port (CLI deploy)

Velo page code cannot be deployed through the Wix REST API. Code ships through
**Git Integration & Wix CLI for Sites**. This folder holds the ported logic,
written to match the structure of a Wix site repo. You wire it to your live site
once, then `wix publish` deploys.

Target site: `https://www.imagine360tours.in` (site ID `b2907b17-4678-42cb-bc8a-278678b23164`,
Classic Wix Editor, Velo enabled, INR / Asia-Kolkata).

---

## What is ported (logic, not layout)

| Live page | Local source | Velo file | Ported logic |
|---|---|---|---|
| Home (`/`) | `Home.tsx` | `src/pages/home.js` | Direct Session Builder: capability select, scale slider 1–3, `baseRates` cost readout, Instant Lock → add to cart + "Allocated ✓" reset in 2.5 s |
| Book Online (`/book-online`) | `BookOnline.tsx` | `src/pages/book-online.js` | Cart math: subtotal → +addons (express 250 / rawDLog 128 / rtmp 490) → −10% partner → +18% GST → +$50 escrow; checkout → insert `bookings` + `I360-XXXX` reference toast |
| Drone Services (`/drone-services`) | `DroneOperations.tsx` | `src/pages/drone-services.js` | Telemetry: `GSD = altitude×0.0112`, `duration = round(overlap×0.48)`, `points = (150−altitude)×0.42`; GeoTIFF → cart |
| Billing Software (`/billing-software`) | `GstBillingSaas.tsx` | `src/pages/billing-software.js` | Invoice builder: client select (mh intra / dl, ka inter), CGST 9% + SGST 9% (intra) / IGST 18% (inter), 48-char IRN hash + "NIC Portal (200 OK)" toast |
| Booking Engine (`/booking-engine`) | `HospitalityCrs.tsx` | `src/pages/booking-engine.js` | Rate controller: suite 340×8 / penthouse 620×3, surge `base×(1+s/100)`, stop-sell → 0 inventory, push-sync log |
| 3D Visualization (`/3d-visualization-rendering`) | `ThreeDVisualization.tsx` | `src/pages/3d-visualization-rendering.js` | Camera switcher (living/deck/lounge), flooring/wood/lighting readouts, tier cards → cart |
| Client Dashboard (new member page) | `ClientDashboard.tsx` | `src/pages/client-dashboard.js` | Reads CMS `missions` + `assets` into repeaters |
| Contact Us (`/inquiry-services-page`) | `ContactUs.tsx` | `src/pages/contact-us.js` | Toast after Wix Forms submit ("…within 2 hours") |

Global infra:

| File | Purpose |
|---|---|
| `src/site.js` | Global site code: `wix-storage-frontend` cart key `im360_cart`, cart drawer totals, toast element `#cartToast`/`#cartToastText`, checkout → `createBooking` |
| `src/public/cart-utils.js` | Frontend module importable from any page: cart CRUD, `cartTotals` (same math), `bookingReference` |
| `src/backend/pricing.jsw` | Backend web-module: shared math + constants (`HOME_BASE_RATES`, GST split, IRN, CRS) — used by future backend triggers |
| `src/backend/dispatch.jsw` | Backend web-module: `createBooking` (inserts into `bookings`), `createInquiry`, `listMissions`, `listAssets`, `listServices`, `listGstClients` (replaces Supabase) |

## Data prerequisites (already done)
- CMS `missions` (+ `category`, `pilot`, `deliverable`, `eta`) and `assets` seeded — powers Client Dashboard.
- Wix Bookings catalog (12 services in 4 categories) — powers Book Online tiers.
- Wix Forms maps to the Contact collection.

---

## Step 1 — Install the CLI (once)

Prereqs: Git, Node ≥ 20.11, npm or yarn, an SSH key on your GitHub account.

```bash
npm install -g @wix/cli
```

## Step 2 — Connect your site to GitHub (in the browser editor)

1. Open your site in the Wix Editor (site ID above).
2. Code sidebar → **GitHub** → **Connect to GitHub** → **Continue** → **Sign In**.
3. Authorize Velo, choose repo owner + name, **Create**, **Install** the Velo app,
   approve install.
4. Copy the terminal commands the editor shows (Local Dev Setup). They will be
   similar to:

```bash
git clone <your-site-repo-url> imagine360tours
cd imagine360tours
npm install
```

> Note: the CLI flow **requires** a connected GitHub repo. There is currently no
> REST/API-only way to push Velo code to a Classic Editor site.

## Step 3 — Drop the ported code into the site repo

Copy the `velo/src/*` tree into the cloned repo top level (`src/pages/`,
`src/backend/`, `src/public/`, `src/site.js`), merging with anything already there
(the repo already has `src/pages/<page>.js` files — **replace file contents**, keep
the repo's own file names): 

```bash
cp -r velo/src/* <repo>/src/
```

Keep the repo's original page file names; rename ours to match if they differ:

| Our file | Repo page file (match your editor's) |
|---|---|
| `src/pages/home.js` | e.g. `src/pages/Home.js` |
| `src/pages/book-online.js` | e.g. `src/pages/BookOnline.js` |
| `src/pages/drone-services.js` | e.g. `src/pages/DroneServices.js` |
| `src/pages/billing-software.js` | e.g. `src/pages/BillingSoftware.js` |
| `src/pages/booking-engine.js` | e.g. `src/pages/BookingEngine.js` |
| `src/pages/3d-visualization-rendering.js` | e.g. `src/pages/Rendering.js` |
| `src/pages/client-dashboard.js` | new page file you create first in the editor |
| `src/pages/contact-us.js` | e.g. `src/pages/ContactUs.js` |

## Step 4 — Wire element IDs to the editor

Each `$w('#id')` must match an element on that page. In the editor, give elements
the IDs used in the code (or rename IDs in code). Required per file:

**`site.js`** (site shared): `#cartTrigger`, `#cartCount`, `#cartDrawer`, `#cartClose`,
`#cartOverlay`, `#cartItems` (repeater, item props `name price total image`),
`#cartSubtotal`, `#cartAddons`, `#cartDiscount`, `#cartGst`, `#cartEscrow`, `#cartTotal`,
`#cartCheckout`, `#cartToast` (box), `#cartToastText`.

**`home.js`**: `#capabilitySelect` (dropdown: visual/drone/commercial/saas),
`#scaleSlider` (slider 1–3), `#costReadout`, `#tierReadout`, `#instantLockButton`.

**`book-online.js`**: `#addonExpress`, `#addonRawDLog`, `#addonRtmp`, `#addonGstSplit`
(checkboxes), `#dateSelect`, `#slotSelect`, `#siteInput`, `#qtySelect`, the six cart
readout texts, `#checkoutButton`.

**`drone-services.js`**: `#altitudeSlider` (range), `#overlapSlider`, `#altitudeReadout`,
`#overlapReadout`, `#gsdReadout`, `#durationReadout`, `#pointReadout`, `#computeButton`,
`#geoTiffButton`.

**`billing-software.js`**: `#clientSelect` (mh/dl/ka), `#item1Qty`, `#item1Rate`,
`#item2Qty`, `#item2Rate` (number inputs), `#clientNameReadout`, `#posReadout`,
`#taxLabelReadout`, `#subtotalReadout`, `#cgstReadout`, `#sgstReadout`, `#igstReadout`,
`#payableReadout`, `#irnHashReadout`, `#generateIrnButton`.

**`booking-engine.js`**: `#roomSelect` (suite/penthouse), `#surgeSlider` (0–40),
`#stopSellToggle` (toggle), `#roomNameReadout`, `#surgeReadout`, `#inventoryReadout`,
`#otaStatusReadout`, `#logTimeReadout`, `#logTextReadout`, `#syncButton`.

**`3d-visualization-rendering.js`**: `#cameraRadioGroup`, `#cameraLabelReadout`,
`#flooringDropdown`, `#woodDropdown`, `#lightingDropdown`, their readout texts,
`#tier1Button`/`#tier2Button`/`#tier3Button`.

**`client-dashboard.js`**: `#missionsRepeat`, `#assetsRepeat`, `#activeMissionsReadout`,
`#assetsReadout`.

**`contact-us.js`**: `#contactForm` (the Wix Forms form on the page).

## Step 5 — Preview / publish

```bash
wix login          # browser auth, one-time
wix whoami         # sanity check
wix dev            # opens Local Editor to test changes in real time
wix publish        # deploy to production (choose Latest commit from origin/main)
```

Tip: the repo must exist on GitHub and be pushed before `wix publish` — publish
prefers `origin/main`; `Local code` option is available if you don't push.

---

## Field mapping notes
- `bookings` collection fields (from `BOokOnline.tsx` supabase insert):
  `target_date`, `slot`, `site`, `items`, `total`, `status`, `created_at`.
- `inquiries` collection fields: `first_name`, `last_name`, `email`, `phone`,
  `company`, `vertical`, `budget`, `message`, `status`, `created_at` — maps the
  Wix Forms Contact collection if you point `createInquiry` at it.
- Auth (Supabase sign-in) is intentionally **not** ported: it maps to Wix Members
  (`wix-members` / `wix-members-backend`). Client Dashboard should be gated with a
  members-only page permission instead of code.