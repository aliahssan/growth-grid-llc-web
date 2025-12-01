import { forwardRef } from 'react'
import { cn } from '@/lib/utils'

export interface FieldProps extends React.InputHTMLAttributes<HTMLInputElement | HTMLTextAreaElement> {
  label: string
  error?: string[]
  as?: 'input' | 'textarea'
  rows?: number
}

export const Field = forwardRef<HTMLInputElement | HTMLTextAreaElement, FieldProps>(
  ({ label, error, as = 'input', rows, className, ...props }, ref) => {
    const Component = as === 'textarea' ? 'textarea' : 'input'

    return (
      <label className="space-y-2 text-sm font-medium">
        {label}
        <Component
          ref={ref as React.Ref<HTMLInputElement | HTMLTextAreaElement>}
          rows={rows}
          className={cn(
            "w-full rounded-xl border border-border bg-transparent px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-ring disabled:opacity-50 transition-colors",
            error && "border-red-500 focus:ring-red-500",
            className
          )}
          {...props}
        />
        {error && (
          <span className="block text-xs text-red-500">{error.join(", ")}</span>
        )}
      </label>
    )
  }
)

Field.displayName = 'Field'