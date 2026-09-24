# Imagine360.tours.in — Wix Rebuild Plan

Source: `/var/home/RV/Downloads/Imagine360` (React + Vite + Tailwind v4 + Supabase SPA, 28 src files, 9,748 lines).
Target: Wix site `b2907b17-4678-42cb-bc8a-278678b23164` (https://www.imagine360tours.in), Premium Editor-Velo, INR, Asia/Kolkata.

## Existing Wix inventory
- Apps installed: Wix Bookings, Wix Forms (+Payments), Wix Hotels, Wix Invoices, Wix Members Area, Wix Portfolio (`d90652a2-f5a1-4c7c-84c4-d4cdcc41f130`), Wix Pricing Plans, Promote SEO.
- No Wix Stores, no Wix Blog (store_products = 0, blog_posts = 0).
- 92 sitemap pages, 100 crawled (all 200). SEO gap: no meta descriptions / og:image anywhere.
- WixForms collection `WixForms/016bb652-e829-492e-b13c-0ed0449479d7` fields: `first_name_ddaa`, `last_name_a73f`, `email_cda7`, `phone_ee27`, `message`, `status`, `createdDate`.
- CMS: 23 collections (`database_layouts.json`). Portfolio already holds 6 projects.

## Design tokens (index.css Material 3 @theme)
- background `#0f131c`, on-surface `#dfe2ee`, primary `#4cd7f6`, on-primary `#003640`, primary-container `#06b6d4`
- secondary `#c0c1ff`, secondary-container `#3131c0`, tertiary `#4edea3`, error `#ffb4ab`, outline `#869397`
- surface `#0f131c`, surface-container `#1c2028`, low `#181c24`, high `#262a33`, highest `#31353e`, bright `#353942`, lowest `#0a0e16`
- spacing: xs .25rem, sm .5rem, md 1rem, lg 1.5rem, xl 2.5rem (same as gutters/margins)

Rebuild as Wix design-system theme (dark), matching the above hex values exactly.

---

## 1. Visual layout blocks

### Global shell
- **Navbar** (fixed, z-50): micro-telemetry ribbon (ENGINE WEBGL 2.0 / BIM-CAD READY / NODES / LATENCY / REGION) → main links (Home, Services, Portfolio, 3D Visualization, Drone Operations, Commercial Shoots, Digital Marketing) → "SaaS Solutions" dropdown (GST Billing SaaS, Hospitality CRS) → Book Online, Client Area; right cluster: cart trigger w/ count badge, "Book Session" CTA, avatar → auth modal; mobile drawer.
- **Footer**: 6-column link grid (3D Visualization / Drone Operations / Commercial Shoots / Digital Marketing / Billing Software / Booking Engine) + operational-nodes ribbon (privacy/accessibility links, terminal/network/API shortcut buttons, © 2025).
- **AuthModal**: centered dialog, 3 role tabs (Client Twin / Flight Ops / SaaS & CRS), Google + Okta SSO buttons, email/password form with "Remember device", FIDO2 hint.
- **CartDrawer**: right slide-in panel; item list (image, badge), promo input, cost breakdown (subtotal → −10% partner → +18% GST → +$50 escrow), grand total, "Lock Dispatch" checkout.
- **ToastContainer**: bottom-right, 3.5s auto-dismiss.

### Pages
- **Home**: hero (glow orbs, "Operational Matrix // V4.2" badge, gradient headline, 2 CTAs, 6-col proof strip) → 4 live-telemetry metric cards (Execution Velocity 99.4% / Flight Ops 450+ / SaaS Throughput 12M+ / Quality Index 4.9) → 6-pillar service matrix (3×2 grid) → bento portfolio (All/3D/Drone/SaaS tabs) → Direct Session Builder (capability select + scale slider + cost readout + Instant Lock) → 3 endorsement cards → CTA banner.
- **Services**: command deck (search + 6 vertical jump tabs 01–06) → 6 anchored vertical sections (Drones & Geospatial / 3D & Spatial VR / Commercial Film / Digital Performance / Enterprise GST SaaS / Hospitality CRS), each w/ package pricing + add-to-cart.
- **Portfolio**: header + performance bento pill → 6 filter pills w/ counts → mosaic grid (6 case studies, span classes) → pagination ("Load More" → alert) → case-study modal (client/turnaround/metric/status, gear/specs, quote, **Inquire Similar Scope** = +$2,800 to cart + navigate).
- **3D Visualization**: KPI grid → WebGL viewport console (left: image + pulsing hotspots + camera switcher living/deck/lounge; right: Spatial Configurator with flooring/joinery panels, telemetry specs, WebXR embed copy) → pricing tiers $249 / $620 / $1,650.
- **Drone Operations**: telemetry bar → MISSION CONFIGURATOR (target select, sensor payload ixm/l2/x9 toggles, altitude 125 + overlap 80 sliders, GSD readout matrix, Compute) + telemetry viewport (status bar, image, GeoTIFF add-to-cart, Inspect 3D Mesh) → 3 ₹ tiers → feasibility banner (input + Instant check).
- **GST Billing SaaS**: trust ribbon → 4 trust metric cards → Invoice Builder console (left: client select mh/ddl/ka, intra/inter toggle, two line-items qty×rate, NIC IRP dispatch) + live invoice preview (right: GST/E-Way/Thermal doc tabs, IRN hash, ack no, grand total, JSON export) → tiers ₹499 / ₹1,299 / ₹3,499.
- **Hospitality CRS**: telemetry ribbon → KPI bar → Inventory & Rate Controller (property profile, room selector suite/penthouse, surge slider 0–40%, stop-sell toggle, push sync) + 2-Way Channel Gateway (4 OTA rows w/ latency + inventory/price state, reconciliation log ticker) → tiers ₹1,999 / ₹4,499 / custom.
- **Book Online**: mission-pipeline ribbon → 5-step configurator (category cards → package tiers → date/slot calendar → site coords + inputs → add-ons) → sticky sidebar cart w/ promo/cost/checkout.
- **Client Dashboard**: header (avatar initial, SLA GOLD badge, logged-in-as, "Commission New Mission") → 4 telemetry cards → Live Mission Pipeline (3 rows w/ progress) → Asset Vault (4 files) + API/Webhook tile (masked key reveal/copy).
- **Contact Us**: header → left: Project Scoping Inquiry form; right: Global Operations Hubs (Mumbai/Dubai/Singapore) + direct channels.

---

## 2. Forms → Wix mapping

| Form | Fields / defaults | Behavior | Wix target |
|---|---|---|---|
| ContactUs | firstName*, lastName*, email*, phone*, company, vertical (default '3d'), budget (default '$15,000 - $50,000'), message | submit → insert `inquiries` w/ created_at; toast "Dispatch inquiry transmitted… ~2h response" | Wix Forms collection (map to `first_name_ddaa`, `last_name_a73f`, `email_cda7`, `phone_ee27`, `message`, `status`, `createdDate`; add `company`, `vertical`, `budget` fields) |
| BookOnline | siteAddress, lotSize (default '48,500 Sq Ft (Commercial Campus)'), seats (1–50), promoInput `IMAGINE360-Q4`, addons express/rawDLog/rtmp/gstSplit | preview math live; checkout → insert `bookings` (target_date, slot, site, items, total, status 'confirmed') → toast "Dispatch Session Confirmed! Reference #I360-XXXX" | Wix Bookings (native service w/ custom form fields) or CMS `Bookings` + Wix Payments |
| CartDrawer | promo code → Apply toast | insert `bookings` w/ items/total/status → toast → redirect Client Dashboard | Wix Sign-up/Registration, custom cart via Velo + CMS |
| AuthModal | email, password (toggle), role tabs, SSO buttons | `signIn` via Supabase auth w/ enterprise mock fallback | Wix Members + login; map Client/FlightOps/CRS to member roles |

Notes: promotion code `IMAGINE360-Q4` can map to a Wix coupon/discount. All Supabase inserts become `wixData.insert()` against the corresponding CMS collection (Velo backend).

---

## 3. Data variables → Wix CMS collections

| Source state/constant | Content | Wix target |
|---|---|---|
| CartContext cart (seeded 2 items: Cinematic Drone Shoot $1,250 · VR Architectural Walkthrough $850) | id, name, price, category, date, time, badge, image | Storefront cart or CMS `cart_items`; seed only for demo |
| AuthContext user (capt.rao@imagine360tours.com / ENTERPRISE PARTNER TIER) | email, role, id | Wix Members, role → permissions |
| supabase.ts (URL/key, localStorage `sb_custom_url`/`sb_custom_anon`, SQL presets) | connectors + task/note/table admin | Not needed on Wix (dead admin scaffold); drop |
| Home `baseRates` / `tierNames` | visual [2400,5800,14000], drone [1800,4200,9500], commercial [3200,7500,18500], saas [850,2200,6800] | CMS `services` collection (name, category, tier, price); calculator in Velo |
| Portfolio 6 `ProjectData` | title, subtitle, client, turnaround, metric, gear, specs, quote, image, span, badge, accent | Existing Wix Portfolio items (6) |
| ThreeD cameras/materials | 3 cameraScenes; Calacatta Gold / American Walnut / Golden Hour Dusk defaults | CMS `configurator_options` or inline datasets |
| Drone range inputs | altitude 125, overlap 80, payload ixm\|l2\|x9 | Calculator only (Velo); no persistence |
| GST `clients` | mh 27AABCH1234F1Z8 intra / dl 07AACQ5678K1ZQ inter / ka 29AABCO9012L1ZV inter | CMS `gst_clients` or fixture in Velo |
| CRS `roomData` | suite $340/8 units; penthouse $620/3 units; surge 15%; stop-sell | Wix Hotels (rooms/inventory) — already installed |
| BookOnline categories/addons | 3d $850·48h, drone $1,250 RTK, film; addons 250/128/490/— | Wix Bookings catalog |
| ClientDashboard missions/assets | IDs I360-8420/821/822; 4 vault files | CMS `missions` + `assets` |

Static copy & pricing text → paste directly into Wix editor pages (no React state needed).

---

## 4. Logic functions → Velo

| Source function | Behavior | Wix replacement |
|---|---|---|
| Cart price math (`parsePrice` strips non-numeric) | subtotal → −10% partner → +18% GST → +$50 escrow → grand total | Velo `wixData`/bookings calc, or Wix eCommerce tax settings; escrow = fixed surcharge line |
| Home `currentCost`, `handleInstantLock` | `baseRates[cap][scale-1]`; reserve text + addToCart, reset 2.5s | Velo on-button; toast via Wix modal/text |
| Bundle buys (portfolio, tiers, BookOnline) | add to cart → navigate book-online | Cart via Wix Bookings/Storefront line add + navigation |
| Drone telemetry | targetGsd = altitude×0.0112; duration = overlap×0.48; pointCount = (150−altitude)×0.42 | Velo compute + lobby text |
| GST tax + IRN | CGST 9% + SGST 9% (intra) / IGST 18% (inter); 48-char IRN hex; 600ms "(200 OK)" | Velo calc; IRN = simulation (mock) |
| CRS math | calculatedPrice = base×(1+surge/100); activeInv = stopSell?0:inv; push-sync log | Wix Hotels native; drop fake channel push |
| Auth | signIn/signUp/signOut + session listener + mock fallback | Wix Members (`wix-members-backend`), role checks |
| Supabase helpers (sanitize/extract/reinit) | credential overrides for admin console | Not needed (dead admin scaffold) |

Simulated ops (900ms Compute, 600ms IRN/push-sync, telemetry ribbons) should either be kept as static demo text or dropped, not faked in Velo.

---

## Known issues to fix in the rebuild
- Dead code: `TaskTracker`, `NotesApp`, `TableExplorer`, `SqlSnippets`, `AuthManager`, `ConnectionModal`, `Header` — imported nowhere; omit.
- Broken nav targets: `commercial-shoots` and `digital-marketing` have no page case → fall back to Home. Give them real pages or remove links.
- No auth gating: Client Dashboard renders regardless of login (only shows "logged in" state).
- Images: all `lh3.googleusercontent.com/aida-public/...` and `/gal-*` placeholder URLs must be replaced with Wix `8bb438_*` media.
- SEO: add meta description + og:image to every page (currently none of the 92 pages have them).
- Accessibility/UX: add form labels, night-mode is already dark; keep contrast ratios per Material 3 tokens.

---

## Phased execution order
1. **Foundations**: Publish the Material 3 dark theme in the editor. Add `services`, `missions`, `assets`, `gst_clients`, `configurator_options` CMS collections; extend `WixForms/016bb652` with `company`, `vertical`, `budget`.
2. **Forms**: Rebuild ContactUs via Wix Forms (map existing collection), wire Wix Bookings + cart/checkout, enable Wix Members login.
3. **Content pages**: Home, Services, Portfolio (map existing 6 projects + media swap to `8bb438_*`), 3D Visualization, Drone Operations, Commercial Shoots, Digital Marketing.
4. **Tool pages**: GST Billing SaaS (Velo calc + invoice preview), Hospitality CRS (map to Wix Hotels), Book Online (Wix Bookings catalog + 5-step page), Client Dashboard (CMS missions/assets + members gate).
5. **Global + SEO**: Navbar/footer rebuild, meta descriptions + og:images across all pages, remove dead nav targets, final crawl re-check.

Verification each phase: preview on the site, click every CTA/cart link, confirm no 404 pages, re-crawl with crawler.mjs and confirm all 200 + new meta/og tags present.