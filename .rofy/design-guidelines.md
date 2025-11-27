# Design Guidelines

## Design Approach

Modern, clean interface with purple primary color, dramatic colored shadows (30% opacity), and smooth animations. Elements grow 2-5% on hover, 12px rounded corners, bold typography for hierarchy.

---

## Colors

**Purple** - Primary brand (actions, focus, links)

**Semantic:**
- Green = Success, positive
- Amber = Warnings, pending
- Red = Errors, danger
- Blue = Information

**Backgrounds:** White/light gray (light mode), deep blue-gray (dark mode)

---

## Typography

**Font:** Jost (modern sans-serif)

**Sizes:** 12px (captions) · 14px (labels) · 16px (body/buttons) · 18px (card titles) · 20px (headers) · 24px (page titles)

**Weights:** 400 (body) · 500 (emphasis) · 600 (buttons/badges) · 700 (titles)

---

## Spacing

**Scale:** 4px multiples (4, 8, 12, 16, 24, 32)
- Small gaps: 8-16px
- Card padding: 24px
- Page margins: 24-32px

**Corners:** 6px (inputs/buttons) · 12px (cards/dialogs) · Full (badges/pills)

---

## Components

### Buttons
Primary (purple), Destructive (red), Outline (border), Secondary (gray), Ghost (transparent), Link (underlined)
- Hover: Grow 2%, bright shadow, 10% brighter
- Press: Shrink to 95%
- Focus: Purple ring
- Disabled: 50% opacity

### Badges
Pill-shaped, semibold, 8 variants
- Hover: Grow 5%, colored glow (30% opacity)
- Colors: Green/Amber/Red/Blue/Purple/Gray

### Alerts
Thick colored left border, matching icon, subtle background tint

### Cards
12px corners, soft shadow (prominent on hover), 24px padding
- Structure: Header (title + description) → Content → Footer

### Forms
- Inputs: 40px height, purple border on focus, 6px corners
- Labels: Above fields, 14px medium weight
- Layout: 16px spacing, buttons at bottom

### Dialogs & Sheets
12px corners, dramatic shadow, dark backdrop
- Sheets slide from edges (top/bottom/left/right)

### Calendar
48×48px cells, 24px padding
- Selected: Grows 5%, purple ring, shadow
- Today: Gray background, purple border
- Hover: Grows 5%, rounded

### Draggable
Hand cursor, grows 105% while dragging, can be constrained

### Toasts (Sonner)
Slide up from bottom, colored backgrounds, auto-dismiss

---

## Animations

**Timing:** 150ms (quick) · 200ms (standard) · 300ms (default) · 500ms (complex)

**Scale:**
- Small elements: 5% on hover
- Large elements: 2% on hover
- Press: 95%
- Dragging: 105%

**Shadows:** Subtle → dramatic on hover with colored glow (30% opacity)

**Brightness:** Primary +10%, Secondary +5%

**Focus:** Purple ring (2px thick, 2px offset) on keyboard navigation only

---

## Icons

**Lucide React** - Consistent stroke, rounded, outline style

**Sizes:** 16px (standard) · 20px (larger) · 24px (highlights)

**With text:** Icon left with small gap

---

## Accessibility

- **Contrast:** 4.5:1 (text), 3:1 (UI/large text)
- **Keyboard:** Tab through all, Enter/Space activates, Escape closes
- **Focus:** Always visible purple ring
- **Touch:** 44×44px minimum targets
- **Screen readers:** Semantic HTML, descriptive labels

---

## Responsive

**Mobile-first approach**

**Breakpoints:** Mobile (<640px) · Tablet (768px+) · Desktop (1024px+) · Large (1280px+)

**Adaptations:**
- Cards: Stack (mobile) → Grid (desktop)
- Forms: Single column (mobile) → Multi-column (desktop)
- Navigation: Hidden (mobile) → Visible (desktop)
- Dialogs: Full-screen (mobile) → Centered (desktop)

---


## Principles

1. **Consistency** - Same patterns throughout
2. **Clarity** - Obvious interfaces
3. **Feedback** - Visual response to actions
4. **Accessibility** - Keyboard + screen reader support
5. **Performance** - Smooth, fast animations
6. **Responsiveness** - Great on all screens
7. **Delight** - Subtle polish

---

## Best Practices

**Building:**
- TypeScript for type safety
- Single-purpose components
- Keyboard navigation support
- Test light + dark modes
- Proper contrast
- Loading states
- Helpful error messages

**Consistency:**
- Semantic colors (green=good, red=bad, amber=caution)
- 4px spacing multiples
- 12px rounded corners
- Hover effects on interactive elements
- 30% opacity colored shadows
- Focus indicators always visible
- Semibold for buttons/badges, Bold for titles

**Dark Mode:**
- Test everything
- Visible shadows
- Proper contrast
- Deeper colors