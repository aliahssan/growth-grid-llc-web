import Image from 'next/image'
import { cn } from '@/lib/utils'

interface OptimizedImageProps {
  src: string
  alt: string
  width?: number
  height?: number
  className?: string
  priority?: boolean
  placeholder?: 'blur' | 'empty'
  blurDataURL?: string
  sizes?: string
  fill?: boolean
  quality?: number
}

export function OptimizedImage({
  src,
  alt,
  width = 400,
  height = 300,
  className,
  priority = false,
  placeholder = 'empty',
  blurDataURL,
  sizes,
  fill = false,
  quality = 75,
}: OptimizedImageProps) {
  return (
    <Image
      src={src}
      alt={alt}
      width={fill ? undefined : width}
      height={fill ? undefined : height}
      fill={fill}
      className={cn('transition-opacity duration-300', className)}
      priority={priority}
      placeholder={placeholder}
      blurDataURL={blurDataURL}
      sizes={sizes}
      quality={quality}
      loading={priority ? 'eager' : 'lazy'}
    />
  )
}
