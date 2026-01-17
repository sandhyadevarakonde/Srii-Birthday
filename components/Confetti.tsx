'use client'

import { motion } from 'framer-motion'

interface ConfettiProps {
  show: boolean
}

export default function Confetti({ show }: ConfettiProps) {
  if (!show) return null

  return (
    <div className="fixed inset-0 pointer-events-none z-50">
      {[...Array(50)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-3 h-3 rounded-full"
          style={{
            left: `${Math.random() * 100}%`,
            top: '-10px',
            backgroundColor: ['#f43f5e', '#ec4899', '#a855f7', '#fbbf24', '#10b981'][Math.floor(Math.random() * 5)],
          }}
          animate={{
            y: typeof window !== 'undefined' ? window.innerHeight + 100 : 1000,
            x: (Math.random() - 0.5) * 200,
            rotate: 360,
          }}
          transition={{
            duration: Math.random() * 2 + 1,
            ease: 'easeOut',
          }}
        />
      ))}
    </div>
  )
}
