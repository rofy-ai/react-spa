# React SPA Template - Complete Reference Guide

**Template Type**: React Single Page Application with Express Backend  
**Framework**: React 19.1.1 + Vite 7.1.2 + Express  
**UI Library**: shadcn/ui 
**Styling**: Tailwind CSS 
**Routing**: Wouter  
**State Management**: TanStack Query 
**Form Handling**: React Hook Form + Zod 
**Database**: MongoDB with Mongoose 
---

## 🚫 FORBIDDEN FILES (DO NOT EDIT)

**CRITICAL**: These files must NEVER be modified. They are system-managed or auto-generated:

### Core Server Infrastructure (DO NOT MODIFY)
- `server/backend-entry.ts` - User API server entry point
- `server/backend-server.ts` - Backend development server
- `server/index.ts` - Main server entry
- `server/routes.ts` - Core API route handlers
- `server/vite.ts` - Vite dev server integration
- `server/zip.ts` - Project zip creation

### Configuration Files (DO NOT MODIFY)
- `client/tsconfig.json` - TypeScript configuration
- `client/tsconfig.app.json` - TypeScript app configuration
- `client/tsconfig.node.json` - TypeScript node configuration

### Docker & Deployment (DO NOT MODIFY)
- `Dockerfile` - Docker container configuration
- `.dockerignore` - Docker ignore patterns

### System Files (DO NOT MODIFY)
- `.rofy/rules.md` - Platform rules and constraints
- `node_modules/**/*` - Dependencies
- `dist/**/*` - Build output
- `public/downloads/**/*` - Download files
- `public/rofy_downloads/**/*` - Platform download files
- `server/public/**/*` - Server static files
- `.DS_Store` - macOS system files
- `vite.config.ts.*` - Vite temp files
- `*.tar.gz` - Archive files
- `client/tsconfig.tsbuildinfo` - TypeScript build info

**User Editable Areas**:
- `client/src/**/*` - All frontend application code
- `server/backend-routes.ts` - Your custom API routes
- `server/models/**/*` - Database models
- `.env` - Environment variables

**CRITICAL: ALWAYS WRITE BACKEND APIS FOLLOWING THESE RULES**

**⚠️ NEVER MODIFY THE `registerBackendRoutes` FUNCTION SIGNATURE OR STRUCTURE**
- DO NOT change the function name, parameters, or return type
- DO NOT modify the existing health check endpoint (`/__health`)
- DO NOT remove or modify the `createServer(app)` return statement
- DO NOT remove or modify the console.log statement

**✅ ALWAYS ADD NEW API ROUTES INSIDE THE FUNCTION BODY**
- Add new routes AFTER the existing endpoints
- Add new routes BEFORE the `console.log` and `return` statements
- Follow the same pattern as existing routes

---

## Database Rules
- **ALWAYS use Mongoose for MongoDB operations (never native MongoDB driver)**
- Use `_id` (not `id`) for document IDs, enable `timestamps: true`

## 📁 PROJECT STRUCTURE

