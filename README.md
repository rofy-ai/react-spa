# React SPA Component Library

A complete, production-ready React component library built with **shadcn/ui** design system, featuring comprehensive theming and variant support.

## 🎨 Features

### 1. **Dark/Light Mode Support**
All 47 components automatically adapt to dark and light themes using CSS custom properties.

```tsx
import { ThemeProvider } from "@/components/theme-provider"
import { ModeToggle } from "@/components/mode-toggle"

// In your app
<ThemeProvider defaultTheme="light" storageKey="app-theme">
  <YourApp />
  <ModeToggle /> {/* Theme switcher */}
</ThemeProvider>
```

### 2. **Size Variants**
Components support multiple sizes for different use cases:
- **sm** (small): Compact for dense interfaces
- **md** (medium): Default, balanced size
- **lg** (large): Prominent, accessible
- **xl** (extra large): Hero elements (Button only)

### 3. **Radius Variants**
Control the corner rounding of components:
- **none**: Sharp corners (0px)
- **sm**: Subtle (2px)
- **md**: Medium (6px) - Default for most
- **lg**: Large (8px)
- **xl**: Extra large (12px) - Card only
- **full**: Fully rounded/pill shape

## 📦 Component Variants

### Button
```tsx
<Button 
  variant="default|secondary|destructive|outline|ghost|link"
  size="sm|md|lg|xl|icon"
  radius="none|sm|md|lg|full"
>
  Click me
</Button>
```

### Card
```tsx
<Card size="sm|md|lg" radius="none|sm|md|lg|xl">
  <CardHeader>
    <CardTitle>Title</CardTitle>
    <CardDescription>Description</CardDescription>
  </CardHeader>
  <CardContent>Content</CardContent>
  <CardFooter>Actions</CardFooter>
</Card>
```

### Input
```tsx
<Input 
  size="sm|md|lg" 
  radius="none|sm|md|lg|full"
  placeholder="Enter text..."
/>
```

### Badge
```tsx
<Badge 
  variant="default|secondary|destructive|outline"
  size="sm|md|lg"
  radius="none|sm|md|lg|full"
>
  New
</Badge>
```

### Alert
```tsx
<Alert 
  variant="default|destructive"
  size="sm|md|lg"
  radius="none|sm|md|lg"
>
  <AlertTitle>Heading</AlertTitle>
  <AlertDescription>Message</AlertDescription>
</Alert>
```

### Textarea
```tsx
<Textarea 
  size="sm|md|lg"
  radius="none|sm|md|lg"
  placeholder="Enter message..."
/>
```

## 🎯 Component Showcase

Visit `/showcase` in your development environment to see all components with their variants in action.

## 📚 Complete Component List

### Enhanced with Full Variants
1. ✅ Button (variant, size, radius)
2. ✅ Card (size, radius)
3. ✅ Input (size, radius)
4. ✅ Badge (variant, size, radius)
5. ✅ Alert (variant, size, radius)
6. ✅ Textarea (size, radius)

### All Available Components (47 Total)
- Accordion
- Alert Dialog
- Alert ✅
- Aspect Ratio
- Avatar
- Badge ✅
- Breadcrumb
- Button ✅
- Calendar
- Card ✅
- Carousel
- Chart
- Checkbox
- Collapsible
- Command
- Context Menu
- Dialog
- Drawer
- Dropdown Menu
- Form
- Hover Card
- Input ✅
- Input OTP
- Label
- Menubar
- Navigation Menu
- Pagination
- Popover
- Progress
- Radio Group
- Resizable
- Scroll Area
- Select
- Separator
- Sheet
- Sidebar
- Skeleton
- Slider
- Sonner (Toast)
- Switch
- Table
- Tabs
- Textarea ✅
- Toaster
- Toggle
- Toggle Group
- Tooltip

## 🚀 Usage Examples

### Creating a Form
```tsx
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export default function LoginForm() {
  return (
    <Card size="md" radius="lg">
      <CardHeader>
        <CardTitle>Login</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <Input size="md" radius="md" placeholder="Email" type="email" />
        <Input size="md" radius="md" placeholder="Password" type="password" />
        <Button size="lg" radius="md" className="w-full">
          Sign In
        </Button>
      </CardContent>
    </Card>
  )
}
```

### Status Badges
```tsx
<Badge size="sm" radius="full" variant="default">Active</Badge>
<Badge size="sm" radius="full" variant="secondary">Pending</Badge>
<Badge size="sm" radius="full" variant="destructive">Error</Badge>
```

### Notifications
```tsx
<Alert size="md" radius="lg" variant="default">
  <Info className="h-4 w-4" />
  <AlertTitle>Update Available</AlertTitle>
  <AlertDescription>
    A new version is ready to install.
  </AlertDescription>
</Alert>
```

## 🎨 Theme Customization

All colors are defined as CSS custom properties in `client/src/index.css`:

```css
:root {
  --background: 0 0% 100%;
  --foreground: 240 10% 3.9%;
  --primary: 240 5.9% 10%;
  /* ... more variables */
}

.dark {
  --background: 240 10% 3.9%;
  --foreground: 0 0% 98%;
  --primary: 0 0% 98%;
  /* ... more variables */
}
```

## 🛠️ Tech Stack

- **React 19** - Latest React with improved performance
- **TypeScript** - Type safety
- **Tailwind CSS** - Utility-first styling
- **Radix UI** - Accessible component primitives
- **Class Variance Authority** - Variant management
- **Vite** - Fast build tool
- **Express** - Backend server
- **React Query** - Data fetching

## 📖 Documentation Files

- `COMPONENT_VARIANTS.md` - Detailed variant documentation
- `AI_COMPONENT_GUIDE.md` - Quick reference for AI assistants

## 🎯 For AI Assistants (Claude, etc.)

When building apps with this repo:
1. All components support dark/light themes automatically
2. Use size variants (sm|md|lg) for different contexts
3. Use radius variants for design consistency
4. Components are fully typed - TypeScript will guide you
5. Visit `/showcase` to see all options visually

## 🚦 Getting Started

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Visit http://localhost:5000
# Visit http://localhost:5000/showcase for component demo
```

## 📝 License

Private - For internal use
