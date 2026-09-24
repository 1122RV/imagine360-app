# Imagine360tours — Live Site Visual Design Spec

Source of truth: the local React app in this repo (`src/`). This doc tells the Wix Classic
Editor rebuild exactly how to make the live site (`imagine360tours.in`) look like the local
app. Mirror the tokens below (they come from `src/index.css` and the page components), then
rebuild each page section in the editor using Wix-native primitives (Text, Buttons, Wix
Galleries, Form Builder, Wix Bookings) with these colors, fonts, and spacing.

---

## 1. Visual Identity Summary

- **Dark, engineering "mission control" aesthetic.** Jet-black/navy background,
  glowing cyan primary, indigo secondary, green tertiary. Mono-font status ribbons
  everywhere. Heavy technical copy style.
- Three accent colors are the whole identity: **cyan (primary)**, **periwinkle
  (secondary)**, **green (tertiary)**. Never use warm colors except the error red.
- Bold uppercase mono labels ("ENGINE: WEBGL 2.0"), pill badges, pulsing status dots,
  telemetry numbers, progress bars. This is a "systems" brand — copy and UI should read
  like an operating console, not a generic agency site.

---

## 2. Color Tokens (from `src/index.css` @theme)

| Token                    | Hex       | Use                                              |
| ------------------------ | --------- | ------------------------------------------------ |
| `background` / `surface` / `surface-dim` | `#0f131c` | Page background (near-black navy)           |
| `surface-container-lowest`| `#0a0e16` | Header/footer/hero-ribbon background              |
| `surface-container-low`   | `#181c24` | Alternating section bands                        |
| `surface-container`       | `#1c2028` | Cards                                            |
| `surface-container-high`  | `#262a33` | Chips, active nav, thumbnails, raised cards      |
| `surface-container-highest`| `#31353e`| Borders, dropdown panels, hover fills            |
| `surface-bright`          | `#353942` | Hover states                                    |
| `on-surface` / `on-background` | `#dfe2ee` | Primary text (light lavender-white)          |
| `on-surface-variant`      | `#bcc9cd` | Secondary text, muted                            |
| `outline`                 | `#869397` | Tertiary/muted text, placeholders, labels         |
| `outline-variant`         | `#3d494c` | Hairline separators, ring borders                 |
| `primary`                 | `#4cd7f6` | **Cyan** — CTAs, active states, accents           |
| `on-primary`              | `#003640` | Text on cyan (dark teal)                          |
| `primary-container`       | `#06b6d4` | "Book Session" button fill, selected pills        |
| `primary-fixed`           | `#acedff` | Light cyan for hover/glow                         |
| `secondary`               | `#c0c1ff` | **Periwinkle** — pillar 02/05 accents             |
| `on-secondary`            | `#1000a9` | Text on secondary                                 |
| `secondary-container`     | `#3131c0` | Secondary glow blobs                              |
| `tertiary`                | `#4edea3` | **Green** — pillar 03/06 accents, success/status  |
| `on-tertiary`             | `#003824` | Text on tertiary                                  |
| `tertiary-container`      | `#1bbd85` | Green fills                                       |
| `error`                   | `#ffb4ab` | Errors only                                       |

Common color usage map:
- **CTA primary button**: fill `primary` (`#4cd7f6`), text `on-primary` (`#003640`), hover fill `primary-fixed` (`#acedff`). Glow shadow: `rgba(76,215,246,0.3–0.5)`.
- **Secondary button**: fill `surface-container-high`, text `on-surface`, border `surface-container-highest`.
- **Active nav/pill**: fill `primary`, text `on-primary`. Inactive: text `on-surface-variant`, hover fill `surface-container-high`.
- **Status dot**: 8px `tertiary`/`primary` circle with `animate-pulse`/`animate-ping`.
- **Gradient headline accent** (hero): `background-clip:text` from `primary` → `primary-fixed` → `secondary` (`rgba` fade from `#4cd7f6` to `#acedff` to `#c0c1ff`).

---

## 3. Typography

| Role          | Font                                  | Sizes / weights used in app            |
| ------------- | ------------------------------------- | -------------------------------------- |
| Display/headline | **Plus Jakarta Sans**, system-ui   | Hero `text-4xl→6xl` (~36–60px), `font-extrabold`, tight tracking, uppercase allowed |
| Body          | **Plus Jakarta Sans**, system-ui      | `text-xs→lg` (12–18px), `leading-relaxed` |
| Label/mono    | **JetBrains Mono**, monospace         | `text-[10px]→xs` (10–12px), uppercase, `tracking-wider/widest`, `font-bold` for status text |

