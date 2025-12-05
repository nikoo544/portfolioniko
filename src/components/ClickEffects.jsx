import { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const emojis = ['❤️', '🧡', '💛', '💚', '💙', '💜', '🌈', '✨', '🌸', '🎨', '🖌️', '⭐', '🦄', '🎉'];

export default function ClickEffects() {
    const [particles, setParticles] = useState([]);

    const addParticle = useCallback((e) => {
        const newParticle = {
            id: Date.now() + Math.random(),
            x: e.clientX,
            y: e.clientY,
            emoji: emojis[Math.floor(Math.random() * emojis.length)]
        };

        setParticles(prev => [...prev, newParticle]);

        // Cleanup after animation
        setTimeout(() => {
            setParticles(prev => prev.filter(p => p.id !== newParticle.id));
        }, 1000);
    }, []);

    useEffect(() => {
        window.addEventListener('click', addParticle);
        return () => window.removeEventListener('click', addParticle);
    }, [addParticle]);

    return (
        <div style={{
            position: 'fixed',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            pointerEvents: 'none',
            zIndex: 99999,
            overflow: 'hidden'
        }}>
            <AnimatePresence>
                {particles.map(particle => (
                    <motion.div
                        key={particle.id}
                        initial={{ scale: 0, x: particle.x, y: particle.y, opacity: 1 }}
                        animate={{
                            scale: [0, 1.5, 1],
                            y: particle.y - 100,
                            x: particle.x + (Math.random() - 0.5) * 50, // Random slight horizontal drift
                            opacity: 0
                        }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.8, ease: "easeOut" }}
                        style={{
                            position: 'absolute',
                            fontSize: '2rem',
                            pointerEvents: 'none',
                            transform: 'translate(-50%, -50%)' // Center on click
                        }}
                    >
                        {particle.emoji}
                    </motion.div>
                ))}
            </AnimatePresence>
        </div>
    );
}
