---
name: Nexora Labs
description: A calm, crafted, conversion-minded brand system for a done-for-you web agency serving small businesses.
colors:
  primary: "oklch(56% 0.20 45)"
  primary-hover: "oklch(52% 0.18 45)"
  canvas: "oklch(96% 0.03 75)"
  surface: "oklch(99% 0.01 70)"
  surface-tinted: "oklch(94% 0.035 82)"
  text: "oklch(25% 0.02 45)"
  ink: "oklch(19% 0.025 45)"
  text-muted: "oklch(50% 0.02 45)"
  text-inverse: "oklch(98% 0.01 45)"
  lime: "oklch(78% 0.14 132)"
  sky: "oklch(78% 0.09 214)"
  rose: "oklch(74% 0.13 350)"
  yellow: "oklch(86% 0.09 88)"
  warm-dark: "oklch(28% 0.02 45)"
  warm-darker: "oklch(20% 0.02 45)"
  surface-pale: "oklch(99% 0.006 45)"
typography:
  display:
    fontFamily: "Bricolage Grotesque, Arial Rounded MT Bold, system-ui, sans-serif"
    fontSize: "clamp(3.35rem, 2.05rem + 6.2vw, 8.2rem)"
    fontWeight: 800
    lineHeight: 0.84
    letterSpacing: "0"
  headline:
    fontFamily: "Bricolage Grotesque, Arial Rounded MT Bold, system-ui, sans-serif"
    fontSize: "clamp(2.65rem, 1.7rem + 4.3vw, 5.2rem)"
    fontWeight: 800
    lineHeight: 0.9
    letterSpacing: "0"
  title:
    fontFamily: "Bricolage Grotesque, Arial Rounded MT Bold, system-ui, sans-serif"
    fontSize: "clamp(1.12rem, 1.04rem + 0.34vw, 1.32rem)"
    fontWeight: 700
    lineHeight: 1.08
  body:
    fontFamily: "Onest, system-ui, -apple-system, sans-serif"
    fontSize: "1rem"
    fontWeight: 500
    lineHeight: 1.58
  label:
    fontFamily: "Onest, system-ui, -apple-system, sans-serif"
    fontSize: "0.72rem"
    fontWeight: 600
    lineHeight: 1.1
    letterSpacing: "0.08em"
rounded:
  sm: "6px"
  md: "12px"
  lg: "20px"
  pill: "9999px"
spacing:
  2xs: "4px"
  xs: "8px"
  sm: "12px"
  md: "16px"
  lg: "24px"
  xl: "32px"
  "2xl": "48px"
  "3xl": "64px"
  "4xl": "96px"
  "5xl": "128px"
components:
  primary-cta:
    backgroundColor: "{colors.primary}"
    textColor: "{colors.text-inverse}"
    rounded: "{rounded.pill}"
    padding: "0 20px"
  primary-cta-hover:
    backgroundColor: "{colors.primary-hover}"
  secondary-cta:
    backgroundColor: "oklch(from var(--color-surface-pale) L C H / 0.72)"
    textColor: "oklch(19% 0.016 45)"
    rounded: "{rounded.pill}"
    padding: "0 20px"
  process-card:
    backgroundColor: "oklch(98% 0.028 94)"
    rounded: "{rounded.sm}"
  testimonial-card:
    backgroundColor: "{colors.surface-tinted}"
    rounded: "{rounded.md}"
  pricing-card:
    backgroundColor: "oklch(99% 0.012 75)"
    rounded: "{rounded.sm}"
  pricing-featured:
    backgroundColor: "{colors.primary}"
    textColor: "{colors.text-inverse}"
  faq-item:
    backgroundColor: "{colors.surface}"
    rounded: "{rounded.sm}"
---

# Design System: Nexora Labs

## 1. Overview

**Creative North Star: "The Organized Workshop"**

Nexora Labs should feel like a calm expert team in an organized workshop. Tools are out but arranged, work is visible but not chaotic, and every detail shows intention. The system is warm, tactile, clear, and crafted — with playful moments that feel earned, not overwhelming.

The site expresses this through a warm paper canvas, committed orange, muted supporting accents used sparingly, oversized confident typography, full-bleed studio-scene sections, scroll-staged proof, tactile stacked objects, and direct buying cues. The page should feel designed enough to prove taste, but practical enough that any small business owner can imagine working with Nexora without friction.

