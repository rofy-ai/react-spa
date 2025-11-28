import * as React from "react"
import * as SliderPrimitive from "@radix-ui/react-slider"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const sliderVariants = cva(
  "relative flex w-full touch-none select-none items-center",
  {
    variants: {
      variant: {
        default: "",
        sleek: "",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
)

const Slider = React.forwardRef<
  React.ElementRef<typeof SliderPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof SliderPrimitive.Root> & VariantProps<typeof sliderVariants>
>(({ className, variant, ...props }, ref) => (
  <SliderPrimitive.Root
    ref={ref}
    className={cn(sliderVariants({ variant }), "cursor-pointer", className)}
    {...props}
  >
    <SliderPrimitive.Track className={cn(
      "relative w-full grow overflow-hidden rounded-full transition-all",
      variant === "sleek" ? "h-1 bg-primary/20 hover:bg-primary/25" : "h-2 bg-secondary"
    )}>
      <SliderPrimitive.Range className="absolute h-full bg-primary" />
    </SliderPrimitive.Track>
    <SliderPrimitive.Thumb className={cn(
      "block rounded-full ring-offset-background transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50",
      variant === "sleek"
        ? "h-4 w-4 bg-primary shadow-[0_0_10px_rgba(0,0,0,0.2)] hover:scale-125 border-none"
        : "h-5 w-5 border-2 border-primary bg-white hover:scale-110"
    )} />
  </SliderPrimitive.Root>
))
Slider.displayName = SliderPrimitive.Root.displayName

export { Slider }
