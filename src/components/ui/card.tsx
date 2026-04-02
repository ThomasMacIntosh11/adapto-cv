import React from 'react'
import { cn } from '@/lib/utils'

interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode
}

interface CardHeaderProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode
}

interface CardTitleProps extends React.HTMLAttributes<HTMLHeadingElement> {
  children: React.ReactNode
}

interface CardDescriptionProps extends React.HTMLAttributes<HTMLParagraphElement> {
  children: React.ReactNode
}

interface CardContentProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode
}

interface CardFooterProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode
}

const Card = ({ className, children, ...props }: CardProps) => (
  <div
    className={cn(
      'rounded-lg border bg-card text-card-foreground shadow-sm',
      className
    )}
    {...props}
  >
    {children}
  </div>
)

const CardHeader = ({ className, children, ...props }: CardHeaderProps) => (
  <div className={cn('flex flex-col space-y-1.5 p-6', className)} {...props}>
    {children}
  </div>
)

const CardTitle = ({ className, children, ...props }: CardTitleProps) => (
  <h3
    className={cn(
      'text-2xl font-semibold leading-none tracking-tight',
      className
    )}
    {...props}
  >
    {children}
  </h3>
)

const CardDescription = ({ className, children, ...props }: CardDescriptionProps) => (
  <p className={cn('text-sm text-muted-foreground', className)} {...props}>
    {children}
  </p>
)

const CardContent = ({ className, children, ...props }: CardContentProps) => (
  <div className={cn('p-6 pt-0', className)} {...props}>
    {children}
  </div>
)

const CardFooter = ({ className, children, ...props }: CardFooterProps) => (
  <div className={cn('flex items-center p-6 pt-0', className)} {...props}>
    {children}
  </div>
)

export { Card, CardHeader, CardFooter, CardTitle, CardDescription, CardContent }