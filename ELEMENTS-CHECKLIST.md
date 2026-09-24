# Imagine360 — Per-Page Element Checklist (build against deployed Velo code)

Deployed 2026-09-24 via `wix publish --source local` (commit `c6c6d7d`).
Code is element-guarded: each `$w('#id')` silently no-ops until the element
exists with that exact ID. Build each element in the Wix Editor, then refresh
the published page — the code activates automatically (no re-publish needed
for the guards to unblock, but it's safe to republish after each page).

Legend: **ID** = exact ID string → _type_ — what the code does / valid options.

---

## 0. Global / Master Page (`src/pages/masterPage.js` → `public/site-helpers.js`)

Add these once on the **master page** (site header/footer area) so every page
shares the cart. Build them on a Strip/Hidden Box per `DESIGN-SPEC.md` §Header/Footer.

| Element ID | Type | Notes |
|---|---|---|
| `#cartTrigger` | Button | Click → opens drawer (`renderCart()` then show) |
| `#cartClose` | Button | Click → hides drawer |
| `#cartOverlay` | Container/Box | Click → hides drawer (lightbox above drawer) |
| `#cartDrawer` | Container (Floating) | Initially **hidden**; the slide-out drawer |
| `#cartCount` | Text | Shows item count → set to cart length |
| `#cartItems` | Repeater | Line items; per-item props used: `id, name, price, category, date, time, badge, image` |
| `#cartSubtotal` | Text | ₹ subtotal |
| `#cartAddons` | Text | +₹ add-ons (0 → "+₹0.00") |
| `#cartDiscount` | Text | −₹ 10% partner discount |
| `#cartGst` | Text | +₹ 18% GST |
| `#cartEscrow` | Text | +₹50 escrow fee (0 when cart empty) |
| `#cartTotal` | Text | ₹ grand total |
| `#cartCheckout` | Button | Inserts `bookings` via `createBooking`, clears cart, shows toast, hides drawer |
| `#cartToast` | Box (hidden) | Toast container, shown 3.5s |
| `#cartToastText` | Text | Toast message inside the box |

Cart math (matches `DESIGN-SPEC.md` §11): `subtotal → +addons → −10% (partner) → +18% GST → +₹50 escrow → total`.

---

## 1. Home (`src/pages/Home.pe8aa.js`) — DESIGN-SPEC §7, card 5 "Direct Session Builder"

| Element ID | Type | Notes |
|---|---|---|
| `#capabilitySelect` | Dropdown | Options must have values: `visual` / `drone` / `commercial` / `saas` |
| `#scaleSlider` | Slider | Min 1, Max 3, Step 1 (Single Pilot / Multi-Location / Enterprise Fleet) |
| `#costReadout` | Text | Shows `₹X,XXX` starting allocation |
| `#tierReadout` | Text | Tier name (Standard Tier / Enterprise Expansion / Full Autonomous Fleet) |
| `#instantLockButton` | Button | Adds to cart, label ↦ "Allocated ✓" for 2.5 s |

Base rates: visual ₹2,400/₹5,800/₹14,000 · drone ₹1,800/₹4,200/₹9,500 ·
commercial ₹3,200/₹7,500/₹18,500 · saas ₹850/₹2,200/₹6,800.

---

## 2. Book Online (`src/pages/Book Online.ryclc.js`) — DESIGN-SPEC §11

| Element ID | Type | Notes |
|---|---|---|
| `#addonExpress` | Checkbox | Express delivery +₹250 |
| `#addonRawDLog` | Checkbox | RAW D-Log +₹128 |
| `#addonRtmp` | Checkbox | RTMP +₹490 |
| `#addonGstSplit` | Checkbox | GST-split option flag (included in math) |
| `#qtySelect` | Dropdown | Changing it re-runs totals |
| `#dateSelect` | Dropdown/Date | Value becomes `bookings.target_date` |
| `#slotSelect` | Dropdown | Value becomes `bookings.slot` |
| `#siteInput` | Text input | Value becomes `bookings.site` |
| `#cartSubtotal` … `#cartTotal` | Text ×6 | Same IDs as master cart readouts (page re-writes them incl. add-ons) |
| `#checkoutButton` | Button | `createBooking(…)` → toast "Dispatch Session Confirmed! Reference #I360-XXXX" |

---

## 3. 3D Visualization & Rendering (`src/pages/3D Visualization & Rendering.l6fab.js`) — DESIGN-SPEC §9 (reference page)

| Element ID | Type | Notes |
|---|---|---|
| `#cameraRadioGroup` | Radio button group | Values: `living` / `deck` / `lounge` |
| `#cameraLabelReadout` | Text | Shows "Living Room"/"Deck"/"Lounge" |
| `#flooringDropdown` | Dropdown | e.g. Calacatta Gold / Smoked French Oak / Belgian Bluestone |
| `#woodDropdown` | Dropdown | e.g. American Walnut / Ebonized Ash / Bleached Oak |
| `#lightingDropdown` | Dropdown | e.g. Golden Hour Dusk / Midday Whites |
| `#flooringReadout` | Text | Shows selected flooring |
| `#woodReadout` | Text | Shows selected wood |
| `#lightReadout` | Text | Shows selected lighting |
| `#tier1Button` | Button | Adds "Essential Spatial Render" **₹249** |
| `#tier2Button` | Button | Adds "Interactive 3D Walkthrough" **₹620** |
| `#tier3Button` | Button | Adds "Enterprise Digital Twin" **₹1,650** |

---

## 4. Drone Services (`src/pages/Drone Services.r8u2n.js`) — DESIGN-SPEC §9 (Drone panel)

| Element ID | Type | Notes |
|---|---|---|
| `#altitudeSlider` | Slider | AGL metres; 125 shows "(LEGAL CEILING)" |
| `#overlapSlider` | Slider | % overlap |
| `#altitudeReadout` | Text | `Xm AGL` |
| `#overlapReadout` | Text | `X / Y%` |
| `#gsdReadout` | Text | `GSD = altitude × 0.0112 cm/px` |
| `#durationReadout` | Text | `round(overlap × 0.48) min` |
| `#pointReadout` | Text | `(150 − altitude) × 0.42 M PTS` |
| `#computeButton` | Button | Recompute readouts + refresh cart |
| `#geoTiffButton` | Button | Adds "GeoTIFF Orthomosaic Export" **₹420** |

---

## 5. Billing Software (`src/pages/Billing software.md1cg.js`) — DESIGN-SPEC §13

| Element ID | Type | Notes |
|---|---|---|
| `#clientSelect` | Dropdown | Values: `mh` (Horizon Apex, intra) / `dl` (Quantum Spatial, inter) / `ka` (OmniRetail, inter) |
| `#item1Qty` | Number input | Line 1 qty |
| `#item1Rate` | Number input | Line 1 rate |
| `#item2Qty` | Number input | Line 2 qty |
| `#item2Rate` | Number input | Line 2 rate |
| `#clientNameReadout` | Text | `Name (GSTIN)` |
| `#posReadout` | Text | Place of supply `27-MAHARASHTRA` etc. |
| `#taxLabelReadout` | Text | "Inter-State (IGST 18%)" / "Intra-State (CGST 9% + SGST 9%)" |
| `#subtotalReadout` | Text | ₹ subtotal |
| `#cgstReadout` | Text | ₹ 9% (blank for inter-state) |
| `#sgstReadout` | Text | ₹ 9% (blank for inter-state) |
| `#igstReadout` | Text | ₹ 18% (blank for intra-state) |
| `#payableReadout` | Text | ₹ total payable |
| `#generateIrnButton` | Button | 600 ms → 48-char hash + toast "IRN Generated & Pushed to NIC Portal (200 OK)" |
| `#irnHashReadout` | Text | Shows the generated IRN hash |

---

## 6. Booking Engine (`src/pages/Booking engine.ilg36.js`) — DESIGN-SPEC §13

| Element ID | Type | Notes |
|---|---|---|
| `#roomSelect` | Dropdown | Values: `suite` (Deluxe Ocean Suite, ₹340, inv 8) / `penthouse` (Executive Villa, ₹620, inv 3) |
| `#surgeSlider` | Slider | 0–40 (%) surge applied to base price |
| `#stopSellToggle` | Toggle | Checked → inventory 0 + reads "STOP SELL" |
| `#roomNameReadout` | Text | Room name |
| `#surgeReadout` | Text | `+X% (₹price)` |
| `#inventoryReadout` | Text | `N Rooms • ₹price / STOP SELL` |
| `#otaStatusReadout` | Text | Synced/STOPPED • status line |
| `#syncButton` | Button | Sends toast + appends sync log |
| `#logTimeReadout` | Text | UTC timestamp of last sync |
| `#logTextReadout` | Text | Sync dispatch log line |

---

## 7. Inquiry Services Page (`src/pages/Inquiry Services Page.ls2mn.js`) — DESIGN-SPEC §12

| Element ID | Type | Notes |
|---|---|---|
| `#contactForm` | Wix Forms form | `onSubmit` → toast "Dispatch inquiry transmitted. An Operations Director will reach out within 2 hours." |

> Form should map to the `inquiries` collection (fields: first_name, last_name, email,
> phone, company, vertical, budget, message, status, created_at) or keep Wix Forms'
> own contact collection. The deployed `dispatch.jsw` has `createInquiry` ready.

---

## Deferred — Client Dashboard (not deployed)

Will read CMS `missions` + `assets` into repeaters. Needs a **new member page**
(create in editor, then wire file): `#missionsRepeat`, `#assetsRepeat`
(repeaters), `#activeMissionsReadout`, `#assetsReadout` (text).
Gate the page as Members-only (no code needed).

---

## Backend / data (already live)

- `backend/dispatch.jsw` — `createBooking` (→ `bookings`), `createInquiry` (→ `inquiries`), `listMissions`/`listAssets`/`listServices`/`listGstClients`.
- `backend/pricing.jsw` — shared ₹ math constants & helpers.
- Collections `bookings`, `inquiries`, `missions`, `assets`, `services`, `gst_clients` exist on the live site. `bookings.items` is stored as a JSON string.

## Verify after building

Each page: add the elements → **Save → Publish** → open live page → test the interaction (e.g. Home slider updates `#costReadout`, Book Online checkout inserts a `bookings` row with a toast + `I360-XXXX` reference).