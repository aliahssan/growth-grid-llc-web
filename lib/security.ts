import { z } from 'zod'

// Input sanitization
export function sanitizeInput(input: string): string {
  return input
    .replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '')
    .replace(/<iframe\b[^<]*(?:(?!<\/iframe>)<[^<]*)*<\/iframe>/gi, '')
    .replace(/javascript:/gi, '')
    .replace(/on\w+\s*=/gi, '')
    .trim()
}

// SQL injection prevention (additional layer beyond Prisma)
export function isSafeSQL(input: string): boolean {
  const dangerous = [
    /(\bUNION\b|\bSELECT\b|\bINSERT\b|\bUPDATE\b|\bDELETE\b|\bDROP\b|\bCREATE\b|\bALTER\b)/i,
    /(-{2}|\/\*|\*\/)/,
    /('|(\\x27)|(\\x2D))/,
  ]
  return !dangerous.some(pattern => pattern.test(input))
}

// XSS prevention schema
export const secureStringSchema = z.string().transform((val) => sanitizeInput(val))

// Rate limiting helpers
export class SecurityLimiter {
  private attempts = new Map<string, { count: number; resetTime: number }>()

  constructor(private maxAttempts: number = 5, private windowMs: number = 15 * 60 * 1000) {}

  isBlocked(identifier: string): boolean {
    const now = Date.now()
    const record = this.attempts.get(identifier)

    if (!record || now > record.resetTime) {
      return false
    }

    return record.count >= this.maxAttempts
  }

  recordAttempt(identifier: string): void {
    const now = Date.now()
    const record = this.attempts.get(identifier)

    if (!record || now > record.resetTime) {
      this.attempts.set(identifier, {
        count: 1,
        resetTime: now + this.windowMs,
      })
    } else {
      record.count++
    }

    // Clean up old records
    for (const [key, value] of this.attempts.entries()) {
      if (now > value.resetTime) {
        this.attempts.delete(key)
      }
    }
  }

  getRemainingTime(identifier: string): number {
    const record = this.attempts.get(identifier)
    if (!record) return 0

    const remaining = record.resetTime - Date.now()
    return Math.max(0, remaining)
  }
}

// Password strength validation
export function validatePasswordStrength(password: string): {
  isValid: boolean
  errors: string[]
} {
  const errors: string[] = []

  if (password.length < 8) {
    errors.push('Password must be at least 8 characters long')
  }

  if (!/[A-Z]/.test(password)) {
    errors.push('Password must contain at least one uppercase letter')
  }

  if (!/[a-z]/.test(password)) {
    errors.push('Password must contain at least one lowercase letter')
  }

  if (!/\d/.test(password)) {
    errors.push('Password must contain at least one number')
  }

  if (!/[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(password)) {
    errors.push('Password must contain at least one special character')
  }

  return {
    isValid: errors.length === 0,
    errors,
  }
}

// CSRF token generation (for forms that need it)
export function generateCSRFToken(): string {
  return crypto.randomUUID()
}

// Content type validation
export function validateContentType(contentType: string | null, allowedTypes: string[]): boolean {
  if (!contentType) return false
  return allowedTypes.some(type => contentType.includes(type))
}
