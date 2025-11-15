import { useState, useEffect } from 'react'

export function Toast({ message, type = 'success', duration = 3000, onClose }) {
  useEffect(() => {
    const timer = setTimeout(() => {
      onClose()
    }, duration)

    return () => clearTimeout(timer)
  }, [duration, onClose])

  const baseStyles = "fixed top-4 right-4 p-4 rounded-lg shadow-lg max-w-sm z-50 transition-all duration-300 transform translate-y-0"
  const typeStyles = {
    success: "bg-green-500 text-white",
    error: "bg-red-500 text-white",
    warning: "bg-yellow-500 text-white",
    info: "bg-blue-500 text-white"
  }

  return (
    <div className={`${baseStyles} ${typeStyles[type]}`}>
      {message}
    </div>
  )
}

export function useToast() {
  const [toasts, setToasts] = useState([])

  const show = ({ message, type = 'success', duration = 3000 }) => {
    const id = Date.now()
    setToasts(prev => [...prev, { id, message, type, duration }])
  }

  const close = (id) => {
    setToasts(prev => prev.filter(toast => toast.id !== id))
  }

  return { toasts, show, close }
}

export function ToastContainer({ toasts, onClose }) {
  return (
    <div className="fixed top-4 right-4 z-50 space-y-2">
      {toasts.map(toast => (
        <Toast
          key={toast.id}
          message={toast.message}
          type={toast.type}
          duration={toast.duration}
          onClose={() => onClose(toast.id)}
        />
      ))}
    </div>
  )
} 