The page is paced like a guided walkthrough through a workshop, not a generic stack of sections. Fewer sections, more depth per section. Each section earns its place by proving something real. First screen: brand signal, large type, short reassurance copy, clear navigation, and a focused scatter of proof objects. Intro: centered statement with capability pills arranged like organized tools. Process: cards stack and spread through scroll. Services: image-led full-viewport section with a sticky service panel. Work: project previews around central copy. Testimonials: stacked cards with controlled scroll choreography. Pricing: pinned proposals, not SaaS tiles. Footer: direct contact, warm image, availability signal. Use full-width bands and viewport-scale sections where the narrative needs presence. Do not wrap every section in the same centered container.

Motion is part of the brand system, but it moves at a calmer pace. Scroll-driven choreography transforms sections with the same effects — greeting text ink-in, capability pills drifting inward, process cards spreading from a stack, services rail moving inside a sticky frame, work previews spreading around center copy, testimonial deck advancing through stacked cards — but with longer durations and gentler easing. Animate transforms and opacity only. Use exponential or quartic ease-out curves with extended timing. Keep interactions calm and legible. Respect `prefers-reduced-motion` with static, readable alternatives.

Brand surfaces use real or high-quality generated image backgrounds for immersive sections, custom SVG mockups for case examples, and warm practical visual metaphors rather than abstract SaaS gradients. Alt text describes meaningful work previews; decorative imagery uses empty alt.

**Key Characteristics:**
- Warm and inviting palette with committed orange
- Muted accent colors used as rare highlights, not constant spatial actors
- Tactile hierarchy via hybrid offset shadows (offset + small blur)
- Typographic authority with bold geometric sans
- Scroll-driven choreography at a calmer, more considered pace
- Organized workshop layout rhythm, not generic section stacking

## 2. Colors: The Workshop Palette

Full palette with committed orange. Nexora Orange carries the brand. Secondary accents (lime, sky, rose, yellow) are muted from their previous values and used sparingly — as rare highlights and status signals, not as section backgrounds or constant spatial actors. Orange owns the color budget; accents punctuate.

### Primary
- **Nexora Orange** (`oklch(56% 0.20 45)`): Primary brand signal for CTAs, hero emphasis, icon strokes, headings, and selected active states. This darker shipping token keeps small inverse CTA and banner text above contrast thresholds.
- **Deep Terracotta** (`oklch(52% 0.18 45)`): Hover and pressed state for orange controls.

### Secondary (muted, used sparingly)
- **Workshop Lime** (`oklch(78% 0.14 132)`): Passed-state nav dots, copy-success feedback, and rare sticker accents. Lower chroma than before — present but not loud.
- **Workshop Sky** (`oklch(78% 0.09 214)`): Launch map decorative stickers, bottom-nav tinting, and occasional pill backgrounds. Cool counterpoint, used minimally.
- **Workshop Rose** (`oklch(74% 0.13 350)`): Testimonial sticker fills and rare decorative circles. Adds warmth without competing with orange.
- **Workshop Yellow** (`oklch(86% 0.09 88)`): Pricing badges and copy-in-progress feedback. Playful signal color for status only — never as a section background.

**Accent Usage Rule.** Lime and yellow are highlights, not territory markers. They appear on small elements (badges, dots, stickers, status indicators). They do not appear as section backgrounds, card fills, or large color bands. Sky and rose are used even more sparingly — decorative touches only.

### Neutral
- **Warm Paper Canvas** (`oklch(96% 0.03 75)`): Main page background, never pure white. The hue 75 warmth is intentional.
- **Warm Ivory Surface** (`oklch(99% 0.01 70)`): Elevated or framed surfaces such as service stack panels, nav background, and card interiors.
- **Pale Ivory Surface** (`oklch(99% 0.006 45)`): Pill backgrounds, icon wells, progress tracks, FAQ items, and side-tab panels. A barely-there warm tint that reads as clean without the hue 70 green shift of the ivory surface.
- **Tactile Card Tint** (`oklch(94% 0.035 82)`): Process cards, testimonial cards, and warm content blocks. The hue 82 shift toward yellow-green gives warmth without competing with orange.
- **Warm Charcoal Text** (`oklch(25% 0.02 45)`): Primary reading color, never pure black.
- **Studio Ink** (`oklch(19% 0.025 45)`): Strongest text weight for section headings, service numbers, and footer email. Darker and warmer than charcoal text.
- **Warm Dark** (`oklch(28% 0.02 45)`): Borders, grid lines, and shadow color base. The workhorse structural color for all thin-rule and shadow-tint uses. Never used for text.
- **Warm Darker** (`oklch(20% 0.02 45)`): Emphasis borders, sticker shadows, and interactive element outlines. A step darker than warm-dark for elements that need more visual weight.
- **Muted Warm Text** (`oklch(50% 0.02 45)`): Secondary copy, navigation links, and supporting labels.
- **Inverse Text** (`oklch(98% 0.01 45)`): Text on orange or dark backgrounds.

