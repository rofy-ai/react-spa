import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0",
  {
    variants: {
      variant: {
        default: "bg-white/20 backdrop-blur-md border border-white/30 text-white hover:bg-white/30 shadow-lg transition-all duration-300",
        destructive:
          "bg-red-500/20 backdrop-blur-md border border-red-400/30 text-red-100 hover:bg-red-500/30 shadow-lg transition-all duration-300",
        outline:
          "border border-white/30 bg-white/10 backdrop-blur-md hover:bg-white/20 hover:text-white shadow-lg transition-all duration-300",
        secondary:
          "bg-purple-500/20 backdrop-blur-md border border-purple-400/30 text-purple-100 hover:bg-purple-500/30 shadow-lg transition-all duration-300",
        ghost: "hover:bg-white/20 hover:text-white backdrop-blur-sm transition-all duration-300",
        link: "text-white/90 underline-offset-4 hover:underline hover:text-white transition-colors duration-300",
      },
      size: {
        default: "h-10 px-4 py-2",
        sm: "h-9 rounded-md px-3",
        lg: "h-11 rounded-md px-8",
        icon: "h-10 w-10",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button"
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    )
  }
)
Button.displayName = "Button"

export { Button, buttonVariants }