```
react-spa/
├── client/                          # Frontend React application
│   ├── src/
│   │   ├── components/
│   │   │   ├── mode-toggle.tsx      # Theme toggle component
│   │   │   ├── theme-provider.tsx   # Theme context provider
│   │   │   └── ui/                  # shadcn/ui components (49 components, PascalCase naming)
│   │   │       ├── Accordion.tsx
│   │   │       ├── Alert.tsx
│   │   │       ├── AlertDialog.tsx
│   │   │       ├── AspectRatio.tsx
│   │   │       ├── AuthForms.tsx
│   │   │       ├── Avatar.tsx
│   │   │       ├── Badge.tsx
│   │   │       ├── Breadcrumb.tsx
│   │   │       ├── Button.tsx
│   │   │       ├── ButtonGroup.tsx
│   │   │       ├── Calendar.tsx
│   │   │       ├── Card.tsx
│   │   │       ├── Carousel.tsx
│   │   │       ├── Checkbox.tsx
│   │   │       ├── Collapsible.tsx
│   │   │       ├── Command.tsx
│   │   │       ├── ContextMenu.tsx
│   │   │       ├── Dialog.tsx
│   │   │       ├── Draggable.tsx
│   │   │       ├── Drawer.tsx
│   │   │       ├── DropdownMenu.tsx
│   │   │       ├── Footer.tsx
│   │   │       ├── Form.tsx
│   │   │       ├── HoverCard.tsx
│   │   │       ├── Input.tsx
│   │   │       ├── InputOTP.tsx
│   │   │       ├── Label.tsx
│   │   │       ├── LoadingSpinner.tsx
│   │   │       ├── Menubar.tsx
│   │   │       ├── NavigationMenu.tsx
│   │   │       ├── Pagination.tsx
│   │   │       ├── Popover.tsx
│   │   │       ├── Progress.tsx
│   │   │       ├── RadioGroup.tsx
│   │   │       ├── Resizable.tsx
│   │   │       ├── ScrollArea.tsx
│   │   │       ├── Select.tsx
│   │   │       ├── Separator.tsx
│   │   │       ├── Sheet.tsx
│   │   │       ├── Sidebar.tsx
│   │   │       ├── Skeleton.tsx
│   │   │       ├── Slider.tsx
│   │   │       ├── Sonner.tsx
│   │   │       ├── Switch.tsx
│   │   │       ├── Table.tsx
│   │   │       ├── Tabs.tsx
│   │   │       ├── Textarea.tsx
│   │   │       ├── Toggle.tsx
│   │   │       ├── ToggleGroup.tsx
│   │   │       └── Tooltip.tsx
│   │   ├── pages/                   # Route components
│   │   │   ├── home.tsx             # Homepage
│   │   │   ├── not-found.tsx        # 404 page
│   │   │   └── component-showcase.tsx # Component showcase page
│   │   ├── hooks/                   # Custom React hooks
│   │   │   ├── use-toast.ts         # Toast notifications (react-hot-toast wrapper)
│   │   │   └── use-mobile.tsx       # Mobile breakpoint detection
│   │   ├── lib/                     # Utility libraries
│   │   │   ├── utils.ts             # cn() function for className merging
│   │   │   └── queryClient.ts       # TanStack Query configuration
│   │   ├── context/                 # Empty - for React Context files
│   │   ├── contexts/                # Empty - for React Context files
│   │   ├── types/                   # Empty - for TypeScript types
│   │   ├── utils/                   # Empty - for utility functions
│   │   ├── App.tsx                  # Root App component with routing (named export)
│   │   ├── main.tsx                 # React entry point
│   │   ├── index.css                # Tailwind CSS imports
│   │   └── global.d.ts              # Global TypeScript declarations
│   ├── public/                      # Static assets
│   ├── package.json
│   ├── vite.config.ts               # Vite configuration
│   ├── tailwind.config.ts           # Tailwind configuration
│   ├── components.json              # shadcn/ui configuration
│   ├── postcss.config.js
│   └── tsconfig.json
├── server/                          # Backend Express server
│   ├── index.ts                     # Main server entry (port 5001)
│   ├── routes.ts                    # API route handlers
│   ├── backend-entry.ts             # User API server entry (port 5002)
│   ├── backend-routes.ts            # User API routes
│   ├── backend-server.ts            # Backend development server
│   ├── vite.ts                      # Vite dev server integration
│   └── zip.ts                       # Project zip creation
├── data/                            # Empty - for database files
├── package.json                     # Root workspace package.json
├── tsconfig.json                    # Root TypeScript config
├── tsup.config.ts                   # Server build configuration
├── Dockerfile
├── docker-entrypoint.sh
└── .env                             # Environment variables (MongoDB connection string)

```

---

## ⚙️ CONFIGURATION FILES

### package.json (Root)
**Workspace**: Monorepo with `client` workspace  
**Key Scripts**:
- `dev` - Start development server (nodemon + tsx, port 5001)
- `dev-server` - Start server only
- `build` - Build client + server for production
- `build:client` - Build React app to `dist/public`
- `build:server` - Build server with tsup
- `start` - Start production server
- `zip` - Create project zip file

### vite.config.ts
**Path Aliases**:
- `@/*` → `client/src/*`
- `@shared/*` → `shared/*`
- `@assets/*` → `client/attached_assets/*`

**Dev Server**: Port 5173 (proxied through port 5001)

### tailwind.config.ts
```typescript
{
  darkMode: ["class"],
  content: ["./index.html", "./src/**/*.{js,jsx,ts,tsx}"],
  plugins: [require("tailwindcss-animate")]
}
```