Notes:
- Load **Plus Jakarta Sans** and **JetBrains Mono** from Google Fonts in the Wix site.
- Section headings: 24–32px bold; page H1s: 32–60px extrabold.
- The mono font is the brand signature — use it for every eyebrow label, badge, status chip, and footer column header.

---

## 4. Spacing & Shape

| Token            | Value           |
| ---------------- | --------------- |
| Space scale      | xs 4px · sm 8px · md 16px · lg 24px · xl 40px |
| Gutter (desktop/page) | 24px, `max-width 1280px` centered container |
| Section vertical padding | 48–64px (`py-12`/`py-16`) |
| Card radius      | `rounded-xl` = **12px** (cards, buttons) |
| Hero strip radius| `rounded-2xl` = **16px** (big panels, CTA banners) |
| Pill/badge radius| `rounded-full` (status chips, tab pills) |
| Small chip radius| `rounded-lg` = **8px** (icon tiles, small buttons) |

Corner radius rule of thumb: chips/tags 8px, buttons 12px, cards 12px, large panels 16px, status pills 999px.

Effects:
- **Card shadow**: soft `shadow-md` (subtle), `shadow-xl`/`shadow-2xl` for hero panels and modals.
- **Backdrop blur** on the header (85% opacity over page), telemetry strip, dropdowns.
- **Glow blobs**: large radial gradients (`blur-3xl`) in hero backgrounds — cyan at top center, secondary right, tertiary left. In the editor use Wix Shape with a blur effect and low-opacity fill, or a dark background image with these tints.
- **Borders**: hairline `border-surface-container-high/40` (~#262a33 at 40%) between sections and on cards.

---

## 5. Header (all pages)

Sticky top bar (`fixed`, full width, z-above-content), 85%-opacity `#0a0e16` background + backdrop blur, bottom hairline border.

1. **Micro-telemetry ribbon** (top, ~24px tall, mono 11px): left = pulsing tertiary dot + `ENGINE: WEBGL 2.0 (60 FPS STABLE)` / horizontal separators `/` + `BIM/CAD: READY (IFC4 & REVIT PIPELINE)` + `NODES: 128/128 CLOUD GPUs ONLINE`; right = `LATENCY: 14MS` + `REGION: US-EAST` chip. (On mobile, keep only the first chip; hide the rest.)
2. **Main bar** (80px): logo left (existing Imagine360 logo + wordmark "Imagine**360**tours" with `360` in cyan + mono micro-line "SYSTEMS // ENTERPRISE"), nav center/right, action cluster right.
3. **Nav links**: Home · Services · Portfolio · 3D Visualization · Drone Ops · Commercial Film · Growth Engine · **SaaS Solutions ▾** (dropdown: GST Billing SaaS · Hospitality CRS) · Book Online · Client Area.
   - Active link = cyan text + `surface-container-high` fill, 12px mono-ish tabs.
4. **Action cluster (right)**: cart bag button (40×40 `surface-container-high`, count badge = 20px cyan circle with dark teal number) · **"Book Session"** cyan-filled button · circular avatar (24px ring `outline-variant`, hover cyan) · hamburger on <1280px.
5. **Mobile menu**: slide-down panel on `#0a0e16`; grouped links; "Book Online Dispatch" in cyan, "Client Dashboard" in green as the last two rows.

Mapping to the live site: the existing Wix menu already has Home/Services/About/Book Online/Portfolio/My Subscriptions/Contact Us (crawl shows them). Keep those pages; restyle the menu container to `#0a0e16`/dark with cyan active states, add a "Book Session" cyan button and dark cart/profile icons. The telemetry ribbon is optional-extra flair if you can add a thin strip above the menu.

---

## 6. Footer (all pages)

Dark `#0a0e16` band, top hairline border, 64px vertical padding, `max-width 1280px`.

1. **6-column link grid** (2 cols mobile → 3 md → 6 desktop):
   - **3D Visualization** (Spatial Rendering, Real-time Configurator, Architectural Walkthroughs, CAD Synthesis)
   - **Drone Operations** (Aerial Photogrammetry, Cinematic Capture, LiDAR Mapping, Inspection Services)
   - **Commercial Shoots** (Brand Campaigns, Studio Production, Product Editorial, Post-Production VFX)
   - **Digital Marketing** (Growth Engineering, Performance Media, Brand Architecture, Analytics Telemetry)
   - **Billing Software** (Enterprise Invoicing, Usage Metering, Revenue Reconciliation, Tax Engine & APIs)
   - **Booking Engine** (Resource Scheduling, Crew Dispatch, Client Self-Service, Deposit Automation)
   - Column headers = mono 12px uppercase cyan; links = 12px `#bcc9cd`, hover white.
2. **Operational ribbon** (bottom strip, rounded 12px, `#181c24` at 50%): left = green pulsing chip "All Production Nodes Operational" + copyright line; right = Privacy Policy / Accessibility Statement links + three 32px icon buttons (terminal/public/code).

---

## 7. Home page layout (this is the flagship — match section by section)

1. **Hero** (negative-top-margin pulls it under the fixed header; background `#0a0e16` with cyan/secondary/tertiary glow blobs):
   - Pill: pulsing cyan dot + mono uppercase `IMAGINE360TOURS OPERATIONAL MATRIX // V4.2`.
   - H1 (~60px extrabold, centered): "Where Hyper-Real Creative Meets **High-Precision Tech**" (gradient accent words cyan→light-cyan→periwinkle).
   - Subcopy (~16px `#bcc9cd`, max-width ~768px centered).
   - Two buttons: **Explore All Services** (cyan fill + ↓ arrow, icon) · **Book Discovery Session** (dark raised with calendar icon).
   - Proof strip: 16px-radius panel listing 6 "trusted operator" partner names (icon + name in mono, 2/3/6-col grid): AURA LUX RESORTS · KRONOS REALTY · AEROFLEET GLOBAL · VALENCE CAPITAL · IMAGINE360 HOSPITALITY · VERTEX INFRASTRUCTURE.
2. **Telemetry band** (`#181c24`, 4 cards): Execution Velocity 99.4% · Flight Operations 450+ · SaaS Cloud Throughput 12M+ · Enterprise Quality Index 4.9/5. Each card = mono label, big extrabold number, caption, colored 6px progress bar (cyan/tertiary/secondary/light-cyan) at the stated fill %.
3. **6-Pillar Services Matrix** (`#0f131c`, 3-col card grid). Each card: mono chip `PILLAR 0X // TAG` (Pillar 01 CGI / 02 PRODUCTION / 03 AERIAL / 04 REVENUE / 05 SAAS FINTECH / 06 HOSPITALITY), Material icon in accent, bold title (3D Visualization & VR, Commercial & Media Shoots, Drone Operations & UAV, Digital Growth & Acquisition, Billing Software SaaS, Booking Engine & Channel Mgr), 12px description, 4 bullet items with 6px accent dots, full-width action button ("Configure Render Pipeline" / "Book Production Crew" / "Dispatch Drone Flight" / "Initiate Campaign Engine" / "Deploy Billing Sandbox" / "Integrate Booking CRS").
4. **Featured Production Artifacts** (`#181c24`): heading + filter pill-tab bar (All Fields · 3D Visuals · Drone Reels · Enterprise SaaS), then a 3-up bento grid of tall image cards (h-384px, hover zoom, bottom gradient overlay + mono eyebrow + bold title + 2-line description). Titles: The Solis Cliffside Residence, Nordic Grid Infrastructure, GST-Flow Cloud Engine.
5. **Interactive Booking Teaser + Live Calculator** (big 16px-radius gradient panel, 2 columns):
   - Left: pulse chip "Production & SaaS Dispatch", H2 "Deploy Elite Creative Or Scalable Systems In Days", body, 2 feature rows (icons verified_user/lock).
   - Right ("Direct Session Builder" card, dark inset): Step 1 = 2×2 capability pills (3D & CGI · Drone Ops · Brand Shoot · SaaS Engine); Step 2 = range slider 1–3 with labels Single Pilot/Multi-Location/Enterprise Fleet and tier name; bottom bar = "Starting Allocation: **$X,XXX** / milestone" + cyan **Instant Lock** button → adds to cart, label flips to "Allocated ✓" for 2.5s.
6. **Partner Endorsements** (`#0a0e16`): 3 testimonial cards, 5 green stars, italic quote, avatar circle with 2-letter initials + name/role.
7. **Final CTA banner**: 16px-radius gradient panel, "Action Vector" eyebrow, H2 "Ready to elevate your creative output and digital infrastructure?", buttons **Schedule Immediate Briefing** (cyan, bolt icon) + **View Interactive Catalog**.

---

## 8. Services page

- Header band (`#181c24` gradient): pulse chip "Enterprise Grade Execution Grid", H1 "Engineered for Impact: **6 Core Verticals** Under One Roof." (gradient accent), telemetry chip card (24 Flight Cells | < 48h Turnaround).
- **Search + filter bar** (rounded 12px dark bar): search input (mono icon, placeholder "Search telemetry, capabilities (e.g. LiDAR, GST, BIM, 4K)...") + 6 vertical jump tabs: `01. Drones & Geospatial · 02. 3D & Spatial VR · 03. Commercial Film · 04. Digital Performance · 05. Enterprise GST SaaS · 06. Hospitality CRS` (active = cyan pill; clicking scrolls to the section).
- Content: 6 vertical sections, each = numbered mono chip `V-0X // TAG`, header row on hairline border, then capability/price cards. Keep the live site's existing service prices/cards, restyled to dark cards with cyan accents.

---

## 9. Per-service pages (3D Visualization · Drone Operations · Commercial/Media · Digital Marketing)

Shared template used by every vertical page (3D Visualization is the reference implementation):

1. **Hero** (centered): pulse chip `NEXT-GEN SPATIAL COMPUTING // ...` style label, 40–60px H1, subcopy, two CTAs (cyan "Launch Interactive 3D Viewport" + dark "Explore VR Walkthrough Deck").
2. **KPI grid** (4 cards): mono label + icon + big accent number + caption — e.g. < 4h Turnaround / ±1.2mm CAD Acc. / 60 FPS Native / WebGL, 8K… (reuse the live site's real stats where they exist).
3. **Interactive section** (per page):
   - 3D: "Interactive Simulator" — camera scene selector (Living Pavilion / Infinity Pool / Sunset Horizon), material pickers (floor: Calacatta Gold, wood: American Walnut, light: Golden Hour Dusk), DXR toggle, and a copy-embed WebXR button.
   - Drone: flight-deck operational panel (mission cells, telemetry, "Dispatch Drone Flight").
   - Commercial: production/locations grid, "Book Production Crew".
   - Marketing: channel/campaign matrix, "Initiate Campaign Engine".
4. **Pricing tiers** (3 cards, middle card = highlighted/cyan): for 3D page the app tiers are Essential Spatial Render **₹249** / Interactive 3D Walkthrough **₹620** / Enterprise Spatial Digital Twin **₹1,650** (user decision: keep INR). Each "Add to Cart" adds a line and opens the cart.
5. Long-form capability/benefit sections pulled from the live page's existing CMS text (the crawl in `crawl-output/pages.json` has all the current copy per path).

---

## 10. Portfolio

- Header: mono eyebrow + H1 + filter pill tabs (All · 3D · Drone · Commercial · Marketing · SaaS).
- **Bento grid** (2-col, uneven spans `col-span-7` / `col-span-5` pattern): each project card = full-bleed image with bottom gradient, category label chip, title, subtitle, client; open → detail panel (metric value, gear list, specs, client quote, turnaround, "Add to cart" CTA). Use the live Wix Pro Gallery in a 2-col layout with hover zoom and cyan gradient overlays.

---

## 11. Book Online (dispatch/checkout)

- **INR pricing (per user decision)**: keep the ₹249 / ₹620 / ₹1,650 3-D tier structure and the add-ons: **Express +₹250**, **RAW D-Log +₹128**, **RTMP +₹490** when mapping to Wix Bookings/eCommerce.
- Layout: left = step-by-step builder (Site address, Lot size default "48,500 Sq Ft (Commercial Campus)", Seats 1–50, promo field `IMAGINE360-Q4`, add-on toggles, service tier selection), right = sticky order summary card.
- **Price math** (mirror in Velo/bookings integration): subtotal → +addons → −10% partner (promo) → +18% GST → +$50 escrow fee → grand total. Promo `IMAGINE360-Q4` toggles the 10% partner discount.
- Checkout → `createBooking` (inserts `bookings`: target_date, slot, site, items, total, status "confirmed", created_at) → success toast "Dispatch Session Confirmed! Reference #I360-XXXX".

---

## 12. Contact Us

- Centered hero: pulse chip "24/7 ENTERPRISE FLIGHT OPS & SAAS ARCHITECTURE DESK", H1 "Initiate Enterprise Engagement", subcopy.
- 2-col grid: left = form card (`#1c2028`, 16px radius, hairline border): first/last name, email, phone, company, vertical (dropdown, default 3D), budget (dropdown, default "$15,000 - $50,000"), message, submit → `createInquiry` → insert `inquiries` → toast "Dispatch inquiry transmitted. An Operations Director will reach out within 2 hours." Right = "Global Hubs" contact info panel (phones, location, hours — pull from live site: +91 9561909070, Pune).
- Wire the live **Wix Forms** collection to `inquiries` (fields: first_name, last_name, email, phone, company, vertical, budget, message, status, created_at) or point `createInquiry` at the existing Forms Contact collection.

---

## 13. Client Dashboard & SaaS pages (GST Billing · Hospitality CRS)

- **Client Area**: members-only page (Wix Members, page permission). "My Subscriptions" (bookings/orders list from `bookings` filtered by member), upcoming sessions, quick actions. Gate with a members-only permission instead of app login (per velo README).
- **GST Billing SaaS** (`/gst-billing`): hero + KPI + tier cards + interactive billing-log arithmetic panel + integration/API section; original app seeded a GST clients table.
- **Hospitality CRS** (`/booking-engine`): hero + OTA sync panel (2-way B.com/Airbnb/Expedia/Agoda/MMT), inventory/rate editor (per-room base prices, e.g. $620/night Executive Villa), stop-sell toggles, yield-slider that recalculates nightly rate live.

---

## 14. Icons

Use **Material Symbols Outlined** throughout (the local app loads the Google Material Symbols font). Key glyphs: `view_in_ar`, `flight`, `travel_explore`, `video_camera_front`, `insights`, `payments`, `receipt_long`, `concierge`, `domain`, `architecture`, `flight_takeoff`, `account_balance`, `hotel`, `factory`, `schedule`, `star`, `shopping_bag`, `expand_more`, `search`, `calendar_today`, `arrow_downward`, `bolt`, `verified_user`, `lock`, `terminal`, `public`, `code`, `menu`, `close`.
- Load the font in the editor; icon color follows the section accent (cyan for pillar 1/4, periwinkle for 2/5, green for 3/6).

---

## 15. Voice & Copy Rules

- Headlines: short, engineering-flavored ("Deploy Elite Creative Or Scalable Systems In Days").
- Eyebrows: mono, uppercase, tech nouns ("Proof of Execution", "Action Vector", "Direct Session Builder", "System Capabilities").
- Numbers rule: percentages, KPIs, and SLA claims are everywhere — put at least one concrete stat in every section.
- Status language: labels like "Allocated ✓", "SLOTS OPEN", "All Production Nodes Operational", "STOP SELL".
- Keep the existing site's real service copy (crawl in `crawl-output/pages.json`) — restyle, don't rewrite the substance.

---

## 16. Editor Rebuild Checklist

1. Load Google Fonts: Plus Jakarta Sans (400,600,700,800) + JetBrains Mono (400,700).
2. Set global site colors: background `#0f131c`, text `#dfe2ee`, focus/links cyan `#4cd7f6`; set buttons to 12px radius, sections dark.
3. Restyle header to the dark sticky console header with cyan active states + "Book Session" cyan button.
4. Restyle footer to the 6-column mono-header footer + operational ribbon.
5. Home: hero → telemetry band → 6-pillar grid → portfolio bento → calculator card → endorsements → CTA banner.
6. Services + 6 vertical pages: hero + KPI grid + pricing tiers (keep INR on Bookings) + capability copy.
7. Portfolio: Pro Gallery in dark with cyan hover.
8. Contact: dark form card wired to `/inquiries` (or Forms collection).
9. Client Area: members-gated "My Subscriptions".
10. Deploy `velo/` code (see `velo/README.md`) — CMS collections `bookings` and `inquiries` already created on the live site.