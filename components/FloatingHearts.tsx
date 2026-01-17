'use client'

import { motion } from 'framer-motion'

export default function FloatingHearts() {
  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
      {[...Array(15)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute text-3xl"
          style={{
            left: `${Math.random() * 100}%`,
            top: '100%',
          }}
          animate={{
            y: typeof window !== 'undefined' ? -window.innerHeight - 100 : -1000,
            x: (Math.random() - 0.5) * 200,
            rotate: 360,
          }}
          transition={{
            duration: Math.random() * 10 + 10,
            repeat: Infinity,
            ease: 'linear',
            delay: Math.random() * 5,
          }}
        >
          ❤️
        </motion.div>
      ))}
    </div>
  )
}
