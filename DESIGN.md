# WanderSouls Design System Specification

Welcome to the formalized **WanderSouls Design System Specification**. This document serves as the single source of truth for the WanderSouls visual language, token architecture, and reusable component patterns. It aligns the design system foundations directly with the implementation in code.

---

## 1. DESIGN SYSTEM FOUNDATIONS (Tokens)

### Color Palette & Distribution
WanderSouls employs a premium color palette designed around a **60-30-10 distribution rule** to maintain visual balance, hierarchy, and a luxury feel.

*   **60% Dominant (Neutrals & Backgrounds):** Sets the canvas and baseline structure.
*   **30% Secondary (Teal Structure):** Establishes branding, structural components, icons, and boundaries.
*   **10% Accent (Orange Highlights):** reserved strictly for key call-to-actions, warning highlights, active indicators, and notifications.

#### Brand Colors
| Token | Role | HEX Value | RGBA Equivalent | Usage |
| :--- | :--- | :--- | :--- | :--- |
| `color-brand-primary` | Primary Brand | `#0A2540` | `rgba(10, 37, 64, 1.0)` | Headings, overlays, key structural backgrounds |
| `color-brand-secondary`| Secondary Brand| `#00B8A9` | `rgba(0, 184, 169, 1.0)`| Icons, custom borders, secondary actions, active indicators |
| `color-brand-accent` | Brand Accent | `#FF7A59` | `rgba(255, 122, 89, 1.0)`| Primary CTAs, high-priority buttons, highlight tags |

#### Neutrals & Canvas
| Token | Role | HEX Value | RGBA Equivalent | Usage |
| :--- | :--- | :--- | :--- | :--- |
| `color-bg-base` | Main Canvas | `#FAFAF7` | `rgba(250, 250, 247, 1.0)`| Body background, soft ivory canvas |
| `color-bg-card` | Card Surface | `#FFFFFF` | `rgba(255, 255, 255, 1.0)`| Reusable card containers, tables, lists |
| `color-bg-elevated` | Section Surface | `#F2F2EC` | `rgba(242, 242, 236, 1.0)`| Alternate section backgrounds, open timelines |
| `color-text-primary` | Primary Text | `#1A1A1A` | `rgba(26, 26, 26, 1.0)` | Body text, active titles, inputs |
| `color-text-secondary`| Secondary Text| `#4A4A4A` | `rgba(74, 74, 74, 1.0)` | Descriptions, secondary meta labels |
| `color-text-muted` | Muted Text | `#7E7E7E` | `rgba(126, 126, 126, 1.0)`| Timestamps, inline dividers, metadata subtitles |

#### Semantic & Borders
| Token | Role | HEX Value | RGBA Equivalent | Usage |
| :--- | :--- | :--- | :--- | :--- |
| `color-semantic-success`| Success State| `#16A34A` | `rgba(22, 163, 74, 1.0)` | Inclusions list checkmarks, price comparison win tags |
| `color-border-subtle` | Subtle Line | — | `rgba(10, 37, 64, 0.06)`| Standard card borders, timeline dividers |
| `color-border-strong` | Strong Line | — | `rgba(10, 37, 64, 0.12)`| Input borders, table header borders, utility boundaries |

---

### Typography
The typography system balances editorial elegance (serif) with clean legibility (sans-serif).

*   **Display Font Family:** `Playfair Display`, Georgia, serif (`--font-playfair`)
*   **Body/UI Font Family:** `Montserrat`, sans-serif (`--font-montserrat`)

#### Typography Scale
| Style Name | Font Family | Size (px/rem) | Weight | Line Height | Letter Spacing |
| :--- | :--- | :--- | :--- | :--- | :--- |
| **Display Hero** | Playfair Display | `clamp(2rem, 7vw, 4.5rem)` | 800 (ExtraBold) | 1.05 | `-0.02em` |
| **Section Title**| Playfair Display | `clamp(1.75rem, 6vw, 3.2rem)`| 800 (ExtraBold) | 1.15 | `-0.02em` |
| **Card Title** | Playfair Display | `1.4rem` / `2.2rem` | 800 (ExtraBold) | 1.10 | `-0.01em` |
| **Subtitle/Muted**| Montserrat | `0.95rem` | 600 (SemiBold) | 1.40 | `normal` |
| **Body (Large)** | Montserrat | `0.98rem` | 500 (Medium) | 1.75 | `normal` |
| **Body (Normal)** | Montserrat | `0.85rem` | 500 (Medium) | 1.65 | `normal` |
| **UI Control/CTA**| Montserrat | `0.90rem` | 700 (Bold) | 1.20 | `0.05em` (Caps) |
| **Caption/Label** | Montserrat | `0.68rem` | 700 (Bold) | 1.20 | `0.08em` (Caps) |

