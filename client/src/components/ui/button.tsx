import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap text-sm font-semibold ring-offset-background transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 active:scale-95",
  {
    variants: {
      variant: {
        default: "bg-primary text-primary-foreground hover:bg-primary/90 shadow-md hover:shadow-2xl hover:shadow-primary/50 hover:scale-[1.02] hover:brightness-110",
        destructive:
          "bg-destructive text-destructive-foreground hover:bg-destructive/90 shadow-md hover:shadow-2xl hover:shadow-destructive/50 hover:scale-[1.02] hover:brightness-110",
        outline:
          "border-2 border-input bg-background hover:bg-primary/5 hover:text-accent-foreground hover:border-primary hover:shadow-lg hover:scale-[1.02]",
        secondary:
          "bg-secondary text-secondary-foreground hover:bg-secondary/70 shadow-sm hover:shadow-lg hover:scale-[1.02] hover:brightness-105",
        ghost: "hover:bg-accent hover:text-accent-foreground hover:shadow-md hover:scale-[1.02]",
        link: "text-primary underline-offset-4 hover:underline hover:text-primary/70 hover:scale-[1.02]",
      },
      size: {
        default: "h-10 px-4 py-2",
        sm: "h-8 px-3 text-xs",
        md: "h-10 px-4 py-2",
        lg: "h-12 px-8 text-base",
        xl: "h-14 px-10 text-lg",
        icon: "h-10 w-10",
      },
      radius: {
        none: "rounded-none",
        sm: "rounded-sm",
        md: "rounded-md",
        lg: "rounded-lg",
        full: "rounded-full",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
      radius: "md",
    },
  }
)

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
  VariantProps<typeof buttonVariants> {
  asChild?: boolean
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, radius, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button"
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, radius, className }))}
        ref={ref}
        {...props}
      />
    )
  }
)
Button.displayName = "Button"

export { Button, buttonVariants }
