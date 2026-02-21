import React from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Button } from '../components/Button';

const Landing: React.FC = () => {
    const navigate = useNavigate();

    // Faint floating particles
    const particles = Array.from({ length: 20 });

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, transition: { duration: 0.5, ease: 'easeInOut' } }}
            className="relative flex items-center justify-center min-h-screen w-full overflow-hidden bg-gradient-to-b from-[#0B1221] via-[#10131A] to-[#070709]"
        >
            {/* Dynamic Animated Glow Orb Background */}
            <motion.div
                animate={{
                    scale: [1, 1.05, 1],
                    opacity: [0.15, 0.25, 0.15],
                }}
                transition={{
                    duration: 8,
                    repeat: Infinity,
                    ease: "easeInOut"
                }}
                className="absolute w-[800px] h-[800px] bg-gradient-to-tr from-blue-600/20 to-cyan-500/10 blur-[120px] rounded-full pointer-events-none"
            />

            {/* Floating Light Streaks (Stock Graph Vibes) */}
            <motion.div
                initial={{ x: '-100%', opacity: 0 }}
                animate={{ x: '100%', opacity: [0, 0.08, 0] }}
                transition={{ duration: 6, repeat: Infinity, ease: 'linear' }}
                className="absolute top-1/3 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-cyan-400 to-transparent transform -rotate-12 pointer-events-none"
            />
            <motion.div
                initial={{ x: '-100%', opacity: 0 }}
                animate={{ x: '100%', opacity: [0, 0.04, 0] }}
                transition={{ duration: 8, repeat: Infinity, ease: 'linear', delay: 2 }}
                className="absolute bottom-1/3 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-blue-400 to-transparent transform rotate-12 pointer-events-none"
            />

            {/* Subtle Math/Particles Background */}
            <div className="absolute inset-0 pointer-events-none overflow-hidden mix-blend-screen">
                {particles.map((_, i) => (
                    <motion.div
                        key={i}
                        initial={{
                            y: Math.random() * window.innerHeight,
                            x: Math.random() * window.innerWidth,
                            opacity: 0
                        }}
                        animate={{
                            y: [null, Math.random() * window.innerHeight * 0.5],
                            opacity: [0, Math.random() * 0.15, 0]
                        }}
                        transition={{
                            duration: Math.random() * 10 + 15,
                            repeat: Infinity,
                            ease: "linear",
                            delay: Math.random() * 5
                        }}
                        className="absolute w-1 h-1 bg-blue-100 rounded-full blur-[1px]"
                        style={{
                            left: `${Math.random() * 100}%`,
                            top: `${Math.random() * 100}%`
                        }}
                    />
                ))}
            </div>

            {/* Grid Pattern Overlay */}
            <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff04_1px,transparent_1px),linear-gradient(to_bottom,#ffffff04_1px,transparent_1px)] bg-[size:64px_64px] pointer-events-none mix-blend-overlay"></div>

            {/* Hero Content Container */}
            <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
                className="relative z-10 flex flex-col items-center justify-center p-12 md:p-16 text-center max-w-4xl mx-auto"
            >

                <motion.h1
                    className="relative text-[5rem] sm:text-[7rem] md:text-[9rem] lg:text-[11rem] xl:text-[13rem] font-black tracking-tighter mb-4 font-sans antialiased leading-none"
                    initial={{ backgroundPosition: '0% 50%', y: 0, scale: 1 }}
                    animate={{
                        backgroundPosition: ['0% 50%', '100% 50%', '0% 50%'],
                        y: [0, -12, 0],
                        scale: [1, 1.03, 1]
                    }}
                    transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
                    style={{
                        backgroundImage: 'linear-gradient(to right, #60a5fa, #c084fc, #38bdf8, #60a5fa)',
                        backgroundSize: '200% auto',
                        WebkitBackgroundClip: 'text',
                        WebkitTextFillColor: 'transparent',
                        textShadow: '0 0 60px rgba(56, 189, 248, 0.45)'
                    }}
                >
                    ArthaDhan
                </motion.h1>

                {/* Tagline */}
                <motion.h2
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.8, delay: 0.4 }}
                    className="relative text-lg md:text-2xl font-sans text-slate-200 italic tracking-[0.06em] mb-12 max-w-2xl font-normal antialiased"
                >
                    The accumulation and mastery of wealth
                </motion.h2>

                {/* Call to Action Wrapper to handle scaling easily */}
                <motion.div
                    animate={{ boxShadow: ['0 0 0px rgba(56,189,248,0)', '0 0 25px rgba(56,189,248,0.2)', '0 0 0px rgba(56,189,248,0)'] }}
                    transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                    className="relative rounded-full"
                >
                    <motion.div
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.97 }}
                        transition={{ type: "spring", stiffness: 400, damping: 25 }}
                    >
                        <Button
                            onClick={() => navigate('/dashboard')}
                            className="group relative overflow-hidden font-sans uppercase tracking-[0.08em] text-sm font-semibold !border !border-white/10"
                            style={{
                                background: 'linear-gradient(135deg, #38bdf8, #1d4ed8)',
                                textShadow: '0 1px 2px rgba(0,0,0,0.2)',
                                boxShadow: '0 4px 15px rgba(29, 78, 216, 0.4), inset 0 1px 0 rgba(255,255,255,0.2)',
                                color: '#ffffff',
                                borderRadius: '9999px',
                            }}
                        >
                            {/* Shimmer effect via Tailwind before psuedo-element trick mapped inline for ease */}
                            <span className="absolute inset-0 w-full h-full bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-[150%] skew-x-[-20deg] transition-all duration-700 ease-out group-hover:translate-x-[150%]"></span>
                            Start
                        </Button>
                    </motion.div>
                </motion.div>

            </motion.div>
        </motion.div>
    );
};

export default Landing;

