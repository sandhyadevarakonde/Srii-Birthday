'use client'

import { motion } from 'framer-motion'

interface Reason {
  id: number
  title: string
  emoji: string
  reason: string
  color: string
  video?: string
  image?: string
}

interface ReasonCardProps {
  reason: Reason
  index: number
  isFlipped: boolean
  onFlip: () => void
}

export default function ReasonCard({ reason, index, isFlipped, onFlip }: ReasonCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8, rotate: -10 }}
      whileInView={{ opacity: 1, scale: 1, rotate: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.1, duration: 0.6 }}
      className="h-56 sm:h-60 md:h-64"
      style={{ perspective: '1000px' }}
      onClick={onFlip}
    >
      <div
        className="relative w-full h-full transition-transform duration-700 cursor-pointer"
        style={{
          transformStyle: 'preserve-3d',
          transform: isFlipped ? 'rotateY(180deg)' : 'rotateY(0deg)',
        }}
      >
        {/* Front */}
        <div
          className={`absolute inset-0 rounded-xl md:rounded-2xl ${!reason.video ? `bg-gradient-to-br ${reason.color}` : ''} shadow-2xl flex flex-col items-center justify-center p-4 md:p-6 overflow-hidden`}
          style={{
            backfaceVisibility: 'hidden',
            transform: 'rotateY(0deg)',
            WebkitBackfaceVisibility: 'hidden',
          }}
        >
          {reason.video && (
            <>
              <video
                autoPlay
                loop
                muted
                playsInline
                className="absolute inset-0 w-full h-full object-cover"
              >
                <source src={reason.video} type="video/mp4" />
              </video>
              <div className="absolute inset-0 bg-black/40" />
            </>
          )}
          <div className="relative z-10 flex flex-col items-center justify-center">
            <div className="text-4xl md:text-6xl mb-2 md:mb-4 animate-bounce">{reason.emoji}</div>
            <h3 className="text-lg md:text-xl font-bold text-white text-center mb-3">{reason.title}</h3>
            {/* Short reason preview or just the title/emoji as requested (implied by prize logic) */}
            {!reason.video && (
              <p className="text-white text-xs md:text-sm text-center font-medium leading-relaxed px-2">
                {reason.reason}
              </p>
            )}
          </div>
        </div>

        {/* Back */}
        <div
          className={`absolute inset-0 rounded-xl md:rounded-2xl ${!reason.image ? `bg-gradient-to-br ${reason.color}` : ''} shadow-2xl flex flex-col items-center justify-center p-4 md:p-6 rotate-y-180 overflow-hidden`}
          style={{
            backfaceVisibility: 'hidden',
            transform: 'rotateY(180deg)',
            WebkitBackfaceVisibility: 'hidden',
          }}
        >
          {reason.image && (
            <>
              <img
                src={reason.image}
                alt={reason.title}
                className="absolute inset-0 w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-black/10" /> {/* Darker overlay for text readability */}
            </>
          )}
          <div className="relative z-10">
            <p className="text-white text-xs sm:text-sm md:text-base text-center font-thin leading-relaxed px-2">
              {reason.reason}
            </p>
          </div>
        </div>
      </div>
    </motion.div>
  )
}
