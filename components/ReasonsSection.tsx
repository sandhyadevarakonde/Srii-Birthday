'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { reasons } from '@/app/constants'
import ReasonCard from './ReasonCard'

export default function ReasonsSection() {
  const [flippedCards, setFlippedCards] = useState<Set<number>>(new Set())

  const toggleFlip = (id: number) => {
    setFlippedCards((prev) => {
      const newSet = new Set(prev)
      if (newSet.has(id)) {
        newSet.delete(id)
      } else {
        newSet.add(id)
      }
      return newSet
    })
  }

  return (
    <section className="min-h-screen py-12 md:py-20 relative bg-gradient-to-b from-rose-50 via-pink-50 to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        className="text-center mb-8 md:mb-16 px-4"
      >
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-2 md:mb-4 text-gradient">Why I Love You 💕</h2>
        <p className="text-sm md:text-base text-gray-500 dark:text-gray-400 mt-2 md:mt-4">Click on each card to reveal why you're so special</p>
      </motion.div>

      <div className="max-w-6xl mx-auto px-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
          {reasons.map((reason, index) => (
            <ReasonCard
              key={reason.id}
              reason={reason}
              index={index}
              isFlipped={flippedCards.has(reason.id)}
              onFlip={() => toggleFlip(reason.id)}
            />
          ))}
        </div>
      </div>

    
    </section>
  )
}
