# React SPA Template - Complete Reference Guide

**Template Type**: React Single Page Application with Express Backend  
**Framework**: React 19.1.1 + Vite 7.1.2 + Express  
**UI Library**: shadcn/ui (New York style)  
**Styling**: Tailwind CSS 3.4.17  
**Routing**: Wouter 3.3.5  
**State Management**: TanStack Query 5.60.5  
**Form Handling**: React Hook Form 7.55.0 + Zod 3.24.2  
**Database**: MongoDB with Mongoose 9.0.0

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
- `client/eslint.config.js` - ESLint configuration
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

---

## 📁 PROJECT STRUCTURE

```
react-spa/
├── client/                          # Frontend React application
│   ├── src/
│   │   ├── components/
│   │   │   └── ui/                  # shadcn/ui components (47 components)
│   │   ├── pages/                   # Route components
│   │   │   ├── home.tsx            # Homepage
│   │   │   └── not-found.tsx       # 404 page
│   │   ├── hooks/                   # Custom React hooks
│   │   │   ├── use-toast.ts        # Toast notifications (react-hot-toast wrapper)
│   │   │   └── use-mobile.tsx      # Mobile breakpoint detection
│   │   ├── lib/                     # Utility libraries
│   │   │   ├── utils.ts            # cn() function for className merging
│   │   │   └── queryClient.ts      # TanStack Query configuration
│   │   ├── context/                 # Empty - for React Context files
│   │   ├── contexts/                # Empty - for React Context files
│   │   ├── types/                   # Empty - for TypeScript types
│   │   ├── utils/                   # Empty - for utility functions
│   │   ├── App.tsx                  # Root App component with routing
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

**Build Output**: `dist/public`  
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

### Import Pattern
All UI components follow this pattern:
```typescript
import { ComponentName } from "@/components/ui/component-name"
```

### Component List & Props

#### **Button** (`@/components/ui/button`)
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

#### **Input** (`@/components/ui/input`)
**Exports**: `Input`
```typescript
type InputProps = React.ComponentProps<"input">
```
**Usage**:
```tsx
<Input type="text" placeholder="Enter name" />
<Input type="email" className="max-w-sm" />
```

#### **Textarea** (`@/components/ui/textarea`)
**Exports**: `Textarea`
```typescript
type TextareaProps = React.ComponentProps<"textarea">
```
**Usage**:
```tsx
<Textarea placeholder="Type your message here" />
```

#### **Label** (`@/components/ui/label`)
**Exports**: `Label`
```typescript
type LabelProps = React.ComponentPropsWithoutRef<typeof LabelPrimitive.Root>
```
**Usage**:
```tsx
<Label htmlFor="email">Email</Label>
<Input id="email" type="email" />
```

#### **Card** (`@/components/ui/card`)
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

#### **Dialog** (`@/components/ui/dialog`)
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

#### **Form** (`@/components/ui/form`)
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

#### **Select** (`@/components/ui/select`)
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

## 🪝 CUSTOM HOOKS

### useToast (`@/hooks/use-toast`)
**Purpose**: Display toast notifications (wrapper for react-hot-toast)
```typescript
function useToast() {
  return {
    toast: (options: ToastOptions) => void,
    dismiss: (toastId?: string) => void
  }
}

type ToastOptions = {
  title?: string
  description?: string
  variant?: "default" | "destructive"
  duration?: number  // default: 4000ms
}
```
**Usage**:
```tsx
const { toast } = useToast()

toast({
  title: "Success",
  description: "Your changes have been saved",
  variant: "default"
})

