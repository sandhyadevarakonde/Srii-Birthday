'use client'

import { motion } from 'framer-motion'

export default function HeartfeltMessage() {
    return (
        <section className="min-h-[60vh] py-12 md:py-20 relative overflow-hidden flex items-center justify-center bg-rose-50/10 dark:bg-gray-900/10">
            {/* Background Video with Responsive Padding */}
            <div className="absolute inset-0 z-0 py-4 px-4 sm:px-10 md:px-10 md:py-8 lg:px-20 lg:py-12 xl:px-20 xl:py-16 flex items-center justify-center">
                <div className="relative w-full h-full overflow-hidden rounded-xl shadow-2xl">
                    <video
                        autoPlay
                        loop
                        muted
                        playsInline
                        className="w-full h-full object-cover"
                    >
                        <source src="/assets/Video15.mp4" type="video/mp4" />
                    </video>
                    <div className="absolute inset-0 bg-black/30 dark:bg-black/40" /> {/* Increased overlay for readability since card background was removed */}
                </div>
            </div>

            <motion.div
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
                className="max-w-3xl mx-auto px-6 md:px-12 text-center relative z-10"
            >
                <div className="py-8">
                    <div className="text-5xl md:text-6xl mb-6">💝</div>

                    <h2 className="text-2xl md:text-4xl font-bold mb-4 text-white drop-shadow-lg">
                        A Message from My Heart
                    </h2>

                    <div className="space-y-3 text-white/90 text-sm sm:text-base md:text-lg leading-relaxed drop-shadow-md">
                        <p className="font-medium">
                            I want to say sorry for everything I've done that hurt you. I never meant to hurt you,
                            but I know I did sometimes, and I feel really bad about it.
                        </p>

                        <p className="font-medium">
                            I'm sorry for everything. I promise I'll try my best to be better
                            and not make the same mistakes again.
                        </p>

                        <p className="font-bold text-rose-300 text-lg md:text-2xl mt-4">
                            Today, whatever confidence I have, whatever happiness I feel it's all because of you.
                            Your love and support made me who I am today.
                        </p>

                        <p className="font-medium mt-4">
                            Thank you for everything. Thank you for being there for me.
                            I love you so much.
                        </p>

                        <p className="italic text-rose-200 text-lg md:text-xl font-semibold mt-6 px-4">
                            Whenever I think about you, I get tears in my eyes because of how much I love you. I don't want anything else in this life I just want you. Please marry me.
                        </p>

                        <p className="font-bold text-purple-200 text-base md:text-xl mt-8 pt-4">
                            Once again, Happy Birthday to my love! ❤️<br />
                            Stay happy, stay healthy. May all your dreams come true.<br />
                            With lots of love<br />
                            Your Muddu...
                        </p>
                    </div>
                </div>
            </motion.div>
        </section>
    )
}
