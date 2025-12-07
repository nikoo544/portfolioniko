import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const images = [
    "/images/manga/sample1.jpg",
    "/images/illustration/sample1.jpg",
    "/images/digital/sample1.png"
];

export default function HeroCarousel() {
    const [index, setIndex] = useState(0);

    useEffect(() => {
        const timer = setInterval(() => {
            setIndex((prev) => (prev + 1) % images.length);
        }, 5000);
        return () => clearInterval(timer);
    }, []);

    return (
        <div style={{
            position: 'relative',
            width: '100%',
            height: '60vh',
            overflow: 'hidden',
            borderRadius: '20px',
            boxShadow: '0 20px 50px rgba(0,0,0,0.5)',
            border: '1px solid rgba(255,255,255,0.1)',
            background: '#000'
        }}>
            <AnimatePresence mode="wait">
                <motion.div
                    key={index}
                    initial={{ opacity: 0, scale: 1.1 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 1.5 }}
                    style={{
                        position: 'absolute',
                        inset: 0,
                        width: '100%',
                        height: '100%'
                    }}
                >
                    <motion.img
                        src={images[index]}
                        alt="Hero Art"
                        initial={{ scale: 1.1 }}
                        animate={{ scale: 1 }}
                        transition={{ duration: 6, ease: "linear" }} // Ken Burns Effect
                        style={{
                            width: '100%',
                            height: '100%',
                            objectFit: 'cover',
                            filter: 'grayscale(100%) contrast(1.2)' // Traditional B&W Look
                        }}
                    />
                    {/* Overlay Gradient */}
                    <div style={{
                        position: 'absolute',
                        inset: 0,
                        background: 'linear-gradient(to top, #0f0f0f 0%, transparent 50%)'
                    }} />
                </motion.div>
            </AnimatePresence>

            {/* Navigation Dots */}
            <div style={{
                position: 'absolute',
                bottom: '20px',
                left: '50%',
                transform: 'translateX(-50%)',
                display: 'flex',
                gap: '10px',
                zIndex: 10
            }}>
                {images.map((_, i) => (
                    <button
                        key={i}
                        onClick={() => setIndex(i)}
                        style={{
                            width: '8px',
                            height: '8px',
                            borderRadius: '50%',
                            border: 'none',
                            background: i === index ? '#fff' : 'rgba(255,255,255,0.3)',
                            cursor: 'pointer',
                            padding: 0,
                            transition: 'background 0.3s'
                        }}
                    />
                ))}
            </div>
        </div>
    );
}