### components.json (shadcn/ui)
```json
{
  "style": "new-york",
  "rsc": false,
  "tsx": true,
  "tailwind": {
    "baseColor": "neutral",
    "cssVariables": true,
    "prefix": ""
  },
  "aliases": {
    "components": "@/components",
    "utils": "@/lib/utils",
    "ui": "@/components/ui",
    "lib": "@/lib",
    "hooks": "@/hooks"
  }
}
```

---

## 🎨 UI COMPONENTS (shadcn/ui)

**Total Components**: 49

**Import Pattern**:
All UI components follow this pattern:
```typescript
import { ComponentName } from "@/components/ui/ComponentName"
```

### Available Components

#### Core Components
- **Accordion** - Collapsible content sections (AccordionItem, AccordionTrigger, AccordionContent)
- **Alert** - Contextual feedback messages (Alert, AlertTitle, AlertDescription)
- **AlertDialog** - Modal confirmation dialogs (AlertDialog, AlertDialogTrigger, DialogContent, AlertDialogAction, AlertDialogCancel, etc.)
- **AspectRatio** - Maintain responsive aspect ratios
- **AuthForms** - Pre-built login and registration forms with validation (includes tabs for login/register, social auth buttons, form validation with zod and react-hook-form)
- **Avatar** - User profile images with fallback (Avatar, AvatarImage, AvatarFallback)
- **Badge** - Status and category indicators (variants: default, secondary, destructive, outline, info, success, warning, error, primary)
- **Breadcrumb** - Navigation hierarchy (Breadcrumb, BreadcrumbList, BreadcrumbItem, BreadcrumbLink, BreadcrumbSeparator, BreadcrumbPage, BreadcrumbEllipsis)
- **Button** - Interactive button elements (variants: default, destructive, outline, secondary, ghost, link; sizes: sm, md, lg, xl, icon)
- **ButtonGroup** - Grouped button layouts
- **Calendar** - Date picker with modern design (48px × 48px cells, generous spacing)
- **Card** - Content containers (Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter)
- **Carousel** - Image/content sliders with embla-carousel (Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious)
- **Checkbox** - Checkbox input with label support
- **Collapsible** - Expandable content areas (Collapsible, CollapsibleTrigger, CollapsibleContent)
- **Command** - Command palette with cmdk (Command, CommandDialog, CommandInput, CommandList, CommandEmpty, CommandGroup, CommandItem)
- **ContextMenu** - Right-click context menus (ContextMenu, ContextMenuTrigger, ContextMenuContent, ContextMenuItem, ContextMenuSeparator, etc.)
- **Dialog** - Modal dialogs (Dialog, DialogTrigger, DialogContent, DialogHeader, DialogFooter, DialogTitle, DialogDescription)
- **Draggable** - Drag-and-drop elements with Framer Motion (constraints, elastic, momentum options)
- **Drawer** - Bottom drawer component with vaul (Drawer, DrawerTrigger, DrawerContent, DrawerHeader, DrawerTitle, DrawerDescription, DrawerFooter, DrawerClose)
- **DropdownMenu** - Dropdown menus (DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuItem, DropdownMenuCheckboxItem, DropdownMenuRadioItem, etc.)
- **Form** - Form components with React Hook Form integration (Form, FormField, FormItem, FormLabel, FormControl, FormDescription, FormMessage)
- **HoverCard** - Hover-triggered card popups (HoverCard, HoverCardTrigger, HoverCardContent)
- **Input** - Text input fields
- **InputOTP** - One-time password inputs (InputOTP, InputOTPGroup, InputOTPSlot, InputOTPSeparator)
- **Label** - Form field labels
- **LoadingSpinner** - Loading indicators (sizes: sm, md, lg)
- **Menubar** - Application menu bars (Menubar, MenubarMenu, MenubarTrigger, MenubarContent, MenubarItem, etc.)
- **NavigationMenu** - Navigation menus with dropdowns (NavigationMenu, NavigationMenuList, NavigationMenuItem, NavigationMenuTrigger, NavigationMenuContent, NavigationMenuLink)
- **Pagination** - Page navigation controls (Pagination, PaginationContent, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious, PaginationEllipsis)
- **Popover** - Popover overlays (Popover, PopoverTrigger, PopoverContent)
- **Progress** - Progress bars
- **RadioGroup** - Radio button groups (RadioGroup, RadioGroupItem)
- **Resizable** - Resizable panel layouts (ResizablePanelGroup, ResizablePanel, ResizableHandle)
- **ScrollArea** - Custom scrollable areas (ScrollArea, ScrollBar)
- **Select** - Dropdown selects (Select, SelectTrigger, SelectValue, SelectContent, SelectItem, SelectGroup, SelectLabel, SelectSeparator)
- **Separator** - Visual dividers
- **Sheet** - Side panel overlays (Sheet, SheetTrigger, SheetContent, SheetHeader, SheetTitle, SheetDescription, SheetFooter; positions: top, bottom, left, right)
- **Sidebar** - Application sidebars (Sidebar, SidebarHeader, SidebarContent, SidebarFooter, etc.)
- **Skeleton** - Loading placeholders
- **Slider** - Range sliders
- **Sonner** - Toast notifications (replaces react-hot-toast; types: success, error, warning, info, default; colored backgrounds)
- **Switch** - Toggle switches
- **Table** - Data tables (Table, TableHeader, TableBody, TableFooter, TableHead, TableRow, TableCell, TableCaption)
- **Tabs** - Tabbed content (Tabs, TabsList, TabsTrigger, TabsContent)
- **Textarea** - Multi-line text inputs
- **Toaster** - Toast notification container (for Sonner)
- **Toggle** - Toggle buttons (variants: default, outline; sizes: sm, md, lg)
- **ToggleGroup** - Grouped toggle buttons (ToggleGroup, ToggleGroupItem; types: single, multiple)
- **Tooltip** - Hover tooltips (Tooltip, TooltipTrigger, TooltipContent, TooltipProvider)

