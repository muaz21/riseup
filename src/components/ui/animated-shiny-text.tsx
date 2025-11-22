import * as React from "react"
import { cn } from "./utils"

export interface AnimatedShinyTextProps
  extends React.HTMLAttributes<HTMLDivElement> {
  text?: string
  children?: React.ReactNode
}

export function AnimatedShinyText({
  text,
  children,
  className,
  ...props
}: AnimatedShinyTextProps) {
  return (
    <span
      className={cn(
        "relative inline-block overflow-hidden",
        className
      )}
      {...props}
    >
      <span className="relative z-10">
        {text || children}
      </span>
      <span 
        className="absolute inset-0 pointer-events-none"
        style={{
          background: 'linear-gradient(90deg, transparent, rgba(255, 255, 255, 1), transparent)',
          backgroundSize: '200% 100%',
          animation: 'shimmer 2s infinite',
        }}
      />
    </span>
  )
}

