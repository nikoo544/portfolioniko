import { useState, useEffect, useCallback } from 'react';
import { createPortal } from 'react-dom';
import { motion, AnimatePresence } from 'framer-motion';

// Icons (Simple SVGs to avoid dependencies)
const Icons = {
    Close: () => <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M18 6L6 18M6 6l12 12" /></svg>,
    Grid: () => <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="3" width="7" height="7" /><rect x="14" y="3" width="7" height="7" /><rect x="14" y="14" width="7" height="7" /><rect x="3" y="14" width="7" height="7" /></svg>,
    Book: () => <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20" /><path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z" /></svg>,
    ChevronLeft: () => <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M15 18l-6-6 6-6" /></svg>,
    ChevronRight: () => <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M9 18l6-6-6-6" /></svg>
};

export default function MangaReader({ pages = [], onClose, title }) {
    const [mode, setMode] = useState('vertical'); // 'vertical' (cascade) or 'horizontal' (book)
    const [currentPage, setCurrentPage] = useState(0);
    const [showControls, setShowControls] = useState(true);

    // Toggle controls visibility on click
    const toggleControls = () => setShowControls(prev => !prev);

    // Keyboard navigation
    useEffect(() => {
        const handleKeyDown = (e) => {
            if (e.key === 'Escape') onClose();
            if (mode === 'horizontal') {
                if (e.key === 'ArrowLeft') nextPage(); // Manga reads Right to Left
                if (e.key === 'ArrowRight') prevPage();
            }
        };
        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, [mode, currentPage]);

    const nextPage = () => {
        if (currentPage < pages.length - 1) {
            setCurrentPage(prev => Math.min(prev + (window.innerWidth > 768 ? 2 : 1), pages.length - 1));
        }
    };

    const prevPage = () => {
        if (currentPage > 0) {
            setCurrentPage(prev => Math.max(prev - (window.innerWidth > 768 ? 2 : 1), 0));
        }
    };

    return createPortal(
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="manga-reader"
            style={{
                position: 'fixed',
                top: 0,
                left: 0,
                width: '100vw',
                height: '100vh',
                background: '#111',
                zIndex: 90,
                display: 'flex',
                flexDirection: 'column',
                overflow: 'hidden',
                paddingTop: '80px'
            }}
        >
            {/* Top Bar */}
            <motion.div
                animate={{ y: showControls ? 0 : -100 }}
                transition={{ duration: 0.3 }}
                style={{
                    position: 'absolute',
                    top: '80px',
                    left: 0,
                    width: '100%',
                    padding: '1rem 2rem',
                    background: 'rgba(0,0,0,0.8)',
                    backdropFilter: 'blur(10px)',
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    zIndex: 91
                }}
            >
                <h2 style={{ fontSize: '1.2rem', margin: 0, color: '#fff' }}>{title}</h2>
                <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
                    <span style={{ color: '#888', fontSize: '0.9rem' }}>
                        {mode === 'horizontal' ? `Page ${currentPage + 1} / ${pages.length}` : 'Scroll Mode'}
                    </span>
                    <button
                        onClick={() => setMode(mode === 'vertical' ? 'horizontal' : 'vertical')}
                        style={{ background: 'none', border: 'none', color: '#fff', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '0.5rem' }}
                    >
                        {mode === 'vertical' ? <Icons.Book /> : <Icons.Grid />}
                        {mode === 'vertical' ? 'Book Mode' : 'Cascade'}
                    </button>
                    <button onClick={onClose} style={{ background: 'none', border: 'none', color: '#fff', cursor: 'pointer' }}>
                        <Icons.Close />
                    </button>
                </div>
            </motion.div>

            {/* Reader Content */}
            <div
                onClick={toggleControls}
                style={{
                    flex: 1,
                    overflowY: mode === 'vertical' ? 'auto' : 'hidden',
                    display: 'flex',
                    flexDirection: 'column', // Explicit column for better scroll handling in vertical mode
                    height: '100%'
                }}
            >
                {mode === 'vertical' ? (
                    // Vertical Cascade Mode
                    <div style={{ maxWidth: '800px', width: '100%', padding: '80px 0', margin: '0 auto' }}>
                        {pages.map((page, index) => (
                            <img
                                key={index}
                                src={page}
                                alt={`Page ${index + 1}`}
                                style={{ width: '100%', display: 'block', marginBottom: '10px' }}
                                loading="lazy"
                            />
                        ))}
                    </div>
                ) : (
                    // Horizontal Book Mode
                    <div style={{
                        width: '100%',
                        height: '100%',
                        display: 'flex',
                        flexDirection: 'row-reverse', // Right to Left for Manga
                        alignItems: 'center',
                        justifyContent: 'center',
                        gap: '10px'
                    }}>
                        {/* Left Page (actually next page in manga) */}
                        {pages[currentPage + 1] && window.innerWidth > 768 && (
                            <img
                                src={pages[currentPage + 1]}
                                style={{ maxHeight: '90vh', maxWidth: '45vw', objectFit: 'contain' }}
                            />
                        )}
                        {/* Right Page (current page) */}
                        {pages[currentPage] && (
                            <img
                                src={pages[currentPage]}
                                style={{ maxHeight: '90vh', maxWidth: '90vw', objectFit: 'contain' }}
                            />
                        )}
                    </div>
                )}
            </div>

            {/* Navigation Arrows (Horizontal Mode Only) */}
            {mode === 'horizontal' && showControls && (
                <>
                    <button
                        onClick={nextPage}
                        style={{ position: 'absolute', left: '20px', top: '50%', transform: 'translateY(-50%)', background: 'rgba(0,0,0,0.5)', border: 'none', color: 'white', padding: '1rem', borderRadius: '50%', cursor: 'pointer', zIndex: 10001 }}
                    >
                        <Icons.ChevronLeft />
                    </button>
                    <button
                        onClick={prevPage}
                        style={{ position: 'absolute', right: '20px', top: '50%', transform: 'translateY(-50%)', background: 'rgba(0,0,0,0.5)', border: 'none', color: 'white', padding: '1rem', borderRadius: '50%', cursor: 'pointer', zIndex: 10001 }}
                    >
                        <Icons.ChevronRight />
                    </button>
                </>
            )}
        </motion.div>,
        document.body
    );
}