**The 10% Pop Rule.** The primary orange is a high-chroma tool meant for impact. Use it on no more than 10% of the interface surface. Supporting accents share the remaining color budget deliberately — and that budget is smaller now. Most of the surface should be warm neutrals.

## 3. Typography: The Workshop Voice

**Display Font:** Bricolage Grotesque (with Arial Rounded MT Bold, system-ui fallback)
**Body Font:** Onest (with system-ui, -apple-system fallback)

**Character:** Bricolage gives Nexora a warmer, more handmade voice without turning into a novelty font. Onest keeps the buyer-facing reading experience calm, practical, and professional. The pairing creates a clear split: Bricolage for attention and authority, Onest for reading and action.

### Hierarchy
- **Display** (800 weight, `clamp(3.35rem, 2.05rem + 6.2vw, 8.2rem)`, 0.84 line-height): Hero brand statements and oversized landing moments. Never used outside the first viewport.
- **Headline** (800 weight, `clamp(2.65rem, 1.7rem + 4.3vw, 5.2rem)`, 0.9 line-height): Major content section titles. The primary section heading size.
- **Panel Headline** (700 weight, `clamp(2.25rem, 1.72rem + 2.35vw, 3.25rem)`, 0.94 line-height): Inside service panels and showcase moments. Slightly lighter weight than display to create a step down.
- **Card Title** (700 weight, `clamp(1.12rem, 1.04rem + 0.34vw, 1.32rem)`, 1.08 line-height): Compact, sturdy, and scannable. Used for process cards, work meta, pricing names, and testimonial names.
- **Body** (500 weight, 1rem, 1.58 line-height): Primary reading. Keep paragraphs under 65ch. Strong body variant at 650 weight for lead paragraphs and emphasized copy.
- **Label** (600 weight, 0.72rem, 0.08em letter-spacing, uppercase): Kickers, stickers, badges, nav dots, section markers, and copyright lines. The only role that uses positive letter-spacing.

**The No-Tracking Rule.** Letter spacing remains `0` for all headings and body text. Tracking is reserved exclusively for short uppercase labels. Prefer breakpoint-specific heading sizes over viewport-width font scaling so mobile, desktop, and browser zoom remain predictable. Keep Bricolage out of long paragraphs.

## 4. Elevation: The Hybrid Shadow System

This system uses a hybrid elevation model: surfaces are flat at rest, and depth is conveyed through two distinct mechanisms working together.

**Tonal layering** handles structural depth. Sections shift background lightness and hue to create visual separation without shadows. The canvas (96% lightness), surface (99%), and card tint (94%) form a three-layer tonal stack. Section backgrounds use subtle warm-neutral shifts rather than bold color bands — the organized workshop uses tonal territory, not painted rooms.

**Hybrid offset shadows** handle tactile depth. The signature elevation device is an offset shadow with a small blur that makes elements feel like physical objects resting on a surface — present but not harsh. This replaces the previous hard-edge sticker shadow with a slightly softer version that maintains tactility while feeling more refined.

### Shadow Vocabulary
- **Workshop Shadow** (`Xpx Xpx 4px oklch(20% 0.02 45 / 0.10)`): The default decorative shadow. Offset ranges from 3px (small dots, badges) to 12px (large panels, cards). Small 4px blur softens the edge while preserving the offset character. The color is always a warm-tinted near-black at 10-14% opacity.
- **Ambient Lift** (`0 8px 24px oklch(28% 0.02 45 / 0.08)`): Soft blurred shadow for hover states on interactive elements. Used sparingly alongside workshop shadows on hover to add perceived height.
- **Deep Stack** (`0 20px 48px oklch(22% 0.02 45 / 0.14), 6px 6px 4px oklch(28% 0.02 45 / 0.08)`): Combined ambient and workshop shadow for the service stack panel. Creates the impression of a thick, substantial object.

**The Flat-at-Rest Rule.** Surfaces are clean and flat by default. Shadows appear only as a response to state (hover, focus, elevation) or as a deliberate workshop-shadow decorative choice. Never use blurred shadows decoratively on their own — they always accompany an offset.

