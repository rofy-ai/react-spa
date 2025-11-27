import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const badgeVariants = cva(
  "inline-flex items-center border font-semibold transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2",
  {
    variants: {
      variant: {
        default:
          "border-transparent bg-primary text-primary-foreground hover:bg-primary/90 hover:scale-105 shadow-lg shadow-primary/30",
        primary:
          "border-transparent bg-purple-600 text-white hover:bg-purple-700 hover:scale-105 shadow-lg shadow-purple-500/30",
        secondary:
          "border-transparent bg-secondary text-secondary-foreground hover:bg-secondary/80 hover:scale-105 shadow-md",
        info:
          "border-transparent bg-blue-600 text-white hover:bg-blue-700 hover:scale-105 shadow-lg shadow-blue-500/30",
        success:
          "border-transparent bg-green-600 text-white hover:bg-green-700 hover:scale-105 shadow-lg shadow-green-500/30",
        warning:
          "border-transparent bg-amber-500 text-white hover:bg-amber-600 hover:scale-105 shadow-lg shadow-amber-500/30",
        error:
          "border-transparent bg-red-600 text-white hover:bg-red-700 hover:scale-105 shadow-lg shadow-red-500/30",
        destructive:
          "border-transparent bg-red-600 text-white hover:bg-red-700 hover:scale-105 shadow-lg shadow-red-500/30",
        outline: "text-foreground border-2 hover:bg-accent hover:scale-105",
      },
      size: {
        sm: "px-2.5 py-0.5 text-xs",
        md: "px-3 py-1 text-xs",
        lg: "px-4 py-1.5 text-sm",
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
      size: "md",
      radius: "full",
    },
  }
)

export interface BadgeProps
  extends React.HTMLAttributes<HTMLDivElement>,
  VariantProps<typeof badgeVariants> { }

function Badge({ className, variant, size, radius, ...props }: BadgeProps) {
  return (
    <div className={cn(badgeVariants({ variant, size, radius }), className)} {...props} />
  )
}

export { Badge, badgeVariants }
