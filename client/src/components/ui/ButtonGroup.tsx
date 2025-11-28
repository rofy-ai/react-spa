import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const buttonGroupVariants = cva(
    "inline-flex rounded-lg shadow-sm",
    {
        variants: {
            variant: {
                default: "[&>button]:shadow-none [&>button:not(:first-child)]:border-l-0 [&>button:first-child]:rounded-r-none [&>button:last-child]:rounded-l-none [&>button:not(:first-child):not(:last-child)]:rounded-none [&>button:hover]:scale-110 [&>button:hover]:z-10 [&>button:hover]:shadow-2xl [&>button:hover]:shadow-primary/40 [&>button]:transition-all [&>button]:duration-300 [&>button:hover]:border-primary/50",
                separated: "gap-2 [&>button:hover]:rotate-2 [&>button:hover]:scale-105 [&>button:hover]:shadow-2xl [&>button]:transition-all [&>button]:duration-300",
            },
            size: {
                sm: "[&>button]:h-8 [&>button]:px-3 [&>button]:text-xs",
                md: "[&>button]:h-10 [&>button]:px-4 [&>button]:text-sm",
                lg: "[&>button]:h-12 [&>button]:px-6 [&>button]:text-base",
            },
        },
        defaultVariants: {
            variant: "default",
            size: "md",
        },
    }
)

export interface ButtonGroupProps
    extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof buttonGroupVariants> { }

const ButtonGroup = React.forwardRef<HTMLDivElement, ButtonGroupProps>(
    ({ className, variant, size, ...props }, ref) => {
        return (
            <div
                ref={ref}
                className={cn(buttonGroupVariants({ variant, size }), className)}
                role="group"
                {...props}
            />
        )
    }
)
ButtonGroup.displayName = "ButtonGroup"

export { ButtonGroup, buttonGroupVariants }