## 5. Components

Every interactive component uses the workshop-shadow pattern for tactile presence and lifts on hover via `translateY(-2px)` with a transition using `--ease-out` (280ms, slower than before). Active states press down via `translate: 0 1px; scale: 0.985`.

### Buttons
- **Shape:** Pill (9999px radius), min-height 48px, font-weight 600-700
- **Primary:** Orange background, inverse text, 1px warm-dark border at 16% opacity, workshop shadow `5px 5px 4px`. Hover lifts and shifts to Deep Terracotta.
- **Secondary:** Ivory surface background at 72% opacity, ink text, 1px warm border at 14% opacity. Hover lifts and shadow reduces to `4px 4px 3px`.
- **Copy Email:** Pill-shaped, ivory background at 90% opacity, ink text, workshop shadow `4px 4px 3px`. States: copying (yellow bg), copied (lime bg with pop animation), failed (rose bg). Hover adds `-1deg` rotation.
- **Active/Pressed:** All buttons press down 1px and scale to 0.985.

### Chips and Pills
- **Capability Pills:** Pill-shaped, ivory background, warm-dark border at 12% opacity, workshop shadow `6px 8px 4px`. Each pill has a colored icon circle (lime, sky, rose, yellow, orange) and a text label. Positioned absolutely around the greeting center with slight rotations (-3deg to 3deg). On scroll, pills drift inward and flatten rotation.
- **Trust List Pills:** Pill-shaped, colored backgrounds (sky, lime, rose), warm border at 13% opacity. Compact at 34px height.
- **Stickers:** Pill-shaped decorative marks with uppercase label text, colored backgrounds (yellow, sky, lime, rose), workshop shadow `4px 4px 3px`, slight rotation (-6deg to 6deg). Used sparingly on work projects and pricing cards.
- **Pricing Badge:** Pill-shaped, yellow background, ink text, workshop shadow `3px 3px 3px`, -3deg rotation. Positioned overlapping the card top-left corner.

### Cards
- **Process Cards:** 6px radius, light yellow-tinted background (`oklch(98% 0.028 94)`), 2px warm-darker border at 14% opacity, workshop shadow `10px 10px 4px`. Alternate cards use subtle tinted backgrounds (sky tint, rose tint, yellow tint) at reduced chroma. Process icons use primary orange background with inverse text and `currentColor` SVG strokes. Sticky positioning with scroll-driven stack-to-spread choreography. Hover lifts 4px with enhanced shadow.
- **Testimonial Cards:** 12px radius, tactile card tint background, 2px warm-darker border at 14% opacity, workshop shadow `12px 12px 4px`. Two-column layout (copy + dot pattern). Testimonial sticker uses workshop rose background instead of primary orange. Variants: warm (default), rose tint, mint tint. Scroll-driven deck choreography with rotation and offset.
- **Pricing Cards:** 6px radius, ivory surface background, 2px warm-dark border at 12% opacity, workshop shadow `10px 10px 4px`. Slight rotation (-1.5deg to 1.2deg) per card for pinned-proposal feel. Featured card: orange background with inverse text and radial gradient accent. Decorative circle element (rose or lime) at top-right. Hover straightens rotation and lifts 6px.
- **Work Project Cards:** 16:10 aspect-ratio image with 10-12px dark border, 6px radius, workshop shadow `10-12px 10-12px 4px`. Color-coded borders per category (sage, sky, ink, peach). Meta card overlaps image bottom with ivory background and workshop shadow.

### Navigation
- **Top Nav:** Sticky, ivory surface background at 96% opacity, 2px warm-dark bottom border. Logo uses Bricolage with hand-drawn underline arc. Nav links in Onest at label weight. CTA is a primary button variant.
- **Fixed Bottom Nav:** Mobile-only, 4-column grid, ivory surface background, 2px warm-dark top border. Section links with orange index numbers. CTA column uses orange background with inverse text.
- **Launch Map:** Desktop-only fixed panel (visible at 1120px+), centered at page bottom. Lined-notebook background with workshop shadow `8px 8px 4px`. Five stop points with circular markers that fill orange when active, lime when passed. Progress rail uses a gradient (orange, rose, lime). Decorative sticker elements (sky pill, yellow tab). Slight -0.5deg rotation.
- **Nav Dots:** 44px circular touch targets for service and testimonial sections. Inner 10px dot fills orange when active (with 3px glow ring), lime when passed, ivory when upcoming.

