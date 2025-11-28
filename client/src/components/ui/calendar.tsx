import * as React from "react"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { DayPicker } from "react-day-picker"

import { cn } from "@/lib/utils"
import { buttonVariants } from "@/components/ui/Button"

export type CalendarProps = React.ComponentProps<typeof DayPicker>

function Calendar({
  className,
  classNames,
  showOutsideDays = true,
  ...props
}: CalendarProps) {
  return (
    <DayPicker
      showOutsideDays={showOutsideDays}
      className={cn("p-6 relative", className)}
      classNames={{
        months: "flex flex-col sm:flex-row space-y-4 sm:space-x-4 sm:space-y-0",
        month: "space-y-5",
        month_caption: "flex justify-center pt-1 relative items-center mb-4",
        caption_label: "text-lg font-bold",
        nav: "flex items-center justify-between absolute inset-x-0 top-6",
        button_previous: cn(
          buttonVariants({ variant: "outline" }),
          "h-9 w-9 bg-transparent p-0 hover:bg-accent border-none transition-all"
        ),
        button_next: cn(
          buttonVariants({ variant: "outline" }),
          "h-9 w-9 bg-transparent p-0 hover:bg-accent border-none transition-all"
        ),
        month_grid: "w-full border-collapse",
        weekdays: "flex",
        weekday:
          "text-muted-foreground/60 rounded-md w-12 font-medium text-sm text-center",
        week: "flex w-full mt-2",
        day: "relative h-12 w-12 text-center text-sm p-0 focus-within:relative focus-within:z-20",
        day_button: cn(
          buttonVariants({ variant: "ghost" }),
          "h-12 w-12 p-0 font-medium text-base aria-selected:opacity-100 rounded-xl hover:bg-accent/50 transition-all hover:scale-105"
        ),
        range_end: "day-range-end",
        selected:
          "bg-primary text-primary-foreground hover:bg-primary hover:text-primary-foreground focus:bg-primary focus:text-primary-foreground rounded-xl shadow-lg font-bold scale-105 ring-2 ring-primary/20 ring-offset-2",
        today: "bg-muted/50 text-foreground font-bold rounded-xl border-2 border-primary",
        outside:
          "day-outside text-muted-foreground/30 aria-selected:bg-accent/50 aria-selected:text-muted-foreground opacity-50",
        disabled: "text-muted-foreground/20 opacity-30 line-through",
        range_middle:
          "aria-selected:bg-accent aria-selected:text-accent-foreground rounded-xl",
        hidden: "invisible",
        ...classNames,
      }}
      components={{
        Chevron: ({ orientation, ...props }) => {
          const Icon = orientation === "left" ? ChevronLeft : ChevronRight
          return <Icon className="h-5 w-5" {...props} />
        },
      }}
      {...props}
    />
  )
}
Calendar.displayName = "Calendar"

export { Calendar }

