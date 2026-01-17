'use client'

import { motion } from 'framer-motion'
import { useCountdown } from '@/hooks/useCountdown'

export default function CountdownTimer() {
  const timeUntil = useCountdown()

  const countdownItems = [
    { label: 'Days', value: timeUntil.days, emoji: '📅' },
    { label: 'Hours', value: timeUntil.hours, emoji: '⏰' },
    { label: 'Minutes', value: timeUntil.minutes, emoji: '⏱️' },
    { label: 'Seconds', value: timeUntil.seconds, emoji: '💫' },
  ]

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay: 0.8 }}
      className="mb-12"
    >
      <h3 className="text-2xl md:text-3xl font-bold text-gradient mb-8">Countdown to Our Wedding 💒</h3>
      <div className="flex justify-center gap-6 flex-wrap">
        {countdownItems.map((item, index) => (
          <motion.div
            key={item.label}
            initial={{ scale: 0, rotate: -180 }}
            animate={{ scale: 1, rotate: 0 }}
            transition={{ delay: 1 + index * 0.1, type: 'spring', stiffness: 200 }}
            whileHover={{ scale: 1.1, rotate: 5 }}
            className="relative w-32 h-32 rounded-full bg-gradient-to-br from-rose-400 via-pink-500 to-purple-500 flex flex-col items-center justify-center text-white shadow-2xl"
          >
            <div className="text-3xl mb-2">{item.emoji}</div>
            <div className="text-3xl font-bold">{item.value}</div>
            <div className="text-sm opacity-90">{item.label}</div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  )
}
