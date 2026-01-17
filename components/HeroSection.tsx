'use client'

import Image from 'next/image'
import { useRef, useEffect, useState } from 'react'
import { motion, useInView } from 'framer-motion'
import ClickHearts from './ClickHearts'

interface HeroSectionProps {
  onConfettiClick: () => void
}

export default function HeroSection({ onConfettiClick }: HeroSectionProps) {
  const containerRef = useRef<HTMLElement>(null)
  const audioRef = useRef<HTMLAudioElement>(null)
  const isInView = useInView(containerRef, { amount: 0.5 })
  const [hearts, setHearts] = useState<Array<{ id: number; x: number; y: number }>>([])

  useEffect(() => {
    let confettiInterval: NodeJS.Timeout

    if (isInView) {
      // Trigger confetti immediately
      onConfettiClick()

      // Setup interval for continuous confetti
      confettiInterval = setInterval(() => {
        onConfettiClick()
      }, 2000)

      // Play audio
      if (audioRef.current) {
        // Only reset if it was paused to avoid restarting on every tiny scroll
        if (audioRef.current.paused) {
          audioRef.current.currentTime = 0
          audioRef.current.play().catch((error) => {
            console.log('Audio playback blocked or failed:', error)
            const playOnInteraction = () => {
              if (audioRef.current && audioRef.current.paused) {
                audioRef.current.currentTime = 0
                audioRef.current.play()
              }
              document.removeEventListener('click', playOnInteraction)
            }
            document.addEventListener('click', playOnInteraction)
          })
        }
      }
    } else {
      if (audioRef.current) {
        audioRef.current.pause()
      }
    }

    return () => {
      if (confettiInterval) clearInterval(confettiInterval)
    }
  }, [isInView, onConfettiClick])

  const createHeart = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect()
    const x = e.clientX - rect.left
    const y = e.clientY - rect.top
    const newHeart = {
      id: Date.now(),
      x: (x / rect.width) * 100,
      y: (y / rect.height) * 100,
    }
    setHearts((prev) => [...prev, newHeart])
    setTimeout(() => {
      setHearts((prev) => prev.filter((h) => h.id !== newHeart.id))
    }, 2000)
  }

  return (
    <section
      ref={containerRef}
      className="min-h-screen flex items-center justify-center relative overflow-hidden"
      onClick={createHeart}
    >
      {/* Background Video with Responsive Padding */}
      <div className="absolute inset-0 z-0 py-6 px-4 sm:px-10 md:px-12 lg:px-20 xl:px-24 flex items-center justify-center">
        <div className="relative w-full h-full overflow-hidden rounded-2xl md:rounded-3xl shadow-2xl">
          <video
            autoPlay
            loop
            muted
            playsInline
            className="w-full h-full object-cover"
          >
            <source src="/assets/Video16.mp4" type="video/mp4" />
          </video>
          {/* Dark Overlay for Readability */}
          <div className="absolute inset-0 bg-black/30 dark:bg-black/20" />
        </div>
      </div>

      <div className="relative z-10 text-center max-w-5xl mx-auto px-4 py-8 md:py-0">
        <motion.div
          initial={{ scale: 0, rotate: -180 }}
          animate={{ scale: 1, rotate: 0 }}
          transition={{ type: 'spring', stiffness: 200, delay: 0.2 }}
          className="mb-8 md:mb-10 flex flex-col items-center gap-6"
        >
          <div className="relative w-48 h-48 md:w-64 md:h-64 rounded-full overflow-hidden border-4 border-white/50 shadow-2xl mx-auto ring-4 ring-rose-200 dark:ring-rose-900">
            <Image
              src="/assets/Srii.jpeg"
              alt="Srii"
              fill
              className="object-cover"
              priority
            />
          </div>
          <h2 className="text-5xl md:text-7xl font-dancing font-bold text-white drop-shadow-2xl py-2">
            Happy Birthday Srii! ❤️
          </h2>
          <p className="text-lg md:text-xl text-white/90 max-w-2xl mx-auto leading-relaxed font-serif italic drop-shadow-lg">
            I love you so much! ❤️ Your birthday is such a special day for me, and I want to celebrate you every single year 🎉✨
            I am so blessed to have you in my life🥹 Without your help and support, I wouldn't be where I am today
          </p>
        </motion.div>
      </div>

      {/* Hidden Audio Element */}
      <audio ref={audioRef} src="/assets/happyBirthdayAudio.mp3" loop />

      <ClickHearts hearts={hearts} />
    </section>
  )
}