### Component Details & Props

#### **Button** (`@/components/ui/Button`)
**Exports**: `Button`, `buttonVariants`
```typescript
interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "default" | "destructive" | "outline" | "secondary" | "ghost" | "link"
  size?: "default" | "sm" | "lg" | "icon"
  asChild?: boolean  // Render as child element using Radix Slot
}
```
**Usage**:
```tsx
<Button variant="default" size="lg">Click me</Button>
<Button variant="outline" asChild><Link to="/home">Go</Link></Button>
```

#### **Input** (`@/components/ui/Input`)
**Exports**: `Input`
```typescript
type InputProps = React.ComponentProps<"input">
```
**Usage**:
```tsx
<Input type="text" placeholder="Enter name" />
<Input type="email" className="max-w-sm" />
```

#### **Textarea** (`@/components/ui/Textarea`)
**Exports**: `Textarea`
```typescript
type TextareaProps = React.ComponentProps<"textarea">
```
**Usage**:
```tsx
<Textarea placeholder="Type your message here" />
```

#### **Label** (`@/components/ui/Label`)
**Exports**: `Label`
```typescript
type LabelProps = React.ComponentPropsWithoutRef<typeof LabelPrimitive.Root>
```
**Usage**:
```tsx
<Label htmlFor="email">Email</Label>
<Input id="email" type="email" />
```

#### **Card** (`@/components/ui/Card`)
**Exports**: `Card`, `CardHeader`, `CardTitle`, `CardDescription`, `CardContent`, `CardFooter`
```typescript
// All extend React.HTMLAttributes<HTMLDivElement>
```
**Usage**:
```tsx
<Card>
  <CardHeader>
    <CardTitle>Title</CardTitle>
    <CardDescription>Description</CardDescription>
  </CardHeader>
  <CardContent>Content goes here</CardContent>
  <CardFooter>Footer content</CardFooter>
</Card>
```

#### **Dialog** (`@/components/ui/Dialog`)
**Exports**: `Dialog`, `DialogTrigger`, `DialogContent`, `DialogHeader`, `DialogFooter`, `DialogTitle`, `DialogDescription`, `DialogPortal`, `DialogClose`, `DialogOverlay`
```typescript
// Dialog is RadixUI Dialog.Root
// DialogContent accepts React.ComponentPropsWithoutRef<typeof DialogPrimitive.Content>
```
**Usage**:
```tsx
<Dialog>
  <DialogTrigger asChild>
    <Button>Open Dialog</Button>
  </DialogTrigger>
  <DialogContent>
    <DialogHeader>
      <DialogTitle>Are you sure?</DialogTitle>
      <DialogDescription>This action cannot be undone.</DialogDescription>
    </DialogHeader>
    <DialogFooter>
      <Button variant="outline">Cancel</Button>
      <Button>Confirm</Button>
    </DialogFooter>
  </DialogContent>
</Dialog>
```

