import { motion } from 'framer-motion';
import { portfolioData } from '../data/projects';
import Gallery from '../components/Gallery';

export default function Illustration() {
    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
            className="page-container"
        >
            <h1>Illustration</h1>
            <p style={{ color: '#aaa', marginBottom: '2rem' }}>Detailed artworks and concepts.</p>
            <Gallery items={portfolioData.illustration} />
        </motion.div>
    );
}
