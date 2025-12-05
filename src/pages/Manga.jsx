import { motion } from 'framer-motion';
import { portfolioData } from '../data/projects';
import Gallery from '../components/Gallery';

export default function Manga() {
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
            <Gallery items={portfolioData.manga} />
        </motion.div>
    );
}
