## Design Approach

Modern, clean, and professional aesthetic with a focus on clarity and usability. The design balances visual appeal with functional simplicity. Emphasis on whitespace, purple-blue gradients, subtle depth through shadows, and smooth micro-interactions that feel responsive and polished.

The overall mood is confident yet approachable—professional enough for business use, but warm enough to feel human. Every element serves a purpose, with no unnecessary decoration.

---

## Color System

### Primary Palette
- **Primary** – Purple tones for brand identity, trust, and action
- **Secondary** – Blue tones for supporting accents and depth

### Gradients
- **Primary Gradient** – Purple to blue, used for hero sections, CTAs, featured elements
- **Accent Gradient** – Blue to purple (reversed) for variety and highlights
- **Subtle Gradient** – Light purple to light blue for backgrounds, cards
- Direction: typically left-to-right or diagonal (135deg)

### Semantic Colors
- **Success** – Emerald green for positive states, confirmations
- **Warning** – Amber for caution, pending states
- **Error** – Rose/red for errors, destructive actions
- **Info** – Sky blue for informational messages

### Neutrals
- **Background** – Clean whites and very light grays
- **Surface** – White cards with subtle elevation
- **Border** – Light gray, barely visible separation
- **Text Primary** – Near-black for readability
- **Text Secondary** – Medium gray for supporting text
- **Text Muted** – Light gray for placeholders, hints

---

## Typography

### Font Families
- **Primary** – Jost for all text (headings and body)
- **Mono** – JetBrains Mono or system monospace for code

### Hierarchy
- **Display** – Extra large, bold, used sparingly for hero sections
- **H1** – Page titles, bold, generous margin below
- **H2** – Section headers, semibold
- **H3** – Subsection headers, medium weight
- **Body** – Default readable size, comfortable line height
- **Small** – Captions, labels, helper text

### Principles
- High contrast for readability
- Consistent line heights (1.5 for body, 1.2 for headings)
- Letter spacing slightly tightened for headings

---

## Layout & Spacing

### Spacing Scale
Base unit: 4px. Common increments: 4, 8, 12, 16, 24, 32, 48, 64.

### Container Widths
- **Narrow** – Forms, auth pages, focused content
- **Default** – Standard page content
- **Wide** – Dashboards, data-heavy layouts
- **Full** – Edge-to-edge sections, heroes

### Grid
- 12-column grid for complex layouts
- Single column for mobile, expanding on larger screens
- Consistent gutters matching spacing scale

### Rhythm
- Generous padding inside cards and sections
- Consistent vertical spacing between sections
- Breathing room around interactive elements

---

## Components

### Buttons
- **Primary** – Purple-blue gradient background, white text, main actions
- **Secondary** – Subtle background or outline, supporting actions
- **Ghost** – Transparent, minimal visual weight
- **Destructive** – Red-tinted for dangerous actions
- All buttons: rounded corners, comfortable padding, clear hover/focus states

### Cards
- Clean white background with subtle shadow
- Optional subtle gradient border or accent
- Rounded corners (medium radius)
- Generous internal padding
- Hover: slight shadow increase or gradient border glow

### Forms
- Clear labels above inputs
- Comfortable input height with padding
- Subtle border, purple-blue focus ring on interaction
- Inline validation with semantic colors

### Navigation
- Clean header with logo left, nav center or right
- Clear active states using primary purple
- Mobile: hamburger menu or bottom nav

### Modals & Dialogs
- Centered with backdrop overlay
- Clear title, body, action buttons
- Easy dismissal (X button, click outside, escape key)
- Smooth fade/scale entrance

---

## Animations & Interactions

### Motion Philosophy
Animations should feel swift and purposeful—never slow or decorative. They provide feedback, guide attention, and create polish.

### Timing
- **Fast** – 100-150ms for hovers, toggles, small state changes
- **Medium** – 200-300ms for modals, dropdowns, transitions
- **Slow** – 400-500ms for complex reveals

### Micro-interactions
- Buttons: slight scale or shadow lift on hover
- Cards: shadow depth increase on hover
- Inputs: smooth border color transition on focus
- Loading: skeleton shimmer or spinner
- Gradients: subtle shift or shimmer on hover for featured elements

---

## Icons

### Style
- Outline style for most UI icons
- Solid/filled for active states or emphasis
- Consistent stroke width across icon set
- Rounded line caps for friendly feel

### Size
- Small: inline with text, labels
- Medium: buttons, navigation items
- Large: empty states, feature highlights

---

## Accessibility

### Contrast
- Minimum 4.5:1 for body text
- Minimum 3:1 for large text and UI elements
- Ensure gradient text has sufficient contrast

### Focus States
- Visible purple-blue focus ring on all interactive elements
- High contrast focus indicators
- Never remove focus outlines without replacement

### Keyboard Navigation
- Logical tab order
- All actions accessible via keyboard

### Screen Readers
- Semantic HTML structure
- ARIA labels where needed
- Meaningful alt text for images

---

## Responsive Behavior

### Strategy
Mobile-first approach. Design for smallest screens, enhance for larger.

### Breakpoints
- **Mobile** – Default, single column
- **Tablet** – ~768px, two columns, expanded nav
- **Desktop** – ~1024px, full layout, sidebars
- **Wide** – ~1280px+, max-width containers

### Adaptations
- Stack horizontal layouts vertically on mobile
- Collapse navigation to hamburger/drawer
- Touch-friendly tap targets (min 44px)
