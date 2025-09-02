"use client"

import { useState, useEffect } from "react"

interface TimeLeft {
  days: number
  hours: number
  minutes: number
  seconds: number
}

interface DebtTimerProps {
  startDate: string
  isCompact?: boolean
}

export const DebtTimer = ({ startDate, isCompact = false }: DebtTimerProps) => {
  const [timeLeft, setTimeLeft] = useState<TimeLeft>({ days: 0, hours: 0, minutes: 0, seconds: 0 })

  useEffect(() => {
    const calculateTimeLeft = () => {
      const start = new Date(startDate)
      const now = new Date()
      const difference = now.getTime() - start.getTime()

      if (difference > 0) {
        const days = Math.floor(difference / (1000 * 60 * 60 * 24))
        const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))
        const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60))
        const seconds = Math.floor((difference % (1000 * 60)) / 1000)

        setTimeLeft({ days, hours, minutes, seconds })
      }
    }

    calculateTimeLeft()
    const timer = setInterval(calculateTimeLeft, 1000)

    return () => clearInterval(timer)
  }, [startDate])

  if (isCompact) {
    return (
      <div className="flex items-center gap-2 gradient-primary px-4 py-2 rounded-xl shadow-glow">
        <span className="text-sm font-bold text-primary-foreground">
          {timeLeft.days}d {timeLeft.hours}h {timeLeft.minutes}m {timeLeft.seconds}s
        </span>
      </div>
    )
  }

  return (
    <div className="grid grid-cols-4 gap-4 md:gap-6">
      <div className="gradient-primary p-6 md:p-8 rounded-2xl shadow-glow text-center transform hover:scale-105 transition-all duration-300">
        <div className="text-4xl md:text-6xl font-bold text-primary-foreground mb-2">{timeLeft.days}</div>
        <div className="text-sm md:text-base font-semibold text-primary-foreground/90 uppercase tracking-wider">
          Dias
        </div>
      </div>

      <div className="gradient-primary p-6 md:p-8 rounded-2xl shadow-glow text-center transform hover:scale-105 transition-all duration-300">
        <div className="text-4xl md:text-6xl font-bold text-primary-foreground mb-2">{timeLeft.hours}</div>
        <div className="text-sm md:text-base font-semibold text-primary-foreground/90 uppercase tracking-wider">
          Horas
        </div>
      </div>

      <div className="gradient-primary p-6 md:p-8 rounded-2xl shadow-glow text-center transform hover:scale-105 transition-all duration-300">
        <div className="text-4xl md:text-6xl font-bold text-primary-foreground mb-2">{timeLeft.minutes}</div>
        <div className="text-sm md:text-base font-semibold text-primary-foreground/90 uppercase tracking-wider">
          Minutos
        </div>
      </div>

      <div className="gradient-primary p-6 md:p-8 rounded-2xl shadow-glow text-center transform hover:scale-105 transition-all duration-300 animate-pulse">
        <div className="text-4xl md:text-6xl font-bold text-primary-foreground mb-2">{timeLeft.seconds}</div>
        <div className="text-sm md:text-base font-semibold text-primary-foreground/90 uppercase tracking-wider">
          Segundos
        </div>
      </div>
    </div>
  )
}
