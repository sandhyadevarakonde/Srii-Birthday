import { useState, useEffect } from 'react'
import { WEDDING_DATE } from '@/app/constants'

interface TimeUntil {
  days: number
  hours: number
  minutes: number
  seconds: number
}

export function useCountdown() {
  const [timeUntil, setTimeUntil] = useState<TimeUntil>({ days: 0, hours: 0, minutes: 0, seconds: 0 })

  useEffect(() => {
    const calculateTime = () => {
      const now = new Date()
      const target = new Date(WEDDING_DATE)
      const diff = target.getTime() - now.getTime()
      
      if (diff > 0) {
        setTimeUntil({
          days: Math.floor(diff / (1000 * 60 * 60 * 24)),
          hours: Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
          minutes: Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60)),
          seconds: Math.floor((diff % (1000 * 60)) / 1000),
        })
      }
    }
    
    calculateTime()
    const interval = setInterval(calculateTime, 1000)
    return () => clearInterval(interval)
  }, [])

  return timeUntil
}
