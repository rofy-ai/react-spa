import toast from "react-hot-toast"

// Simple wrapper to maintain compatibility with existing API
type ToastOptions = {
  title?: string
  description?: string
  variant?: "default" | "destructive"
  duration?: number
}

// Main toast function that mimics the original API
function showToast({ title, description, variant = "default", duration = 4000 }: ToastOptions) {
  const message = title && description
    ? `${title}: ${description}`
    : title || description || "Notification"

  if (variant === "destructive") {
    return toast.error(message, { duration })
  } else {
    return toast.success(message, { duration })
  }
}

// Hook to maintain compatibility with the existing useToast API
function useToast() {
  return {
    toast: showToast,
    dismiss: (toastId?: string) => {
      if (toastId) {
        toast.dismiss(toastId)
      } else {
        toast.dismiss()
      }
    }
  }
}

export { useToast, showToast as toast }
