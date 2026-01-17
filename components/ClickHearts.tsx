'use client'

import { motion } from 'framer-motion'

interface Heart {
  id: number
  x: number
  y: number
}

interface ClickHeartsProps {
  hearts: Heart[]
}

export default function ClickHearts({ hearts }: ClickHeartsProps) {
  return (
    <div className="absolute inset-0 pointer-events-none">
      {hearts.map((heart) => (
        <motion.div
          key={heart.id}
          className="absolute text-4xl"
          style={{
            left: `${heart.x}%`,
            top: `${heart.y}%`,
          }}
          initial={{ scale: 0, opacity: 1 }}
          animate={{ scale: 1.5, y: -100, opacity: 0 }}
          transition={{ duration: 2, ease: 'easeOut' }}
        >
          ❤️
        </motion.div>
      ))}
    </div>
  )
}