#### **Form** (`@/components/ui/Form`)
**Exports**: `Form`, `FormField`, `FormItem`, `FormLabel`, `FormControl`, `FormDescription`, `FormMessage`, `useFormField`
```typescript
// Form is FormProvider from react-hook-form
// FormField uses Controller from react-hook-form
```
**Usage**:
```tsx
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"

const form = useForm({
  resolver: zodResolver(formSchema),
})

<Form {...form}>
  <form onSubmit={form.handleSubmit(onSubmit)}>
    <FormField
      control={form.control}
      name="username"
      render={({ field }) => (
        <FormItem>
          <FormLabel>Username</FormLabel>
          <FormControl>
            <Input placeholder="john" {...field} />
          </FormControl>
          <FormDescription>Your public display name</FormDescription>
          <FormMessage />
        </FormItem>
      )}
    />
  </form>
</Form>
```

#### **Select** (`@/components/ui/Select`)
**Exports**: `Select`, `SelectGroup`, `SelectValue`, `SelectTrigger`, `SelectContent`, `SelectLabel`, `SelectItem`, `SelectSeparator`, `SelectScrollUpButton`, `SelectScrollDownButton`
**Usage**:
```tsx
<Select>
  <SelectTrigger className="w-[180px]">
    <SelectValue placeholder="Select option" />
  </SelectTrigger>
  <SelectContent>
    <SelectItem value="light">Light</SelectItem>
    <SelectItem value="dark">Dark</SelectItem>
  </SelectContent>
</Select>
```

#### **Checkbox** (`@/components/ui/checkbox`)
**Exports**: `Checkbox`
```typescript
type CheckboxProps = React.ComponentPropsWithoutRef<typeof CheckboxPrimitive.Root>
```
**Usage**:
```tsx
<Checkbox id="terms" />
<Label htmlFor="terms">Accept terms</Label>
```

#### **Switch** (`@/components/ui/switch`)
**Exports**: `Switch`
```typescript
type SwitchProps = React.ComponentPropsWithoutRef<typeof SwitchPrimitives.Root>
```
**Usage**:
```tsx
<Switch checked={enabled} onCheckedChange={setEnabled} />
```

#### **Tooltip** (`@/components/ui/tooltip`)
**Exports**: `Tooltip`, `TooltipTrigger`, `TooltipContent`, `TooltipProvider`
```typescript
// TooltipContent has sideOffset prop (default: 4)
```
**Usage**:
```tsx
<TooltipProvider>  {/* Wrap your app once */}
  <Tooltip>
    <TooltipTrigger asChild>
      <Button variant="outline">Hover me</Button>
    </TooltipTrigger>
    <TooltipContent>
      <p>Tooltip content</p>
    </TooltipContent>
  </Tooltip>
</TooltipProvider>
```

#### **Table** (`@/components/ui/table`)
**Exports**: `Table`, `TableHeader`, `TableBody`, `TableFooter`, `TableHead`, `TableRow`, `TableCell`, `TableCaption`
**Usage**:
```tsx
<Table>
  <TableCaption>A list of items</TableCaption>
  <TableHeader>
    <TableRow>
      <TableHead>Name</TableHead>
      <TableHead>Status</TableHead>
    </TableRow>
  </TableHeader>
  <TableBody>
    <TableRow>
      <TableCell>Item 1</TableCell>
      <TableCell>Active</TableCell>
    </TableRow>
  </TableBody>
</Table>
```

#### **Tabs** (`@/components/ui/tabs`)
**Exports**: `Tabs`, `TabsList`, `TabsTrigger`, `TabsContent`
**Usage**:
```tsx
<Tabs defaultValue="account">
  <TabsList>
    <TabsTrigger value="account">Account</TabsTrigger>
    <TabsTrigger value="password">Password</TabsTrigger>
  </TabsList>
  <TabsContent value="account">Account content</TabsContent>
  <TabsContent value="password">Password content</TabsContent>
</Tabs>
```

#### **Accordion** (`@/components/ui/accordion`)
**Exports**: `Accordion`, `AccordionItem`, `AccordionTrigger`, `AccordionContent`
**Usage**:
```tsx
<Accordion type="single" collapsible>
  <AccordionItem value="item-1">
    <AccordionTrigger>Is it accessible?</AccordionTrigger>
    <AccordionContent>Yes. It follows WAI-ARIA design pattern.</AccordionContent>
  </AccordionItem>
</Accordion>
```

