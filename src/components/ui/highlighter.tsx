import * as React from "react"
import { cn } from "./utils"

export interface HighlighterProps
  extends React.HTMLAttributes<HTMLSpanElement> {
  action?: "highlight" | "underline"
  color?: string
  children: React.ReactNode
}

export function Highlighter({
  action = "highlight",
  color = "#2A73CC",
  children,
  className,
  ...props
}: HighlighterProps) {
  const highlightStyle: React.CSSProperties = {
    backgroundColor: action === "highlight" ? color : "transparent",
    borderBottom: action === "underline" ? `2px solid ${color}` : "none",
    padding: action === "highlight" ? "2px 4px" : "0px 4px",
    borderRadius: action === "highlight" ? "3px" : "0",
  }

  return (
    <span
      className={cn("inline-block", className)}
      style={highlightStyle}
      {...props}
    >
      {children}
    </span>
  )
}


