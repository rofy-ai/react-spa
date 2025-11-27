import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const textareaVariants = cva(
  "flex w-full border-2 border-input bg-background text-base ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:border-primary focus-visible:ring-4 focus-visible:ring-primary/20 transition-all duration-200 disabled:cursor-not-allowed disabled:opacity-50 md:text-sm resize-none",
  {
    variants: {
      size: {
        sm: "min-h-[60px] px-2 py-1 text-xs",
        md: "min-h-[80px] px-3 py-2",
        lg: "min-h-[120px] px-4 py-3 text-base",
      },
      radius: {
        none: "rounded-none",
        sm: "rounded-sm",
        md: "rounded-md",
        lg: "rounded-lg",
      },
    },
    defaultVariants: {
      size: "md",
      radius: "md",
    },
  }
)

export interface TextareaProps
  extends React.TextareaHTMLAttributes<HTMLTextAreaElement>,
  VariantProps<typeof textareaVariants> { }

const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ className, size, radius, ...props }, ref) => {
    return (
      <textarea
        className={cn(textareaVariants({ size, radius }), className)}
        ref={ref}
        {...props}
      />
    )
  }
)
Textarea.displayName = "Textarea"

export { Textarea }
