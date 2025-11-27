import { Button } from "@/components/ui/button"
import { ButtonGroup } from "@/components/ui/button-group"
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Textarea } from "@/components/ui/textarea"
import { ModeToggle } from "@/components/mode-toggle"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Slider } from "@/components/ui/slider"
import { Progress } from "@/components/ui/progress"
import { Separator } from "@/components/ui/separator"
import { Skeleton } from "@/components/ui/skeleton"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Calendar } from "@/components/ui/calendar"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion"
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { AspectRatio } from "@/components/ui/aspect-ratio"
import {
    Command,
    CommandEmpty,
    CommandGroup,
    CommandInput,
    CommandItem,
    CommandList,
} from "@/components/ui/command"
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible"
import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
} from "@/components/ui/carousel"
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
    DialogFooter,
} from "@/components/ui/dialog"
import {
    ContextMenu,
    ContextMenuContent,
    ContextMenuItem,
    ContextMenuTrigger,
    ContextMenuSeparator,
    ContextMenuShortcut,
    ContextMenuCheckboxItem,
    ContextMenuRadioGroup,
    ContextMenuRadioItem,
    ContextMenuLabel,
    ContextMenuSub,
    ContextMenuSubContent,
    ContextMenuSubTrigger,
} from "@/components/ui/context-menu"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
    DropdownMenuCheckboxItem,
    DropdownMenuRadioGroup,
    DropdownMenuRadioItem,
    DropdownMenuSeparator,
    DropdownMenuSub,
    DropdownMenuSubContent,
    DropdownMenuSubTrigger,
    DropdownMenuShortcut,
    DropdownMenuLabel,
    DropdownMenuGroup,
} from "@/components/ui/dropdown-menu"
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"
import { useForm } from "react-hook-form"
import {
    InputOTP,
    InputOTPGroup,
    InputOTPSlot,
    InputOTPSeparator,
} from "@/components/ui/input-otp"
import {
    Menubar,
    MenubarContent,
    MenubarItem,
    MenubarMenu,
    MenubarSeparator,
    MenubarShortcut,
    MenubarTrigger,
    MenubarCheckboxItem,
    MenubarRadioGroup,
    MenubarRadioItem,
    MenubarSub,
    MenubarSubContent,
    MenubarSubTrigger,
} from "@/components/ui/menubar"
import { Toggle } from "@/components/ui/toggle"
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group"
import { Bold, Italic, Underline, AlignLeft, AlignCenter, AlignRight, AlignJustify } from "lucide-react"
import { toast as sonnerToast } from "sonner"
import {
    Sheet,
    SheetClose,
    SheetContent,
    SheetDescription,
    SheetFooter,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
} from "@/components/ui/sheet"
import { Draggable } from "@/components/ui/draggable"
import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbSeparator } from "@/components/ui/breadcrumb"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import {
    NavigationMenu,
    NavigationMenuContent,
    NavigationMenuItem,
    NavigationMenuLink,
    NavigationMenuList,
    NavigationMenuTrigger,
    navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu"
import {
    Pagination,
    PaginationContent,
    PaginationEllipsis,
    PaginationItem,
    PaginationLink,
    PaginationNext,
    PaginationPrevious,
} from "@/components/ui/pagination"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import {
    ResizablePanelGroup,
    ResizablePanel,
    ResizableHandle,
} from "@/components/ui/resizable"
import { AlertCircle, Info, Home, ChevronRight, Calendar as CalendarIcon } from "lucide-react"
import { useState } from "react"
import { ScrollArea } from "@/components/ui/scroll-area"

type ComponentName =
    | "Accordion" | "Alert" | "Alert Dialog" | "Aspect Ratio"
    | "Avatar" | "Badge" | "Breadcrumb" | "Button" | "Button Group"
    | "Calendar" | "Card" | "Carousel"
    | "Checkbox" | "Collapsible" | "Command" | "Context Menu"
    | "Dialog" | "Draggable" | "Dropdown Menu" | "Form"
    | "Hover Card" | "Input" | "Input OTP" | "Label"
    | "Menubar" | "Navigation Menu" | "Pagination" | "Popover"
    | "Progress" | "Radio Group" | "Resizable" | "Scroll Area"
    | "Select" | "Separator" | "Sheet" | "Sidebar"
    | "Skeleton" | "Slider" | "Sonner" | "Switch"
    | "Table" | "Tabs" | "Textarea"
    | "Toggle" | "Toggle Group" | "Tooltip"

const COMPONENTS: ComponentName[] = [
    "Accordion", "Alert", "Alert Dialog", "Aspect Ratio",
    "Avatar", "Badge", "Breadcrumb", "Button", "Button Group",
    "Calendar", "Card", "Carousel",
    "Checkbox", "Collapsible", "Command", "Context Menu",
    "Dialog", "Draggable", "Dropdown Menu", "Form",
    "Hover Card", "Input", "Input OTP", "Label",
    "Menubar", "Navigation Menu", "Pagination", "Popover",
    "Progress", "Radio Group", "Resizable", "Scroll Area",
    "Select", "Separator", "Sheet", "Sidebar",
    "Skeleton", "Slider", "Sonner", "Switch",
    "Table", "Tabs", "Textarea",
    "Toggle", "Toggle Group", "Tooltip"
]

export default function ComponentShowcase() {
    const [selectedComponent, setSelectedComponent] = useState<ComponentName>("Button")
    const [progress] = useState(60)
    const [date, setDate] = useState<Date | undefined>(new Date())
    const [otpValue, setOtpValue] = useState("")

    const form = useForm({
        defaultValues: {
            username: "",
            email: "",
            bio: "",
            notifications: true,
        }
    })

    const renderComponentPreview = () => {
        switch (selectedComponent) {
            case "Button":
                return (
                    <div className="space-y-6">
                        <Card>
                            <CardHeader>
                                <CardTitle>Button Variants</CardTitle>
                                <CardDescription>Different button styles and configurations</CardDescription>
                            </CardHeader>
                            <CardContent className="space-y-6">
                                <div>
                                    <h3 className="text-sm font-medium mb-3">Variants</h3>
                                    <div className="flex flex-wrap gap-3">
                                        <Button variant="default">Default</Button>
                                        <Button variant="secondary">Secondary</Button>
                                        <Button variant="destructive">Destructive</Button>
                                        <Button variant="outline">Outline</Button>
                                        <Button variant="ghost">Ghost</Button>
                                        <Button variant="link">Link</Button>
                                    </div>
                                </div>
                                <div>
                                    <h3 className="text-sm font-medium mb-3">Sizes</h3>
                                    <div className="flex flex-wrap gap-3 items-center">
                                        <Button size="sm">Small</Button>
                                        <Button size="md">Medium</Button>
                                        <Button size="lg">Large</Button>
                                        <Button size="xl">Extra Large</Button>
                                    </div>
                                </div>
                                <div>
                                    <h3 className="text-sm font-medium mb-3">Border Radius</h3>
                                    <div className="flex flex-wrap gap-3">
                                        <Button radius="none">Square</Button>
                                        <Button radius="sm">Small</Button>
                                        <Button radius="md">Medium</Button>
                                        <Button radius="lg">Large</Button>
                                        <Button radius="full">Full</Button>
                                    </div>
                                </div>
                                <div>
                                    <h3 className="text-sm font-medium mb-3">With Icons</h3>
                                    <div className="flex flex-wrap gap-3">
                                        <Button size="icon"><Home className="h-4 w-4" /></Button>
                                        <Button><Home className="h-4 w-4 mr-2" />Home</Button>
                                        <Button><Info className="h-4 w-4 mr-2" />Info</Button>
                                        <Button variant="outline"><ChevronRight className="h-4 w-4 mr-2" />Continue</Button>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    </div>
                )

            case "Button Group":
                return (
                    <div className="space-y-6">
                        <Card>
                            <CardHeader>
                                <CardTitle>Button Groups</CardTitle>
                                <CardDescription>Connected or separated button collections</CardDescription>
                            </CardHeader>
                            <CardContent className="space-y-6">
                                <div>
                                    <h3 className="text-sm font-medium mb-3">Connected</h3>
                                    <ButtonGroup variant="default">
                                        <Button variant="outline">Left</Button>
                                        <Button variant="outline">Center</Button>
                                        <Button variant="outline">Right</Button>
                                    </ButtonGroup>
                                </div>
                                <div>
                                    <h3 className="text-sm font-medium mb-3">Separated</h3>
                                    <ButtonGroup variant="separated">
                                        <Button variant="default">Save</Button>
                                        <Button variant="secondary">Cancel</Button>
                                        <Button variant="destructive">Delete</Button>
                                    </ButtonGroup>
                                </div>
                                <div>
                                    <h3 className="text-sm font-medium mb-3">With Icons</h3>
                                    <ButtonGroup variant="default">
                                        <Button variant="outline"><Home className="h-4 w-4 mr-2" />Home</Button>
                                        <Button variant="outline"><Info className="h-4 w-4 mr-2" />Info</Button>
                                        <Button variant="outline"><AlertCircle className="h-4 w-4 mr-2" />Alert</Button>
                                    </ButtonGroup>
                                </div>
                            </CardContent>
                        </Card>
                    </div>
                )

            case "Input":
                return (
                    <div className="space-y-6">
                        <Card>
                            <CardHeader>
                                <CardTitle>Input Fields</CardTitle>
                                <CardDescription>Text input with variants</CardDescription>
                            </CardHeader>
                            <CardContent className="space-y-6">
                                <div>
                                    <h3 className="text-sm font-medium mb-3">Sizes</h3>
                                    <div className="space-y-3">
                                        <Input size="sm" placeholder="Small input" />
                                        <Input size="md" placeholder="Medium input" />
                                        <Input size="lg" placeholder="Large input" />
                                    </div>
                                </div>
                                <div>
                                    <h3 className="text-sm font-medium mb-3">Border Radius</h3>
                                    <div className="space-y-3">
                                        <Input radius="none" placeholder="Square" />
                                        <Input radius="sm" placeholder="Small radius" />
                                        <Input radius="md" placeholder="Medium radius" />
                                        <Input radius="lg" placeholder="Large radius" />
                                    </div>
                                </div>
                                <div>
                                    <h3 className="text-sm font-medium mb-3">With Label</h3>
                                    <div className="space-y-2">
                                        <Label htmlFor="email">Email</Label>
                                        <Input id="email" type="email" placeholder="you@example.com" />
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    </div>
                )

            case "Badge":
                return (
                    <div className="space-y-6">
                        <Card>
                            <CardHeader>
                                <CardTitle>Badges</CardTitle>
                                <CardDescription>Status labels and tags with multiple variants</CardDescription>
                            </CardHeader>
                            <CardContent className="space-y-6">
                                <div>
                                    <h3 className="text-sm font-medium mb-3">Variants</h3>
                                    <div className="flex flex-wrap gap-3">
                                        <Badge variant="primary">Primary</Badge>
                                        <Badge variant="info">Info</Badge>
                                        <Badge variant="success">Success</Badge>
                                        <Badge variant="warning">Warning</Badge>
                                        <Badge variant="error">Error</Badge>
                                        <Badge variant="secondary">Secondary</Badge>
                                        <Badge variant="outline">Outline</Badge>
                                    </div>
                                </div>
                                <div>
                                    <h3 className="text-sm font-medium mb-3">Sizes</h3>
                                    <div className="flex flex-wrap gap-3 items-center">
                                        <Badge variant="primary" size="sm">Small</Badge>
                                        <Badge variant="success" size="md">Medium</Badge>
                                        <Badge variant="warning" size="lg">Large</Badge>
                                    </div>
                                </div>
                                <div>
                                    <h3 className="text-sm font-medium mb-3">Shapes</h3>
                                    <div className="flex flex-wrap gap-3">
                                        <Badge variant="info" radius="none">Square</Badge>
                                        <Badge variant="success" radius="sm">Rounded</Badge>
                                        <Badge variant="warning" radius="md">More Rounded</Badge>
                                        <Badge variant="error" radius="full">Pill</Badge>
                                    </div>
                                </div>
                                <div>
                                    <h3 className="text-sm font-medium mb-3">Use Cases</h3>
                                    <div className="flex flex-wrap gap-3">
                                        <Badge variant="success">Active</Badge>
                                        <Badge variant="warning">Pending</Badge>
                                        <Badge variant="error">Failed</Badge>
                                        <Badge variant="info">New</Badge>
                                        <Badge variant="primary">Premium</Badge>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    </div>
                )

            case "Alert":
                return (
                    <div className="space-y-4">
                        <Alert variant="info">
                            <Info className="h-5 w-5" />
                            <AlertTitle>Information</AlertTitle>
                            <AlertDescription>This is an informational message to keep you updated on important details.</AlertDescription>
                        </Alert>
                        <Alert variant="success">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                            </svg>
                            <AlertTitle>Success</AlertTitle>
                            <AlertDescription>Your changes have been saved successfully. Everything is working as expected.</AlertDescription>
                        </Alert>
                        <Alert variant="warning">
                            <AlertCircle className="h-5 w-5" />
                            <AlertTitle>Warning</AlertTitle>
                            <AlertDescription>Please review your settings carefully. This action may have consequences.</AlertDescription>
                        </Alert>
                        <Alert variant="error">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                            </svg>
                            <AlertTitle>Error</AlertTitle>
                            <AlertDescription>Something went wrong. Please try again or contact support if the problem persists.</AlertDescription>
                        </Alert>
                        <div className="pt-4">
                            <h3 className="text-sm font-medium mb-3">Size Variants</h3>
                            <div className="space-y-3">
                                <Alert variant="info" size="sm">
                                    <Info className="h-4 w-4" />
                                    <AlertTitle>Small Alert</AlertTitle>
                                    <AlertDescription>This is a small info alert.</AlertDescription>
                                </Alert>
                                <Alert variant="success" size="lg">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" viewBox="0 0 20 20" fill="currentColor">
                                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                                    </svg>
                                    <AlertTitle>Large Alert</AlertTitle>
                                    <AlertDescription>This is a large success alert with more padding and larger text.</AlertDescription>
                                </Alert>
                            </div>
                        </div>
                    </div>
                )

            case "Card":
                return (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <Card size="sm" radius="none">
                            <CardHeader>
                                <CardTitle>Small Square</CardTitle>
                                <CardDescription>Size: small, Radius: none</CardDescription>
                            </CardHeader>
                            <CardContent>Card content goes here</CardContent>
                            <CardFooter><Button size="sm">Action</Button></CardFooter>
                        </Card>
                        <Card size="md" radius="md">
                            <CardHeader>
                                <CardTitle>Medium Rounded</CardTitle>
                                <CardDescription>Size: medium, Radius: medium</CardDescription>
                            </CardHeader>
                            <CardContent>Card content goes here</CardContent>
                            <CardFooter><Button size="sm">Action</Button></CardFooter>
                        </Card>
                        <Card size="lg" radius="xl">
                            <CardHeader>
                                <CardTitle>Large Extra Round</CardTitle>
                                <CardDescription>Size: large, Radius: xl</CardDescription>
                            </CardHeader>
                            <CardContent>Card content goes here with more space</CardContent>
                            <CardFooter><Button size="sm">Action</Button></CardFooter>
                        </Card>
                    </div>
                )

            case "Checkbox":
                return (
                    <Card>
                        <CardHeader>
                            <CardTitle>Checkboxes</CardTitle>
                            <CardDescription>Selection controls</CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div className="flex items-center space-x-2">
                                <Checkbox id="terms" />
                                <Label htmlFor="terms">Accept terms and conditions</Label>
                            </div>
                            <div className="flex items-center space-x-2">
                                <Checkbox id="marketing" />
                                <Label htmlFor="marketing">Receive marketing emails</Label>
                            </div>
                            <div className="flex items-center space-x-2">
                                <Checkbox id="disabled" disabled />
                                <Label htmlFor="disabled">Disabled option</Label>
                            </div>
                        </CardContent>
                    </Card>
                )

            case "Switch":
                return (
                    <Card>
                        <CardHeader>
                            <CardTitle>Switches</CardTitle>
                            <CardDescription>Toggle controls</CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div className="flex items-center space-x-2">
                                <Switch id="notifications" />
                                <Label htmlFor="notifications">Enable notifications</Label>
                            </div>
                            <div className="flex items-center space-x-2">
                                <Switch id="marketing-switch" />
                                <Label htmlFor="marketing-switch">Marketing communications</Label>
                            </div>
                            <div className="flex items-center space-x-2">
                                <Switch id="disabled-switch" disabled />
                                <Label htmlFor="disabled-switch">Disabled switch</Label>
                            </div>
                        </CardContent>
                    </Card>
                )

            case "Textarea":
                return (
                    <Card>
                        <CardHeader>
                            <CardTitle>Text Areas</CardTitle>
                            <CardDescription>Multi-line text input</CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-6">
                            <div>
                                <h3 className="text-sm font-medium mb-3">Sizes</h3>
                                <div className="space-y-3">
                                    <Textarea size="sm" placeholder="Small textarea" />
                                    <Textarea size="md" placeholder="Medium textarea" />
                                    <Textarea size="lg" placeholder="Large textarea" />
                                </div>
                            </div>
                            <div>
                                <h3 className="text-sm font-medium mb-3">With Label</h3>
                                <div className="space-y-2">
                                    <Label htmlFor="message">Your Message</Label>
                                    <Textarea id="message" placeholder="Type your message here..." />
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                )

            case "Select":
                return (
                    <Card>
                        <CardHeader>
                            <CardTitle>Select Dropdown</CardTitle>
                            <CardDescription>Dropdown selection control</CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div className="space-y-2">
                                <Label>Select a fruit</Label>
                                <Select>
                                    <SelectTrigger>
                                        <SelectValue placeholder="Choose one" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="apple">Apple</SelectItem>
                                        <SelectItem value="banana">Banana</SelectItem>
                                        <SelectItem value="orange">Orange</SelectItem>
                                        <SelectItem value="mango">Mango</SelectItem>
                                        <SelectItem value="grape">Grape</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>
                        </CardContent>
                    </Card>
                )

            case "Radio Group":
                return (
                    <Card>
                        <CardHeader>
                            <CardTitle>Radio Groups</CardTitle>
                            <CardDescription>Single choice selection</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <RadioGroup defaultValue="option-one">
                                <div className="flex items-center space-x-2">
                                    <RadioGroupItem value="option-one" id="option-one" />
                                    <Label htmlFor="option-one">Option One</Label>
                                </div>
                                <div className="flex items-center space-x-2">
                                    <RadioGroupItem value="option-two" id="option-two" />
                                    <Label htmlFor="option-two">Option Two</Label>
                                </div>
                                <div className="flex items-center space-x-2">
                                    <RadioGroupItem value="option-three" id="option-three" />
                                    <Label htmlFor="option-three">Option Three</Label>
                                </div>
                            </RadioGroup>
                        </CardContent>
                    </Card>
                )

            case "Slider":
                return (
                    <Card>
                        <CardHeader>
                            <CardTitle>Sliders</CardTitle>
                            <CardDescription>Value selector</CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-6">
                            <div className="space-y-2">
                                <Label>Volume (50%)</Label>
                                <Slider defaultValue={[50]} max={100} step={1} />
                            </div>
                            <div className="space-y-2">
                                <Label>Brightness (75%)</Label>
                                <Slider defaultValue={[75]} max={100} step={1} />
                            </div>
                        </CardContent>
                    </Card>
                )

            case "Progress":
                return (
                    <Card>
                        <CardHeader>
                            <CardTitle>Progress Indicators</CardTitle>
                            <CardDescription>Visual progress display</CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-6">
                            <div className="space-y-2">
                                <div className="flex justify-between text-sm">
                                    <span>Uploading...</span>
                                    <span>{progress}%</span>
                                </div>
                                <Progress value={progress} />
                            </div>
                            <div className="space-y-2">
                                <div className="flex justify-between text-sm">
                                    <span>Processing...</span>
                                    <span>33%</span>
                                </div>
                                <Progress value={33} />
                            </div>
                        </CardContent>
                    </Card>
                )

            case "Avatar":
                return (
                    <Card>
                        <CardHeader>
                            <CardTitle>Avatars</CardTitle>
                            <CardDescription>User profile images</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <div className="flex gap-4 items-center">
                                <Avatar>
                                    <AvatarImage src="https://github.com/shadcn.png" />
                                    <AvatarFallback>CN</AvatarFallback>
                                </Avatar>
                                <Avatar>
                                    <AvatarFallback>JD</AvatarFallback>
                                </Avatar>
                                <Avatar>
                                    <AvatarFallback>AB</AvatarFallback>
                                </Avatar>
                            </div>
                        </CardContent>
                    </Card>
                )

            case "Skeleton":
                return (
                    <Card>
                        <CardHeader>
                            <CardTitle>Skeleton Loaders</CardTitle>
                            <CardDescription>Loading state placeholders</CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div className="space-y-2">
                                <Skeleton className="h-12 w-12 rounded-full" />
                                <Skeleton className="h-4 w-full" />
                                <Skeleton className="h-4 w-3/4" />
                                <Skeleton className="h-4 w-1/2" />
                            </div>
                        </CardContent>
                    </Card>
                )

            case "Tabs":
                return (
                    <Card>
                        <CardHeader>
                            <CardTitle>Tabs</CardTitle>
                            <CardDescription>Organized content sections</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <Tabs defaultValue="account">
                                <TabsList>
                                    <TabsTrigger value="account">Account</TabsTrigger>
                                    <TabsTrigger value="password">Password</TabsTrigger>
                                    <TabsTrigger value="settings">Settings</TabsTrigger>
                                </TabsList>
                                <TabsContent value="account" className="mt-4">
                                    <p className="text-sm text-muted-foreground">Make changes to your account here. Click save when you're done.</p>
                                </TabsContent>
                                <TabsContent value="password" className="mt-4">
                                    <p className="text-sm text-muted-foreground">Change your password here. After saving, you'll be logged out.</p>
                                </TabsContent>
                                <TabsContent value="settings" className="mt-4">
                                    <p className="text-sm text-muted-foreground">Update your settings and preferences here.</p>
                                </TabsContent>
                            </Tabs>
                        </CardContent>
                    </Card>
                )

            case "Accordion":
                return (
                    <Card>
                        <CardHeader>
                            <CardTitle>Accordion</CardTitle>
                            <CardDescription>Collapsible content sections</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <div className="border rounded-lg overflow-hidden shadow-md">
                                <Accordion type="single" collapsible>
                                    <AccordionItem value="item-1">
                                        <AccordionTrigger>Is it accessible?</AccordionTrigger>
                                        <AccordionContent>
                                            Yes. It adheres to the WAI-ARIA design pattern.
                                        </AccordionContent>
                                    </AccordionItem>
                                    <AccordionItem value="item-2">
                                        <AccordionTrigger>Is it styled?</AccordionTrigger>
                                        <AccordionContent>
                                            Yes. It comes with default styles that matches your theme.
                                        </AccordionContent>
                                    </AccordionItem>
                                    <AccordionItem value="item-3">
                                        <AccordionTrigger>Is it animated?</AccordionTrigger>
                                        <AccordionContent>
                                            Yes. It's animated by default, but you can disable it if you prefer.
                                        </AccordionContent>
                                    </AccordionItem>
                                </Accordion>
                            </div>
                        </CardContent>
                    </Card>
                )

            case "Table":
                return (
                    <Card>
                        <CardHeader>
                            <CardTitle>Tables</CardTitle>
                            <CardDescription>Data presentation in rows and columns</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <Table>
                                <TableCaption>Recent transactions</TableCaption>
                                <TableHeader>
                                    <TableRow>
                                        <TableHead>Invoice</TableHead>
                                        <TableHead>Status</TableHead>
                                        <TableHead>Method</TableHead>
                                        <TableHead className="text-right">Amount</TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    <TableRow>
                                        <TableCell>INV001</TableCell>
                                        <TableCell><Badge size="sm">Paid</Badge></TableCell>
                                        <TableCell>Credit Card</TableCell>
                                        <TableCell className="text-right">$250.00</TableCell>
                                    </TableRow>
                                    <TableRow>
                                        <TableCell>INV002</TableCell>
                                        <TableCell><Badge size="sm" variant="secondary">Pending</Badge></TableCell>
                                        <TableCell>PayPal</TableCell>
                                        <TableCell className="text-right">$150.00</TableCell>
                                    </TableRow>
                                    <TableRow>
                                        <TableCell>INV003</TableCell>
                                        <TableCell><Badge size="sm" variant="destructive">Failed</Badge></TableCell>
                                        <TableCell>Bank Transfer</TableCell>
                                        <TableCell className="text-right">$350.00</TableCell>
                                    </TableRow>
                                </TableBody>
                            </Table>
                        </CardContent>
                    </Card>
                )

            case "Breadcrumb":
                return (
                    <Card>
                        <CardHeader>
                            <CardTitle>Breadcrumbs</CardTitle>
                            <CardDescription>Navigation hierarchy</CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <Breadcrumb>
                                <BreadcrumbList>
                                    <BreadcrumbItem>
                                        <BreadcrumbLink href="/"><Home className="h-4 w-4" /></BreadcrumbLink>
                                    </BreadcrumbItem>
                                    <BreadcrumbSeparator><ChevronRight className="h-4 w-4" /></BreadcrumbSeparator>
                                    <BreadcrumbItem>
                                        <BreadcrumbLink href="/components">Components</BreadcrumbLink>
                                    </BreadcrumbItem>
                                    <BreadcrumbSeparator><ChevronRight className="h-4 w-4" /></BreadcrumbSeparator>
                                    <BreadcrumbItem>
                                        <BreadcrumbLink>Breadcrumb</BreadcrumbLink>
                                    </BreadcrumbItem>
                                </BreadcrumbList>
                            </Breadcrumb>
                        </CardContent>
                    </Card>
                )

            case "Separator":
                return (
                    <Card>
                        <CardHeader>
                            <CardTitle>Separators</CardTitle>
                            <CardDescription>Visual dividers</CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div>
                                <p className="text-sm">Section One</p>
                                <Separator className="my-4" />
                                <p className="text-sm">Section Two</p>
                                <Separator className="my-4" />
                                <p className="text-sm">Section Three</p>
                            </div>
                        </CardContent>
                    </Card>
                )

            case "Tooltip":
                return (
                    <Card>
                        <CardHeader>
                            <CardTitle>Tooltips</CardTitle>
                            <CardDescription>Helpful hints on hover</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <div className="flex gap-4">
                                <Tooltip>
                                    <TooltipTrigger asChild>
                                        <Button variant="outline">Hover me</Button>
                                    </TooltipTrigger>
                                    <TooltipContent>
                                        <p>This is a helpful tooltip</p>
                                    </TooltipContent>
                                </Tooltip>
                                <Tooltip>
                                    <TooltipTrigger asChild>
                                        <Button variant="outline"><Info className="h-4 w-4" /></Button>
                                    </TooltipTrigger>
                                    <TooltipContent>
                                        <p>More information here</p>
                                    </TooltipContent>
                                </Tooltip>
                            </div>
                        </CardContent>
                    </Card>
                )

            case "Calendar":
                return (
                    <Card>
                        <CardHeader>
                            <CardTitle>Calendar</CardTitle>
                            <CardDescription>Date picker component</CardDescription>
                        </CardHeader>
                        <CardContent className="flex justify-center">
                            <Calendar
                                mode="single"
                                selected={date}
                                onSelect={setDate}
                                className="rounded-md border"
                            />
                        </CardContent>
                    </Card>
                )

            case "Label":
                return (
                    <Card>
                        <CardHeader>
                            <CardTitle>Labels</CardTitle>
                            <CardDescription>Form field labels</CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div className="space-y-2">
                                <Label htmlFor="name">Name</Label>
                                <Input id="name" placeholder="Enter your name" />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="email-label">Email</Label>
                                <Input id="email-label" type="email" placeholder="you@example.com" />
                            </div>
                        </CardContent>
                    </Card>
                )

            case "Scroll Area":
                return (
                    <Card>
                        <CardHeader>
                            <CardTitle>Scroll Area</CardTitle>
                            <CardDescription>Scrollable content container</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <ScrollArea className="h-72 w-full rounded-md border p-4">
                                <div className="space-y-4">
                                    {Array.from({ length: 20 }).map((_, i) => (
                                        <div key={i} className="text-sm">
                                            Item {i + 1} - This is scrollable content
                                        </div>
                                    ))}
                                </div>
                            </ScrollArea>
                        </CardContent>
                    </Card>
                )

            case "Alert Dialog":
                return (
                    <Card>
                        <CardHeader>
                            <CardTitle>Alert Dialog</CardTitle>
                            <CardDescription>Modal dialogs for critical actions</CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <AlertDialog>
                                <AlertDialogTrigger asChild>
                                    <Button variant="outline">Delete Account</Button>
                                </AlertDialogTrigger>
                                <AlertDialogContent>
                                    <AlertDialogHeader>
                                        <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                                        <AlertDialogDescription>
                                            This action cannot be undone. This will permanently delete your account
                                            and remove your data from our servers.
                                        </AlertDialogDescription>
                                    </AlertDialogHeader>
                                    <AlertDialogFooter>
                                        <AlertDialogCancel>Cancel</AlertDialogCancel>
                                        <AlertDialogAction className="bg-red-600 hover:bg-red-700">
                                            Delete Account
                                        </AlertDialogAction>
                                    </AlertDialogFooter>
                                </AlertDialogContent>
                            </AlertDialog>

                            <AlertDialog>
                                <AlertDialogTrigger asChild>
                                    <Button>Continue</Button>
                                </AlertDialogTrigger>
                                <AlertDialogContent>
                                    <AlertDialogHeader>
                                        <AlertDialogTitle>Confirm Action</AlertDialogTitle>
                                        <AlertDialogDescription>
                                            Do you want to proceed with this action? You can cancel if you need more time.
                                        </AlertDialogDescription>
                                    </AlertDialogHeader>
                                    <AlertDialogFooter>
                                        <AlertDialogCancel>Cancel</AlertDialogCancel>
                                        <AlertDialogAction>Continue</AlertDialogAction>
                                    </AlertDialogFooter>
                                </AlertDialogContent>
                            </AlertDialog>
                        </CardContent>
                    </Card>
                )

            case "Aspect Ratio":
                return (
                    <div className="space-y-6">
                        <Card>
                            <CardHeader>
                                <CardTitle>Aspect Ratio</CardTitle>
                                <CardDescription>Maintain consistent aspect ratios for media</CardDescription>
                            </CardHeader>
                            <CardContent className="space-y-6">
                                <div>
                                    <h3 className="text-sm font-medium mb-3">16:9 (Video)</h3>
                                    <div className="w-full max-w-md">
                                        <AspectRatio ratio={16 / 9} className="bg-gradient-to-br from-primary/20 to-primary/5 rounded-lg overflow-hidden">
                                            <div className="flex items-center justify-center h-full">
                                                <p className="text-muted-foreground">16:9 Aspect Ratio</p>
                                            </div>
                                        </AspectRatio>
                                    </div>
                                </div>
                                <div>
                                    <h3 className="text-sm font-medium mb-3">1:1 (Square)</h3>
                                    <div className="w-full max-w-xs">
                                        <AspectRatio ratio={1} className="bg-gradient-to-br from-green-500/20 to-green-500/5 rounded-lg overflow-hidden">
                                            <div className="flex items-center justify-center h-full">
                                                <p className="text-muted-foreground">1:1 Aspect Ratio</p>
                                            </div>
                                        </AspectRatio>
                                    </div>
                                </div>
                                <div>
                                    <h3 className="text-sm font-medium mb-3">4:3 (Classic)</h3>
                                    <div className="w-full max-w-md">
                                        <AspectRatio ratio={4 / 3} className="bg-gradient-to-br from-amber-500/20 to-amber-500/5 rounded-lg overflow-hidden">
                                            <div className="flex items-center justify-center h-full">
                                                <p className="text-muted-foreground">4:3 Aspect Ratio</p>
                                            </div>
                                        </AspectRatio>
                                    </div>
                                </div>
                                <div>
                                    <h3 className="text-sm font-medium mb-3">With Image</h3>
                                    <div className="w-full max-w-md">
                                        <AspectRatio ratio={16 / 9} className="bg-muted rounded-lg overflow-hidden">
                                            <img
                                                src="https://images.unsplash.com/photo-1588345921523-c2dcdb7f1dcd?w=800&dpr=2&q=80"
                                                alt="Photo by Drew Beamer"
                                                className="h-full w-full object-cover"
                                            />
                                        </AspectRatio>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    </div>
                )

            case "Command":
                return (
                    <Card>
                        <CardHeader>
                            <CardTitle>Command Palette</CardTitle>
                            <CardDescription>Fast, composable command menu</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <Command className="rounded-lg border shadow-md">
                                <CommandInput placeholder="Type a command or search..." />
                                <CommandList>
                                    <CommandEmpty>No results found.</CommandEmpty>
                                    <CommandGroup heading="Suggestions">
                                        <CommandItem>
                                            <Home className="mr-2 h-4 w-4" />
                                            <span>Home</span>
                                        </CommandItem>
                                        <CommandItem>
                                            <Info className="mr-2 h-4 w-4" />
                                            <span>About</span>
                                        </CommandItem>
                                        <CommandItem>
                                            <AlertCircle className="mr-2 h-4 w-4" />
                                            <span>Settings</span>
                                        </CommandItem>
                                    </CommandGroup>
                                    <CommandGroup heading="Actions">
                                        <CommandItem>
                                            <span>Create New</span>
                                        </CommandItem>
                                        <CommandItem>
                                            <span>Open File</span>
                                        </CommandItem>
                                        <CommandItem>
                                            <span>Save</span>
                                        </CommandItem>
                                    </CommandGroup>
                                </CommandList>
                            </Command>
                        </CardContent>
                    </Card>
                )

            case "Collapsible":
                return (
                    <Card>
                        <CardHeader>
                            <CardTitle>Collapsible</CardTitle>
                            <CardDescription>Expandable content sections</CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <Collapsible className="w-full space-y-2">
                                <div className="flex items-center justify-between space-x-4">
                                    <h4 className="text-sm font-semibold">@peduarte starred 3 repositories</h4>
                                    <CollapsibleTrigger asChild>
                                        <Button variant="ghost" size="sm">
                                            <ChevronRight className="h-4 w-4" />
                                            <span className="sr-only">Toggle</span>
                                        </Button>
                                    </CollapsibleTrigger>
                                </div>
                                <div className="rounded-md border px-4 py-3 text-sm">
                                    @radix-ui/primitives
                                </div>
                                <CollapsibleContent className="space-y-2">
                                    <div className="rounded-md border px-4 py-3 text-sm">
                                        @radix-ui/colors
                                    </div>
                                    <div className="rounded-md border px-4 py-3 text-sm">
                                        @stitches/react
                                    </div>
                                </CollapsibleContent>
                            </Collapsible>
                        </CardContent>
                    </Card>
                )

            case "Carousel":
                return (
                    <Card>
                        <CardHeader>
                            <CardTitle>Carousel</CardTitle>
                            <CardDescription>Swipeable content slider</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <Carousel className="w-full max-w-xs mx-auto">
                                <CarouselContent>
                                    <CarouselItem>
                                        <Card>
                                            <CardContent className="flex aspect-square items-center justify-center p-6">
                                                <div className="text-center">
                                                    <span className="text-4xl font-semibold">1</span>
                                                    <p className="text-sm text-muted-foreground mt-2">First Slide</p>
                                                </div>
                                            </CardContent>
                                        </Card>
                                    </CarouselItem>
                                    <CarouselItem>
                                        <Card>
                                            <CardContent className="flex aspect-square items-center justify-center p-6">
                                                <div className="text-center">
                                                    <span className="text-4xl font-semibold">2</span>
                                                    <p className="text-sm text-muted-foreground mt-2">Second Slide</p>
                                                </div>
                                            </CardContent>
                                        </Card>
                                    </CarouselItem>
                                    <CarouselItem>
                                        <Card>
                                            <CardContent className="flex aspect-square items-center justify-center p-6">
                                                <div className="text-center">
                                                    <span className="text-4xl font-semibold">3</span>
                                                    <p className="text-sm text-muted-foreground mt-2">Third Slide</p>
                                                </div>
                                            </CardContent>
                                        </Card>
                                    </CarouselItem>
                                </CarouselContent>
                                <CarouselPrevious />
                                <CarouselNext />
                            </Carousel>
                        </CardContent>
                    </Card>
                )

            case "Dialog":
                return (
                    <Card>
                        <CardHeader>
                            <CardTitle>Dialog</CardTitle>
                            <CardDescription>Modal windows for focused content</CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <Dialog>
                                <DialogTrigger asChild>
                                    <Button>Open Dialog</Button>
                                </DialogTrigger>
                                <DialogContent>
                                    <DialogHeader>
                                        <DialogTitle>Edit Profile</DialogTitle>
                                        <DialogDescription>
                                            Make changes to your profile here. Click save when you're done.
                                        </DialogDescription>
                                    </DialogHeader>
                                    <div className="grid gap-4 py-4">
                                        <div className="grid grid-cols-4 items-center gap-4">
                                            <Label htmlFor="name" className="text-right">Name</Label>
                                            <Input id="name" value="Pedro Duarte" className="col-span-3" />
                                        </div>
                                        <div className="grid grid-cols-4 items-center gap-4">
                                            <Label htmlFor="username" className="text-right">Username</Label>
                                            <Input id="username" value="@peduarte" className="col-span-3" />
                                        </div>
                                    </div>
                                    <DialogFooter>
                                        <Button type="submit">Save changes</Button>
                                    </DialogFooter>
                                </DialogContent>
                            </Dialog>

                            <Dialog>
                                <DialogTrigger asChild>
                                    <Button variant="outline">Simple Dialog</Button>
                                </DialogTrigger>
                                <DialogContent>
                                    <DialogHeader>
                                        <DialogTitle>Notification</DialogTitle>
                                        <DialogDescription>
                                            You have 3 new messages waiting in your inbox.
                                        </DialogDescription>
                                    </DialogHeader>
                                </DialogContent>
                            </Dialog>
                        </CardContent>
                    </Card>
                )

            case "Draggable":
                return (
                    <div className="space-y-6">
                        <Card>
                            <CardHeader>
                                <CardTitle>Draggable Elements</CardTitle>
                                <CardDescription>Drag and drop interactive elements with animations</CardDescription>
                            </CardHeader>
                            <CardContent className="space-y-6">
                                <div>
                                    <h3 className="text-sm font-medium mb-3">Basic Draggable</h3>
                                    <div className="min-h-[200px] border-2 border-dashed rounded-xl p-6 flex items-center justify-center bg-muted/20">
                                        <Draggable>
                                            <Card className="w-[200px] shadow-lg">
                                                <CardHeader>
                                                    <CardTitle className="text-base">Drag Me!</CardTitle>
                                                    <CardDescription className="text-xs">Click and drag anywhere</CardDescription>
                                                </CardHeader>
                                            </Card>
                                        </Draggable>
                                    </div>
                                </div>

                                <div>
                                    <h3 className="text-sm font-medium mb-3">Draggable Badges</h3>
                                    <div className="min-h-[250px] border-2 border-dashed rounded-xl p-6 flex flex-wrap gap-4 bg-muted/20 relative">
                                        <Draggable>
                                            <Badge variant="default" className="text-sm px-4 py-2">Default Badge</Badge>
                                        </Draggable>
                                        <Draggable>
                                            <Badge variant="secondary" className="text-sm px-4 py-2">Secondary</Badge>
                                        </Draggable>
                                        <Draggable>
                                            <Badge variant="destructive" className="text-sm px-4 py-2">Destructive</Badge>
                                        </Draggable>
                                        <Draggable>
                                            <Badge variant="outline" className="text-sm px-4 py-2">Outline</Badge>
                                        </Draggable>
                                        <Draggable>
                                            <Badge variant="success" className="text-sm px-4 py-2">Success</Badge>
                                        </Draggable>
                                        <Draggable>
                                            <Badge variant="warning" className="text-sm px-4 py-2">Warning</Badge>
                                        </Draggable>
                                    </div>
                                </div>

                                <div>
                                    <h3 className="text-sm font-medium mb-3">Draggable Buttons</h3>
                                    <div className="min-h-[250px] border-2 border-dashed rounded-xl p-6 flex flex-wrap gap-4 items-start bg-muted/20">
                                        <Draggable>
                                            <Button variant="default">Primary Action</Button>
                                        </Draggable>
                                        <Draggable>
                                            <Button variant="secondary">Secondary</Button>
                                        </Draggable>
                                        <Draggable>
                                            <Button variant="outline">Outline</Button>
                                        </Draggable>
                                        <Draggable>
                                            <Button variant="ghost">Ghost</Button>
                                        </Draggable>
                                        <Draggable>
                                            <Button variant="destructive">Delete</Button>
                                        </Draggable>
                                        <Draggable>
                                            <Button size="icon"><Home className="h-4 w-4" /></Button>
                                        </Draggable>
                                    </div>
                                </div>

                                <div>
                                    <h3 className="text-sm font-medium mb-3">Constrained Draggable</h3>
                                    <div className="relative">
                                        <div id="drag-container" className="min-h-[300px] border-2 border-primary rounded-xl p-6 bg-muted/20 relative overflow-hidden">
                                            <p className="text-xs text-muted-foreground mb-4">These elements are constrained within the container</p>
                                            <Draggable dragConstraints={{ top: 0, left: 0, right: 400, bottom: 200 }}>
                                                <Card className="w-[180px] shadow-lg absolute top-10 left-10">
                                                    <CardHeader className="p-4">
                                                        <CardTitle className="text-sm">Constrained</CardTitle>
                                                        <CardDescription className="text-xs">Can't leave the box</CardDescription>
                                                    </CardHeader>
                                                </Card>
                                            </Draggable>
                                            <Draggable dragConstraints={{ top: 0, left: 0, right: 400, bottom: 200 }}>
                                                <Button className="absolute bottom-10 right-10" variant="outline">
                                                    Drag within bounds
                                                </Button>
                                            </Draggable>
                                        </div>
                                    </div>
                                </div>

                                <div>
                                    <h3 className="text-sm font-medium mb-3">Disabled Draggable</h3>
                                    <div className="min-h-[150px] border-2 border-dashed rounded-xl p-6 flex items-center justify-center gap-6 bg-muted/20">
                                        <Draggable>
                                            <Button>Draggable</Button>
                                        </Draggable>
                                        <Draggable disabled>
                                            <Button variant="secondary" className="opacity-60">Disabled (Can't Drag)</Button>
                                        </Draggable>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    </div>
                )

            case "Context Menu":
                return (
                    <Card>
                        <CardHeader>
                            <CardTitle>Context Menu</CardTitle>
                            <CardDescription>Right-click context menu with actions</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <ContextMenu>
                                <ContextMenuTrigger className="flex h-[150px] w-full items-center justify-center rounded-md border border-dashed text-sm">
                                    Right click here
                                </ContextMenuTrigger>
                                <ContextMenuContent className="w-64">
                                    <ContextMenuItem>
                                        <span>Back</span>
                                        <ContextMenuShortcut>⌘[</ContextMenuShortcut>
                                    </ContextMenuItem>
                                    <ContextMenuItem disabled>
                                        <span>Forward</span>
                                        <ContextMenuShortcut>⌘]</ContextMenuShortcut>
                                    </ContextMenuItem>
                                    <ContextMenuItem>
                                        <span>Reload</span>
                                        <ContextMenuShortcut>⌘R</ContextMenuShortcut>
                                    </ContextMenuItem>
                                    <ContextMenuSub>
                                        <ContextMenuSubTrigger>
                                            <span>More Tools</span>
                                        </ContextMenuSubTrigger>
                                        <ContextMenuSubContent className="w-48">
                                            <ContextMenuItem>
                                                <span>Save Page As...</span>
                                                <ContextMenuShortcut>⇧⌘S</ContextMenuShortcut>
                                            </ContextMenuItem>
                                            <ContextMenuItem>
                                                <span>Create Shortcut...</span>
                                            </ContextMenuItem>
                                            <ContextMenuSeparator />
                                            <ContextMenuItem>
                                                <span>Developer Tools</span>
                                            </ContextMenuItem>
                                        </ContextMenuSubContent>
                                    </ContextMenuSub>
                                    <ContextMenuSeparator />
                                    <ContextMenuCheckboxItem checked>
                                        <span>Show Bookmarks Bar</span>
                                        <ContextMenuShortcut>⌘⇧B</ContextMenuShortcut>
                                    </ContextMenuCheckboxItem>
                                    <ContextMenuCheckboxItem>
                                        <span>Show Full URLs</span>
                                    </ContextMenuCheckboxItem>
                                    <ContextMenuSeparator />
                                    <ContextMenuRadioGroup value="pedro">
                                        <ContextMenuLabel>People</ContextMenuLabel>
                                        <ContextMenuSeparator />
                                        <ContextMenuRadioItem value="pedro">
                                            <span>Pedro Duarte</span>
                                        </ContextMenuRadioItem>
                                        <ContextMenuRadioItem value="colm">
                                            <span>Colm Tuite</span>
                                        </ContextMenuRadioItem>
                                    </ContextMenuRadioGroup>
                                </ContextMenuContent>
                            </ContextMenu>
                        </CardContent>
                    </Card>
                )

            case "Dropdown Menu":
                return (
                    <Card>
                        <CardHeader>
                            <CardTitle>Dropdown Menu</CardTitle>
                            <CardDescription>Dropdown menu with various items and options</CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-6">
                            <div>
                                <h4 className="text-sm font-semibold mb-3">Basic Dropdown</h4>
                                <DropdownMenu>
                                    <DropdownMenuTrigger asChild>
                                        <Button variant="outline">Open Menu</Button>
                                    </DropdownMenuTrigger>
                                    <DropdownMenuContent className="w-56">
                                        <DropdownMenuLabel>My Account</DropdownMenuLabel>
                                        <DropdownMenuSeparator />
                                        <DropdownMenuGroup>
                                            <DropdownMenuItem>
                                                <span>Profile</span>
                                                <DropdownMenuShortcut>⇧⌘P</DropdownMenuShortcut>
                                            </DropdownMenuItem>
                                            <DropdownMenuItem>
                                                <span>Billing</span>
                                                <DropdownMenuShortcut>⌘B</DropdownMenuShortcut>
                                            </DropdownMenuItem>
                                            <DropdownMenuItem>
                                                <span>Settings</span>
                                                <DropdownMenuShortcut>⌘S</DropdownMenuShortcut>
                                            </DropdownMenuItem>
                                        </DropdownMenuGroup>
                                        <DropdownMenuSeparator />
                                        <DropdownMenuItem disabled>
                                            <span>API (Coming Soon)</span>
                                        </DropdownMenuItem>
                                        <DropdownMenuSeparator />
                                        <DropdownMenuItem className="text-destructive">
                                            <span>Log out</span>
                                            <DropdownMenuShortcut>⇧⌘Q</DropdownMenuShortcut>
                                        </DropdownMenuItem>
                                    </DropdownMenuContent>
                                </DropdownMenu>
                            </div>

                            <div>
                                <h4 className="text-sm font-semibold mb-3">With Checkboxes & Radio</h4>
                                <DropdownMenu>
                                    <DropdownMenuTrigger asChild>
                                        <Button variant="outline">View Options</Button>
                                    </DropdownMenuTrigger>
                                    <DropdownMenuContent className="w-56">
                                        <DropdownMenuLabel>Appearance</DropdownMenuLabel>
                                        <DropdownMenuSeparator />
                                        <DropdownMenuCheckboxItem checked>
                                            Status Bar
                                        </DropdownMenuCheckboxItem>
                                        <DropdownMenuCheckboxItem>
                                            Activity Bar
                                        </DropdownMenuCheckboxItem>
                                        <DropdownMenuCheckboxItem checked>
                                            Panel
                                        </DropdownMenuCheckboxItem>
                                        <DropdownMenuSeparator />
                                        <DropdownMenuRadioGroup value="bottom">
                                            <DropdownMenuLabel>Position</DropdownMenuLabel>
                                            <DropdownMenuSeparator />
                                            <DropdownMenuRadioItem value="top">Top</DropdownMenuRadioItem>
                                            <DropdownMenuRadioItem value="bottom">Bottom</DropdownMenuRadioItem>
                                            <DropdownMenuRadioItem value="right">Right</DropdownMenuRadioItem>
                                        </DropdownMenuRadioGroup>
                                    </DropdownMenuContent>
                                </DropdownMenu>
                            </div>
                        </CardContent>
                    </Card>
                )

            case "Form":
                return (
                    <Card>
                        <CardHeader>
                            <CardTitle>Form</CardTitle>
                            <CardDescription>Form with validation and various input types</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <Form {...form}>
                                <form className="space-y-6">
                                    <FormField
                                        control={form.control}
                                        name="username"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>Username</FormLabel>
                                                <FormControl>
                                                    <Input placeholder="johndoe" {...field} />
                                                </FormControl>
                                                <FormDescription>
                                                    This is your public display name.
                                                </FormDescription>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />

                                    <FormField
                                        control={form.control}
                                        name="email"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>Email</FormLabel>
                                                <FormControl>
                                                    <Input type="email" placeholder="john@example.com" {...field} />
                                                </FormControl>
                                                <FormDescription>
                                                    We'll never share your email.
                                                </FormDescription>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />

                                    <FormField
                                        control={form.control}
                                        name="bio"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>Bio</FormLabel>
                                                <FormControl>
                                                    <Textarea
                                                        placeholder="Tell us about yourself"
                                                        className="resize-none"
                                                        {...field}
                                                    />
                                                </FormControl>
                                                <FormDescription>
                                                    A short description about yourself.
                                                </FormDescription>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />

                                    <FormField
                                        control={form.control}
                                        name="notifications"
                                        render={({ field }) => (
                                            <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4">
                                                <FormControl>
                                                    <Checkbox
                                                        checked={field.value}
                                                        onCheckedChange={field.onChange}
                                                    />
                                                </FormControl>
                                                <div className="space-y-1 leading-none">
                                                    <FormLabel>
                                                        Email notifications
                                                    </FormLabel>
                                                    <FormDescription>
                                                        Receive emails about your account activity.
                                                    </FormDescription>
                                                </div>
                                            </FormItem>
                                        )}
                                    />

                                    <Button type="submit" className="w-full">Submit</Button>
                                </form>
                            </Form>
                        </CardContent>
                    </Card>
                )

            case "Input OTP":
                return (
                    <Card>
                        <CardHeader>
                            <CardTitle>Input OTP</CardTitle>
                            <CardDescription>One-time password input component</CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-6">
                            <div>
                                <h4 className="text-sm font-semibold mb-3">Basic OTP (6 digits)</h4>
                                <div className="space-y-2">
                                    <Label>Enter OTP Code</Label>
                                    <InputOTP maxLength={6} value={otpValue} onChange={setOtpValue}>
                                        <InputOTPGroup>
                                            <InputOTPSlot index={0} />
                                            <InputOTPSlot index={1} />
                                            <InputOTPSlot index={2} />
                                            <InputOTPSlot index={3} />
                                            <InputOTPSlot index={4} />
                                            <InputOTPSlot index={5} />
                                        </InputOTPGroup>
                                    </InputOTP>
                                    <p className="text-sm text-muted-foreground">
                                        {otpValue ? `Current value: ${otpValue}` : "Please enter your one-time password."}
                                    </p>
                                </div>
                            </div>

                            <div>
                                <h4 className="text-sm font-semibold mb-3">Separated Groups</h4>
                                <div className="space-y-2">
                                    <Label>Verification Code</Label>
                                    <InputOTP maxLength={6}>
                                        <InputOTPGroup>
                                            <InputOTPSlot index={0} />
                                            <InputOTPSlot index={1} />
                                            <InputOTPSlot index={2} />
                                        </InputOTPGroup>
                                        <InputOTPSeparator />
                                        <InputOTPGroup>
                                            <InputOTPSlot index={3} />
                                            <InputOTPSlot index={4} />
                                            <InputOTPSlot index={5} />
                                        </InputOTPGroup>
                                    </InputOTP>
                                    <p className="text-sm text-muted-foreground">
                                        Enter the 6-digit code from your authenticator app.
                                    </p>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                )

            case "Menubar":
                return (
                    <Card>
                        <CardHeader>
                            <CardTitle>Menubar</CardTitle>
                            <CardDescription>Application menu bar with dropdown menus</CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-6">
                            <div>
                                <h4 className="text-sm font-semibold mb-3">Desktop App Style</h4>
                                <Menubar>
                                    <MenubarMenu>
                                        <MenubarTrigger>File</MenubarTrigger>
                                        <MenubarContent>
                                            <MenubarItem>
                                                New Tab <MenubarShortcut>⌘T</MenubarShortcut>
                                            </MenubarItem>
                                            <MenubarItem>
                                                New Window <MenubarShortcut>⌘N</MenubarShortcut>
                                            </MenubarItem>
                                            <MenubarSeparator />
                                            <MenubarItem>Share</MenubarItem>
                                            <MenubarSeparator />
                                            <MenubarItem>Print <MenubarShortcut>⌘P</MenubarShortcut>
                                            </MenubarItem>
                                        </MenubarContent>
                                    </MenubarMenu>
                                    <MenubarMenu>
                                        <MenubarTrigger>Edit</MenubarTrigger>
                                        <MenubarContent>
                                            <MenubarItem>
                                                Undo <MenubarShortcut>⌘Z</MenubarShortcut>
                                            </MenubarItem>
                                            <MenubarItem>
                                                Redo <MenubarShortcut>⇧⌘Z</MenubarShortcut>
                                            </MenubarItem>
                                            <MenubarSeparator />
                                            <MenubarSub>
                                                <MenubarSubTrigger>Find</MenubarSubTrigger>
                                                <MenubarSubContent>
                                                    <MenubarItem>Search the web</MenubarItem>
                                                    <MenubarSeparator />
                                                    <MenubarItem>Find...</MenubarItem>
                                                    <MenubarItem>Find Next</MenubarItem>
                                                    <MenubarItem>Find Previous</MenubarItem>
                                                </MenubarSubContent>
                                            </MenubarSub>
                                            <MenubarSeparator />
                                            <MenubarItem>Cut</MenubarItem>
                                            <MenubarItem>Copy</MenubarItem>
                                            <MenubarItem>Paste</MenubarItem>
                                        </MenubarContent>
                                    </MenubarMenu>
                                    <MenubarMenu>
                                        <MenubarTrigger>View</MenubarTrigger>
                                        <MenubarContent>
                                            <MenubarCheckboxItem checked>
                                                Always Show Bookmarks Bar
                                            </MenubarCheckboxItem>
                                            <MenubarCheckboxItem>
                                                Always Show Full URLs
                                            </MenubarCheckboxItem>
                                            <MenubarSeparator />
                                            <MenubarItem>
                                                Reload <MenubarShortcut>⌘R</MenubarShortcut>
                                            </MenubarItem>
                                            <MenubarItem disabled>
                                                Force Reload <MenubarShortcut>⇧⌘R</MenubarShortcut>
                                            </MenubarItem>
                                            <MenubarSeparator />
                                            <MenubarRadioGroup value="fullscreen">
                                                <MenubarRadioItem value="normal">Normal</MenubarRadioItem>
                                                <MenubarRadioItem value="fullscreen">Full Screen</MenubarRadioItem>
                                                <MenubarRadioItem value="minimized">Minimized</MenubarRadioItem>
                                            </MenubarRadioGroup>
                                        </MenubarContent>
                                    </MenubarMenu>
                                    <MenubarMenu>
                                        <MenubarTrigger>Profiles</MenubarTrigger>
                                        <MenubarContent>
                                            <MenubarRadioGroup value="andy">
                                                <MenubarRadioItem value="andy">Andy</MenubarRadioItem>
                                                <MenubarRadioItem value="benoit">Benoit</MenubarRadioItem>
                                                <MenubarRadioItem value="luis">Luis</MenubarRadioItem>
                                            </MenubarRadioGroup>
                                            <MenubarSeparator />
                                            <MenubarItem>Edit...</MenubarItem>
                                            <MenubarItem>Add Profile...</MenubarItem>
                                        </MenubarContent>
                                    </MenubarMenu>
                                </Menubar>
                            </div>
                        </CardContent>
                    </Card>
                )

            case "Toggle":
                return (
                    <Card>
                        <CardHeader>
                            <CardTitle>Toggle</CardTitle>
                            <CardDescription>Single toggle button with on/off states</CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-6">
                            <div>
                                <h4 className="text-sm font-semibold mb-3">Default Variant</h4>
                                <div className="flex flex-wrap gap-3">
                                    <Toggle aria-label="Toggle bold">
                                        <Bold className="h-4 w-4" />
                                    </Toggle>
                                    <Toggle aria-label="Toggle italic">
                                        <Italic className="h-4 w-4" />
                                    </Toggle>
                                    <Toggle aria-label="Toggle underline">
                                        <Underline className="h-4 w-4" />
                                    </Toggle>
                                </div>
                            </div>

                            <div>
                                <h4 className="text-sm font-semibold mb-3">Outline Variant</h4>
                                <div className="flex flex-wrap gap-3">
                                    <Toggle variant="outline" aria-label="Toggle bold">
                                        <Bold className="h-4 w-4" />
                                    </Toggle>
                                    <Toggle variant="outline" aria-label="Toggle italic">
                                        <Italic className="h-4 w-4" />
                                    </Toggle>
                                    <Toggle variant="outline" aria-label="Toggle underline">
                                        <Underline className="h-4 w-4" />
                                    </Toggle>
                                </div>
                            </div>

                            <div>
                                <h4 className="text-sm font-semibold mb-3">With Text</h4>
                                <div className="flex flex-wrap gap-3">
                                    <Toggle variant="outline">
                                        <Bold className="h-4 w-4" />
                                        Bold
                                    </Toggle>
                                    <Toggle variant="outline">
                                        <Italic className="h-4 w-4" />
                                        Italic
                                    </Toggle>
                                    <Toggle variant="outline">
                                        <Underline className="h-4 w-4" />
                                        Underline
                                    </Toggle>
                                </div>
                            </div>

                            <div>
                                <h4 className="text-sm font-semibold mb-3">Sizes</h4>
                                <div className="flex flex-wrap items-center gap-3">
                                    <Toggle size="sm" variant="outline">
                                        <Bold className="h-4 w-4" />
                                        Small
                                    </Toggle>
                                    <Toggle size="default" variant="outline">
                                        <Bold className="h-4 w-4" />
                                        Default
                                    </Toggle>
                                    <Toggle size="lg" variant="outline">
                                        <Bold className="h-4 w-4" />
                                        Large
                                    </Toggle>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                )

            case "Toggle Group":
                return (
                    <Card>
                        <CardHeader>
                            <CardTitle>Toggle Group</CardTitle>
                            <CardDescription>Multiple toggle buttons working as a group</CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-6">
                            <div>
                                <h4 className="text-sm font-semibold mb-3">Single Selection</h4>
                                <ToggleGroup type="single" variant="outline">
                                    <ToggleGroupItem value="bold" aria-label="Toggle bold">
                                        <Bold className="h-4 w-4" />
                                    </ToggleGroupItem>
                                    <ToggleGroupItem value="italic" aria-label="Toggle italic">
                                        <Italic className="h-4 w-4" />
                                    </ToggleGroupItem>
                                    <ToggleGroupItem value="underline" aria-label="Toggle underline">
                                        <Underline className="h-4 w-4" />
                                    </ToggleGroupItem>
                                </ToggleGroup>
                            </div>

                            <div>
                                <h4 className="text-sm font-semibold mb-3">Multiple Selection</h4>
                                <ToggleGroup type="multiple" variant="outline">
                                    <ToggleGroupItem value="bold" aria-label="Toggle bold">
                                        <Bold className="h-4 w-4" />
                                    </ToggleGroupItem>
                                    <ToggleGroupItem value="italic" aria-label="Toggle italic">
                                        <Italic className="h-4 w-4" />
                                    </ToggleGroupItem>
                                    <ToggleGroupItem value="underline" aria-label="Toggle underline">
                                        <Underline className="h-4 w-4" />
                                    </ToggleGroupItem>
                                </ToggleGroup>
                            </div>

                            <div>
                                <h4 className="text-sm font-semibold mb-3">Text Alignment</h4>
                                <ToggleGroup type="single" variant="outline" defaultValue="left">
                                    <ToggleGroupItem value="left" aria-label="Align left">
                                        <AlignLeft className="h-4 w-4" />
                                    </ToggleGroupItem>
                                    <ToggleGroupItem value="center" aria-label="Align center">
                                        <AlignCenter className="h-4 w-4" />
                                    </ToggleGroupItem>
                                    <ToggleGroupItem value="right" aria-label="Align right">
                                        <AlignRight className="h-4 w-4" />
                                    </ToggleGroupItem>
                                    <ToggleGroupItem value="justify" aria-label="Justify">
                                        <AlignJustify className="h-4 w-4" />
                                    </ToggleGroupItem>
                                </ToggleGroup>
                            </div>

                            <div>
                                <h4 className="text-sm font-semibold mb-3">With Text Labels</h4>
                                <ToggleGroup type="single" variant="outline">
                                    <ToggleGroupItem value="bold">
                                        <Bold className="h-4 w-4" />
                                        Bold
                                    </ToggleGroupItem>
                                    <ToggleGroupItem value="italic">
                                        <Italic className="h-4 w-4" />
                                        Italic
                                    </ToggleGroupItem>
                                    <ToggleGroupItem value="underline">
                                        <Underline className="h-4 w-4" />
                                        Underline
                                    </ToggleGroupItem>
                                </ToggleGroup>
                            </div>
                        </CardContent>
                    </Card>
                )

            case "Sonner":
                return (
                    <Card>
                        <CardHeader>
                            <CardTitle>Sonner</CardTitle>
                            <CardDescription>Beautiful toast notifications with rich features</CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-6">
                            <div>
                                <h4 className="text-sm font-semibold mb-3">Toast Types</h4>
                                <div className="flex flex-wrap gap-3">
                                    <Button
                                        onClick={() => sonnerToast("Event has been created")}
                                    >
                                        Default
                                    </Button>
                                    <Button
                                        onClick={() => sonnerToast.success("Successfully saved!")}
                                    >
                                        Success
                                    </Button>
                                    <Button
                                        variant="destructive"
                                        onClick={() => sonnerToast.error("Something went wrong")}
                                    >
                                        Error
                                    </Button>
                                    <Button
                                        variant="outline"
                                        onClick={() => sonnerToast.info("New update available")}
                                    >
                                        Info
                                    </Button>
                                    <Button
                                        variant="outline"
                                        onClick={() => sonnerToast.warning("Please review your changes")}
                                    >
                                        Warning
                                    </Button>
                                </div>
                            </div>

                            <div>
                                <h4 className="text-sm font-semibold mb-3">With Description</h4>
                                <div className="flex flex-wrap gap-3">
                                    <Button
                                        variant="outline"
                                        onClick={() => sonnerToast("Event Created", {
                                            description: "Monday, January 3rd at 6:00pm",
                                        })}
                                    >
                                        With Description
                                    </Button>
                                    <Button
                                        variant="outline"
                                        onClick={() => sonnerToast.success("Profile Updated", {
                                            description: "Your changes have been saved successfully",
                                        })}
                                    >
                                        Success + Description
                                    </Button>
                                </div>
                            </div>

                            <div>
                                <h4 className="text-sm font-semibold mb-3">With Actions</h4>
                                <div className="flex flex-wrap gap-3">
                                    <Button
                                        variant="outline"
                                        onClick={() => sonnerToast("File Deleted", {
                                            description: "The file has been moved to trash",
                                            action: {
                                                label: "Undo",
                                                onClick: () => sonnerToast.success("Restored!"),
                                            },
                                        })}
                                    >
                                        With Action
                                    </Button>
                                    <Button
                                        variant="outline"
                                        onClick={() => sonnerToast("Are you sure?", {
                                            description: "This action cannot be undone",
                                            action: {
                                                label: "Confirm",
                                                onClick: () => sonnerToast.error("Deleted"),
                                            },
                                            cancel: {
                                                label: "Cancel",
                                                onClick: () => sonnerToast("Cancelled"),
                                            },
                                        })}
                                    >
                                        With Cancel
                                    </Button>
                                </div>
                            </div>

                            <div>
                                <h4 className="text-sm font-semibold mb-3">Loading State</h4>
                                <div className="flex flex-wrap gap-3">
                                    <Button
                                        variant="outline"
                                        onClick={() => {
                                            const toastId = sonnerToast.loading("Uploading file...");
                                            setTimeout(() => {
                                                sonnerToast.success("Upload complete!", { id: toastId });
                                            }, 2000);
                                        }}
                                    >
                                        Show Loading
                                    </Button>
                                    <Button
                                        variant="outline"
                                        onClick={() => {
                                            sonnerToast.promise(
                                                new Promise((resolve) => setTimeout(resolve, 2000)),
                                                {
                                                    loading: "Processing...",
                                                    success: "Task completed!",
                                                    error: "Failed to process",
                                                }
                                            );
                                        }}
                                    >
                                        Promise Toast
                                    </Button>
                                </div>
                            </div>

                            <div className="pt-4 border-t">
                                <p className="text-sm text-muted-foreground">
                                    💡 Sonner provides rich features including actions, descriptions, and promise handling.
                                </p>
                            </div>
                        </CardContent>
                    </Card>
                )

            case "Sheet":
                return (
                    <Card>
                        <CardHeader>
                            <CardTitle>Sheet</CardTitle>
                            <CardDescription>Slide-over panel from different sides</CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-6">
                            <div>
                                <h4 className="text-sm font-semibold mb-3">Right Side (Default)</h4>
                                <Sheet>
                                    <SheetTrigger asChild>
                                        <Button variant="outline">Open from Right</Button>
                                    </SheetTrigger>
                                    <SheetContent>
                                        <SheetHeader>
                                            <SheetTitle>Edit Profile</SheetTitle>
                                            <SheetDescription>
                                                Make changes to your profile here. Click save when you're done.
                                            </SheetDescription>
                                        </SheetHeader>
                                        <div className="grid gap-4 py-4">
                                            <div className="grid grid-cols-4 items-center gap-4">
                                                <Label htmlFor="name" className="text-right">
                                                    Name
                                                </Label>
                                                <Input id="name" value="Pedro Duarte" className="col-span-3" />
                                            </div>
                                            <div className="grid grid-cols-4 items-center gap-4">
                                                <Label htmlFor="username" className="text-right">
                                                    Username
                                                </Label>
                                                <Input id="username" value="@peduarte" className="col-span-3" />
                                            </div>
                                        </div>
                                        <SheetFooter>
                                            <SheetClose asChild>
                                                <Button type="submit">Save changes</Button>
                                            </SheetClose>
                                        </SheetFooter>
                                    </SheetContent>
                                </Sheet>
                            </div>

                            <div>
                                <h4 className="text-sm font-semibold mb-3">Left Side</h4>
                                <Sheet>
                                    <SheetTrigger asChild>
                                        <Button variant="outline">Open from Left</Button>
                                    </SheetTrigger>
                                    <SheetContent side="left">
                                        <SheetHeader>
                                            <SheetTitle>Navigation</SheetTitle>
                                            <SheetDescription>
                                                Quick access to main sections
                                            </SheetDescription>
                                        </SheetHeader>
                                        <div className="grid gap-2 py-4">
                                            <Button variant="ghost" className="justify-start">
                                                Dashboard
                                            </Button>
                                            <Button variant="ghost" className="justify-start">
                                                Projects
                                            </Button>
                                            <Button variant="ghost" className="justify-start">
                                                Team
                                            </Button>
                                            <Button variant="ghost" className="justify-start">
                                                Settings
                                            </Button>
                                            <Button variant="ghost" className="justify-start">
                                                Help & Support
                                            </Button>
                                        </div>
                                    </SheetContent>
                                </Sheet>
                            </div>

                            <div>
                                <h4 className="text-sm font-semibold mb-3">Top Side</h4>
                                <Sheet>
                                    <SheetTrigger asChild>
                                        <Button variant="outline">Open from Top</Button>
                                    </SheetTrigger>
                                    <SheetContent side="top">
                                        <SheetHeader>
                                            <SheetTitle>Announcements</SheetTitle>
                                            <SheetDescription>
                                                Latest updates and news
                                            </SheetDescription>
                                        </SheetHeader>
                                        <div className="py-4">
                                            <div className="space-y-4">
                                                <div className="rounded-lg border p-4">
                                                    <h4 className="font-semibold">New Feature Released!</h4>
                                                    <p className="text-sm text-muted-foreground mt-1">
                                                        Check out our latest feature updates and improvements.
                                                    </p>
                                                </div>
                                                <div className="rounded-lg border p-4">
                                                    <h4 className="font-semibold">Maintenance Schedule</h4>
                                                    <p className="text-sm text-muted-foreground mt-1">
                                                        Scheduled maintenance on Friday, 2:00 AM - 4:00 AM UTC.
                                                    </p>
                                                </div>
                                            </div>
                                        </div>
                                    </SheetContent>
                                </Sheet>
                            </div>

                            <div>
                                <h4 className="text-sm font-semibold mb-3">Bottom Side</h4>
                                <Sheet>
                                    <SheetTrigger asChild>
                                        <Button variant="outline">Open from Bottom</Button>
                                    </SheetTrigger>
                                    <SheetContent side="bottom">
                                        <SheetHeader>
                                            <SheetTitle>Quick Actions</SheetTitle>
                                            <SheetDescription>
                                                Perform quick actions from here
                                            </SheetDescription>
                                        </SheetHeader>
                                        <div className="grid grid-cols-2 gap-4 py-4">
                                            <Button>Create New</Button>
                                            <Button variant="outline">Upload</Button>
                                            <Button variant="outline">Import</Button>
                                            <Button variant="outline">Export</Button>
                                        </div>
                                        <SheetFooter>
                                            <SheetClose asChild>
                                                <Button variant="ghost">Close</Button>
                                            </SheetClose>
                                        </SheetFooter>
                                    </SheetContent>
                                </Sheet>
                            </div>
                        </CardContent>
                    </Card>
                )

            case "Navigation Menu":
                return (
                    <Card>
                        <CardHeader>
                            <CardTitle>Navigation Menu</CardTitle>
                            <CardDescription>Accessible navigation menu with dropdown support</CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-6">
                            <div>
                                <h4 className="text-sm font-semibold mb-3">Basic Navigation</h4>
                                <NavigationMenu>
                                    <NavigationMenuList>
                                        <NavigationMenuItem>
                                            <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                                                Home
                                            </NavigationMenuLink>
                                        </NavigationMenuItem>
                                        <NavigationMenuItem>
                                            <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                                                About
                                            </NavigationMenuLink>
                                        </NavigationMenuItem>
                                        <NavigationMenuItem>
                                            <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                                                Contact
                                            </NavigationMenuLink>
                                        </NavigationMenuItem>
                                    </NavigationMenuList>
                                </NavigationMenu>
                            </div>

                            <div>
                                <h4 className="text-sm font-semibold mb-3">With Dropdown</h4>
                                <NavigationMenu>
                                    <NavigationMenuList>
                                        <NavigationMenuItem>
                                            <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                                                Getting Started
                                            </NavigationMenuLink>
                                        </NavigationMenuItem>
                                        <NavigationMenuItem>
                                            <NavigationMenuTrigger>Components</NavigationMenuTrigger>
                                            <NavigationMenuContent>
                                                <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px]">
                                                    <li>
                                                        <NavigationMenuLink asChild>
                                                            <a className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground">
                                                                <div className="text-sm font-medium leading-none">Alert Dialog</div>
                                                                <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
                                                                    A modal dialog that interrupts the user
                                                                </p>
                                                            </a>
                                                        </NavigationMenuLink>
                                                    </li>
                                                    <li>
                                                        <NavigationMenuLink asChild>
                                                            <a className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground">
                                                                <div className="text-sm font-medium leading-none">Hover Card</div>
                                                                <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
                                                                    For sighted users to preview content
                                                                </p>
                                                            </a>
                                                        </NavigationMenuLink>
                                                    </li>
                                                    <li>
                                                        <NavigationMenuLink asChild>
                                                            <a className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground">
                                                                <div className="text-sm font-medium leading-none">Progress</div>
                                                                <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
                                                                    Displays progress of a task
                                                                </p>
                                                            </a>
                                                        </NavigationMenuLink>
                                                    </li>
                                                    <li>
                                                        <NavigationMenuLink asChild>
                                                            <a className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground">
                                                                <div className="text-sm font-medium leading-none">Scroll Area</div>
                                                                <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
                                                                    Augments native scroll functionality
                                                                </p>
                                                            </a>
                                                        </NavigationMenuLink>
                                                    </li>
                                                </ul>
                                            </NavigationMenuContent>
                                        </NavigationMenuItem>
                                        <NavigationMenuItem>
                                            <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                                                Documentation
                                            </NavigationMenuLink>
                                        </NavigationMenuItem>
                                    </NavigationMenuList>
                                </NavigationMenu>
                            </div>
                        </CardContent>
                    </Card>
                )

            case "Pagination":
                return (
                    <Card>
                        <CardHeader>
                            <CardTitle>Pagination</CardTitle>
                            <CardDescription>Navigate through pages of content</CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-6">
                            <div>
                                <h4 className="text-sm font-semibold mb-3">Basic Pagination</h4>
                                <Pagination>
                                    <PaginationContent>
                                        <PaginationItem>
                                            <PaginationPrevious href="#" />
                                        </PaginationItem>
                                        <PaginationItem>
                                            <PaginationLink href="#">1</PaginationLink>
                                        </PaginationItem>
                                        <PaginationItem>
                                            <PaginationLink href="#" isActive>
                                                2
                                            </PaginationLink>
                                        </PaginationItem>
                                        <PaginationItem>
                                            <PaginationLink href="#">3</PaginationLink>
                                        </PaginationItem>
                                        <PaginationItem>
                                            <PaginationNext href="#" />
                                        </PaginationItem>
                                    </PaginationContent>
                                </Pagination>
                            </div>

                            <div>
                                <h4 className="text-sm font-semibold mb-3">With Ellipsis</h4>
                                <Pagination>
                                    <PaginationContent>
                                        <PaginationItem>
                                            <PaginationPrevious href="#" />
                                        </PaginationItem>
                                        <PaginationItem>
                                            <PaginationLink href="#">1</PaginationLink>
                                        </PaginationItem>
                                        <PaginationItem>
                                            <PaginationLink href="#" isActive>
                                                2
                                            </PaginationLink>
                                        </PaginationItem>
                                        <PaginationItem>
                                            <PaginationLink href="#">3</PaginationLink>
                                        </PaginationItem>
                                        <PaginationItem>
                                            <PaginationEllipsis />
                                        </PaginationItem>
                                        <PaginationItem>
                                            <PaginationLink href="#">10</PaginationLink>
                                        </PaginationItem>
                                        <PaginationItem>
                                            <PaginationNext href="#" />
                                        </PaginationItem>
                                    </PaginationContent>
                                </Pagination>
                            </div>
                        </CardContent>
                    </Card>
                )

            case "Popover":
                return (
                    <Card>
                        <CardHeader>
                            <CardTitle>Popover</CardTitle>
                            <CardDescription>Floating content that appears on interaction</CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-6">
                            <div>
                                <h4 className="text-sm font-semibold mb-3">Basic Popover</h4>
                                <Popover>
                                    <PopoverTrigger asChild>
                                        <Button variant="outline">Open Popover</Button>
                                    </PopoverTrigger>
                                    <PopoverContent>
                                        <div className="space-y-2">
                                            <h4 className="font-medium leading-none">Dimensions</h4>
                                            <p className="text-sm text-muted-foreground">
                                                Set the dimensions for the layer.
                                            </p>
                                            <div className="grid gap-2">
                                                <div className="grid grid-cols-3 items-center gap-4">
                                                    <Label htmlFor="width">Width</Label>
                                                    <Input
                                                        id="width"
                                                        defaultValue="100%"
                                                        className="col-span-2 h-8"
                                                    />
                                                </div>
                                                <div className="grid grid-cols-3 items-center gap-4">
                                                    <Label htmlFor="height">Height</Label>
                                                    <Input
                                                        id="height"
                                                        defaultValue="25px"
                                                        className="col-span-2 h-8"
                                                    />
                                                </div>
                                            </div>
                                        </div>
                                    </PopoverContent>
                                </Popover>
                            </div>

                            <div>
                                <h4 className="text-sm font-semibold mb-3">Date Picker Popover</h4>
                                <Popover>
                                    <PopoverTrigger asChild>
                                        <Button variant="outline">
                                            <CalendarIcon className="mr-2 h-4 w-4" />
                                            Pick a date
                                        </Button>
                                    </PopoverTrigger>
                                    <PopoverContent className="w-auto p-0" align="start">
                                        <Calendar
                                            mode="single"
                                            selected={date}
                                            onSelect={setDate}
                                            initialFocus
                                        />
                                    </PopoverContent>
                                </Popover>
                            </div>
                        </CardContent>
                    </Card>
                )

            case "Resizable":
                return (
                    <Card>
                        <CardHeader>
                            <CardTitle>Resizable</CardTitle>
                            <CardDescription>Resizable panel layouts with drag handles</CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-6">
                            <div>
                                <h4 className="text-sm font-semibold mb-3">Horizontal Panels</h4>
                                <ResizablePanelGroup direction="horizontal" className="min-h-[200px] rounded-lg border">
                                    <ResizablePanel defaultSize={50}>
                                        <div className="flex h-full items-center justify-center p-6">
                                            <span className="font-semibold">Left Panel</span>
                                        </div>
                                    </ResizablePanel>
                                    <ResizableHandle withHandle />
                                    <ResizablePanel defaultSize={50}>
                                        <div className="flex h-full items-center justify-center p-6">
                                            <span className="font-semibold">Right Panel</span>
                                        </div>
                                    </ResizablePanel>
                                </ResizablePanelGroup>
                            </div>

                            <div>
                                <h4 className="text-sm font-semibold mb-3">Vertical Panels</h4>
                                <ResizablePanelGroup direction="vertical" className="min-h-[200px] rounded-lg border">
                                    <ResizablePanel defaultSize={50}>
                                        <div className="flex h-full items-center justify-center p-6">
                                            <span className="font-semibold">Top Panel</span>
                                        </div>
                                    </ResizablePanel>
                                    <ResizableHandle withHandle />
                                    <ResizablePanel defaultSize={50}>
                                        <div className="flex h-full items-center justify-center p-6">
                                            <span className="font-semibold">Bottom Panel</span>
                                        </div>
                                    </ResizablePanel>
                                </ResizablePanelGroup>
                            </div>

                            <div>
                                <h4 className="text-sm font-semibold mb-3">Three Panels</h4>
                                <ResizablePanelGroup direction="horizontal" className="min-h-[200px] rounded-lg border">
                                    <ResizablePanel defaultSize={25}>
                                        <div className="flex h-full items-center justify-center p-6">
                                            <span className="font-semibold">Sidebar</span>
                                        </div>
                                    </ResizablePanel>
                                    <ResizableHandle withHandle />
                                    <ResizablePanel defaultSize={50}>
                                        <div className="flex h-full items-center justify-center p-6">
                                            <span className="font-semibold">Content</span>
                                        </div>
                                    </ResizablePanel>
                                    <ResizableHandle withHandle />
                                    <ResizablePanel defaultSize={25}>
                                        <div className="flex h-full items-center justify-center p-6">
                                            <span className="font-semibold">Panel</span>
                                        </div>
                                    </ResizablePanel>
                                </ResizablePanelGroup>
                            </div>
                        </CardContent>
                    </Card>
                )

            default:
                return (
                    <Card>
                        <CardHeader>
                            <CardTitle>{selectedComponent}</CardTitle>
                            <CardDescription>Component preview coming soon</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <p className="text-muted-foreground">
                                This component is available in the library. Preview implementation coming soon.
                            </p>
                        </CardContent>
                    </Card>
                )
        }
    }

    return (
        <TooltipProvider>
            <div className="flex h-screen bg-gradient-to-br from-background via-background to-primary/5">
                {/* Left Sidebar - Component Menu */}
                <div className="w-72 border-r bg-background/95 backdrop-blur-sm flex flex-col">
                    {/* Header */}
                    <div className="p-6 border-b">
                        <h1 className="text-2xl font-bold bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent">
                            Components
                        </h1>
                        <p className="text-sm text-muted-foreground mt-1">
                            {COMPONENTS.length} available
                        </p>
                    </div>

                    {/* Component List */}
                    <ScrollArea className="flex-1 p-4">
                        <div className="space-y-1">
                            {COMPONENTS.map((name) => (
                                <button
                                    key={name}
                                    onClick={() => setSelectedComponent(name)}
                                    className={`
                                        w-full text-left px-4 py-2.5 rounded-md text-sm font-medium
                                        transition-all duration-200
                                        ${selectedComponent === name
                                            ? 'bg-primary text-primary-foreground shadow-md'
                                            : 'hover:bg-accent hover:text-accent-foreground'
                                        }
                                    `}
                                >
                                    {name}
                                </button>
                            ))}
                        </div>
                    </ScrollArea>

                    {/* Theme Toggle */}
                    <div className="p-4 border-t">
                        <div className="flex items-center justify-between">
                            <span className="text-sm text-muted-foreground">Theme</span>
                            <ModeToggle />
                        </div>
                    </div>
                </div>

                {/* Right Side - Component Preview */}
                <div className="flex-1 overflow-auto">
                    <div className="p-8 max-w-5xl mx-auto">
                        {/* Preview Header */}
                        <div className="mb-8">
                            <h2 className="text-4xl font-bold tracking-tight">{selectedComponent}</h2>
                            <p className="text-muted-foreground mt-2">
                                Interactive preview with variants and examples
                            </p>
                        </div>

                        {/* Component Preview */}
                        {renderComponentPreview()}
                    </div>
                </div>
            </div>
        </TooltipProvider>
    )
}
