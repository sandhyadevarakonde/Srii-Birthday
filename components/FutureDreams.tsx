'use client'

import { motion } from 'framer-motion'

const dreams = [
  {
    id: 1,
    dream: 'Travel the world together',
    emoji: '✈️',
    description: 'Explore new places, create memories in every corner of the world.',
  },
  {
    id: 2,
    dream: 'Build a home together',
    emoji: '🏡',
    description: 'Create a space that\'s truly ours, filled with love and laughter.',
  },
  {
    id: 3,
    dream: 'Grow old together',
    emoji: '👴👵',
    description: 'Watch each other grow, support each other\'s dreams, and cherish every moment.',
  },
  {
    id: 4,
    dream: 'Celebrate every milestone',
    emoji: '🎉',
    description: 'From small victories to big achievements, celebrate life together.',
  },
  {
    id: 5,
    dream: 'Keep the spark alive',
    emoji: '💫',
    description: 'Never stop dating, never stop falling in love with each other every day.',
  },
  {
    id: 6,
    dream: 'Be each other\'s forever',
    emoji: '💍',
    description: 'Through thick and thin, be each other\'s constant support and love.',
  },
]

export default function FutureDreams() {
  return (
    <section className="min-h-screen py-12 md:py-20 relative bg-gradient-to-b from-violet-50 via-purple-50 to-fuchsia-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      {/* Animated Stars Background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute text-2xl opacity-20 dark:opacity-40"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              scale: [1, 1.5, 1],
              opacity: [0.2, 0.5, 0.2],
            }}
            transition={{
              duration: 3 + Math.random() * 2,
              repeat: Infinity,
              delay: Math.random() * 2,
            }}
          >
            ⭐
          </motion.div>
        ))}
      </div>

      <motion.div
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        className="text-center mb-8 md:mb-16 px-4 relative z-10"
      >
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-2 md:mb-4 text-gradient">Our Future Dreams 🌟</h2>
        <p className="text-base sm:text-lg md:text-xl text-gray-600 dark:text-gray-300">All the beautiful things we want to do together</p>
      </motion.div>

      <div className="max-w-6xl mx-auto px-4 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
          {dreams.map((item, index) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.15, duration: 0.6 }}
              whileHover={{ scale: 1.03, y: -5 }}
              className="group"
            >
              <div className="glass-effect rounded-2xl md:rounded-3xl p-6 md:p-8 bg-gradient-to-br from-white/60 to-purple-50/60 dark:from-gray-800/60 dark:to-gray-700/60 backdrop-blur-md border-2 border-purple-200/50 dark:border-purple-700/50 shadow-xl hover:shadow-2xl transition-all duration-300 h-full">
                <div className="flex items-start gap-4 md:gap-6">
                  <div className="text-5xl md:text-6xl flex-shrink-0 transform group-hover:rotate-12 transition-transform duration-300">
                    {item.emoji}
                  </div>
                  <div className="flex-1">
                    <h3 className="text-xl md:text-2xl font-bold text-gray-800 dark:text-gray-100 mb-2 md:mb-3">
                      {item.dream}
                    </h3>
                    <p className="text-sm md:text-base text-gray-600 dark:text-gray-300 leading-relaxed">
                      {item.description}
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Closing Message */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.8, duration: 0.8 }}
          className="mt-12 md:mt-16 text-center"
        >
          <div className="glass-effect rounded-2xl md:rounded-3xl p-6 md:p-8 bg-gradient-to-br from-purple-100/80 to-pink-100/80 dark:from-gray-800/80 dark:to-gray-700/80 backdrop-blur-md border-2 border-purple-300/50 dark:border-purple-700/50">
            <p className="text-lg md:text-xl lg:text-2xl font-semibold text-gray-800 dark:text-gray-100 leading-relaxed mb-4">
              These are just a few of the countless dreams I have for us.
              <span className="text-gradient"> Every day with you brings new possibilities and new reasons to dream together. 💕</span>
            </p>
            <p className="text-xl lg:text-4xl font-bold text-rose-600 dark:text-rose-400 mt-6 ">
              Marry me soon... We will lead our life beautiful! 💍❤️
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
