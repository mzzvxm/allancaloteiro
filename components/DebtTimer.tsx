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
      <div className="flex items-center gap-2 bg-primary text-primary-foreground px-4 py-2 rounded-lg shadow-soft">
        <span className="text-sm font-bold">
          {timeLeft.days}d {timeLeft.hours}h {timeLeft.minutes}m {timeLeft.seconds}s
        </span>
      </div>
    )
  }

  return (
    <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4 md:gap-6 max-w-4xl mx-auto">
      <div className="bg-primary text-primary-foreground p-4 sm:p-6 md:p-8 rounded-lg shadow-soft text-center transform hover:scale-105 transition-all duration-300">
        <div className="text-2xl sm:text-3xl md:text-5xl font-bold mb-1 sm:mb-2">{timeLeft.days}</div>
        <div className="text-xs sm:text-sm md:text-base font-semibold uppercase tracking-wider opacity-90">Dias</div>
      </div>

      <div className="bg-primary text-primary-foreground p-4 sm:p-6 md:p-8 rounded-lg shadow-soft text-center transform hover:scale-105 transition-all duration-300">
        <div className="text-2xl sm:text-3xl md:text-5xl font-bold mb-1 sm:mb-2">{timeLeft.hours}</div>
        <div className="text-xs sm:text-sm md:text-base font-semibold uppercase tracking-wider opacity-90">Horas</div>
      </div>

      <div className="bg-primary text-primary-foreground p-4 sm:p-6 md:p-8 rounded-lg shadow-soft text-center transform hover:scale-105 transition-all duration-300">
        <div className="text-2xl sm:text-3xl md:text-5xl font-bold mb-1 sm:mb-2">{timeLeft.minutes}</div>
        <div className="text-xs sm:text-sm md:text-base font-semibold uppercase tracking-wider opacity-90">Minutos</div>
      </div>

      <div className="bg-primary text-primary-foreground p-4 sm:p-6 md:p-8 rounded-lg shadow-soft text-center">
        <div className="text-2xl sm:text-3xl md:text-5xl font-bold mb-1 sm:mb-2">{timeLeft.seconds}</div>
        <div className="text-xs sm:text-sm md:text-base font-semibold uppercase tracking-wider opacity-90">
          Segundos
        </div>
      </div>
    </div>
  )
}
