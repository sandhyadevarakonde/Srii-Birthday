'use client'

import { motion } from 'framer-motion'

const specialMoments = [
  {
    id: 1,
    title: 'First Meeting',
    emoji: '👋',
    description: 'The moment we first met in college - little did we know it was the start of something beautiful.',
    color: 'from-blue-500 to-cyan-400',
  },
  {
    id: 2,
    title: 'First Study Session',
    emoji: '📖',
    description: 'Our first study session together - when we realized we made the perfect study partners.',
    color: 'from-purple-500 to-pink-400',
  },
  {
    id: 3,
    title: 'First Laugh Together',
    emoji: '😂',
    description: 'That moment when we couldn\'t stop laughing together - I knew you were special.',
    color: 'from-yellow-500 to-orange-400',
  },
  {
    id: 4,
    title: 'First Realization',
    emoji: '💕',
    description: 'The day I realized my feelings for you were more than just friendship.',
    color: 'from-rose-500 to-pink-400',
  },
  {
    id: 5,
    title: 'First Support',
    emoji: '🤝',
    description: 'When you supported me through a tough time - that\'s when I knew you were my person.',
    color: 'from-green-500 to-teal-400',
  },
  {
    id: 6,
    title: 'First Future Talk',
    emoji: '✨',
    description: 'The first time we talked about our future together - my heart was so full of hope and love.',
    color: 'from-indigo-500 to-purple-400',
  },
]

export default function SpecialMoments() {
  return (
    <section className="min-h-screen py-12 md:py-20 relative bg-gradient-to-b from-cyan-50 via-blue-50 to-indigo-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-0 w-64 h-64 bg-cyan-200 dark:bg-cyan-900/30 rounded-full mix-blend-multiply filter blur-2xl opacity-20 dark:opacity-10 animate-float"></div>
        <div className="absolute bottom-1/4 right-0 w-64 h-64 bg-blue-200 dark:bg-blue-900/30 rounded-full mix-blend-multiply filter blur-2xl opacity-20 dark:opacity-10 animate-float" style={{ animationDelay: '2s' }}></div>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        className="text-center mb-8 md:mb-16 px-4 relative z-10"
      >
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-2 md:mb-4 text-gradient">Special Moments ✨</h2>
        <p className="text-base sm:text-lg md:text-xl text-gray-600 dark:text-gray-300">The milestones that shaped our love story</p>
      </motion.div>

      <div className="max-w-6xl mx-auto px-4 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
          {specialMoments.map((moment, index) => (
            <motion.div
              key={moment.id}
              initial={{ opacity: 0, y: 50, rotate: -5 }}
              whileInView={{ opacity: 1, y: 0, rotate: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1, duration: 0.6 }}
              whileHover={{ scale: 1.05, rotate: 2, z: 10 }}
              className="relative group"
            >
              <div className={`relative rounded-2xl md:rounded-3xl p-6 md:p-8 bg-gradient-to-br ${moment.color} text-white shadow-xl hover:shadow-2xl transition-all duration-300 h-full`}>
                {/* Decorative Corner */}
                <div className="absolute top-0 right-0 w-16 h-16 bg-white/20 rounded-bl-full"></div>
                <div className="absolute bottom-0 left-0 w-16 h-16 bg-white/20 rounded-tr-full"></div>
                
                <div className="relative z-10">
                  <div className="text-5xl md:text-6xl mb-3 md:mb-4 transform group-hover:scale-110 transition-transform duration-300">
                    {moment.emoji}
                  </div>
                  <h3 className="text-xl md:text-2xl font-bold mb-2 md:mb-3">{moment.title}</h3>
                  <p className="text-sm md:text-base leading-relaxed opacity-95">{moment.description}</p>
                </div>

                {/* Shine Effect */}
                <div className="absolute inset-0 rounded-2xl md:rounded-3xl bg-gradient-to-r from-transparent via-white/20 to-transparent transform -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
