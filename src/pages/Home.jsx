import { motion } from 'framer-motion';
import { portfolioData } from '../data/projects';
import { getAssetPath } from '../utils/imageUtils';

export default function Home() {
    // Combine all works into a single array
    const allWorks = [
        ...portfolioData.manga.map(item => ({ ...item, category: 'Manga' })),
        ...portfolioData.illustration.map(item => ({ ...item, category: 'Illustration' })),
        ...portfolioData.digital.map(item => ({ ...item, category: 'Digital' }))
    ];

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="page-container"
            style={{ textAlign: 'center', marginTop: '5vh' }}
        >
            <h1 style={{ fontSize: '5rem', marginBottom: '1rem' }}>NIKO</h1>
            <h2 style={{ fontSize: '2rem', fontWeight: 300, color: '#aaa' }}>PORTFOLIO</h2>
            <p style={{ fontSize: '1.2rem', color: '#888', maxWidth: '600px', margin: '2rem auto', lineHeight: '1.8' }}>
                Welcome to my creative universe. <br />
                Explore my works in <span style={{ color: '#fff' }}>Manga</span>, <span style={{ color: '#fff' }}>Illustration</span>, and <span style={{ color: '#fff' }}>Digital Art</span>.
            </p>

            {/* Masonry Grid */}
            <div className="masonry-grid" style={{ marginTop: '4rem' }}>
                {allWorks.map((work, index) => (
                    <motion.div
                        key={`${work.category}-${work.id}`}
                        className="masonry-item"
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: index * 0.1 }}
                        onContextMenu={(e) => e.preventDefault()} // Disable right-click
                    >
                        <img
                            src={getAssetPath(work.image)}
                            alt={work.title}
                            loading="lazy"
                            draggable="false" // Disable drag
                            style={{ userSelect: 'none', WebkitUserDrag: 'none' }}
                        />
                        {/* Protection Overlay */}
                        <div style={{ position: 'absolute', inset: 0, zIndex: 10 }} />

                        <div style={{
                            position: 'absolute',
                            bottom: 0,
                            left: 0,
                            width: '100%',
                            padding: '1rem',
                            background: 'linear-gradient(to top, rgba(0,0,0,0.8), transparent)',
                            opacity: 0,
                            transition: 'opacity 0.3s',
                            textAlign: 'left',
                            zIndex: 20 // Above protection overlay
                        }} className="masonry-overlay">
                            <h3 style={{ fontSize: '1rem', margin: 0, color: '#fff' }}>{work.title}</h3>
                            <span style={{ fontSize: '0.8rem', color: '#ccc' }}>{work.category}</span>
                        </div>
                    </motion.div>
                ))}
            </div>

            <style>{`
                .masonry-item:hover .masonry-overlay {
                    opacity: 1 !important;
                }
            `}</style>

        </motion.div>
    );
}