toast({
  title: "Error",
  description: "Something went wrong",
  variant: "destructive"
})
```

### useIsMobile (`@/hooks/use-mobile`)
**Purpose**: Detect mobile viewport (< 768px)
```typescript
function useIsMobile(): boolean
```
**Usage**:
```tsx
const isMobile = useIsMobile()
return isMobile ? <MobileNav /> : <DesktopNav />
```

---

## 📚 UTILITY FUNCTIONS

### cn() (`@/lib/utils`)
**Purpose**: Merge Tailwind classes with clsx + tailwind-merge
```typescript
function cn(...inputs: ClassValue[]): string
```
**Usage**:
```tsx
<div className={cn("base-class", condition && "conditional-class", className)} />
```

### apiRequest() (`@/lib/queryClient`)
**Purpose**: Make authenticated API requests
```typescript
async function apiRequest(
  method: string,
  url: string,
  data?: unknown
): Promise<Response>
```
**Usage**:
```tsx
const response = await apiRequest("POST", "/api/users", { name: "John" })
const json = await response.json()
```

### getQueryFn() (`@/lib/queryClient`)
**Purpose**: Create query function for TanStack Query
```typescript
const getQueryFn: <T>(options: {
  on401: "returnNull" | "throw"
}) => QueryFunction<T>
```
**Usage**: Used internally by `queryClient`, not typically called directly.

---

## 🔌 TANSTACK QUERY SETUP

### Query Client Configuration
```typescript
// Already configured in @/lib/queryClient
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      queryFn: getQueryFn({ on401: "throw" }),
      refetchInterval: false,
      refetchOnWindowFocus: false,
      staleTime: Infinity,
      retry: false
    },
    mutations: {
      retry: false
    }
  }
})
```

### Query Usage Patterns
```tsx
import { useQuery, useMutation } from "@tanstack/react-query"
import { apiRequest } from "@/lib/queryClient"

// Fetch data
const { data, isLoading, error } = useQuery({
  queryKey: ["/api/users"],
  // queryFn is auto-provided by queryClient
})

// With query params
const { data } = useQuery({
  queryKey: ["/api/users", { role: "admin", status: "active" }],
})

// Mutation
const mutation = useMutation({
  mutationFn: async (userData) => {
    const res = await apiRequest("POST", "/api/users", userData)
    return res.json()
  },
  onSuccess: () => {
    queryClient.invalidateQueries({ queryKey: ["/api/users"] })
  }
})
```

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

#### POST `/api/rofyDownloadFiles`
**Purpose**: Create and download project zip  
**Body**:
```typescript
{
  projectName: string
}
```
**Response**:
```typescript
{
  success: boolean,
  downloadUrl?: string,  // e.g., "/downloads/project-name.zip"
  error?: string
}
```

#### POST `/api/restart-backend`
**Purpose**: Restart user API server (5002) with fresh env variables

#### POST `/api/restart-vite`
**Purpose**: Restart Vite dev server (5173) - dev mode only

#### POST `/api/restart-all`
**Purpose**: Restart both frontend and backend servers with reloaded env variables

---

## 🗄️ DATABASE (MongoDB with Mongoose)

### Connection Setup
Connect to MongoDB in your server entry file:
```typescript
import mongoose from 'mongoose'

// In server/backend-entry.ts or server/index.ts
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/your-db-name'

mongoose.connect(MONGODB_URI)
  .then(() => console.log('✅ MongoDB connected'))
  .catch((err) => console.error('❌ MongoDB connection error:', err))
```

### Environment Variable
Add to your `.env` file:
```
MONGODB_URI=mongodb://localhost:27017/your-db-name
# Or for MongoDB Atlas:
# MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/dbname
```

### Creating Models
Create Mongoose models in `server/models/` directory:

**Example User Model** (`server/models/User.ts`):
```typescript
import mongoose, { Schema, Document } from 'mongoose'

export interface IUser extends Document {
  name: string
  email: string
  password: string
  createdAt: Date
  updatedAt: Date
}

const UserSchema = new Schema<IUser>({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
}, {
  timestamps: true  // Automatically adds createdAt and updatedAt
})

export const User = mongoose.model<IUser>('User', UserSchema)
```

### Using Models in Routes
```typescript
import { User } from './models/User'

// Create
app.post('/api/users', async (req, res) => {
  try {
    const user = await User.create(req.body)
    res.json({ success: true, user })
  } catch (error) {
    res.status(400).json({ error: error.message })
  }
})

// Read
app.get('/api/users/:id', async (req, res) => {
  const user = await User.findById(req.params.id)
  res.json(user)
})

// Update
app.put('/api/users/:id', async (req, res) => {
  const user = await User.findByIdAndUpdate(
    req.params.id,
    req.body,
    { new: true }  // Return updated document
  )
  res.json(user)
})

// Delete
app.delete('/api/users/:id', async (req, res) => {
  await User.findByIdAndDelete(req.params.id)
  res.json({ success: true })
})
```

### Common Mongoose Patterns

#### Query with filters
```typescript
const users = await User.find({ 
  role: 'admin',
  active: true 
}).sort({ createdAt: -1 })
```

#### Populate references
```typescript
const PostSchema = new Schema({
  title: String,
  author: { type: Schema.Types.ObjectId, ref: 'User' }
})

