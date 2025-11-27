# Quick Component Reference for AI Assistants

## Usage Patterns

### Button Component
```tsx
// All combinations work
<Button>Default</Button>
<Button size="sm|md|lg|xl">Sized</Button>
<Button radius="none|sm|md|lg|full">Shaped</Button>
<Button variant="default|secondary|destructive|outline|ghost|link">Styled</Button>
<Button size="lg" radius="full" variant="default">Combined</Button>
```

### Card Component
```tsx
<Card size="sm|md|lg" radius="none|sm|md|lg|xl">
  <CardHeader>
    <CardTitle>Title</CardTitle>
    <CardDescription>Description</CardDescription>
  </CardHeader>
  <CardContent>Content</CardContent>
  <CardFooter>Footer</CardFooter>
</Card>
```

### Input Component
```tsx
<Input 
  size="sm|md|lg" 
  radius="none|sm|md|lg|full"
  placeholder="Text"
  type="text|email|password|..."
/>
```

### Badge Component
```tsx
<Badge 
  size="sm|md|lg" 
  radius="none|sm|md|lg|full"
  variant="default|secondary|destructive|outline"
>
  Label
</Badge>
```

### Alert Component
```tsx
<Alert 
  size="sm|md|lg" 
  radius="none|sm|md|lg"
  variant="default|destructive"
>
  <AlertTitle>Title</AlertTitle>
  <AlertDescription>Message</AlertDescription>
</Alert>
```

### Textarea Component
```tsx
<Textarea 
  size="sm|md|lg" 
  radius="none|sm|md|lg"
  placeholder="Enter text..."
/>
```

## Default Values
- **Button**: size="default" (same as md), radius="md"
- **Card**: size="md", radius="lg"
- **Input**: size="md", radius="md"
- **Badge**: size="md", radius="full"
- **Alert**: size="md", radius="lg"
- **Textarea**: size="md", radius="md"

## Theme Support
All components automatically support dark/light themes. No additional props needed.

## Import Pattern
```tsx
import { ComponentName } from "@/components/ui/component-name"
```
