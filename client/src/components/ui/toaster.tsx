import { Toaster as HotToaster } from "react-hot-toast"

export function Toaster() {
  return (
    <HotToaster
      position="top-right"
      toastOptions={{
        duration: 4000,
        style: {
          background: "white",
          color: "hsl(var(--foreground))",
          border: "1px solid hsl(var(--border))",
          borderRadius: "var(--radius)",
          padding: "16px",
        },
        success: {
          style: {
            background: "white",
            color: "hsl(var(--foreground))",
            border: "1px solid hsl(120 100% 40%)",
          },
        },
        error: {
          style: {
            background: "white",
            color: "hsl(var(--foreground))",
            border: "1px solid hsl(var(--destructive))",
          },
        },
      }}
    />
  )
}
