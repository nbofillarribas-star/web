import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import { cn } from '@/lib/utils'

export const OPENING_DATE_ISO = '2026-10-15T10:00:00+02:00'
export const OPENING_DATE_LABEL = '15 de octubre de 2026'

export function Eyebrow({ children, className }: { children: React.ReactNode; className?: string }) {
  return (
    <p className={cn('text-[11px] font-medium uppercase tracking-[0.22em] text-muted-foreground', className)}>
      {children}
    </p>
  )
}

type CtaProps = {
  href: string
  children: React.ReactNode
  variant?: 'primary' | 'outline' | 'light' | 'link'
  className?: string
}

export function Cta({ href, children, variant = 'primary', className }: CtaProps) {
  const base =
    'group inline-flex items-center gap-3 text-[11px] font-semibold uppercase tracking-[0.2em] transition-colors duration-300 ease-elegant focus-visible:outline-2 focus-visible:outline-offset-4'
  const variants = {
    primary: 'bg-primary px-6 py-3.5 text-primary-foreground hover:bg-espresso',
    outline: 'border border-foreground/70 px-6 py-3.5 text-foreground hover:bg-foreground hover:text-background',
    light: 'bg-background px-6 py-3.5 text-foreground hover:bg-white',
    link: 'border-b border-current pb-1 text-foreground hover:text-primary',
  }
  return (
    <Link href={href} className={cn(base, variants[variant], className)}>
      {children}
      <ArrowRight
        aria-hidden="true"
        className="size-3.5 transition-transform duration-300 ease-elegant group-hover:translate-x-1"
      />
    </Link>
  )
}