---

### Spacing & Grid System
WanderSouls is built on an **8px base unit system** to ensure mathematical alignment.

#### Spacing Tokens
*   `space-xxs`: `4px`
*   `space-xs`: `8px`
*   `space-sm`: `12px`
*   `space-md`: `16px` (Mobile container padding, standard card gap)
*   `space-lg`: `24px` (Desktop container padding, large card gap)
*   `space-xl`: `32px` (Section elements gap)
*   `space-xxl`: `64px` (Mobile section top/bottom padding)
*   `space-xxxl`: `100px` (Desktop section top/bottom padding)

#### Layout Grid Rules
*   **Container Width:** Max `1280px` centered with auto margins.
*   **Desktop Layout Grid:** 3-column masonry grid for card structures (`repeat(3, 1fr)`) with `24px` gap.
*   **Tablet Layout Grid:** 2-column card structures (`repeat(2, 1fr)`) with `20px` gap.
*   **Mobile Layout Grid:** Single column (`1fr`) with `16px` gap.

---

### Elevation & Depth
Elevation is expressed through shadows, blurs, and border overlays, conveying physical depth without heavy gradients.

| Style Name | CSS Box Shadow Value | Backdrop Filter Blur | Border Overlay |
| :--- | :--- | :--- | :--- |
| `glass-panel` | `0 12px 40px rgba(10, 37, 64, 0.06)` | `blur(20px)` | `1px solid rgba(255, 255, 255, 0.4)` |
| `glass-card` | `0 8px 24px rgba(10, 37, 64, 0.03)` | `blur(14px)` | `1px solid rgba(255, 255, 255, 0.5)` |
| `luxury-shadow`| `0 10px 30px -10px rgba(10, 37, 64, 0.08)`| — | `inset 0 1px 0 rgba(255, 255, 255, 0.8)`|
| `luxury-card` | `0 10px 30px -10px rgba(10, 37, 64, 0.05)`| — | `1px solid rgba(10, 37, 64, 0.06)` |
| `lightbox` | `0 25px 50px -12px rgba(0, 0, 0, 0.5)` | `blur(12px)` | `1px solid rgba(255, 255, 255, 0.15)` |

*Layering Order (Z-Index):*
*   `z-base`: `0`
*   `z-sticky-bar`: `100`
*   `z-modal-backdrop`: `9999`
*   `z-modal-content`: `10000`
*   `z-modal-control`: `10001`

---

## 2. ATOMIC UI COMPONENTS (Variants & States)

### Buttons
All buttons feature a minimum interactive size of `44px` to ensure touch compatibility on mobile devices.

#### Variant: Primary CTA (`.btn-primary`)
*   **Visual Properties:** Background color `var(--accent)` (`#FF7A59`), text `#FFFFFF`, uppercase Montserrat 700, size `0.9rem`, padding `14px 28px` (desktop) / `12px 22px` (mobile), border radius `50px`.
*   **Box Shadow:** `0 8px 24px rgba(255, 122, 89, 0.25)`.
*   **States:**
    *   *Default:* Base properties.
    *   *Hover:* Background `#E56241`, vertical transform `translateY(-2px)`, shadow `0 12px 32px rgba(255, 122, 89, 0.35)`.
    *   *Active/Focus:* Vertical transform `translateY(0)`, outline `2px solid var(--secondary)`.
    *   *Disabled:* Background `rgba(126, 126, 126, 0.15)`, text `rgba(126, 126, 126, 0.5)`, cursor `not-allowed`, no shadow.

#### Variant: Secondary outline (`.btn-secondary`)
*   **Visual Properties:** Background `var(--bg-card)` (`#FFFFFF`), text `var(--primary)` (`#0A2540`), border `1px solid var(--border-strong)` (`rgba(10, 37, 64, 0.12)`), uppercase Montserrat 700, size `0.9rem`, padding `14px 28px` (desktop) / `12px 22px` (mobile), border radius `50px`.
*   **States:**
    *   *Default:* Base properties.
    *   *Hover:* Border-color `var(--secondary)` (`#00B8A9`), text `var(--secondary)`, background `rgba(0, 184, 169, 0.04)`, vertical transform `translateY(-1px)`.
    *   *Active/Focus:* Vertical transform `translateY(0)`, outline `2px solid var(--secondary)`.
    *   *Disabled:* Border `1px solid rgba(126, 126, 126, 0.2)`, text `rgba(126, 126, 126, 0.4)`, cursor `not-allowed`.