const posts = await Post.find().populate('author')
```

#### Validation
```typescript
const UserSchema = new Schema({
  email: {
    type: String,
    required: [true, 'Email is required'],
    unique: true,
    validate: {
      validator: (v: string) => /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(v),
      message: 'Invalid email format'
    }
  },
  age: {
    type: Number,
    min: [18, 'Must be at least 18'],
    max: [100, 'Must be less than 100']
  }
})
```

---

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

2. Add route in `client/src/App.tsx`:
```tsx
import MyPage from "@/pages/my-page"

<Route path="/my-page" component={MyPage} />
```

### Creating a Form with Validation
```tsx
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"
import { Form, FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"

const formSchema = z.object({
  email: z.string().email("Invalid email"),
  password: z.string().min(8, "Must be at least 8 characters")
})

export default function LoginForm() {
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: { email: "", password: "" }
  })

  const onSubmit = async (data: z.infer<typeof formSchema>) => {
    const res = await apiRequest("POST", "/api/login", data)
    const json = await res.json()
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input type="email" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Password</FormLabel>
              <FormControl>
                <Input type="password" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit">Submit</Button>
      </form>
    </Form>
  )
}
```

### Creating API Routes
Add routes to `server/backend-routes.ts` or `server/backend-entry.ts`:
```typescript
import express from "express"
const app = express()

app.post("/api/users", async (req, res) => {
  const { name, email } = req.body
  // Your logic here
  res.json({ success: true, user: { name, email } })
})

app.listen(5002)
```

### Fetching Data with TanStack Query
```tsx
import { useQuery } from "@tanstack/react-query"

function UserList() {
  const { data, isLoading, error } = useQuery({
    queryKey: ["/api/users"],
  })

  if (isLoading) return <LoadingSpinner />
  if (error) return <div>Error: {error.message}</div>

  return (
    <div>
      {data?.map(user => (
        <Card key={user.id}>
          <CardContent>{user.name}</CardContent>
        </Card>
      ))}
    </div>
  )
}
```

### Mutating Data
```tsx
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { apiRequest } from "@/lib/queryClient"

function CreateUserForm() {
  const queryClient = useQueryClient()
  
  const mutation = useMutation({
    mutationFn: async (data) => {
      const res = await apiRequest("POST", "/api/users", data)
      return res.json()
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/users"] })
      toast({ title: "User created!" })
    },
    onError: (error) => {
      toast({ 
        title: "Error", 
        description: error.message,
        variant: "destructive"
      })
    }
  })

  return (
    <Button onClick={() => mutation.mutate({ name: "John" })}>
      Create User
    </Button>
  )
}
```

---

## 📦 KEY DEPENDENCIES

### Frontend
- **react**: 19.1.1
- **react-dom**: 19.1.1
- **vite**: 7.1.2
- **wouter**: 3.3.5 (routing)
- **@tanstack/react-query**: 5.60.5 (data fetching)
- **react-hook-form**: 7.55.0 (forms)
- **zod**: 3.24.2 (validation)
- **tailwindcss**: 3.4.17 (styling)
- **lucide-react**: 0.453.0 (icons)
- **react-hot-toast**: 2.6.0 (notifications)
- **class-variance-authority**: 0.7.1 (variant styles)
- **tailwind-merge**: 2.6.0 (class merging)

### Backend
- **express**: 4.21.2
- **mongoose**: 9.0.0 (MongoDB ODM)
- **mongodb**: 6.11.0
- **cors**: 2.8.5
- **dotenv**: 17.2.2

### UI Components (Radix UI)
- All `@radix-ui/react-*` primitives for accessible components

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

// Hooks
import { useToast } from "@/hooks/use-toast"
import { useIsMobile } from "@/hooks/use-mobile"

// Utilities
import { cn } from "@/lib/utils"
import { apiRequest } from "@/lib/queryClient"

// Routing
import { Link, useLocation } from "wouter"

// Data Fetching
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query"

// Forms
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"
```

### File Creation Locations
- **New Page**: `client/src/pages/page-name.tsx`
- **New Component**: `client/src/components/ComponentName.tsx`
- **New Hook**: `client/src/hooks/use-hook-name.ts`
- **New Type**: `client/src/types/type-name.ts`
- **API Route**: `server/backend-routes.ts` or `server/backend-entry.ts`
- **Mongoose Model**: `server/models/ModelName.ts`

---

**Last Updated**: November 26, 2025  
**Template Version**: 1.0.0
