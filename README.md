# Mora — Sparkling Botanical Tonics

A single-page product marketing site for a fictional sparkling botanical tonic brand. The experience pairs an editorial visual system with semantic HTML5, custom CSS layout modules, and dependency-free JavaScript. It is implemented with HTML, CSS, and JavaScript only — no front-end framework or build tooling.

The page is designed to work as a polished storefront front end: visitors can explore the product story, compare flavors, read reviews, expand product questions, and interact with the starter-pack offer.

## Project structure

```text
.
├── index.html   # Semantic HTML5 markup
├── styles.css   # Design tokens, layout modules, components, media queries
├── script.js    # Navigation, bag counter, toast, form validation, counters
└── README.md    # Project documentation
```

`index.html` links the stylesheet in the `<head>` and loads `script.js` with the `defer` attribute, so the markup is parsed before any behavior runs. There is no framework, package manager, build command, or compilation step — keep the three files in the same folder.

## Run locally

1. Open `index.html` directly in a modern browser.
2. For a local server, run one of the following from this folder:

```bash
python3 -m http.server 8000
```

```bash
npx serve .
```

Then visit `http://localhost:8000`.

An internet connection is required for the two Google Fonts and the botanical photograph. If either is unavailable, the page falls back to system serif/sans-serif fonts and still preserves its layout.

## Highlights

- Custom design system built with CSS custom properties.
- Semantic landmarks: `header`, `nav`, `main`, `section`, `article`, `figure`, `blockquote`, `footer`.
- Fluid typography with `clamp()` and a responsive spacing scale.
- CSS-drawn product cans with reusable flavor color variations.
- Three-column desktop modules, focused two-column tablet layouts, and single-column mobile layouts.
- Responsive navigation with an accessible mobile menu.
- Interactive bag counter and confirmation toast.
- Accessible FAQ accordions that keep one answer open at a time.
- Newsletter form with inline success and error feedback.
- View-triggered animated product statistics with static fallback values.
- Full `prefers-reduced-motion` support.
- No horizontal scrolling at any supported viewport width.

## Layout and responsive behavior

The page starts with the full desktop composition and uses carefully scoped max-width media queries to reshape major modules at each smaller breakpoint.

| Viewport range | Primary layout changes |
| --- | --- |
| 1101px and up | Full desktop layout: split hero, horizontal navigation, three-column benefits and flavors, split story, four-column stat band, three-column reviews. |
| 961px–1100px | Tighter desktop gutters and hero proportions; product imagery scales fluidly while the full navigation remains visible. |
| 761px–960px | Tablet layout: navigation collapses into the mobile menu; hero, story, offer, FAQ, and newsletter modules stack. Benefits and flavors use a two-column arrangement; the final flavor card spans the row. Reviews and the stat band become focused two-column grids. |
| 701px–760px | Single-column flavor cards, mobile-friendly hero actions, reduced press-strip columns, and stacked offer content. |
| 421px–700px | Compact header, stacked hero actions, one-column benefit and offer lists, two-column stats, wrapped signup form, and two-column footer links. |
| 420px and below | Smallest layout: compact controls, full-width primary hero action, tighter product artwork, reduced card padding, and a compact footer wordmark. |

Supporting breakpoints at **1100px**, **960px**, **760px**, **700px**, and **420px** are explicit in the stylesheet. The layout is checked for viewport widths from **320px** upward, as well as tablet portrait and landscape sizes.

### Overflow safeguards

- `overflow-x: clip` is applied at the document level.
- Every grid and flex child uses `min-width: 0` where content could otherwise force expansion.
- Interactive button groups wrap instead of overflowing.
- Images and decorative SVGs are constrained to their parent containers.
- Decorative artwork uses clipped, proportional positioning rather than fixed canvas widths.
- Product cards use fluid widths and `clamp()` rather than fixed pixel dimensions.
- Long labels and footer contact links use safe wrapping.

## Interactions

| Interaction | Behavior |
| --- | --- |
| Sticky header | Gains a subtle background and shadow after scrolling. |
| Mobile menu | Opens from the header action, closes on link selection or `Escape`, updates `aria-expanded`, and locks background scroll while open. |
| Add to bag | Updates the item count, updates the bag's accessible label, displays a temporary confirmation toast, and gives the clicked button short-lived feedback. |
| Starter pack | Adds the featured offer to the same front-end bag counter. |
| FAQ | Native `details` elements are progressively enhanced so opening one answer closes the others. |
| Newsletter | Validates the email format, reports errors inline, clears the field after success, and announces feedback through a live region. |
| Product facts | Statistics count up once when they enter view; the values remain static when reduced motion is requested. |
| Motion | Statistics animate when they enter the viewport, while all page content stays visible without JavaScript. |

The shopping bag and signup flow are front-end demonstrations. No order, payment, or email data is sent to a server.

## Accessibility

- Skip-to-content link.
- Visible focus styles for keyboard users.
- Correct heading hierarchy and named page regions.
- Mobile navigation state announced through `aria-expanded` and an updating accessible label.
- Form errors connected with `aria-describedby`; live feedback provided with `role="status"`.
- Decorative botanicals and CSS-rendered cans hidden from assistive technology.
- Meaningful alternative text for content photography.
- Star ratings include accessible text labels.
- Reduced-motion preference disables counter and marquee movement.
- Semantic native accordion elements preserve keyboard behavior without JavaScript.

## Design tokens

The main palette and spacing values are declared in `:root` at the top of `styles.css`.

| Token | Value | Role |
| --- | --- | --- |
| `--canvas` | `#f3eee2` | Warm page background |
| `--surface` | `#fbf8f0` | Cards and elevated surfaces |
| `--forest` | `#163c2a` | Primary brand green |
| `--forest-deep` | `#0e291c` | Dark sections and footer |
| `--lime` | `#dcef9b` | Accent and call-to-action color |
| `--clay` | `#c97550` | Small warm details and focus states |
| `--sand` | `#e8dcc4` | Newsletter panel |

Typography uses **Instrument Serif** for editorial display headlines and **Manrope** for interface and body copy. Both are loaded from Google Fonts with system fallbacks.

To adjust breakpoints, edit the media query blocks under "Responsive layout boundaries" at the end of `styles.css`. To adjust flavor colors, change the `--can-body` and `--can-ink` custom properties on the relevant `.flavor-visual--*` rule. Interactive behavior is grouped by feature inside `script.js`.

## Browser support

Designed for current versions of Chrome, Edge, Firefox, and Safari. The page relies on modern CSS features such as Grid, Flexbox, `clamp()`, custom properties, and `aspect-ratio`. JavaScript enhancements are progressive: essential content remains available without them.

## Content and asset credits

- Botanical photography: [Việt Anh Nguyễn on Pexels](https://www.pexels.com/photo/32030503/).
- Typefaces: [Instrument Serif](https://fonts.google.com/specimen/Instrument+Serif) and [Manrope](https://fonts.google.com/specimen/Manrope) via Google Fonts.
- Brand, product names, flavor descriptions, reviews, and testimonials are original fictional marketing content created for this project.

## License

The page code and original written content may be reused and adapted for personal or commercial projects. The externally hosted photograph and fonts remain subject to their respective platform licenses.