#### Variant: Dark CTA (`.btn-accent`)
*   **Visual Properties:** Background `var(--primary)` (`#0A2540`), text `#FFFFFF`, border `none`, uppercase Montserrat 700, size `0.9rem`, padding `14px 28px` (desktop) / `12px 22px` (mobile), border radius `50px`.
*   **Box Shadow:** `0 8px 24px rgba(10, 37, 64, 0.2)`.
*   **States:**
    *   *Default:* Base properties.
    *   *Hover:* Background `#061729`, vertical transform `translateY(-2px)`, shadow `0 12px 32px rgba(10, 37, 64, 0.35)`.
    *   *Active/Focus:* Vertical transform `translateY(0)`.
    *   *Disabled:* Background `rgba(10, 37, 64, 0.15)`, text `rgba(10, 37, 64, 0.5)`, cursor `not-allowed`.

---

### Inputs
Input components follow a clean rounded design system to match form panels.

#### Text Input Fields
*   **Visual Properties:** Background `#FFFFFF`, border `1px solid var(--border-subtle)` (`rgba(10, 37, 64, 0.06)`), border-radius `50px`, padding `10px 18px`, text font Montserrat 500 (`0.82rem`), text color `var(--text-primary)` (`#1A1A1A`).
*   **States:**
    *   *Default:* Base properties.
    *   *Focus:* Border `1px solid var(--secondary)` (`#00B8A9`), outline `none`, transition `border 0.25s ease`.
    *   *Hover:* Border `1px solid var(--border-strong)`.
    *   *Error State:* Border `1px solid #DC2626` (Red), shadow `0 0 8px rgba(220, 38, 38, 0.1)`.

#### Preset Button Inputs (Interactive Selection Chips)
*   **Visual Properties:** Background `rgba(255, 255, 255, 0.7)`, border `1px solid var(--border-subtle)`, border-radius `16px`, padding `16px 20px`, text font Montserrat 600 (`0.85rem`), color `var(--primary)` (`#0A2540`).
*   **States:**
    *   *Default:* Base properties.
    *   *Hover:* Background `#FFFFFF`, border-color `var(--secondary)`, horizontal transform `translateX(4px)`, transition `all 0.3s ease`.
    *   *Selected:* Background `rgba(0, 184, 169, 0.05)`, border `1px solid var(--secondary)`, color `var(--secondary)`.

---

### Badges & Tags
Small informational tags used to categorize information.

#### Theme Tags
*   **Visual Properties:** Background `rgba(10, 37, 64, 0.03)`, border `1px solid var(--border-subtle)`, border-radius `6px`, padding `4px 10px`, font Montserrat 600, size `0.68rem`, color `var(--text-secondary)`.

#### Pill Badges (Category / Status)
*   **Visual Properties:** Background `rgba(0, 184, 169, 0.08)`, border `1px solid rgba(0, 184, 169, 0.15)`, border-radius `50px`, padding `2px 10px` (or `6px 14px` for headers), font Montserrat 700, size `0.68rem` (or `0.75rem`), color `var(--secondary)`.

---

### Accordions
Accordions are primarily utilized in the timeline components to show and hide detailed itineraries.

*   **Structure:** Composed of a click-trigger Header and an expandable Content block.
*   **Trigger Header Visuals:** Padding `16px 18px`, flex alignment, cursor pointer. Right side displays a circular icon wrapper (`32px` circular, background `rgba(10,37,64,0.04)`, border subtle) containing a Lucide Chevron icon.
*   **Container States:**
    *   *Closed State:* Background `var(--bg-card)` (`#FFFFFF`), border `1px solid var(--border-subtle)`, border-radius `20px`.
    *   *Open State:* Background `var(--bg-elevated)` (`#F2F2EC`), border `1px solid rgba(0, 184, 169, 0.25)`, border-radius `20px`, shadow `0 10px 30px rgba(10, 37, 64, 0.04)`.
*   **Day Indicator (Visual Component inside Header):**
    *   *Closed State:* Background `rgba(0, 184, 169, 0.05)`, border `1px solid rgba(0, 184, 169, 0.2)`, text color `var(--secondary)`.
    *   *Open State:* Background `var(--secondary)` (`#00B8A9`), text color `#FFFFFF`, shadow `0 4px 12px rgba(0, 184, 169, 0.15)`.

---

## 3. COMPLEX UI PATTERNS & MOLECULES

### Navigation Bar
A sticky high-depth navigation panel floating at the top of the interface.

