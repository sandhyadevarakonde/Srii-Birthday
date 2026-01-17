'use client'

import { motion, useScroll, useSpring } from 'framer-motion'
import { timeline } from '@/app/constants'
import { useRef, useState, useEffect } from 'react'

export default function StoryTimeline() {
  const scrollRef = useRef<HTMLDivElement>(null)
  const [activeIndex, setActiveIndex] = useState(0)

  const handleScroll = () => {
    if (scrollRef.current) {
      const container = scrollRef.current
      const scrollPosition = container.scrollLeft
      const containerWidth = container.offsetWidth
      const scrollWidth = container.scrollWidth

      console.log('Scroll:', { scrollPosition, containerWidth, scrollWidth })

      // Explicit check for start and end
      if (scrollPosition <= 20) {
        console.log('At start')
        setActiveIndex(0)
        return
      }
      if (scrollPosition + containerWidth >= scrollWidth - 20) {
        console.log('At end')
        setActiveIndex(timeline.length - 1)
        return
      }

      const children = container.children
      let closestIndex = 0
      let minDistance = Number.MAX_VALUE

      // Find the card closest to the center of the container
      Array.from(children).forEach((child, index) => {
        const childRect = (child as HTMLElement).getBoundingClientRect()
        const containerRect = container.getBoundingClientRect()

        // Calculate centers relative to viewport
        const childCenter = childRect.left + childRect.width / 2
        const containerCenter = containerRect.left + containerRect.width / 2

        const distance = Math.abs(childCenter - containerCenter)

        if (distance < minDistance) {
          minDistance = distance
          closestIndex = index
        }
      })

      console.log('Closest index:', closestIndex)
      setActiveIndex(closestIndex)
    }
  }

  return (
    <section className="min-h-screen py-12 md:py-20 relative bg-gradient-to-b from-indigo-50 via-purple-50 to-pink-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 flex flex-col justify-center">
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        className="text-center mb-8 md:mb-12 px-4"
      >
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-2 md:mb-4 text-gradient">Our Love Story 📖</h2>
        <p className="text-base sm:text-lg md:text-xl text-gray-600 dark:text-gray-300">From College Friends to Forever</p>
      </motion.div>

      <div className="relative w-full max-w-7xl mx-auto px-4">
        <div
          ref={scrollRef}
          onScroll={handleScroll}
          className="flex overflow-x-auto snap-x snap-mandatory hide-scrollbar gap-4 md:gap-8 py-8 px-4 md:px-8"
          style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
        >
          {timeline.map((item, index) => {
            const bgImage = (item as any).bgImage
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="min-w-full md:min-w-[400px] flex-shrink-0 snap-center flex justify-center"
              >
                <motion.div
                  whileHover={{ scale: 1.02 }}
                  className={`relative w-full max-w-md min-h-[500px] flex flex-col justify-center rounded-2xl md:rounded-3xl ${bgImage ? 'bg-zinc-900' : `bg-gradient-to-br ${item.color}`} text-white shadow-2xl overflow-hidden`}
                >
                  <div className="absolute top-0 right-0 w-20 h-20 md:w-32 md:h-32 bg-white/20 rounded-full -mr-10 -mt-10 md:-mr-16 md:-mt-16"></div>

                  {/* Background Image - Full Card Coverage */}
                  {(item as any).bgImage && (
                    <div className="absolute inset-0 z-0">
                      <img
                        src={(item as any).bgImage}
                        alt={item.title}
                        className="w-full h-full object-cover opacity-60"
                      />
                      <div className="absolute inset-0 bg-black/40" />
                    </div>
                  )}

                  <div className="relative z-10 p-6 md:p-10">
                    <div className="flex items-center gap-4 mb-4">
                      <span className="text-4xl md:text-6xl">{item.emoji}</span>
                      <div>
                        <div className="text-xs md:text-sm font-semibold opacity-90 mb-1">{item.year}</div>
                        <h3 className="text-2xl md:text-3xl font-bold">{item.title}</h3>
                      </div>
                    </div>
                    <p className="text-base md:text-xl leading-relaxed opacity-95">{item.description}</p>
                  </div>
                </motion.div>
              </motion.div>
            )
          })}
        </div>

        {/* Pagination Dots */}
        <div className="flex justify-center gap-3 mt-8">
          {timeline.map((_, index) => (
            <button
              key={index}
              onClick={() => {
                if (scrollRef.current) {
                  const container = scrollRef.current
                  const child = container.children[index] as HTMLElement
                  if (child) {
                    // Center the selected item
                    const scrollLeft = child.offsetLeft - (container.offsetWidth - child.offsetWidth) / 2
                    container.scrollTo({ left: scrollLeft, behavior: 'smooth' })
                  }
                }
              }}
              className={`w-3 h-3 rounded-full transition-all duration-300 ${index === activeIndex
                ? 'bg-rose-500 w-8'
                : 'bg-gray-300 dark:bg-gray-600 hover:bg-rose-300'
                }`}
            />
          ))}
        </div>
      </div>
    </section>
  )
}
