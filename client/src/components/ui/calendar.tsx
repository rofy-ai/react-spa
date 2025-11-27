import * as React from "react"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { DayPicker } from "react-day-picker"

import { cn } from "@/lib/utils"
import { buttonVariants } from "@/components/ui/button"

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
      className={cn("p-6", className)}
      classNames={{
        months: "flex flex-col sm:flex-row space-y-4 sm:space-x-4 sm:space-y-0",
        month: "space-y-5",
        caption: "flex justify-center pt-1 relative items-center mb-1",
        caption_label: "text-lg font-bold",
        nav: "space-x-1 flex items-center",
        nav_button: cn(
          buttonVariants({ variant: "outline" }),
          "h-9 w-9 bg-transparent p-0 hover:bg-accent border-none transition-all"
        ),
        nav_button_previous: "absolute left-1",
        nav_button_next: "absolute right-1",
        table: "w-full border-collapse space-y-1",
        head_row: "flex justify-between mb-2",
        head_cell:
          "text-muted-foreground/60 rounded-md w-12 font-medium text-sm",
        row: "flex w-full mt-1 justify-between",
        cell: "relative h-12 w-12 text-center text-sm p-0 focus-within:relative focus-within:z-20",
        day: cn(
          buttonVariants({ variant: "ghost" }),
          "h-12 w-12 p-0 font-medium text-base aria-selected:opacity-100 rounded-xl hover:bg-accent/50 transition-all hover:scale-105"
        ),
        day_range_end: "day-range-end",
        day_selected:
          "bg-primary text-primary-foreground hover:bg-primary hover:text-primary-foreground focus:bg-primary focus:text-primary-foreground rounded-xl shadow-lg font-bold scale-105 ring-2 ring-primary/20 ring-offset-2",
        day_today: "bg-muted/50 text-foreground font-bold rounded-xl border-2 border-primary",
        day_outside:
          "day-outside text-muted-foreground/30 aria-selected:bg-accent/50 aria-selected:text-muted-foreground opacity-50",
        day_disabled: "text-muted-foreground/20 opacity-30 line-through",
        day_range_middle:
          "aria-selected:bg-accent aria-selected:text-accent-foreground rounded-xl",
        day_hidden: "invisible",
        ...classNames,
      }}
      components={{
        IconLeft: ({ className, ...props }) => (
          <ChevronLeft className={cn("h-5 w-5", className)} {...props} />
        ),
        IconRight: ({ className, ...props }) => (
          <ChevronRight className={cn("h-5 w-5", className)} {...props} />
        ),
      }}
      {...props}
    />
  )
}
Calendar.displayName = "Calendar"

export { Calendar }
