import * as React from "react"
import { cn } from "@/lib/utils"

const Footer = React.forwardRef<
    HTMLElement,
    React.HTMLAttributes<HTMLElement>
>(({ className, ...props }, ref) => (
    <footer
        ref={ref}
        className={cn(
            "w-full border-t bg-background",
            className
        )}
        {...props}
    />
))
Footer.displayName = "Footer"

const FooterContent = React.forwardRef<
    HTMLDivElement,
    React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
    <div
        ref={ref}
        className={cn(
            "container mx-auto px-4 py-6",
            className
        )}
        {...props}
    />
))
FooterContent.displayName = "FooterContent"

const FooterSection = React.forwardRef<
    HTMLDivElement,
    React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
    <div
        ref={ref}
        className={cn(
            "flex flex-col gap-3",
            className
        )}
        {...props}
    />
))
FooterSection.displayName = "FooterSection"

const FooterTitle = React.forwardRef<
    HTMLHeadingElement,
    React.HTMLAttributes<HTMLHeadingElement>
>(({ className, ...props }, ref) => (
    <h3
        ref={ref}
        className={cn(
            "text-sm font-semibold tracking-tight",
            className
        )}
        {...props}
    />
))
FooterTitle.displayName = "FooterTitle"

const FooterLink = React.forwardRef<
    HTMLAnchorElement,
    React.AnchorHTMLAttributes<HTMLAnchorElement>
>(({ className, ...props }, ref) => (
    <a
        ref={ref}
        className={cn(
            "text-sm text-muted-foreground hover:text-foreground transition-colors cursor-pointer",
            className
        )}
        {...props}
    />
))
FooterLink.displayName = "FooterLink"

const FooterText = React.forwardRef<
    HTMLParagraphElement,
    React.HTMLAttributes<HTMLParagraphElement>
>(({ className, ...props }, ref) => (
    <p
        ref={ref}
        className={cn(
            "text-sm text-muted-foreground",
            className
        )}
        {...props}
    />
))
FooterText.displayName = "FooterText"

const FooterDivider = React.forwardRef<
    HTMLHRElement,
    React.HTMLAttributes<HTMLHRElement>
>(({ className, ...props }, ref) => (
    <hr
        ref={ref}
        className={cn(
            "my-6 border-t",
            className
        )}
        {...props}
    />
))
FooterDivider.displayName = "FooterDivider"

export {
    Footer,
    FooterContent,
    FooterSection,
    FooterTitle,
    FooterLink,
    FooterText,
    FooterDivider,
}