#### **DropdownMenu** (`@/components/ui/dropdown-menu`)
**Exports**: `DropdownMenu`, `DropdownMenuTrigger`, `DropdownMenuContent`, `DropdownMenuItem`, `DropdownMenuCheckboxItem`, `DropdownMenuRadioItem`, `DropdownMenuLabel`, `DropdownMenuSeparator`, `DropdownMenuShortcut`, `DropdownMenuGroup`, `DropdownMenuPortal`, `DropdownMenuSub`, `DropdownMenuSubContent`, `DropdownMenuSubTrigger`, `DropdownMenuRadioGroup`
**Usage**:
```tsx
<DropdownMenu>
  <DropdownMenuTrigger asChild>
    <Button variant="outline">Open</Button>
  </DropdownMenuTrigger>
  <DropdownMenuContent>
    <DropdownMenuLabel>My Account</DropdownMenuLabel>
    <DropdownMenuSeparator />
    <DropdownMenuItem>Profile</DropdownMenuItem>
    <DropdownMenuItem>Settings</DropdownMenuItem>
  </DropdownMenuContent>
</DropdownMenu>
```

#### **Badge** (`@/components/ui/badge`)
**Exports**: `Badge`, `badgeVariants`
```typescript
interface BadgeProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: "default" | "secondary" | "destructive" | "outline"
}
```
**Usage**:
```tsx
<Badge>Default</Badge>
<Badge variant="secondary">Secondary</Badge>
<Badge variant="destructive">Error</Badge>
```

#### **LoadingSpinner** (`@/components/ui/loading-spinner`)
**Exports**: `LoadingSpinner`
```typescript
interface LoadingSpinnerProps {
  className?: string
  size?: "sm" | "md" | "lg"  // default: "md"
}
```
**Usage**:
```tsx
<LoadingSpinner size="lg" />
```

#### **Toaster** (`@/components/ui/toaster`)
**Exports**: `Toaster`  
**Note**: This is a wrapper around `react-hot-toast`. Place once in your app.
**Usage**:
```tsx
// In App.tsx (already included)
<Toaster />
```

#### **Other Available Components**:
All follow similar patterns with Radix UI primitives:
- `alert` - Alert, AlertTitle, AlertDescription
- `alert-dialog` - AlertDialog, AlertDialogTrigger, AlertDialogContent, etc.
- `aspect-ratio` - AspectRatio
- `avatar` - Avatar, AvatarImage, AvatarFallback
- `breadcrumb` - Breadcrumb, BreadcrumbList, BreadcrumbItem, etc.
- `calendar` - Calendar (with react-day-picker)
- `carousel` - Carousel, CarouselContent, CarouselItem, etc. (embla-carousel)
- `chart` - Chart components (recharts)
- `collapsible` - Collapsible, CollapsibleTrigger, CollapsibleContent
- `command` - Command, CommandDialog, CommandInput, etc. (cmdk)
- `context-menu` - ContextMenu and related components
- `drawer` - Drawer components (vaul)
- `hover-card` - HoverCard, HoverCardTrigger, HoverCardContent
- `input-otp` - InputOTP, InputOTPGroup, InputOTPSlot, etc.
- `menubar` - Menubar and related components
- `navigation-menu` - NavigationMenu and related components
- `pagination` - Pagination and related components
- `popover` - Popover, PopoverTrigger, PopoverContent
- `progress` - Progress
- `radio-group` - RadioGroup, RadioGroupItem
- `resizable` - ResizablePanelGroup, ResizablePanel, ResizableHandle
- `scroll-area` - ScrollArea, ScrollBar
- `separator` - Separator
- `sheet` - Sheet, SheetTrigger, SheetContent, etc.
- `sidebar` - Sidebar and related components
- `skeleton` - Skeleton
- `slider` - Slider
- `toggle` - Toggle
- `toggle-group` - ToggleGroup, ToggleGroupItem

---

## 🛣️ ROUTING (Wouter)

### Router Setup
```tsx
// In App.tsx (already configured)
import { Switch, Route } from "wouter"

function Router() {
  return (
    <Switch>
      <Route path="/" component={Home} />
      <Route component={NotFound} />  {/* 404 catch-all */}
    </Switch>
  )
}
```

### Adding New Routes
```tsx
<Route path="/about" component={About} />
<Route path="/users/:id" component={UserProfile} />
```

