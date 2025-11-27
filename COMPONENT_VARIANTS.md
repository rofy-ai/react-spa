# Component Variants Documentation

All components in this library support **dark/light mode** automatically through the theme system. Below are the additional variants available for each component.

## Components with Size & Radius Variants

### Button
**Variants:**
- `variant`: default | secondary | destructive | outline | ghost | link
- `size`: sm | md | lg | xl | icon
- `radius`: none | sm | md | lg | full

**Example:**
```tsx
<Button size="lg" radius="full" variant="default">
  Click me
</Button>
```

### Card
**Variants:**
- `size`: sm | md | lg
- `radius`: none | sm | md | lg | xl

**Example:**
```tsx
<Card size="md" radius="lg">
  <CardHeader>
    <CardTitle>Title</CardTitle>
  </CardHeader>
  <CardContent>Content</CardContent>
</Card>
```

### Input
**Variants:**
- `size`: sm | md | lg
- `radius`: none | sm | md | lg | full

**Example:**
```tsx
<Input 
  size="md" 
  radius="md" 
  placeholder="Enter text..." 
/>
```

### Badge
**Variants:**
- `variant`: default | secondary | destructive | outline
- `size`: sm | md | lg
- `radius`: none | sm | md | lg | full

**Example:**
```tsx
<Badge size="md" radius="full" variant="default">
  New
</Badge>
```

### Alert
**Variants:**
- `variant`: default | destructive
- `size`: sm | md | lg
- `radius`: none | sm | md | lg

**Example:**
```tsx
<Alert size="md" radius="lg" variant="default">
  <AlertTitle>Note</AlertTitle>
  <AlertDescription>This is an alert message.</AlertDescription>
</Alert>
```

### Textarea
**Variants:**
- `size`: sm | md | lg
- `radius`: none | sm | md | lg

**Example:**
```tsx
<Textarea 
  size="md" 
  radius="md" 
  placeholder="Enter message..." 
/>
```

## Theme System

### Dark/Light Mode
All components automatically adapt to dark and light modes using CSS custom properties. The theme can be controlled using the `ThemeProvider` and `ModeToggle` components.

**Available themes:**
- `light`: Light mode
- `dark`: Dark mode
- `system`: Follow system preference

**Theme Provider Setup:**
```tsx
import { ThemeProvider } from "@/components/theme-provider"

function App() {
  return (
    <ThemeProvider defaultTheme="light" storageKey="app-theme">
      {/* Your app */}
    </ThemeProvider>
  )
}
```

**Theme Toggle:**
```tsx
import { ModeToggle } from "@/components/mode-toggle"

// Dropdown button to switch themes
<ModeToggle />
```

## Component Showcase

Visit `/showcase` in your app to see all components with their variants in action.

## Size Reference

### Size Scale
- **sm** (small): Compact size for dense UIs
- **md** (medium): Default size for most use cases
- **lg** (large): Larger size for emphasis or accessibility
- **xl** (extra large): Maximum size for hero sections (Button only)

### Radius Scale
- **none**: Sharp corners (0px)
- **sm**: Subtle rounding (2px)
- **md**: Medium rounding (6px)
- **lg**: Large rounding (8px)
- **xl**: Extra large rounding (12px) (Card only)
- **full**: Fully rounded/pill shape

## Complete Component List

### Components with Full Variants (Size + Radius)
1. Button ✓
2. Card ✓
3. Input ✓
4. Badge ✓
5. Alert ✓
6. Textarea ✓

### Other Available Components
7. Accordion
8. Alert Dialog
9. Aspect Ratio
10. Avatar
11. Breadcrumb
12. Calendar
13. Carousel
14. Chart
15. Checkbox
16. Collapsible
17. Command
18. Context Menu
19. Dialog
20. Drawer
21. Dropdown Menu
22. Form
23. Hover Card
24. Input OTP
25. Label
26. Menubar
27. Navigation Menu
28. Pagination
29. Popover
30. Progress
31. Radio Group
32. Resizable
33. Scroll Area
34. Select
35. Separator
36. Sheet
37. Sidebar
38. Skeleton
39. Slider
40. Sonner (Toast)
41. Switch
42. Table
43. Tabs
44. Toggle
45. Toggle Group
46. Tooltip
47. Toaster

All components support dark/light themes automatically!
