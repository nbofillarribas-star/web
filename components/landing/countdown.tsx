'use client'

import { useEffect, useState } from 'react'
import { OPENING_DATE_ISO } from './shared'

const target = new Date(OPENING_DATE_ISO).getTime()

function getRemaining() {
  const diff = Math.max(0, target - Date.now())
  return {
    days: Math.floor(diff / 86_400_000),
    hours: Math.floor((diff / 3_600_000) % 24),
    minutes: Math.floor((diff / 60_000) % 60),
    seconds: Math.floor((diff / 1000) % 60),
  }
}

export function Countdown({ tone = 'light' }: { tone?: 'light' | 'dark' }) {
  const [remaining, setRemaining] = useState<ReturnType<typeof getRemaining> | null>(null)
  const isDark = tone === 'dark'

  useEffect(() => {
    setRemaining(getRemaining())
    const id = setInterval(() => setRemaining(getRemaining()), 1000)
    return () => clearInterval(id)
  }, [])

  const units = [
    { label: 'Días', value: remaining?.days },
    { label: 'Horas', value: remaining?.hours },
    { label: 'Min', value: remaining?.minutes },
    { label: 'Seg', value: remaining?.seconds },
  ]

  return (
    <div
      role="timer"
      aria-label="Cuenta atrás para la gran apertura"
      className={
        isDark
          ? 'grid grid-cols-4 divide-x divide-foreground/15 border border-foreground/15 bg-background/70 text-foreground backdrop-blur-sm'
          : 'grid grid-cols-4 divide-x divide-white/20 border border-white/20'
      }
    >
      {units.map((u) => (
        <div key={u.label} className="flex flex-col items-center py-4">
          <span className="font-serif text-4xl tabular-nums leading-none md:text-5xl">
            {u.value === undefined ? '--' : String(u.value).padStart(2, '0')}
          </span>
          <span
            className={`mt-2 text-[10px] uppercase tracking-[0.22em] ${isDark ? 'text-muted-foreground' : 'text-white/70'}`}
          >
            {u.label}
          </span>
        </div>
      ))}
    </div>
  )
}
