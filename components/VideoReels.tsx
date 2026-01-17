'use client'

import { useRef, useEffect, useState } from 'react'
import { motion, useInView } from 'framer-motion'
import { reels } from '@/app/constants'

export default function VideoReels() {
    const scrollRef = useRef<HTMLDivElement>(null)
    const videoRefs = useRef<Map<number, HTMLVideoElement>>(new Map())
    const [activeIndex, setActiveIndex] = useState(0)
    const [playingVideos, setPlayingVideos] = useState<Set<number>>(new Set())
    const [likedVideos, setLikedVideos] = useState<Set<number>>(new Set())

    const toggleLike = (id: number) => {
        setLikedVideos(prev => {
            const newSet = new Set(prev)
            if (newSet.has(id)) {
                newSet.delete(id)
            } else {
                newSet.add(id)
            }
            return newSet
        })
    }

    const handlePlay = (playingId: number) => {
        videoRefs.current.forEach((video, id) => {
            if (id !== playingId) {
                video.pause()
            }
        })
    }

    const togglePlay = (id: number) => {
        const video = videoRefs.current.get(id)
        if (video) {
            if (video.paused) {
                video.play().catch(() => {
                })
            } else {
                video.pause()
            }
        }
    }

    const sectionRef = useRef(null)
    const isInView = useInView(sectionRef, { amount: 0.2 })

    useEffect(() => {
        if (!isInView) {
            videoRefs.current.forEach((video) => {
                video.pause()
            })
        }
    }, [isInView])

    useEffect(() => {
        const handleScroll = () => {
            if (scrollRef.current) {
                const container = scrollRef.current
                const scrollLeft = container.scrollLeft
                const containerWidth = container.offsetWidth
                const centerPosition = scrollLeft + containerWidth / 2

                let newActiveIndex = 0
                for (let i = 0; i < container.children.length; i++) {
                    const child = container.children[i] as HTMLElement
                    const childLeft = child.offsetLeft
                    const childRight = childLeft + child.offsetWidth

                    if (centerPosition >= childLeft && centerPosition <= childRight) {
                        newActiveIndex = i
                        break
                    }
                }

                if (newActiveIndex !== activeIndex) {
                    setActiveIndex(newActiveIndex)

                    // Auto-play the centered video
                    const activeReelId = reels[newActiveIndex]?.id
                    if (activeReelId) {
                        videoRefs.current.forEach((video, id) => {
                            if (id === activeReelId) {
                                video.play().catch(() => {
                                    // Auto-play might be blocked by browser, ignore error
                                })
                            } else {
                                video.pause()
                            }
                        })
                    }
                }
            }
        }

        const scrollContainer = scrollRef.current
        if (scrollContainer) {
            scrollContainer.addEventListener('scroll', handleScroll)
            handleScroll() // Initial check
        }

        return () => {
            if (scrollContainer) {
                scrollContainer.removeEventListener('scroll', handleScroll)
            }
        }
    }, [activeIndex])

    return (
        <section ref={sectionRef} className="py-12 md:py-20 relative bg-gradient-to-b from-rose-100 via-purple-100 to-indigo-100 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
            <motion.div
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
                className="text-center mb-8 md:mb-12 px-4"
            >
                <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-2 md:mb-4 text-gradient">Our Reels 🎥</h2>
                <p className="text-base sm:text-lg md:text-xl text-gray-600 dark:text-gray-300">Capturing our best moments in motion</p>
            </motion.div>

            <div className="relative w-full max-w-7xl mx-auto px-4">
                <div
                    ref={scrollRef}
                    className="flex overflow-x-auto snap-x snap-mandatory hide-scrollbar gap-4 md:gap-8 pb-8 px-4"
                    style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
                >
                    {reels.map((reel, index) => (
                        <motion.div
                            key={reel.id}
                            initial={{ opacity: 0, scale: 0.9 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5, delay: index * 0.1 }}
                            className="flex-shrink-0 snap-center"
                        >
                            <div className="relative w-[280px] h-[500px] md:w-[320px] md:h-[570px] rounded-3xl overflow-hidden shadow-2xl bg-black border-4 border-white dark:border-gray-800 transform transition-transform duration-300 hover:scale-[1.02] group">
                                <video
                                    ref={(el) => {
                                        if (el) videoRefs.current.set(reel.id, el)
                                        else videoRefs.current.delete(reel.id)
                                    }}
                                    onPlay={() => {
                                        handlePlay(reel.id)
                                        setPlayingVideos(prev => new Set(prev).add(reel.id))
                                    }}
                                    onPause={() => {
                                        setPlayingVideos(prev => {
                                            const newSet = new Set(prev)
                                            newSet.delete(reel.id)
                                            return newSet
                                        })
                                    }}
                                    src={reel.src}
                                    className="w-full h-full object-cover"
                                    loop
                                    playsInline
                                    preload="metadata"
                                />

                                {/* Large Heart Animation on Like */}
                                {likedVideos.has(reel.id) && (
                                    <motion.div
                                        initial={{ scale: 0, opacity: 0 }}
                                        animate={{ scale: [0, 1.5, 1], opacity: [0, 1, 0] }}
                                        transition={{ duration: 0.8 }}
                                        className="absolute inset-0 flex items-center justify-center pointer-events-none z-30"
                                    >
                                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-32 h-32 text-red-500/80 drop-shadow-2xl">
                                            <path d="M11.645 20.91l-.007-.003-.022-.012a15.247 15.247 0 01-.383-.218 25.18 25.18 0 01-4.244-3.17C4.688 15.36 2.25 12.174 2.25 8.25 2.25 5.322 4.714 3 7.75 3c1.578 0 2.993.56 4.25 1.565C13.007 3.56 14.422 3 16 3c3.036 0 5.5 2.322 5.5 5.25 0 3.925-2.438 7.111-4.739 9.256a25.175 25.175 0 01-4.244 3.17 15.247 15.247 0 01-.383.219l-.022.012-.007.004-.003.001a.752.752 0 01-.704 0l-.003-.001z" />
                                        </svg>
                                    </motion.div>
                                )}

                                {/* Click Overlay to Toggle Play/Pause */}
                                <div
                                    className="absolute inset-0 z-10 cursor-pointer"
                                    onClick={() => togglePlay(reel.id)}
                                />

                                {/* Custom Play Button */}
                                {!playingVideos.has(reel.id) && (
                                    <button
                                        onClick={(e) => {
                                            e.stopPropagation()
                                            const video = videoRefs.current.get(reel.id)
                                            if (video) {
                                                video.play()
                                            }
                                        }}
                                        className="absolute inset-0 flex items-center justify-center bg-black/30 backdrop-blur-sm transition-opacity duration-300 hover:bg-black/40 z-20"
                                    >
                                        <div className="w-16 h-16 md:w-20 md:h-20 rounded-full bg-white/90 flex items-center justify-center shadow-2xl transform hover:scale-110 transition-transform">
                                            <svg className="w-8 h-8 md:w-10 md:h-10 text-rose-500 ml-1" fill="currentColor" viewBox="0 0 24 24">
                                                <path d="M8 5v14l11-7z" />
                                            </svg>
                                        </div>
                                    </button>
                                )}

                                <div className="absolute bottom-0 inset-x-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent p-4 md:p-6 pointer-events-none z-10">
                                    <div className="flex items-center gap-2 mb-2">
                                        <span className="text-white text-lg">🎬</span>
                                        <h3 className="text-white font-bold text-lg">{reel.title}</h3>
                                    </div>
                                    {(reel as any).description && (
                                        <p className="text-white/90 text-sm leading-relaxed transition-all duration-300">
                                            {(reel as any).description}
                                        </p>
                                    )}
                                </div>
                                {/* Heart Icon Top Right */}
                                <button
                                    onClick={(e) => {
                                        e.stopPropagation()
                                        toggleLike(reel.id)
                                    }}
                                    className="absolute top-4 right-4 bg-black/20 backdrop-blur-md rounded-full p-2 z-20 hover:scale-110 active:scale-95 transition-all"
                                >
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        viewBox="0 0 24 24"
                                        fill="currentColor"
                                        className={`w-6 h-6 transition-colors duration-300 ${likedVideos.has(reel.id) ? 'text-red-500' : 'text-white'}`}
                                    >
                                        <path d="M11.645 20.91l-.007-.003-.022-.012a15.247 15.247 0 01-.383-.218 25.18 25.18 0 01-4.244-3.17C4.688 15.36 2.25 12.174 2.25 8.25 2.25 5.322 4.714 3 7.75 3c1.578 0 2.993.56 4.25 1.565C13.007 3.56 14.422 3 16 3c3.036 0 5.5 2.322 5.5 5.25 0 3.925-2.438 7.111-4.739 9.256a25.175 25.175 0 01-4.244 3.17 15.247 15.247 0 01-.383.219l-.022.012-.007.004-.003.001a.752.752 0 01-.704 0l-.003-.001z" />
                                    </svg>
                                </button>
                            </div>
                        </motion.div>
                    ))}
                </div>

                {/* Pagination Dots */}
                <div className="flex justify-center gap-2 mt-6">
                    {reels.map((reel, index) => (
                        <button
                            key={reel.id}
                            onClick={() => {
                                if (scrollRef.current) {
                                    const container = scrollRef.current
                                    const child = container.children[index] as HTMLElement
                                    if (child) {
                                        const scrollLeft = child.offsetLeft - (container.offsetWidth - child.offsetWidth) / 2
                                        container.scrollTo({ left: scrollLeft, behavior: 'smooth' })
                                    }
                                }
                            }}
                            className={`w-2 h-2 md:w-3 md:h-3 rounded-full transition-all duration-300 ${activeIndex === index
                                ? 'bg-rose-500 dark:bg-rose-400 scale-125'
                                : 'bg-gray-300 dark:bg-gray-600 hover:bg-rose-500 dark:hover:bg-rose-400'
                                }`}
                            aria-label={`Go to ${reel.title}`}
                        />
                    ))}
                </div>
            </div>
        </section>
    )
}