### FAQ Accordion
- **Style:** Ivory surface background, 2px warm-darker border at 10% opacity, 6px radius, workshop shadow `5px 5px 3px`. Open state: orange border, enhanced shadow `7px 7px 4px`, ivory background shift. Plus/minus toggle with orange color, 180deg rotation on open. Answer fades in with 320ms ease-out-quart.

### State Pages (Error, Not Found)
- **Style:** Full-viewport centered layout. Radial sky gradient accent. Bricolage display heading in orange. Onest body copy in muted text. Primary CTA and ghost secondary CTA in a flex row.

### Back to Top
- **Style:** 44px circle, ivory surface background at 92% opacity, warm border, workshop shadow `3px 3px 3px`. Hidden by default, fades in after 1.2x viewport scroll. Hover: orange background, inverse text, enhanced shadow.

### Announcement Banner
- **Style:** Full-width, ink background, warm-cream text, 800 weight, centered. Workshop entrance animation (640ms ease-out-quint, slower than before).

## 6. Motion: Calmer Choreography

Scroll-driven choreography remains a brand asset, but moves at a more considered pace. The same effects are retained — ink-in reveals, pill drift, card stacking and spreading, service rail, work spread, testimonial deck — with the following adjustments:

- **Durations increase by ~30%.** Entrance animations move from 400-520ms ranges to 520-680ms. Scroll-driven interpolation uses gentler progress curves.
- **Easing stays exponential/quartic** but the input progress is dampened — effects reach their full state slightly later in the scroll, giving more room to breathe.
- **Rotations tighten.** Maximum card rotations reduce from ±4deg to ±2.5deg. Sticker rotations from ±8deg to ±6deg. The workshop is organized, not scattered.
- **Reduced-motion support remains mandatory.** All choreography degrades to static, readable alternatives.

## 7. Layout: Fewer Sections, More Depth

The page should have fewer sections than the current implementation, with each remaining section given more room and more substance. Quality over coverage. Every section must prove something specific — if it only fills space, it goes.

Section spacing increases. Padding between major sections moves from the current rhythm to a more generous cadence. Background treatments alternate between canvas and surface but avoid bold color-band territory markers. The organized workshop uses tonal shifts, not painted walls.

## 8. Do's and Don'ts

### Do:
- **Do** use OKLCH for all color declarations.
- **Do** keep the palette warm, tinted, and brand-specific. Every neutral is hue-shifted toward 45.
- **Do** make orange a committed brand signal, not a tiny accent.
- **Do** use large type with real confidence. The display clamp reaches 8.2rem.
- **Do** use the workshop-shadow pattern (offset + small blur) for tactile depth.
- **Do** let sections breathe with generous spacing while preserving one brand voice.
- **Do** keep copy direct, practical, and reassuring.
- **Do** preserve reduced-motion support for all scroll choreography and entrance animations.
- **Do** wrap body text at 65ch for legibility.
- **Do** use accents sparingly — they are highlights, not territory markers.
- **Do** give each section enough room to prove something real.

### Don't:
- **Don't** use pure `#000` or `#fff`. Every neutral is tinted toward the brand hue.
- **Don't** use gradient text (`background-clip: text` with a gradient).
- **Don't** use decorative glassmorphism (blurs and glass cards as default). PRODUCT.md calls out "decorative trends used without purpose, including default glassmorphism."
- **Don't** use side-stripe borders (`border-left` or `border-right` greater than 1px as a colored accent).
- **Don't** repeat identical icon-card grids as the main structure. PRODUCT.md warns against "interchangeable cards, obvious stock layouts."
- **Don't** make the site look like a generic SaaS landing page. PRODUCT.md anti-reference: "cold modern SaaS monotony, sterile blue/grey palettes, anonymous gradients, over-polished corporate sameness."
- **Don't** make it look like a template shop or distant enterprise agency. PRODUCT.md anti-reference: "template-site and page-builder vibes" and "enterprise agency distance."
- **Don't** add vague filler copy where proof, process, pricing, or next steps would be clearer. PRODUCT.md warns against "generic AI-looking output, vague sections, filler copy."
- **Don't** use standard SaaS blue or cold greys. PRODUCT.md: "sterile blue/grey palettes."
- **Don't** use generic AI-generated assets. PRODUCT.md: "soulless generated visuals."
- **Don't** use accent colors as section backgrounds or large color bands. They are highlights only.
- **Don't** pack multiple sections into a single viewport. Give each section room.
