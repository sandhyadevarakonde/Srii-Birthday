'use client'

import { useState, useRef } from 'react'
import { motion } from 'framer-motion'
import { timeline } from '@/app/constants'
import MemoryCard from './MemoryCard'

export default function MemoriesSection() {
  const scrollRef = useRef<HTMLDivElement>(null)
  const [activeIndex, setActiveIndex] = useState(0)

  const handleScroll = () => {
    if (scrollRef.current) {
      const container = scrollRef.current
      const scrollPosition = container.scrollLeft
      const containerWidth = container.offsetWidth
      const scrollWidth = container.scrollWidth

      // Explicit check for start and end
      if (scrollPosition <= 20) {
        setActiveIndex(0)
        return
      }
      if (scrollPosition + containerWidth >= scrollWidth - 20) {
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

      setActiveIndex(closestIndex)
    }
  }

  return (
    <section className="min-h-screen py-12 md:py-20 relative bg-gradient-to-b from-purple-100 via-pink-100 to-rose-100 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        className="text-center mb-8 md:mb-16 px-4"
      >
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-2 md:mb-4 text-gradient">Our Journey Together 📸</h2>
        <p className="text-base sm:text-lg md:text-xl text-gray-600 dark:text-gray-300">From college friends to future husband and wife</p>
      </motion.div>

      {/* Horizontal Scroll Gallery */}
      <div className="mb-8 md:mb-16">

        <div className="relative w-full max-w-7xl mx-auto px-4">
          <div
            ref={scrollRef}
            onScroll={handleScroll}
            className="flex overflow-x-auto snap-x snap-mandatory hide-scrollbar gap-4 md:gap-6 pb-4 md:pb-8 px-2 md:px-4 scroll-smooth"
            style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
          >
            {timeline.map((item, index) => (
              <MemoryCard
                key={item.id}
                timeline={item}
                index={index}
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
              />
            ))}
          </div>

          {/* Pagination Dots */}
          <div className="flex justify-center gap-3 mt-4">
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
                className={`w-2 h-2 md:w-3 md:h-3 rounded-full transition-all duration-300 ${index === activeIndex
                  ? 'bg-rose-500 w-6 md:w-8'
                  : 'bg-gray-300 dark:bg-gray-600 hover:bg-rose-300'
                  }`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