*   **Global Navbar:** Height `70px`, background `#FFFFFF`, border-bottom `1px solid var(--border-subtle)`, shadow `0 4px 20px rgba(10, 37, 64, 0.02)`. Includes brand logo left-aligned, links center-aligned, and CTA button right-aligned.
*   **Sticky Page Toolbar:** Secondary local nav sticking beneath global navbar. Background `rgba(250, 250, 247, 0.92)`, backdrop-filter `blur(20px)`, border-bottom `1px solid rgba(10, 37, 64, 0.08)`.
    *   *Interactive Links:* Padding `7px 12px`, border-radius `30px`, font Montserrat 700 (`0.75rem`). Hover states trigger: color `var(--secondary)`, border-color `rgba(0,184,169,0.2)`, background `rgba(0,184,169,0.04)`.

---

### Footers
*   **Structure:** 4-column desktop footer stacking to 2 columns on tablet and 1 column on mobile.
*   **Background:** Deep brand primary (`#0A2540`) with text and links in soft white/ivory variants.
*   **Link Hover State:** Color shifts to `var(--secondary)` with a slide transition.

---

### Card Layouts (Destination Cards)
Cards display destination overviews using a highly visual layout.

*   **Structure:** Image section (`height: 220px`), content body, and action footer.
*   **Visual Properties:** Background `var(--bg-card)` (`#FFFFFF`), border `1px solid var(--border-subtle)`, border-radius `20px`, shadow `0 10px 30px -10px rgba(10, 37, 64, 0.05)`.
*   **Image Overlays:** Linear gradient overlay `linear-gradient(to bottom, rgba(10, 37, 64, 0.1) 50%, rgba(10, 37, 64, 0.6) 100%)` for text readability.
*   **Interactions:**
    *   *Hover:* Translate upward `translateY(-6px)`, box-shadow `0 20px 40px -15px rgba(10, 37, 64, 0.1)`, border-color `rgba(0, 184, 169, 0.25)`. Image scales up to `1.05` via `transform: scale(1.05)`.

---

### Lightbox / Modals
Used to view gallery pictures in immersive detail.

*   **Backdrop:** Fixed container spanning `inset: 0`, background `rgba(10, 37, 64, 0.95)`, blur filter `blur(12px)`.
*   **Content Area:** Absolute centered container with `90%` width and max-width `1100px`.
*   **Image Element:** `object-fit: contain`, border-radius `12px`, box-shadow `0 25px 50px -12px rgba(0, 0, 0, 0.5)`.
*   **Navigation & Close Controls:** Glassmorphic circular buttons (background `rgba(255, 255, 255, 0.1)`, border `1px solid rgba(255,255,255,0.15)`, text color `#FAFAF7`). Hovering triggers background opacity shift to `0.2` and border opacity to `0.4`.

---

## 4. ACCESSIBILITY (a11y) & ANIMATION RULES

### Accessibility Guidelines (WCAG AA/AAA)
To ensure readability and access for all users:

*   **Color Contrast:** All body text elements (`#1A1A1A` and `#4A4A4A`) against base backgrounds (`#FAFAF7`, `#FFFFFF`) achieve contrast ratios exceeding **4.5:1** (WCAG AA compliant for small text, WCAG AAA compliant for large text).
*   **CTAs Contrast:** White text (`#FFFFFF`) on Orange CTA (`#FF7A59`) yields a contrast ratio of **3.1:1**, which is optimized for Large UI text components. For small, high-emphasis text, deep primary (`#0A2540`) or pure dark backgrounds are recommended.
*   **Interactive Target Size:** Interactive targets (buttons, menu items, accordion headers) keep a minimum height/width of `44px` with padding boundaries.
*   **Aria Labels:** Lightbox and form components include `aria-label` tags for assistive technology (e.g. `aria-label="Close lightbox"`).

---

### Animation & Motion Architecture
WanderSouls utilizes animations to guide user focus and create a smooth feel.

#### Standard Transition Properties
*   **Micro-interactions (Hover, scales):** `transition: all 0.2s ease`
*   **Medium components (Cards, timeline expanding):** `transition: all 0.35s cubic-bezier(0.16, 1, 0.3, 1)`
*   **Slow transitions (Image zoom, overlays):** `transition: transform 0.6s cubic-bezier(0.16, 1, 0.3, 1)`

#### Keyframes and Easing
*   **Fade Up (Fade-in-slide):** Applied to load sections dynamically.
    ```css
    @keyframes fadeUp {
      from { opacity: 0; transform: translateY(20px); }
      to { opacity: 1; transform: translateY(0); }
    }
    ```
*   **Spring Easing (Lightbox):** Modal images scale using a spring animation curve (via Framer Motion):
    *   *Type:* `spring`
    *   *Damping:* `25`
    *   *Stiffness:* `150`
