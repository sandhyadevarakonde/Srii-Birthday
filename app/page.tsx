'use client'

import { useState, useRef } from 'react'
import { useScroll, useTransform } from 'framer-motion'
import HeroSection from '@/components/HeroSection'
import StoryTimeline from '@/components/StoryTimeline'
import MemoriesSection from '@/components/MemoriesSection'
import ReasonsSection from '@/components/ReasonsSection'
import SpecialMoments from '@/components/SpecialMoments'
import LoveMessages from '@/components/LoveMessages'
import FutureDreams from '@/components/FutureDreams'
import VideoReels from '@/components/VideoReels'
import HeartfeltMessage from '@/components/HeartfeltMessage'
import Confetti from '@/components/Confetti'
import FloatingHearts from '@/components/FloatingHearts'
import ThemeToggle from '@/components/ThemeToggle'

export default function Home() {
  const [confetti, setConfetti] = useState(false)
  const containerRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({ container: containerRef })
  useTransform(scrollYProgress, [0, 0.5, 1], [1, 0.5, 0])

  const triggerConfetti = () => {
    setConfetti(true)
    setTimeout(() => setConfetti(false), 3000)
  }

  return (
    <div ref={containerRef} className="min-h-screen overflow-y-auto overflow-x-hidden relative">
      <ThemeToggle />
      <Confetti show={confetti} />

      <HeroSection onConfettiClick={triggerConfetti} />
      {/* <StoryTimeline /> */}
      <MemoriesSection />
      <VideoReels /> {/* Added this component */}
      <ReasonsSection />
      {/* <SpecialMoments /> */}
      <LoveMessages />
      <FutureDreams />

      <HeartfeltMessage />
      <FloatingHearts />
    </div>
  )
}