### Navigation
```tsx
import { Link, useLocation, useRoute } from "wouter"

// Link component
<Link href="/about">About</Link>

// Programmatic navigation
const [location, setLocation] = useLocation()
setLocation("/home")

// Route matching
const [match, params] = useRoute("/users/:id")
if (match) {
  console.log(params.id)
}
```

---

## 🖥️ SERVER ARCHITECTURE

### Port Structure
- **5001**: Main Express server (handles proxy, file updates, server restarts)
- **5002**: User API server (your custom backend routes)
- **5173**: Vite dev server (proxied through 5001)

### Main Server (`server/index.ts`)
**Responsibilities**:
- Proxy requests to Vite dev server (5173) in development
- Proxy `/api/*` requests to user API server (5002)
- Handle special routes: `/api/rofyUpdateFiles`, `/api/rofyDownloadFiles`, `/api/restart-*`
- Inject console capture script in HTML responses
- Serve static files in production

### User API Server (`server/backend-entry.ts`)
**Port**: 5002  
**Health Check**: `http://localhost:5002/__health`  
**Purpose**: Your custom API routes and business logic

### API Routes (`server/routes.ts`)

#### POST `/api/rofyUpdateFiles`
**Purpose**: Update project files from external requests  
**Body**:
```typescript
{
  filePath: string,  // Relative path from project root
  content: string
}[]
```
**Response**:
```typescript
{
  results: {
    filePath: string,
    status: "success" | "error",
    message?: string,
    timestamp?: string
  }[]
}
```
**Auto-restarts**: Backend server after updates

#### POST `/api/restart-backend`
**Purpose**: Restart user API server (5002) with fresh env variables

#### POST `/api/restart-vite`
**Purpose**: Restart Vite dev server (5173) - dev mode only

#### POST `/api/restart-all`
**Purpose**: Restart both frontend and backend servers with reloaded env variables

## 🎯 COMMON PATTERNS

### Creating a New Page
1. Create file in `client/src/pages/my-page.tsx`:
```tsx
export default function MyPage() {
  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold">My Page</h1>
    </div>
  )
}
```

### Creating API Routes
Add routes to `server/backend-routes.ts`:

**Example Structure for API (DO NOT MODIFY THIS TEMPLATE):**
```typescript
import type { Express, Request, Response } from "express";
import { createServer, type Server } from "http";

export async function registerBackendRoutes(app: Express): Promise<Server> {
  // Health check endpoint (DO NOT MODIFY)
  app.get("/__health", (_req, res) => res.json({ status: "ok" }));

  // Ping API endpoint (DO NOT MODIFY)
  app.get("/api/ping", (_req, res) => {
    res.json({ message: "pong", timestamp: new Date().toISOString() });
  });

  // ============================================
  // ADD NEW API ROUTES BELOW THIS LINE
  // ============================================
  
  // Example: Create user
  // app.post("/api/users", async (req, res) => {
  //   try {
  //     // Handle user creation logic
  //     res.json({ success: true, user: req.body });
  //   } catch (error) {
  //     res.status(500).json({ error: "Failed to create user" });
  //   }
  // });

  // Example: Get users
  // app.get("/api/users", async (_req, res) => {
  //   try {
  //     // Handle fetching users
  //     res.json({ users: [] });
  //   } catch (error) {
  //     res.status(500).json({ error: "Failed to fetch users" });
  //   }
  // });

  // ============================================
  // ADD NEW API ROUTES ABOVE THIS LINE
  // ============================================

  console.log("✅ Backend routes registered"); // DO NOT MODIFY
  return createServer(app); // DO NOT MODIFY
}
```

**Example structure for creating MongoDB Model**
```typescript
import mongoose, { Schema, Document, Model } from "mongoose";
import bcrypt from "bcryptjs";

export interface IUser extends Document {
  email: string;
  password: string;
  username: string;
  createdAt: Date;
  updatedAt: Date;

  comparePassword(candidate: string): Promise<boolean>;
}

const userSchema = new Schema<IUser>(
  {
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },

    password: {
      type: String,
      required: true,
      minlength: 6,
    },

    username: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
  },
  {
    timestamps: true,
  }
);

/**
 * 🔐 Password Hash Middleware (Mongoose 9+)
 * NO next(), async middleware returns a promise automatically.
 */
userSchema.pre("save", async function () {
  if (!this.isModified("password")) return;

  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});

/**
 * 🔐 Compare Password Method
 */
userSchema.methods.comparePassword = async function (
  candidate: string
): Promise<boolean> {
  return bcrypt.compare(candidate, this.password);
};

export const User: Model<IUser> = mongoose.model<IUser>("User", userSchema);

```

