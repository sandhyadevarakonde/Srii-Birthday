'use client'

import { motion } from 'framer-motion'
import { useTheme } from '@/contexts/ThemeContext'

export default function ThemeToggle() {
  const { theme, toggleTheme } = useTheme()

  return (
    <motion.button
      onClick={toggleTheme}
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.9 }}
      className="fixed top-4 right-4 md:top-6 md:right-6 z-50 p-3 md:p-4 rounded-full bg-white/80 dark:bg-gray-800/80 backdrop-blur-md border-2 border-rose-200 dark:border-rose-700 shadow-lg hover:shadow-xl transition-all duration-300"
      aria-label="Toggle theme"
    >
      <motion.div
        initial={false}
        animate={{ rotate: theme === 'dark' ? 180 : 0 }}
        transition={{ duration: 0.3 }}
        className="text-2xl md:text-3xl"
      >
        {theme === 'light' ? '🌙' : '☀️'}
      </motion.div>
    </motion.button>
  )
}
