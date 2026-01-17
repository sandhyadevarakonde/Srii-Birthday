'use client'

import { motion } from 'framer-motion'

interface TimelineItem {
  id: number
  bgImage?: string
  title: string
  year: string
  description: string
  color: string
  emoji?: string
}

interface MemoryCardProps {
  timeline: TimelineItem
  index: number
  onClick?: () => void
}

export default function MemoryCard({ timeline, index, onClick }: MemoryCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8, rotateY: -15 }}
      whileInView={{ opacity: 1, scale: 1, rotateY: 0 }}
      viewport={{ once: true, margin: '-100px' }}
      transition={{ delay: index * 0.1, duration: 0.6 }}
      whileHover={{ scale: 1.08, rotateY: 5, z: 50 }}
      className="flex-shrink-0 w-64 sm:w-72 md:w-80 lg:w-96 group select-none cursor-pointer"
      onClick={onClick}
      style={{ perspective: '1000px' }}
    >
      <div className={`relative h-[350px] sm:h-[400px] md:h-[450px] lg:h-[500px] rounded-2xl md:rounded-3xl overflow-hidden shadow-2xl bg-gradient-to-br ${timeline.color} p-1`}>
        <div className={`absolute inset-0 rounded-2xl md:rounded-3xl bg-gradient-to-r ${timeline.color} opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-sm`}></div>
        <div className="relative h-full w-full rounded-2xl md:rounded-3xl overflow-hidden bg-white dark:bg-gray-800">
          <div className="relative h-full">
            {timeline.bgImage && (
              <img
                src={timeline.bgImage}
                alt={timeline.title}
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
              />
            )}
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500">
              <div className="absolute bottom-0 left-0 right-0 p-3 md:p-6 text-white transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                <div className="flex items-center gap-2 mb-1 md:mb-2">
                  <span className="text-2xl md:text-3xl">{timeline.emoji || '💕'}</span>
                  <h3 className="text-lg md:text-xl font-bold">{timeline.title}</h3>
                </div>
                <p className="text-xs md:text-sm opacity-90 mb-1 md:mb-2">{timeline.year}</p>
                <p className="text-sm md:text-base leading-relaxed">{timeline.description}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  )
}
