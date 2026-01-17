'use client'

import { motion } from 'framer-motion'

interface TimelineItem {
  id: number
  bgImage?: string
  title: string
  description: string
}

interface ImageModalProps {
  selectedImage: number | null
  timeline: TimelineItem[]
  onClose: () => void
}

export default function ImageModal({ selectedImage, timeline, onClose }: ImageModalProps) {
  if (!selectedImage) return null

  const memory = timeline.find((m) => m.id === selectedImage)

  if (!memory || !memory.bgImage) return null

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center p-4"
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.8 }}
        animate={{ scale: 1 }}
        exit={{ scale: 0.8 }}
        className="max-w-4xl w-full"
        onClick={(e) => e.stopPropagation()}
      >
        <img
          src={memory.bgImage}
          alt={memory.title}
          className="w-full h-auto rounded-lg shadow-2xl"
        />
        <div className="mt-4 text-center text-white px-4">
          <h3 className="text-xl md:text-2xl font-bold mb-2">{memory.title}</h3>
          <p className="text-sm md:text-base lg:text-lg opacity-90">{memory.description}</p>
        </div>
      </motion.div>
    </motion.div>
  )
}
