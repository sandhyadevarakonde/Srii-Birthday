'use client'

import { motion } from 'framer-motion'
import { useState } from 'react'

const messages = [
  {
    id: 1,
    message: 'You are my sunshine on the cloudiest days.',
    author: 'Me',
    emoji: '☀️',
    image: '/assets/Srii11.jpeg',
    textColor: '#FFD700',
  },
  {
    id: 2,
    message: 'Every day with you feels like a new adventure.',
    author: 'Me',
    emoji: '🌍',
    image: '/assets/Srii12.jpeg',
    textColor: '#FF69B4',
  },
  {
    id: 3,
    message: 'Your smile is my favorite thing in the world.',
    author: 'Me',
    emoji: '😊',
    image: '/assets/Srii13.jpeg',
    textColor: '#87CEEB',
  },
  {
    id: 4,
    message: 'I fall in love with you more every single day.',
    author: 'Me',
    emoji: '💖',
    image: '/assets/Srii14.jpeg',
    textColor: '#FF1493',
  },
  {
    id: 5,
    message: 'You make ordinary moments feel extraordinary.',
    author: 'Me',
    emoji: '✨',
    image: '/assets/Srii17.jpeg',
    textColor: '#FFB6C1',
  },
  {
    id: 6,
    message: 'Your strength in silence and passion in dreams make me admire you endlessly.',
    author: 'Me',
    emoji: '🔥',
    image: '/assets/Srii21.jpeg',
    textColor: '#E6E6FA',
  },
  {
    id: 7,
    message: 'I don’t just love you I admire the person you are becoming.',
    author: 'Me',
    emoji: '⭐',
    image: '/assets/Srii22.jpeg',
    textColor: '#027618ff',
  },

  {
    id: 8,
    message: 'Being with you feels like home.',
    author: 'Me',
    emoji: '🏠',
    image: '/assets/Srii15.jpeg',
    textColor: '#FFA07A',
  },

]

export default function LoveMessages() {
  const [currentIndex, setCurrentIndex] = useState(0)

  const nextMessage = () => {
    setCurrentIndex((prev) => (prev + 1) % messages.length)
  }

  const prevMessage = () => {
    setCurrentIndex((prev) => (prev - 1 + messages.length) % messages.length)
  }

  return (
    <section className="min-h-screen py-12 md:py-20 relative bg-gradient-to-b from-pink-50 via-rose-50 to-red-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        className="text-center mb-8 md:mb-16 px-4"
      >
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-2 md:mb-4 text-gradient">What You Mean to Me</h2>
        <p className="text-base sm:text-lg md:text-xl text-gray-600 dark:text-gray-300">Little notes from my heart to yours</p>
      </motion.div>

      <div className="max-w-4xl mx-auto px-4">
        <div className="relative">
          {/* Message Cards Stack */}
          <div className="relative h-[400px] md:h-[500px] perspective-1000">
            {messages.map((msg, index) => {
              const offset = index - currentIndex
              const isActive = offset === 0
              const isNext = offset === 1
              const isPrev = offset === -1
              const isHidden = Math.abs(offset) > 1

              if (isHidden) return null

              return (
                <motion.div
                  key={msg.id}
                  initial={false}
                  animate={{
                    scale: isActive ? (msg.id === 6 ? [1, 1.02, 1] : 1) : 0.85,
                    x: isActive ? 0 : offset * 50,
                    y: isActive ? 0 : Math.abs(offset) * 20,
                    z: isActive ? 50 : 0,
                    rotateY: isActive ? 0 : offset * 15,
                    opacity: isActive ? 1 : 0.6,
                  }}
                  transition={{
                    duration: 0.5,
                    ease: 'easeOut',
                    scale: msg.id === 6 && isActive ? { duration: 2, repeat: Infinity, ease: "easeInOut" } : { duration: 0.5 }
                  }}
                  className={`absolute inset-0 cursor-pointer ${isActive ? 'z-10' : 'z-0'}`}
                  onClick={isActive ? nextMessage : undefined}
                >
                  <div className={`glass-effect rounded-3xl p-6 md:p-10 h-full flex flex-col items-center justify-center text-center bg-gradient-to-br from-white/80 to-pink-50/80 dark:from-gray-800/80 dark:to-gray-700/80 backdrop-blur-lg border-2 ${msg.id === 6 ? 'border-rose-400 shadow-[0_0_30px_rgba(251,113,133,0.5)]' : 'border-pink-200/50 dark:border-pink-700/50'} shadow-2xl overflow-hidden relative`}>
                    {(msg as any).image && (
                      <>
                        <img
                          src={(msg as any).image}
                          alt={msg.message}
                          className="absolute inset-0 w-full h-full object-cover"
                        />
                        <div className="absolute inset-0 bg-black/20" />
                      </>
                    )}
                    {msg.id === 6 && (
                      <div className="absolute top-4 left-6 z-20 bg-rose-500 text-white text-[10px] md:text-xs font-bold px-3 py-1 rounded-full uppercase tracking-widest animate-pulse">
                        Special Note ✨
                      </div>
                    )}
                    {/* Emoji at top-right */}
                    <div className="absolute top-4 right-4 text-4xl md:text-5xl z-20 animate-bounce">{msg.emoji}</div>

                    <div className="relative z-10 flex items-center justify-center h-full px-4">
                      <p
                        className="text-xl font-bold leading-relaxed drop-shadow-2xl tracking-wide"
                        style={{
                          fontFamily: "'Playfair Display', 'Georgia', serif",
                          textShadow: '2px 2px 4px rgba(0,0,0,0.5), 0 0 20px rgba(255,255,255,0.3)',
                          letterSpacing: '0.02em',
                          color: (msg as any).textColor || '#FFFFFF'
                        }}
                      >
                        {msg.message}
                      </p>
                    </div>
                  </div>
                </motion.div>
              )
            })}
          </div>

          {/* Navigation Dots */}
          <div className="flex justify-center gap-2 mt-8">
            {messages.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentIndex(index)}
                className={`w-2 h-2 md:w-3 md:h-3 rounded-full transition-all duration-300 ${index === currentIndex
                  ? 'bg-rose-500 dark:bg-rose-400 scale-125'
                  : 'bg-gray-300 dark:bg-gray-600 hover:bg-rose-300 dark:hover:bg-rose-600'
                  }`}
                aria-label={`Go to message ${index + 1}`}
              />
            ))}
          </div>

          {/* Navigation Arrows */}
          <button
            onClick={prevMessage}
            className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 md:-translate-x-12 bg-white/90 dark:bg-gray-800/90 hover:bg-white dark:hover:bg-gray-800 rounded-full p-2 md:p-3 shadow-lg z-20 transition-all hover:scale-110 text-gray-800 dark:text-gray-100"
            aria-label="Previous message"
          >
            <span className="text-2xl md:text-3xl">←</span>
          </button>
          <button
            onClick={nextMessage}
            className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 md:translate-x-12 bg-white/90 dark:bg-gray-800/90 hover:bg-white dark:hover:bg-gray-800 rounded-full p-2 md:p-3 shadow-lg z-20 transition-all hover:scale-110 text-gray-800 dark:text-gray-100"
            aria-label="Next message"
          >
            <span className="text-2xl md:text-3xl">→</span>
          </button>
        </div>
      </div>
    </section>
  )
}