**When adding new endpoints:**
1. Always add them in the designated section between the comment markers
2. Use proper HTTP methods (GET, POST, PUT, DELETE, PATCH)
3. Always include try-catch blocks for async operations
4. Always send appropriate status codes

---

## 🔧 DEVELOPMENT WORKFLOW

### Start Development
```bash
npm run dev
```
Opens:
- Frontend: `http://localhost:5001` (Vite proxied through Express)
- Backend API: `http://localhost:5002`
- Vite Dev Server: `http://localhost:5173` (internal)

### Build for Production
```bash
npm run build
```
Outputs:
- Client: `dist/public/`
- Server: `dist/server/`

### Start Production Server
```bash
npm start
```
Runs on port 5001

---

## 🎨 STYLING GUIDELINES

### Tailwind CSS
Use utility classes directly in components:
```tsx
<div className="flex items-center justify-between p-4 bg-white rounded-lg shadow-md">
```

### Component Variants (CVA)
For reusable styled components:
```tsx
import { cva, type VariantProps } from "class-variance-authority"

const alertVariants = cva("rounded-lg p-4", {
  variants: {
    variant: {
      default: "bg-blue-100 text-blue-900",
      destructive: "bg-red-100 text-red-900"
    }
  },
  defaultVariants: {
    variant: "default"
  }
})
```

### className Merging
Always use `cn()` for merging classes:
```tsx
<div className={cn("base-classes", props.className)} />
```

---

## 🚀 BEST PRACTICES

1. **Use Path Aliases**: Always use `@/` imports instead of relative paths
2. **Type Safety**: Leverage TypeScript and Zod for runtime validation
3. **Component Composition**: Build complex UIs by composing shadcn/ui components
4. **Error Handling**: Use try-catch with `apiRequest()` and display errors with toast
5. **Loading States**: Show `<LoadingSpinner />` during async operations
6. **Form Validation**: Use React Hook Form + Zod for all forms
7. **Query Keys**: Use descriptive query keys: `["/api/resource", { filters }]`
8. **Mutations**: Always invalidate queries after mutations
9. **Environment Variables**: Store secrets in `.env`, reload with restart endpoints
10. **Server Restarts**: Use `/api/restart-*` endpoints after env changes

---

## 🐛 DEBUGGING TIPS

### Frontend Errors
- Check browser console for React errors
- Verify API responses in Network tab
- Use React DevTools for component state

### Backend Errors
- Check terminal output from port 5001 (main server)
- Backend errors logged with `❌` prefix
- Health check: `curl http://localhost:5002/__health`

### Environment Issues
- Verify `.env` file exists and has correct values
- Restart servers with `/api/restart-all` after env changes
- Check `process.env.MONGODB_URI` is set correctly
- Verify MongoDB is running (local) or accessible (Atlas)

### Build Errors
- Run `npm run check` to verify TypeScript
- Clear `dist/` folder and rebuild
- Check for missing dependencies

---

## 📝 QUICK REFERENCE

### Essential Imports
```typescript
// Components
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"
import { ModeToggle } from "@/components/mode-toggle"
import { ThemeProvider, useTheme } from "@/components/theme-provider"

// Hooks
import { useToast } from "@/hooks/use-toast"
import { useIsMobile } from "@/hooks/use-mobile"

// Utilities
import { cn } from "@/lib/utils"
import { apiRequest } from "@/lib/queryClient"

// Routing
import { Link, useLocation, Route, Switch } from "wouter"

// Data Fetching
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query"

// Forms
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"

// Toast Notifications
import { toast } from "sonner"
```

### Export Patterns
All page components and the App component use **named exports**:
```typescript
// ✅ Correct - Named Exports
export function Home() { ... }
export function App() { ... }
export function ComponentShowcase() { ... }

// ❌ Wrong - Default Exports (not used in this project)
export default function Home() { ... }
```

### File Creation Locations
- **New Page**: `client/src/pages/page-name.tsx` (use named export)
- **New Component**: `client/src/components/ComponentName.tsx`
- **New Hook**: `client/src/hooks/use-hook-name.ts`
- **New Type**: `client/src/types/type-name.ts`
- **API Route**: `server/backend-routes.ts`
