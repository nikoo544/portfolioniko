import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { portfolioData } from '../data/projects';
import Gallery from '../components/Gallery';
import MangaReader from '../components/MangaReader';

export default function Manga() {
    const [selectedManga, setSelectedManga] = useState(null);

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
            className="page-container"
        >
            <h1>Manga</h1>
            <p style={{ color: '#aaa', marginBottom: '2rem' }}>Original stories and character designs.</p>

            <Gallery
                items={portfolioData.manga}
                onItemClick={(item) => setSelectedManga(item)}
            />

            <AnimatePresence>
                {selectedManga && (
                    <MangaReader
                        pages={selectedManga.pages || [selectedManga.image]}
                        title={selectedManga.title}
                        onClose={() => setSelectedManga(null)}
                    />
                )}
            </AnimatePresence>
        </motion.div>
    );
}
