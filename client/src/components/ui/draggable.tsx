import * as React from "react"
import { motion, type PanInfo } from "framer-motion"
import { cn } from "@/lib/utils"

export interface DraggableProps {
    children: React.ReactNode
    className?: string
    disabled?: boolean
    onDragStart?: () => void
    onDragEnd?: (info: PanInfo) => void
    dragConstraints?: {
        top?: number
        left?: number
        right?: number
        bottom?: number
    } | React.RefObject<Element>
    dragElastic?: number | boolean
    dragMomentum?: boolean
    style?: React.CSSProperties
    id?: string
}

const Draggable = React.forwardRef<HTMLDivElement, DraggableProps>(
    (
        {
            children,
            className,
            disabled = false,
            onDragStart,
            onDragEnd,
            dragConstraints,
            dragElastic = 0.2,
            dragMomentum = true,
            style,
            id,
        },
        ref
    ) => {
        return (
            <motion.div
                ref={ref}
                id={id}
                style={style}
                drag={!disabled}
                dragConstraints={dragConstraints}
                dragElastic={dragElastic}
                dragMomentum={dragMomentum}
                onDragStart={onDragStart}
                onDragEnd={(_, info) => onDragEnd?.(info)}
                whileDrag={{ scale: 1.05, cursor: "grabbing" }}
                className={cn(
                    "cursor-grab touch-none select-none",
                    disabled && "cursor-default",
                    className
                )}
            >
                {children}
            </motion.div>
        )
    }
)
Draggable.displayName = "Draggable"

export { Draggable }
